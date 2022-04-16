flatpickr("input[type=datetime-local]", {
        enableTime: true,
        dateFormat: "m-d-Y H:i",
        altInput: true,
        altFormat: "F J, Y (h:i K)"

    
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