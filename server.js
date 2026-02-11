require('dotenv').config();
const express = require('express');
//switch on connectDB
const connectDB = require ('./src/config/db');
connectDB();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

const apiroutes = require('./src/routes/apiroutes');
/*const connectDB = require('./src/config/db');*/
app.use(process.env.BASE_URI, apiroutes);

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
    console.log(`base URI: http://localhost:${PORT}${BASE_URI}`);
});
