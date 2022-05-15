import Calendar from "./schedules.js";

const renderDOM = (html) => document.getElementById('view').innerHTML = html; //Set HTML in view

export const StartMenu = (props) => {
    const {schedules} = props;
    renderDOM(
        `${Calendar(schedules)}`
    )
}