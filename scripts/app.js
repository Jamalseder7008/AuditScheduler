import * as http from './http.js';
import * as view from './view.js';


const BIN_ID = '625af87bc5284e31154e2f70';
const GET_SCHEDULE = `https://api.jsonbin.io/b/${BIN_ID}`;

const state = {
    schedules: []
};


window.start = async () => {d
    state.schedules = await http.sendGETRequest(GET_SCHEDULE);
    console.log(state.schedules);
    view.StartMenu(state);
}

window.addEventListener('load', start);