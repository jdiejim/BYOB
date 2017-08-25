/* eslint no-console: "off" */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.locals.title = 'BYOB';

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './build')));
app.use('/api/v1', router);

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '/build', 'index.html')));
app.listen(app.get('port'), () => console.log(`${app.locals.title} is running on ${app.get('port')}`));

module.exports = app;
