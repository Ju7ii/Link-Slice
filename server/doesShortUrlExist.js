const Database = require("./database");
const { dbConfig } = require("./dbConfig");

const dbInstance = new Database(dbConfig);

const doesShortUrlExist = (shortUrl, callback) => {
  const sqlStatement = `SELECT COUNT(*) AS count FROM url WHERE short_url = '${shortUrl}'`;
  dbInstance.query(sqlStatement, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      const exists = result[0].count > 0;
      callback(null, exists);
    }
  });
};

module.exports = doesShortUrlExist;
