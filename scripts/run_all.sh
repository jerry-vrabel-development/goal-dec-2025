#!/usr/bin/env bash
set -euo pipefail

ROOT=$(dirname "$(readlink -f "$0")")/..

# 1️⃣  Generate all resumes
python "${ROOT}/scripts/generate_resumes.py" --csv
"${ROOT}/data/companies.csv"

# 2️⃣  Loop over the newly created PDFs
for pdf_path in "${ROOT}/generated/"*.pdf; do
    # Extract company & role from the file name
    base="${pdf_path##*/}"
    base="${base%.*}"
    IFS='_' read -r company role <<< "$base"

    # Send
    python "${ROOT}/scripts/send_email.py" \
        --to "$company@$role@example.com" \
        --subject "$role" \
        --file "$pdf_path"

    # Update progress sheet
    python "${ROOT}/scripts/update_progress.py" <<EOF
{
    "Date": "$(date +%Y-%m-%d)",
    "Company": "${company}",
    "Role": "${role}",
    "Resume_DOCX": "${ROOT}/generated/${base}.docx",
    "Resume_PDF": "${pdf_path}",
    "Email_Recipient": "${company}@example.com",
    "Subject": "${role}",
    "Sent_At": "$(date +%s)"
}
EOF
done

echo "✅  All done!"
