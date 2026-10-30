# UNIPROOF AI feedback form setup

Google Drive integration is not available in this workspace, so the form must be created once in the project owner's Google account.

## Create the form and response spreadsheet

1. Open https://script.google.com while signed in to the Google account that should own the feedback.
2. Create a new project.
3. Open `scripts/create_feedback_form.gs` from this repository and copy its full contents into the Apps Script editor (replace the starter code).
4. Save the project.
5. Select `createUniproofFeedbackForm` and click Run.
6. Approve Google's authorization prompt.
7. Open the execution log. Copy the values for:
   - `FORM_PUBLIC_URL` - public form link
   - `FORM_EDIT_URL` - owner editing link
   - `SHEET_URL` - response spreadsheet

The script creates a Google Form with six questions and a linked Google Sheet. Form responses are saved automatically by Google Forms.

## Finish website integration

Send the `FORM_PUBLIC_URL` back to the site maintainer. The site can then embed that exact form in the feedback section. Do not publish the edit link or spreadsheet edit link publicly.

Do not collect sensitive personal information in this educational prototype.
