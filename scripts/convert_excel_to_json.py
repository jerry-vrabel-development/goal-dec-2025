import pandas as pd
import json
import sys
import os
from datetime import datetime

def convert_excel_to_json(excel_file, json_file):
    try:
        # Read the Excel file
        df = pd.read_excel(excel_file)

        # Rename columns to match dashboard expectations
        column_mapping = {
            'Date': 'Date Applied',
            'Company Name': 'Company',
            'Job Title': 'Position',
            'Application Status': 'Status',
            'Notes / Follow-up': 'Notes',
            'Resume Sent?': 'Resume Sent',
            'Response?': 'Response',
            'Interview?': 'Interview'
        }

        # Rename columns if they exist
        df = df.rename(columns=column_mapping)

        # Handle missing columns by adding them with empty values
        required_columns = ['Company', 'Position', 'Date Applied','Status', 'Notes']
        for col in required_columns:
            if col not in df.columns:
                df[col] = ''

        # Convert date columns to strings in YYYY-MM-DD format
        date_columns = ['Date Applied']
        for col in date_columns:
            if col in df.columns:
                # Convert any datetime objects to strings
                df[col] = df[col].apply(lambda x: x.strftime('%Y-%m-%d')
if pd.notna(x) and hasattr(x, 'strftime') else str(x) if pd.notna(x) else
'')

        # Reorder columns to match dashboard expectations
        df = df[['Company', 'Position', 'Date Applied', 'Status','Notes']]

        # Convert to JSON
        data = df.to_dict('records')

        # Write to JSON file
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=2)

        print(f"Successfully converted {excel_file} to {json_file}")
        return True

    except Exception as e:
        print(f"Error converting Excel to JSON: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 convert_excel_to_json.py <input_excel_file> <output_json_file>")
        sys.exit(1)

    excel_file = sys.argv[1]
    json_file = sys.argv[2]

    if not os.path.exists(excel_file):
        print(f"Error: {excel_file} not found")
        sys.exit(1)

    convert_excel_to_json(excel_file, json_file)
