// server.js

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

require('dotenv').config();

const hostname = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.get('/test', (req, res) => {
    res.send('Hello this is from server!\n');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    console.error(err.stack);
    process.exit(1);
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
