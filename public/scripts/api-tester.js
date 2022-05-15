//setups a HTTP POST Request to send to app's CREATE endpoint and displays result
async function testCreate(){
    const config = new Object();
    config.method = "POST";
    config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
    config.body = JSON.stringify({'email': createEmail.value, 'password': createPassword.value});
    const response = await fetch("http://localhost:3000/register", config);
    const data = await response.json()
    document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
}

async function testSchedule(){
    const config = new Object();
    config.method = "POST";
    config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
    
    config.body = JSON.stringify({'name': createName.value, 'discord': discord.value, 'dateTime': dateTime.value, 'audit': audit.value}); //fix this to match index
    const response = await fetch("http://localhost:3000/schedule", config);
    const data = await response.json()
    document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
}

async function testReadAllSchedules(){
    const config = new Object();
    config.method = "GET";
    const response = await fetch("http://localhost:3000/getschedule", config);
    const data = await response.json()
    document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
}

async function testLogin(){
    const config = new Object();
    config.method = "POST";
    config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
    config.body = JSON.stringify({'email': loginId.value, 'password': loginPassword.value});
    const response = await fetch("http://localhost:3000/login", config);
    const data = await response.json()
    sessionStorage.token = data.token;
    document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
}
    
async function testAuth(){
    const config = { };
    config.method = "GET";
    config.headers = {"Authorization": 'Bearer ' + sessionStorage.getItem('token')}
    const response = await fetch("http://localhost:3000/special", config);
    const data = await response.json()
    document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
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

async function testUpdate(){
    const config = new Object();
    config.method = "PUT";
    config.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
    config.body = JSON.stringify({'email': updateEmail.value, 'password': updatePassword.value});
    const response = await fetch(`http://localhost:3000/update/${updateId.value}`, config);
    const data = await response.json()
    document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
}
    


async function testReadAll(){
    const config = new Object();
    config.method = "GET";
    const response = await fetch("http://localhost:3000/getuser", config);
    const data = await response.json()
    document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
}

async function testDelete(){
    const config = new Object();
    config.method = "DELETE";
    const response = await fetch(`http://localhost:3000/delete/${deleteId.value}`, config);
    const data = await response.json()
    document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
}

async function testRead(){
    const config = new Object();
    config.method = "GET";
    const response = await fetch(`http://localhost:3000/get/${readId.value}`, config);
    const data = await response.json()
    document.body.innerHTML += `<p>${JSON.stringify(data)}</p>`
}
    