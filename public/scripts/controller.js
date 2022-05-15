//initializes all controllers

const initControllers = function(){
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', submitEvent);
}

const submitEvent = function(){
    const formData = new Object();
    formData[entry1] = document.getElementById('Name').value
    formData[entry2] = document.getElementById('Discord').value
    formData[entry3] = document.getElementById('Date1').value
    // formData[entry4] = document.getElementById('Date2').value
    // formData[entry5] = document.getElementById('Date3').value
    formData[entry4] = document.getElementById('Audit').value

    postToGoogleDB(formData);
}

initControllers();