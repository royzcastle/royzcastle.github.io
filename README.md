# Project Showcase

Public project index for resume QR use. Scan the QR code on a resume to land here, then choose a project. All seven cards open a unified Project Detail page. Pages use project-level content.

## Live

- Project index: `/`
- AI Executive Brief detail: `/projects/flash-report/`
- Governed RAG Stack detail: `/projects/rag-stack/`

## What is here

- `index.html` — project index / resume landing page
- `assets/` — index styles
- `projects/flash-report/` — AI Executive Brief project (static, zero dependencies)
- `projects/rag-stack/` — Governed RAG Stack project
- `projects/scope/` — Project Detail pages for the remaining five projects (`?p=` selector)
- `projects/flash-report/teams/` — Microsoft Teams app manifest, icons and Adaptive Card
- `projects/flash-report/StarlightAIFlashReport-teams.zip` — sideload-ready Teams package
- `qr/` — ready-to-print QR codes for a resume (`qr-index.png` / `qr-profile.png` → project index; `qr-flash-report.png` → direct Executive Brief detail)

The executive brief uses sample data and a fictional brand (Starlight Macau Integrated Resort) for demonstration only.

All pages carry a collapsible Scope Notice.
