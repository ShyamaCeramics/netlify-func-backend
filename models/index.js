const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  host: "mysql8010.site4now.net",
  database: "db_aa9fb2_sha",
  username: "aa9fb2_sha",
  password: "Fake@123456",
  dialect: "mysql"
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./product.model.js")(sequelize, Sequelize);
db.images = require("./image.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);

module.exports = db;