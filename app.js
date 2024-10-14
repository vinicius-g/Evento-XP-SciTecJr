const express = require("express");
const router = require("./app/routes/router");

const app = express();
const port = 2405;

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./app/public"));

app.use("/", router);

app.listen(port, () => {
    console.log(`Servidor aberto em http://localhost:${port}`);
})