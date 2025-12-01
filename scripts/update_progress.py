#!/usr/bin/env python3
"""
Append a row to progress/progress.xlsx every time we send an email.
The sheet columns are:
Date, Company, Role, Resume_DOCX, Resume_PDF, Email_Recipient, Subject, Sent_At
"""

import datetime
import pathlib
import sys

import pandas as pd

PROGRESS_XLS = pathlib.Path(__file__).resolve().parent.parent.parent /
"progress" / "progress.xlsx"

def append_row(row: dict):
    # Load the file (create if it doesn't exist)
    try:
        df = pd.read_excel(PROGRESS_XLS)
    except FileNotFoundError:
        df = pd.DataFrame(columns=row.keys())

    # Append
    df = df.append(row, ignore_index=True)

    # Write back
    df.to_excel(PROGRESS_XLS, index=False)

if __name__ == "__main__":
    # The helper expects the row dict on stdin as JSON for quick shell integration
    import json
    row = json.loads(sys.stdin.read())
    append_row(row)
