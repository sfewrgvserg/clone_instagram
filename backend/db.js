import Sequelize from "@sequelize/core";

const sequelize = new Sequelize({
  password: "0150274661@sinaG",
  username: "root",
  database: "instagram",
  dialect: "mysql",
  logging: false,
  host: "localhost",
});

try {
  await sequelize.authenticate();
  console.log("connect to database mysql!");
} catch (err) {
  console.log(err.message);
  process.exit();
}

export default sequelize;
