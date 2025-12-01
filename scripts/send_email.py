#!/usr/bin/env python3
"""
Send a generated PDF as an attachment.
Usage:
python scripts/send_email.py --to hr@acme.com --subject "Application
for Senior Software Engineer" --file
generated/Acme_Corp_Senior_Software_Engineer.pdf
"""

import argparse
import os
import pathlib
import sys

import yagmail

# Environment variables to keep credentials out of the repo
GMAIL_USER = os.getenv("GMAIL_USER")
GMAIL_PASS = os.getenv("GMAIL_PASS")

if not (GMAIL_USER and GMAIL_PASS):
    print("❌  GMAIL_USER / GMAIL_PASS not set in env", file=sys.stderr)
    sys.exit(1)

yag = yagmail.SMTP(user=GMAIL_USER, password=GMAIL_PASS,
host="smtp.gmail.com")


def send_application(to_email: str, subject: str, attachment_path:
pathlib.Path):
    # Basic body – feel free to customize
    body = f"""
Dear Hiring Team,

Please find my application for {subject} attached.

Best regards,
Jerry

"""

    yag.send(
        to=to_email,
        subject=subject,
        contents=body,
        attachments=str(attachment_path),
    )
    print(f"📧  Sent to {to_email} – {attachment_path.name}")


def main():
    parser = argparse.ArgumentParser(description="Send a single resume.")
    parser.add_argument("--to", required=True, help="Recipient e‑mail")
    parser.add_argument(
        "--subject", required=True, help="Subject line (e.g. 'Senior
Software Engineer')"
    )
    parser.add_argument(
        "--file",
        type=pathlib.Path,
        required=True,
        help="Path to the PDF you want to attach",
    )
    args = parser.parse_args()

    send_application(args.to, args.subject, args.file)


if __name__ == "__main__":
    main()
