const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db');
const shareController = require('./controllers/shareController');


var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.use('/shares', shareController);

app.listen(3000, () => console.log('Server has started'));