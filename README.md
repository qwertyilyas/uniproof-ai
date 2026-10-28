# UniProof AI

UniProof AI is a prototype for two related education-trust workflows.

## Product modules

### 1. Document Verify
Preliminary technical review of education documents such as diplomas, school certificates and credentials. The current API validates file types and basic file readability, extracts text from text-based PDFs, and reports fields that may deserve further review.

**It does not determine authenticity.** Official verification through EPVO / Smart Bridge or an issuing institution is not connected. Never use the current report as the sole basis for hiring, admission or other consequential decisions.

### 2. Skill Verify
A planned workflow for reviewing student projects and mapping demonstrated evidence to skills. A human educator should be able to review, confirm or reject proposed skills. The current website contains a clearly labelled interface demo only; real AI assessment, educator review and verifiable skill cards are not implemented yet.

## Current status

- FastAPI backend for preliminary document review.
- Upload support for PDF, PNG and JPG/JPEG.
- File-size, extension, MIME type and basic file-signature checks.
- Basic PDF text-layer and page-count inspection.
- Branded dual-module website prototype at `web/index.html`.
- EPVO provider boundary exists, but no official API calls are implemented or enabled.
- Automated API tests are in `tests/test_api.py`.

## Run locally

1. Use Python 3.11+.
2. Create and activate a virtual environment.
3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the app from the repository root:

   ```bash
   uvicorn app.main:app --reload
   ```

5. Open `http://127.0.0.1:8000`. API health: `http://127.0.0.1:8000/api/health`.

Run tests:

```bash
pytest -q
```

## Product roadmap

1. Improve document parsing and OCR, with clear per-check evidence and limitations.
2. Identify lawful official verification channels and obtain approved API access before implementing integration.
3. Build actual Skill Verify analysis with cited evidence excerpts, evaluation rubrics and uncertainty reporting.
4. Add educator review, audit history and privacy-conscious shareable records.
5. Pilot with an education provider or employer and measure error rates before making reliability claims.

## Safety and accuracy

- A visual or AI-based anomaly is a signal for review, not proof of forgery.
- An official registry match should be reported only when a real, authorized source returned it.
- A skill should not be represented as verified until a defined review process has actually confirmed it.
- Do not upload sensitive personal documents to a public deployment until access control, retention, deletion and privacy safeguards are implemented.
