const { Sequelize } = require("sequelize");

const db = {};
const dbOptions = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dialect: process.env.DB_CONNECTION,
  pool: {
    max: 5,
    min: 0,
    acquire: 1200000000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  "root",
  dbOptions
);

// create table automatically
sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
