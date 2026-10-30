# UNIPROOF AI — Google Sites launch

This guide publishes the existing interactive UNIPROOF AI prototype inside a new Google Site and connects the real feedback form.

## 1. Create the feedback form and response spreadsheet

1. Sign in to the Google account that should own UNIPROOF AI feedback.
2. Open https://script.google.com and create a new Apps Script project.
3. Copy the complete contents of [scripts/create_feedback_form.gs](../scripts/create_feedback_form.gs) into the editor.
4. Save, select `createUniproofFeedbackForm`, and click **Run**.
5. Approve the Google Forms and Sheets permissions.
6. Open **Execution log** and copy all three values:
   - `FORM_PUBLIC_URL`
   - `FORM_EDIT_URL`
   - `SHEET_URL`

Keep the edit URL and spreadsheet private. Only the public form URL should be embedded in the website.

## 2. Create the Google Site

1. Open https://sites.google.com/new while signed in to the same Google account.
2. Create a blank site.
3. Set the site name to **UNIPROOF AI**.
4. Add a short subtitle: **Цифровой паспорт учебных достижений**.
5. Add these pages or navigation sections:
   - Главная
   - Document Verify
   - Skill Verify
   - Как это работает
   - Обратная связь
6. On the Home page, use **Insert → Embed → By URL** and paste:
   `https://qwertyilyas.github.io/uniproof-ai/`
7. Resize the embedded content so it occupies most of the page width and enough vertical space. If Google Sites clips the embedded page on mobile, add a visible button linking directly to the prototype URL as a fallback.
8. On the Feedback page, choose **Insert → Forms**, select the form created in step 1, and insert it. Alternatively, use **Embed → By URL** with the public form URL.
9. Add a short note below the form: **Не отправляйте паспортные данные, финансовую информацию или документы третьих лиц.**
10. Click **Publish**, choose a short available web address (for example, `uniproof-ai`), review who can view the published site, and publish.

## 3. Send the URLs back for final wiring

Send these three links in the chat:
- Public Google Form URL
- Published Google Sites URL
- (Optional) the Google Sites editor URL if you want help checking its structure

Do not send passwords, one-time codes, private edit links to the form, or spreadsheet access links.

## Important technical note

Google Sites is a wrapper/publishing surface. The interactive prototype continues to run from GitHub Pages inside an embed. Google Sites does not turn the static prototype into a secure production backend. The current local portfolio and document checks remain browser-side; actual user accounts, shared storage, educator verification, OCR and official registry checks still require a backend and authorized integrations.
