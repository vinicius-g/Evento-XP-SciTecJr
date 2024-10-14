const express = require("express");
const router = express.Router();

const getSheetDataController = require("../controllers/getSheetsDataController");
const updateSheetDataController = require("../controllers/updateSheetDataController");

router.get("/:fila", async (req, res) => {
    await getSheetDataController.render(req, res)
});

router.get("/check-in/:id/:fila", async (req, res) => {
    await updateSheetDataController.checkIn(req, res);
})

module.exports = router;