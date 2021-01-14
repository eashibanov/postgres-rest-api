import express from 'express';
import indexRoutes from "./routes/index";
import router from "./routes/index";
const app = express();

const bodyParser = require('body-parser')
// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use(indexRoutes);

app.listen(3000);
console.log('Server on port', 3000);