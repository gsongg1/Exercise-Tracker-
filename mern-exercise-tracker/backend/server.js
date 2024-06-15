const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // helps connect to mongodb database

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; // get from mongodb dashboard

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // removed useCreateIndex
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
