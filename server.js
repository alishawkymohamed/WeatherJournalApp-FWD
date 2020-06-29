// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 8000;
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Routes
app.get('/getData', (req, res) => {
    // Send projectData as response
    res.status(200).send(projectData);
});

app.post('/postData', (req, res) => {
    // saving the data in the variable
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    };
    res.status(200).send(projectData);
});

// Setup Server
app.listen(port, function () {
    console.log('CORS-enabled web server listening on port 8000');
});