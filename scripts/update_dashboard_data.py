# scripts/update_dashboard_data.py
import pandas as pd
import json

def create_sample_data():
    # Create sample data that matches your Excel format
    data = {
        'Company': ['Tech Corp', 'Innovate Inc', 'StartupXYZ', 'Global
Solutions', 'Digital Future'],
        'Position': ['Senior Web Engineer', 'Frontend Developer', 'Full
Stack Engineer', 'Senior Developer', 'Web Architect'],
        'Date Applied': ['2025-12-01', '2025-12-02', '2025-12-03',
'2025-12-04', '2025-12-05'],
        'Status': ['Submitted', 'Response Received', 'Interview
Scheduled', 'Submitted', 'Submitted'],
        'Notes': ['Customized resume', 'Followed up', 'First round',
'Standard application', 'Custom resume']
    }

    df = pd.DataFrame(data)
    df.to_excel('progress.xlsx', index=False)
    print("Sample data created in progress.xlsx")

if __name__ == "__main__":
    create_sample_data()
