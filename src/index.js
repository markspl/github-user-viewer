/**
 * GitHub API app to show data (working title)
 * Author: Markus Palomäki (github/markspl)
 */

const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Front page");
});

// Not found fallback
app.get("*", (req, res) => {
    const notFound = "<p><span style=\"font-weight:bold; color: red\">404</span> Not Found</p><a href=\"/\">Go back</a>"
    res.status(404).send(notFound);
});

app.listen(PORT, () => {
    console.log(`Up and running on port ${PORT}.`)
});