const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

const port = process.env.port || 6050;

app.get('/', function (req, res) {
    res.status(200).send('Server is working')
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on http://localhost:${port}`);
});