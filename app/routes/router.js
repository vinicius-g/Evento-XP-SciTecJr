const express = require("express");
const router = express.Router();

const getSheetDataController = require("../controllers/getSheetsDataController");
const updateSheetDataController = require("../controllers/updateSheetDataController");
const getCheckedVisitorsController = require("../controllers/getCheckedVisitorsController");

router.get("/:fila", async (req, res) => {
    await getSheetDataController.render(req, res)
});

router.get("/check-in/:id/:fila", async (req, res) => {
    await updateSheetDataController.checkIn(req, res);
})

router.get("/checked/:fila", async (req, res) => {
    await getCheckedVisitorsController.render(req, res);
})

module.exports = router;