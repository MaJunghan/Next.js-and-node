const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const User = require("./user")(sequelize, Sequelize);
const Post = require("./post")(sequelize, Sequelize);
const Image = require("./image")(sequelize, Sequelize);
const Hashtag = require("./hashtag")(sequelize, Sequelize);
const Comment = require("./comment")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
