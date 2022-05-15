const express = require ('express'); //import express module
const router = express.Router(); //create a router object
const Schedule = require('../models/schedule');

router.post("/schedule", schedulePOST); //POST endpoint for createSchedule


router.get("/getschedule", getscheduleGET); //GET endpoint for READ ALL
async function getscheduleGET(request, response) { //callback fxn for READ ALL
    const documents = await Schedule.find(); //find() gets all Users in DB
    const json = {status:200, msg:'Schedules data fetched', data: documents}; //results as json
    response.json(json); //send json with response
}




async function schedulePOST(request, response){ //callback fxn for endpoint
    const {name, discord, dateTime, audit} = request.body; //user fields from req body
    const newSchedule = new Schedule({ name: name, discord: discord, dateTime: dateTime, audit:audit }); //create new user instance
    const document = await newSchedule.save() //schema's save() into db
    const json = {state: true, msg: "data inserted", document: document } //results as json
    response.json(json); //send json with response
}

module.exports = router; //export router module