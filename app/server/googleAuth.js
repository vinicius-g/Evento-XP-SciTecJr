require("dotenv").config();

const {google} = require("googleapis");
const {GoogleAuth} = require("google-auth-library");

const auth = new GoogleAuth({
    credentials: JSON.parse(process.env.CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
})
const authClient = auth.fromJSON(JSON.parse(process.env.CREDENTIALS))
const sheets = google.sheets({version: 'v4', auth: authClient});

module.exports = sheets;