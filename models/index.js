const Sequelize = require('sequelize');

// Models
const User = require('./user');
const Notice = require('./notice');

const mode = process.env.MODE;
const config = require('../config/config.json')[mode];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const db = {};
db.sequelize = sequelize;
db.User = User;
db.Notice = Notice;

// Models init
User.init(sequelize);
Notice.init(sequelize);

// Models associate
User.associate(db);
Notice.associate(db);

module.exports = db;
