require("dotenv").config();

const sheets = require("../server/googleAuth");

class GetSheetData {
    async render(req, res) {
        const filaSelecionada = req.params.fila;

        try {
            const namesResponse = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SHEET_ID,
                range: "Respostas!B2:B327"
            });

            const checkInResponse = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SHEET_ID,
                range: "Respostas!L2:L327"
            })

            const filaResponse = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SHEET_ID,
                range: "Respostas!K2:K327"
            })

            const nameRows = namesResponse.data.values;
            const checkInRows = checkInResponse.data.values;
            const filaRows = filaResponse.data.values;

            const filas = Array.from(new Set(filaRows.flat()));
            const visitantes = [];
            const visitantesCheckedQuant = checkInRows.filter(checked => checked == "Sim").length;

            let i = 0;

            nameRows.forEach(row => {
                if (filaRows[i][0] == filaSelecionada) {
                    visitantes.push({id: i + 2, nome: row[0], checkIn: checkInRows[i][0]});
                }

                i++;
            });

            return res.render("index.ejs", {visitantes, filas: filas.filter(fila => fila !== filaSelecionada), filaSelecionada, visitantesCheckedQuant});
        } catch (error) {
            console.error('Erro: ', error);

            return res.render("index.ejs", {nomes: []});
        }
    }
}

const getSheetDataController = new GetSheetData();

module.exports = getSheetDataController;