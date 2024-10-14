require("dotenv").config()

const sheets = require("../server/googleAuth");

class GetCheckedVisitors {
    async render(req, res) {
        const filaSelecionada = req.params.fila;

        try {
            const namesResponse = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SHEET_ID,
                range: "Respostas!B2:B349"
            });

            const checkInResponse = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SHEET_ID,
                range: "Respostas!L2:L349"
            })

            const nameRows = namesResponse.data.values;
            const checkInRows = checkInResponse.data.values;

            const visitantes = [];
            const visitantesCheckedQuant = checkInRows.filter(checked => checked == "Sim").length;

            let i = 0;

            nameRows.forEach(row => {
                if (checkInRows[i][0] == "Sim") {
                    visitantes.push({nome: row[0]});
                }

                i++;
            });

            return res.render("checked.ejs", {visitantes, visitantesCheckedQuant, filaSelecionada});
        } catch (error) {
            console.error('Erro: ', error);

            return res.render("checked.ejs", {nomes: []});
        }
    }
}

const getCheckedVisitorsController = new GetCheckedVisitors();

module.exports = getCheckedVisitorsController;