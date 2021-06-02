const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

const {connect} = require('./database/database.js');
connect();

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));