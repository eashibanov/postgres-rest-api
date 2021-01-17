import express from 'express';
import router from "./routes/index";
import * as Config from './config/config.json';

let bodyParser = require('body-parser')
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(router);

app.listen(Config.appPort || 3000);
console.log('Server on port', Config.appPort || 3000);
