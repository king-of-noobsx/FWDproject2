// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')


// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=4000
app.listen(port, () =>console.log(`srever is running on port ${port}`))

// get all route
app.get('/allData',(req, res)=>{
    // console.log(projectData)
    res.send(projectData)
} )

//recive and add data from client side
app.post('/addData', (req, res)=>{
    console.log(req.body)
    projectData.date=req.body.date;
    projectData.city=req.body.city;
    projectData.temp=req.body.temp;
    projectData.feeling=req.body.feeling;
 


})