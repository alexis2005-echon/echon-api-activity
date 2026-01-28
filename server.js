require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

const apiroutes = require('./src/routes/apiroutes');
app.use(BASE_URI, apiroutes);

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
    console.log(`base URI: http://localhost:${PORT}${BASE_URI}`);
});