import express from 'express';
import router from "./routes/index";

var bodyParser = require('body-parser')
const app = express();

// middlewares
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(router);

app.listen(3000);
console.log('Server on port', 3000);
