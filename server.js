require('dotenv').config();
const express = require('express');
const cors = require('cors');
//switch on connectDB
const connectDB = require ('./src/config/db');
connectDB();
const app = express();


app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

const apiroutes = require('./src/routes/apiroutes');
/*const connectDB = require('./src/config/db');*/
app.use(process.env.BASE_URI, apiroutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}

module.exports = app;