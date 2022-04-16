const Calendar = (schedules) => (
    `<h2>Schedules: </h2>
    <section>
        <ul>
            ${ListItems(schedules)}
        </ul>
    </section>`
);

const unavailableTimes = [];

const ListItems = (schedules) => {
    let li = ``;
    const ordered = schedules.sort( (a, b) => b.Time - a.Time);
    for (let row of ordered){
        console.log(row.Time);
        var dateTime = row.Time.split(" ");
            var date1 = dateTime[0];
            var time1 = dateTime[1];

        var splitDate = date1.split("-");
            var month = splitDate[0];
            var day = splitDate[1];
            
                document.getElementById(day).innerHTML+=(`<div class="event-desc">
                                                            ${row.Audit}
                                                        </div>
                                                        <div class="event-time">
                                                            ${time1}
                                                        </div>
                    `);
            
            var year = splitDate[2];
        
    }
    for (let row of ordered){
        li +=  `<li>${row.Name}: ${row.Time}: ${row.Audit}</li>`
    }
       
    
    return li;
}

export default Calendar;