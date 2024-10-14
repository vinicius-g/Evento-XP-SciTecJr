require("dotenv").config();

const sheets = require("../server/googleAuth");

class UpdateSheetData {
    async checkIn(req, res) {
        const id = req.params.id;
        const filaSelecionada = req.params.fila;

        const range = `Respostas!L${id}`;

        try {
            sheets.spreadsheets.values.update({
                spreadsheetId: process.env.SHEET_ID,
                range: range,
                valueInputOption: 'RAW',
                resource: {
                    values: [["Sim"]],
                },
            });

            return res.redirect(`/${filaSelecionada}`);
        } catch (error) {
            console.error('Erro: ', error);
        }
    }
}

const updateSheetDataController = new UpdateSheetData();

module.exports = updateSheetDataController;