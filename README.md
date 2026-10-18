# AK Gaming Lounge website

Static frontend (`public/`) and a small Express server (`server.js`) that serves
the site, the business data (`config/business.js`), and booking enquiries.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000.

## Edit content

- Prices, games, hours, contact details, FAQs: `config/business.js`
- Game artwork: `public/assets/games/`
- Enquiries are saved to `data/enquiries.json` (created automatically, not committed).

## Deploy

GitHub stores the code. The server must run on a Node.js host such as Render.
GitHub Pages cannot run `server.js`.

## Booking rules

- Each booking uses one PS5. There are 3 PS5s, and up to 4 players share one.
- Holidays and special hours are in `config/business.js` (`closedDates`, `specialHours`).

## Google Sheets (optional)

Set these environment variables on the server to mirror each booking request into a sheet:

- `GOOGLE_SHEET_ID`: the ID from the sheet's URL
- `GOOGLE_SERVICE_ACCOUNT_JSON`: the full JSON key of a Google service account

Share the sheet with the service account's email, with Editor access.
Never commit the key to the repository.
