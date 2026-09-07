import { getDateTime } from "./db.js";

import express from "express"
import morgan from "morgan"

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan("tiny"))

app.get("/", async(req, res) => {
    const dateTime = await getDateTime();
    const response = dateTime;
    response.api = "node"
    res.send(response);
})

app.get("/ping", async(req, res) => {
    res.send("pong");
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

process.on("SIGTERM", () => {
    console.debug("SIGTEERM signal received: closing HTTP server");
    server.close(() => {
        console.debug('HTTP server closed');
    })
})