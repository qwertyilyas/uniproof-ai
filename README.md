# UNIPROOF AI

UNIPROOF AI is an educational MVP for transparent presentation and review of learning achievements. It combines two workflows: preliminary technical document inspection and a student portfolio of skill evidence.

## Live website

https://qwertyilyas.github.io/uniproof-ai/

## Website features currently implemented

- Responsive Russian-language website with Document Verify and Skill Verify modules.
- Document Verify: browser-side file extension, size, signature, and basic image/PDF metadata checks for PDF, PNG and JPEG. Files are not uploaded by the static website.
- Skill Verify portfolio builder: student enters project details, role, skills and evidence excerpts; creates a draft Skill Proof Card.
- Local portfolio: cards are stored in the current browser's localStorage.
- Demonstration reviewer controls: approve/reject/reset a card and leave a reviewer comment. These statuses are local demo states, not verified educator approvals.
- Student profile builder, printable profile/card, and JSON export.
- Feedback form saves locally in the browser only until a real external form is connected.
- Local data deletion control.

## Important limitations

This is a static GitHub Pages MVP. It does not currently have a production backend, shared database, user accounts, authentication, cloud file storage, real AI model inference, OCR, official EPVO / Smart Bridge access, or a cryptographically verifiable credential. Local browser data is not synchronized between devices and can be lost when browser storage is cleared.

The Document Verify checks are technical hints only, not a determination of authenticity. Skill cards are drafts unless a real, authorized educator review process is implemented. The current reviewer buttons are for demonstrating the workflow and must not be presented as actual institutional verification.

Do not upload real identity documents or sensitive personal information to this public demo. Do not use this MVP as the sole basis for hiring, admission, grading or other consequential decisions.

## API prototype (separate from GitHub Pages)

A FastAPI backend prototype exists under `app/` and exposes:
- `GET /api/health`
- `GET /api/official-verification/status`
- `POST /api/analyze`

The FastAPI API is not deployed by GitHub Pages. Run it locally:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Run tests:

```bash
pytest -q
```

## Google Forms feedback integration

A Google Apps Script starter is available at `scripts/create_feedback_form.gs`. It creates a real Google Form and a linked response spreadsheet in the account that runs it. The public form URL must then be configured in the website before feedback is sent externally. Until that integration is completed, the website feedback form is local-only.

## Roadmap to production

1. Deploy FastAPI to a secure host and connect the static site to it.
2. Add user accounts, consent, role-based access, audit logs, retention and deletion controls.
3. Add OCR and robust document parsing.
4. Obtain authorized EPVO / Smart Bridge API access and implement only the approved contract.
5. Implement evidence-grounded AI skill suggestions with citations to source excerpts, uncertainty and rubric transparency.
6. Add real educator authentication and approval workflow.
7. Store shareable Skill Proof Cards securely and provide revocation and privacy controls.
8. Connect Google Forms/Sheets or a secure feedback service.

## Team

- Ильяс Сералиев — creator / product manager.
- Амир Мираипов — analyst / content manager.
