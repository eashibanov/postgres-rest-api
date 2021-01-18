import express from 'express';
//import router from "./routes/index";
import * as Config from './config/config.json';
import Logger from 'bunyan';

process.title = "postgres-rest-api";
const logger: Logger = Logger.createLogger({
    name: process.title,
    src: true,
    serializers: Logger.stdSerializers,
    streams: [
        {
            level: 'info',
            stream: process.stdout,
        },
        {
            level: 'error',
            stream: process.stdout,
        },
    ],
})

let bodyParser = require('body-parser')
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('logger', logger);

// Routes
app.use(require('./routes/index')(logger));

let port = process.env.APP_PORT || Config.appPort;

app.listen(port);
logger.info('Server on port', port);
