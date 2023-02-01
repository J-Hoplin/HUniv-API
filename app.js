const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const Code = require('./Code');

dotenv.config({
    path: './config/.env',
});

// Scraper instance
const { Notice, set } = require('./app/Notice');

// Routers
const api = require('./api');

const { sequelize } = require('./models');

// Swagger
const { swaggerUI, specs } = require('./docs');

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database connection success');
    })
    .catch(() => {
        console.error('Fail to connect database');
        process.exit(1);
    });

const app = express();

// Initiate scraper instance
Object.keys(set).map((i) => {
    console.log(`Instance of scraper : ${i} ready`);
    app.set(`scraper_${i}`, new Notice(i));
    return i;
});

app.set('port', process.env.PORT || 4000);
app.use(
    express.json(),
    express.urlencoded({
        extended: false,
    }),
    process.env.MODE === 'production'
        ? logger('combined')
        : logger('dev'),
);
app.get('/', (req, res) => res.redirect('/api-docs'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api', api);
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.route} router not found`);
    error.code = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.log(err);
    const format = Code.buildFormat(err.msg || 'Error', err.code || 500, err.code || 500);
    return res.status(format.httpCode).json(
        Code.messageCommon(format),
    );
});

module.exports = app;
