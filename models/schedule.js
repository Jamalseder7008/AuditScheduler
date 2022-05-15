const mongoose = require('mongoose'); //import mongoose module
const Schema = mongoose.Schema //import the Schema class

const scheduleSchema = new Schema({ //make a new instance of Schema
    name: String, //define collection's fields & types
    discord: String,
    dateTime: String,
    audit: String
});

const Schedule = module.exports = mongoose.model('Schedule', scheduleSchema); //export the schema as a module