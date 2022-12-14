const Sequelize = require("sequelize");
const pkg = require("../../package.json");
require("dotenv").config();

const databaseName = pkg.name;

const config = {
  logging: false,
  pool: {
    acquire: 1000000,
  }
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL & (process.env.NODE_ENV === "production")) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);
module.exports = db;
