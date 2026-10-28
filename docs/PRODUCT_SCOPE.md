# UniProof AI: Product Scope

## Product promise

Help users evaluate two different kinds of educational evidence:
1. Whether an education document can be corroborated by an authorized source.
2. What skills a submitted educational work appears to demonstrate, subject to human review.

The product must distinguish document anomaly detection, official verification, AI assessment and human confirmation. These are not interchangeable states.

## Document Verify

**Inputs:** diploma, school certificate, credential or supporting PDF/image.

**MVP output:** file readability, extracted text availability, page/image metadata and candidate fields that may help a later review.

**Not currently available:** official registry lookup, signature verification, forensic image analysis, OCR for scanned files, or a reliable authenticity verdict.

**Future states:**
- `technical_review_complete`
- `officially_confirmed` only after an authorized source confirms a matching record
- `needs_manual_review`
- `unable_to_verify`

Do not label a document “fake” solely because a field is missing or a visual anomaly is detected.

## Skill Verify

**Goal:** help educators assess evidence of skills demonstrated in student work.

**Prototype only:** the website shows a fictional sample card and explicitly states it is not a real assessment.

**Required before launch:**
- Text extraction for supported formats.
- Transparent rubric mapped to specific skills.
- Evidence excerpts or page references supporting each suggested skill.
- Uncertainty and insufficient-evidence states.
- Educator approve/reject/edit workflow.
- Audit trail of who reviewed and when.
- A shareable record that does not expose source documents or personal information by default.

## Shared design principles

- Never imply government verification unless a real authorized integration returned a result.
- Never claim 100% accuracy.
- Keep official document verification separate from visual anomaly detection.
- Keep AI-suggested skills separate from educator-confirmed skills.
- Collect only necessary data and define retention/deletion rules before handling real personal documents.
- Do not use automated results as the sole basis for consequential employment or education decisions.

## Suggested implementation order

1. Stabilize document parsing and automated tests.
2. Research official Kazakhstan verification pathways and access requirements.
3. Implement OCR and structured extraction with clear error handling.
4. Implement Skill Verify as a separate backend service, with evidence-grounded analysis and rubric configuration.
5. Add educator review and audit history.
6. Run a limited pilot and measure false positives, false negatives and reviewer agreement.
