flatpickr("input[type=datetime-local]", {
        enableTime: true,
        dateFormat: "m-d-Y H:i",
        altInput: true,
        altFormat: "F J, Y (h:i K)",
        minDate: "today",
        maxDate: new Date().fp_incr(14), // 14 days from now
        disable: [
                {
                        function(date) {
                                // return true to disable
                                return (date.getHours() > 23 || date.getHours() < 11);
                        }
                }       
        ]

    
});


// {
//         mode: "range",
//         minDate: "today",
//         dateFormat: "Y-m-d",
//         disable: [
//             function(date) {
//                 // disable every multiple of 8
//                 return !(date.getDate() % 8);
//             }
//         ]
//     }

//custom parsing and formatting
// {
//         altInput: true,
//         dateFormat: "YYYY-MM-DD",
//         altFormat: "DD-MM-YYYY",
//         allowInput: true,
//         parseDate: (datestr, format) => {
//           return moment(datestr, format, true).toDate();
//         },
//         formatDate: (date, format, locale) => {
//           // locale can also be used
//           return moment(date).format(format);
//         }
//       }