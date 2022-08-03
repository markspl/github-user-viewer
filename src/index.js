/**
 * GitHub API app to show data (working title)
 * Author: Markus Palomäki (github/markspl)
 */

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const axios = require("axios");

const PORT = process.env.PORT || 80;

// Error handler, if axios fails
const errorHandler = (err, req, res, next) => {
    console.log("Error" + next);
    res.status(err.status || 400).send(err.message);
}

const app = express();
app.use(bodyParser.json());

// Get user data from GitHub API
app.get("/", async (req, res, next) => {
    const options = {
        method: "get",
        url: "https://api.github.com/users/markspl",
        headers: {
            "Content-Type": "application/json",
        },
    };

    axios(options).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        next(err);
    });
});

// Not found fallback
app.get("*", (req, res) => {
    const notFound = "<p><span style=\"font-weight:bold; color: red\">404</span> Not Found</p><a href=\"/\">Go back</a>"
    res.status(404).send(notFound);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Up and running on port ${PORT}.`)
});