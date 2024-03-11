const mysql = require("mysql");

class Database {
  constructor(config) {
    this.db = mysql.createPool(config);
  }

  query(sql, params, callback) {
    return this.db.query(sql, params, callback);
  }
}

module.exports = Database;
