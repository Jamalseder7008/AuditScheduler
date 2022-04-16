import * as http from './http.js';
import * as view from './view.js';


const BIN_ID = '625af87bc5284e31154e2f70';
const GET_SCHEDULE = `https://api.jsonbin.io/b/${BIN_ID}/latest`;
const PUT_SCHEDULE = `https://api.jsonbin.io/b/${BIN_ID}`;

const state = {
    schedules: []
};


window.start = async () => {
    state.schedules = await http.sendGETRequest(GET_SCHEDULE);
    console.log(state.schedules);
    view.StartMenu(state);
}

const makeNewSchedule = async (currentSchedule) => {
    let newSchedule = await http.sendGETRequest(GET_SCHEDULE);
    newSchedule.push( currentSchedule);
    return newSchedule;
}

window.updateSchedule = async () => {
    const Name = document.getElementById('Name').value;
    const Time = document.getElementById('Date1').value;
    const Audit = document.getElementById('Audit').value;
    const currentSchedule = {Name: Name, Time: Time, Audit: Audit};
    const scheduled = await makeNewSchedule(currentSchedule);
    await http.sendPUTRequest(PUT_SCHEDULE, scheduled)
}

window.addEventListener('load', start);