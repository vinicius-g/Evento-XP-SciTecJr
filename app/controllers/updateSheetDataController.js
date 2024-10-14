require("dotenv").config();

const sheets = require("../server/googleAuth");

class UpdateSheetData {
	async checkIn(req, res) {
		const id = req.params.id;
		const filaSelecionada = req.params.fila;

		try {
			sheets.spreadsheets.values.update({
				spreadsheetId: process.env.SHEET_ID,
				range: `Respostas!L${id}`,
				valueInputOption: "RAW",
				resource: {
					values: [["Sim"]],
				},
			});

            sheets.spreadsheets.values.update({
				spreadsheetId: process.env.SHEET_ID,
				range: `Respostas!M${id}`,
				valueInputOption: "RAW",
				resource: {
					values: [[this.dataAtual()]],
				},
			});

			return res.redirect(`/${filaSelecionada}`);
		} catch (error) {
			console.error("Erro: ", error);
		}
	}

	dataAtual() {
		const date = new Date();

		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Janeiro é 0
		const year = date.getFullYear();

		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		const seconds = String(date.getSeconds()).padStart(2, "0");

		return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
	}
}

const updateSheetDataController = new UpdateSheetData();

module.exports = updateSheetDataController;
