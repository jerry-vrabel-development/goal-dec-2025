# Goal‑Dec‑2025 *(2025‑12‑01 – 2025‑12‑31)*

**Goal:** Submit 500 professional resumes in pursuit of a senior web‑engineer
position by the end of December 2025.

## Target Your Efforts

- **Focus on 200-300 quality applications** rather than just 500 random
submissions
- Identify 50-100 companies you'd actually want to work for (not just any
job)
- Use LinkedIn, job boards, and company websites to find opportunities

## Efficient Application Process

- **Create templates** for your resume and cover letter (personalize
20-30%)
- Batch process applications (2-3 hours daily)
- Use job boards like LinkedIn, Indeed, Glassdoor, AngelList, and company
career pages
- Consider niche platforms for senior engineers (Stack Overflow Jobs,
GitHub Jobs, etc.)

## Quality Over Quantity

- **Tailor each application** to the specific role and company
- **Customize your resume** for each position (highlight relevant
experience)
- **Follow up** on 10-20 applications with brief outreach

## Daily Strategy

- 2-3 hours of focused application work
- 1 hour of networking (LinkedIn, industry events)
- 30 minutes of portfolio/website updates

## Track Progress

- Use a spreadsheet to track applications, responses, and interviews
  
- Set daily targets (e.g., 15-20 applications per day)
  
---

## 📖 Overview

This repository is a living record of my 500‑resume sprint.
It contains:

- **Resume templates** (Word, PDF, HTML, Markdown)
  
- **Personalised versions** (one per company/role)

- **Tracking tools** (Google Sheet + GitHub issues)

- **Automation scripts** for templating & emailing

- **Reflection logs** to improve each submission

Feel free to explore the code, ideas, or open issues if you have suggestions.

---

## 🚀 What I’m Doing

| Day | Action | Deliverable |
|-----|--------|-------------|
| 01/12 | Kick‑off & repo setup | `README.md` (this file) |
| 02‑10 | Gather target companies & roles | `companies.csv` |
| 11‑15 | Draft core resume template | `template.docx` |
| 16‑20 | Convert template to other formats | `template.pdf`, `template.html` |
| 21‑25 | Build auto‑generation script | `generate_resumes.py` |
| 26‑30 | Create tracking sheet | `progress.xlsx` |
| 01‑31 | Email & log submissions | `emails.log` |

*(The actual schedule is flexible – the key is consistency.)*

---

## 📁 Repo Structure

```

Goal-Dec-2025/
├── templates/          # Original and converted resume templates
│   ├── template.docx
│   ├── template.pdf
│   └── template.html
├── scripts/            # Automation scripts
│   ├── generate_resumes.py
│   └── send_email.sh
├── data/               # CSV files of companies and personal data
│   └── companies.csv
├── progress/           # Logs and spreadsheets
│   ├── progress.xlsx
│   └── emails.log
├── logs/               # Raw logs
│   └── submission.log
└── README.md

```

---

## 🛠️ How to Use / Run

1. **Clone the repo**

   ```bash

   git clone https://github.com/yourusername/Goal-Dec-2025.git
   cd Goal-Dec-2025
   ```

2. **Install dependencies**

   ```bash

   pip install -r requirements.txt

   ```

3. **Generate a resume**

   ```bash

   python scripts/generate_resumes.py --company "Acme Corp"
   ```

4. **Send an email** (example script)

   ```bash

   ./scripts/send_email.sh
   ```

5. **Track progress** – Open `progress/progress.xlsx` and update after each
submission.

---

## 📈 Tracking & Reporting

| Metric | Tool | Frequency |
|--------|------|-----------|
| Resumes submitted | `progress.xlsx` | Daily |
| Companies contacted | `progress.xlsx` | Daily |
| Responses received | `emails.log` | As received |
| Follow‑ups | `progress.xlsx` | Weekly |

You can also pull data into a dashboard with PowerBI, Google Data Studio, or a
simple `pandas` script.

---

## 🤝 Contributing

I’m open to ideas on:

- Better templating solutions
- Email automation improvements
- Tracking dashboards
- Resume content best practices

Feel free to open an issue or submit a pull request.

---

## 📜 License

This project is released under the MIT License. See `LICENSE` for details.

---

## 🎯 Final Thought

I’ve set a clear target, created a structured repo, and begun the process.
If you’re a senior web engineer or know one, please reach out—I’m eager to
collaborate and learn.

Good luck to us all!
