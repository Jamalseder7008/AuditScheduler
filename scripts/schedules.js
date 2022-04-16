const Calendar = (schedules) => (
    `<h2>Schedules: </h2>
    <section>
        <ul>
            ${ListItems(schedules)}
        </ul>
    </section>`
);

const ListItems = (schedules) => {
    let li = ``;
    const ordered = schedules.sort( (a, b) => b.Time - a.Time);
    for (let row of ordered){
        li +=  `<li>${row.Name}: ${row.Time}: ${row.Audit}</li>`
    }
    return li;
}

export default Calendar;