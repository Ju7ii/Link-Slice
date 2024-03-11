const express = require("express");
const bodyParser = require("body-parser");
const Database = require("./database");
const { dbConfig } = require("./dbConfig");
const UrlValidator = require("./urlValidator");
const UrlShortener = require("./urlShortener");
const doesShortUrlExist = require("./doesShortUrlExist");

const app = express();
const db = new Database(dbConfig);
const urlValidator = new UrlValidator();
const urlShortener = new UrlShortener();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to create test data
app.get("/createTestData", (req, res) => {
  const testData = [
    "http://www.example.com", // Valid URL
    "https://www.example.com", // Valid URL
    "ftp://www.example.com", // Invalid URL (protocol not supported)
    "www.example.com", // Invalid URL (protocol missing)
    "http://example.com", // Valid URL
    "http://example.com/path", // Valid URL with path
    "http://example.com/path/", // Valid URL with path and trailing slash
    "http://example.com?query=test", // Valid URL with query parameter
    "http://example.com#section", // Valid URL with anchor
    "http://example", // Invalid URL (domain incomplete)
  ];

  testData.forEach((url) => {
    if (urlValidator.isValid(url)) {
      const sqlStatement = `INSERT INTO url (original_url, short_url) VALUES ('${url}', '${urlShortener.generateShortUrl()}')`;
      db.query(sqlStatement, (error, result) => {
        if (error) {
          console.error("Error inserting test data:", error);
        }
      });
    } else {
      console.log("Invalid URL:", url);
    }
  });

  res.status(200).json({ message: "Test data created successfully." });
});

// Endpoint to generate short URL
app.post("/shortenUrl", (req, res) => {
  const originalUrl = req.query.url;

  if (urlValidator.isValid(originalUrl)) {
    const currentUrl = `${req.protocol}://${req.hostname}:${process.env.PORT || 5050}`;
    let shortUrl = currentUrl;
    do {
      shortUrl = urlShortener.generateShortUrl();
    } while (doesShortUrlExist(shortUrl, (err, exists) => exists)); // Expecting `doesShortUrlExist` to be defined in your code

    const sqlStatement = `INSERT INTO url (original_url, short_url) VALUES ('${originalUrl}', '${shortUrl}')`;
    db.query(sqlStatement, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create short URL." });
      } else {
        res.status(200).json({ "Short-Url": `${currentUrl}${shortUrl}` });
      }
    });
  } else {
    res.status(400).json({ error: "Invalid URL" });
  }
});

// Endpoint to redirect short URL to original URL
app.get("/:shortUrl", (req, res) => {
  const shortUrl = "/" + req.params.shortUrl;

  const sqlStatement = `SELECT original_url FROM url WHERE short_url = '${shortUrl}'`;
  db.query(sqlStatement, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch original URL." });
    } else {
      if (result.length > 0) {
        const originalUrl = result[0].original_url;
        res.redirect(originalUrl);
      } else {
        res.status(404).json({ error: "Short URL not found" });
      }
    }
  });
});

// Start the server
app.listen(5050, () => {
  console.log("Server is running on port", 5050);
});
