const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3050;

app.get('/', function (req, res) {
    res.send("Hello Api");
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});