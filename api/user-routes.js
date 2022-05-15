const express = require ('express'); //import express module
const router = express.Router(); //create a router object
const Schedule = require('../models/schedule');
const User = require('../models/user'); //import User model
const jwt = require('jsonwebtoken'); //import jsonwebtoken module

router.post("/register", registerPOST); //POST endpoint for CREATE
router.post("/schedule", schedulePOST); //POST endpoint for createSchedule
router.get("/getuser", getuserGET); //GET endpoint for READ ALL
router.get("/getschedule", getscheduleGET); //GET endpoint for scheduler read ALL

async function getuserGET(request, response) { //callback fxn for READ ALL
    const documents = await User.find(); //find() gets all Users in DB
    const json = {status:200, msg:'Users data fetched', data: documents}; //results as json
    response.json(json); //send json with response
}

router.get("/getschedule", getscheduleGET); //GET endpoint for READ ALL
async function getscheduleGET(request, response) { //callback fxn for READ ALL
    const documents = await Schedule.find(); //find() gets all Users in DB
    const json = {status:200, msg:'Schedules data fetched', data: documents}; //results as json
    response.json(json); //send json with response
}

router.get("/get/:id", userGET); //GET endpoint for READ ONE

async function userGET(request, response){ //callback fxn for READ ONE
    const documents = await Schedule.findById(request.params.id) //findById() gets a User in DB
    if (documents) { //user exist then send as json
        response.status(200).json(documents);
    }
    else { //otherwise send 404 status
        response.status(404).json({ msg: 'data not found' });
    }
}

async function scheduleGET(request, response){ //callback fxn for READ ONE
    const documents = await Schedule.findById(request.params.id) //findById() gets a User in DB
    if (documents) { //user exist then send as json
        response.status(200).json(documents);
    }
    else { //otherwise send 404 status
        response.status(404).json({ msg: 'data not found' });
    }
}
router.get("/get/:id", scheduleGET); //GET endpoint for READ ONE

router.put('/update/:id', updateschedulePUT); //PUT endpoint for UPDATE

async function updateschedulePUT (request,response) { //callback fxn for UPDATE
    const schedule = { _id: request.params.id }; //id to find a user
    const data = { name: request.body.name, discord: request.body.discord, dateTime: request.body.dateTime, audit: request.body.audit } //data to update in user
    const document = await Schedule.updateOne(schedule,data); //updateOne() syncs to DB
    if(!document){ //no user, 404 status
        return response.status(404).json({ msg: 'data not found' });
    }
    return response.status(200).json(document); //otherwise send as json
}

function verifyToken( request, response, next ) { //Middleware function
    if ( !request.headers.authorization ){ //No authorization in header
        return response.status(401).json( {msg:'Unauthorized request'} ) //Send back with 401 status
    }
    const token = request.headers.authorization.split(' ')[1]; //split token from header
    if ( token === 'null' ){ //No token
        return response.status(401).json( {msg:'Unauthorized request'} ) //Send back with 401 status
    }
    const payload = jwt.verify(token,'secretKey') //Use JWT to verify Token
    if ( !payload ) { //Not valid
        return response.status(401).json( {msg:'Unauthorized request'} ) //Send back with 401 status
    }
    request.userId = payload.subject //Embed user id into request
    next() //Invoke next fxn in chain
}

router.get('/special', verifyToken, specialGET) //GET endpoint for SPECIAL

async function specialGET(request,response){ //callback fxn for SPECIAL
    const data = {user: request.userId} //embed userID from payload into json
    response.json(data) //send json with response
}

router.post('/login', loginPOST); //POST endpoint for LOGIN

async function loginPOST(request,response) { //callback fxn for LOGIN
    const userData = request.body; //get data from request body
    const user = await User.findOne( {email:userData.email} ).exec(); //findOne execs to DB, gets user
    if(!user){ //wrong email, send err message
        response.status(401).json( {msg:'Invalid email'} )
    }
    else if (user.password !== userData.password){ //wrong pword, send err message
        response.status(401).json( {msg:'Invalid password'} )
    }
    else{
        const payload = {subject:user._id} //define JWT payload as user id
        const token = jwt.sign(payload,'secretKey') //hash token = payload + secret
        response.status(200).send( {token} ) //send token back to client
    }
}


router.delete('/delete/:id', deleteuserDELETE) //DELETE endpoint for DELETE

async function deleteuserDELETE(request, response) { //callback for DELETE
    const document = await User.deleteOne({ _id: request.params.id }); //deleteOne() syncs to DB
    const json = { status: 200, msg: 'User data deleted', document: document } //results as json
    response.json(json); //send json with response
}

router.delete('/deleteSchedule/:id', deletescheduleDELETE) //DELETE endpoint for DELETE

async function deletescheduleDELETE(request, response) { //callback for DELETE
    const document = await Schedule.deleteOne({ _id: request.params.id }); //deleteOne() syncs to DB
    const json = { status: 200, msg: 'User data deleted', document: document } //results as json
    response.json(json); //send json with response
}


router.put('/update/:id', updateuserPUT); //PUT endpoint for UPDATE

async function updateuserPUT (request,response) { //callback fxn for UPDATE
    const user = { _id: request.params.id }; //id to find a user
    const data = { email: request.body.email, password: request.body.password } //data to update in user
    const document = await User.updateOne(user,data); //updateOne() syncs to DB
    if(!document){ //no user, 404 status
        return response.status(404).json({ msg: 'data not found' });
    }
    return response.status(200).json(document); //otherwise send as json
}


async function registerPOST(request, response){ //callback fxn for endpoint
    const {email, password} = request.body; //user fields from req body
    const newUser = new User({ email: email, password: password }); //create new user instance
    const document = await newUser.save() //schema's save() into db
    const json = {state: true, msg: "data inserted", document: document } //results as json
    response.json(json); //send json with response
}


async function schedulePOST(request, response){ //callback fxn for endpoint
    const {name, discord, dateTime, audit} = request.body; //user fields from req body
    const newSchedule = new Schedule({ name: name, discord: discord, dateTime: dateTime, audit: audit }); //create new user instance
    const document = await newSchedule.save() //schema's save() into db
    const json = {state: true, msg: "data inserted", document: document } //results as json
    response.json(json); //send json with response
}

module.exports = router; //export router module