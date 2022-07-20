// TODO: Configure the environment variables
let projectData = {};
const PORT = 8082

// TODO add Configuration to be able to use env variables

// import path from 'path'
const path = require('path');
// import express from 'express'
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.static('dist')) 

const dotenv = require('dotenv');
// import dotenv from 'dotenv'
dotenv.config();
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
});

// To send API_KEY to client
app.get('/fetchUrl' , async (req, res) => {
    const apiKey = {
        key : process.env.API_KEY
    }
    res.send(apiKey)
    console.log(apiKey)
});

// to save the info gotten from the api to project Data 
app.post('/newUrl', async (req, res) => {
    const body = await req.body;
    projectData = body;
    console.log(projectData);
    res.status(200).send(projectData);
});

//to send the info back to the client to be updated on the browser
app.get('/sendUrl', async (req, res) => {
    if(projectData){
        res.send(projectData);
    }
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})






