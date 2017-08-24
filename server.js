/* eslint no-console: "off" */
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.locals.title = 'BYOB';

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', router);

app.listen(app.get('port'), () => console.log(`${app.locals.title} is running on ${app.get('port')}`));

module.exports = app;
