'use strict';

const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');
const app = express();
app.use(cors());//Simple Usage (Enable All CORS Requests)

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static("public"));//necessário para tornar a documentação apidoc publica

const router = express.Router();

//Conecta ao banco
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(config.connectionStringDevelopment, { useNewUrlParser: true })
  .then(() => console.log("mongoDB connected"))
  .catch(err => console.log(err));

//carrega os Models
const sensor = require('./models/sensor');
const controlador = require('./models/controlador');
const plantio = require('./models/plantio');

//Carrega rotas
const indexRoute = require('./routes/index-route');
const sensorRoute = require('./routes/sensor-route');
const controladorRoute = require('./routes/controlador-route');
const plantioRoute = require('./routes/plantio-route');
const mobileRoute = require("./routes/mobile-route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', indexRoute);
//app.use('/sensor', sensorRoute);
//app.use('/controlador', controladorRoute);
//app.use('/plantio', plantioRoute);
app.use("/mobile", mobileRoute);

module.exports = app;
