// Optional Google Sheets mirror for booking enquiries.
// Enabled only when these environment variables are set on the server:
//   GOOGLE_SHEET_ID                 the ID from the sheet's URL
//   GOOGLE_SERVICE_ACCOUNT_JSON     the full JSON key of a Google service account
// Share the sheet with the service account's email address (Editor access).
// Never commit the key to the repository.

const TAB = 'Enquiries';

function sheetEnabled() {
  return Boolean(process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
}

async function appendEnquiryToSheet(e) {
  const { google } = require('googleapis');
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const when = new Date(e.start).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short',
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${TAB}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        e.reference, e.createdAt, when, e.hours * 60 + ' min', e.players,
        e.game || '', e.name, e.phone, e.email || '', e.status,
      ]],
    },
  });
}

module.exports = { appendEnquiryToSheet, sheetEnabled };
