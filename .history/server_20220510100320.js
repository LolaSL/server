const express = require('express');
const app = express();
const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});