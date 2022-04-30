

// This is the function used to send the data to the server. That way, it can be placed into the JSON file and be retrieved for the schedule viewer.
function sendData() {

    let newEmp = {
        "employee": {
            "id": 0,
            "first_name": document.getElementById("fname").value,
            "last_name": document.getElementById("lname").value,
            "role": document.getElementById("fptime").value,
            "availability": {
                "monday_availability": document.getElementById("monAvail").value,
                "tuesday_availability": document.getElementById("tueAvail").value,
                "wednesday_availability": document.getElementById("wedAvail").value,
                "thursday_availability": document.getElementById("thuAvail").value,
                "friday_availability": document.getElementById("friAvail").value,
                "saturday_availability": document.getElementById("satAvail").value,
                "sunday_availability": document.getElementById("sunAvail").value,
            }
        }
    };


    // below is used to POST the data to the server.
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmp)
    };

    console.log('Success');
     
    fetch('/newEmp', options);
    setTimeout(() => location.href = "./index.html", 1000)
}


// this is used for the modify page. The id is looped through and matched with the correct user.
// values on the modify page are populated, allowing the user to modify the data.
async function lookup() {
    let emps = await getAvailability();

    var id = document.getElementById('lookup').value;

    for (i = 0; emps.length > i; i += 1) {
        if (emps[i].employee.id == id) {

            document.getElementById('fname').value = emps[i].employee.first_name;
            document.getElementById('lname').value = emps[i].employee.last_name;
            document.getElementById('sunAvail').value = emps[i].employee.availability.sunday_availability;
            document.getElementById('monAvail').value = emps[i].employee.availability.monday_availability;
            document.getElementById('tueAvail').value = emps[i].employee.availability.tuesday_availability;
            document.getElementById('wedAvail').value = emps[i].employee.availability.wednesday_availability;
            document.getElementById('thuAvail').value = emps[i].employee.availability.thursday_availability;
            document.getElementById('friAvail').value = emps[i].employee.availability.friday_availability;
            document.getElementById('satAvail').value = emps[i].employee.availability.saturday_availability;


            // on click, the function executes, placing the modified employee into the json file.
            document.getElementById('submit').onclick = function () {
                console.log(id);
                let tempEmp = {
                    "employee": {
                        "id": id,
                        "first_name": document.getElementById("fname").value,
                        "last_name": document.getElementById("lname").value,
                        "role": document.getElementById("fptime").value,
                        "availability": {
                            "monday_availability": document.getElementById("monAvail").value,
                            "tuesday_availability": document.getElementById("tueAvail").value,
                            "wednesday_availability": document.getElementById("wedAvail").value,
                            "thursday_availability": document.getElementById("thuAvail").value,
                            "friday_availability": document.getElementById("friAvail").value,
                            "saturday_availability": document.getElementById("satAvail").value,
                            "sunday_availability": document.getElementById("sunAvail").value,
                        }
                    }
                };


                // below is used to POST to the server.
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tempEmp)
                };

                console.log('Success');

                fetch('/newEmp', options);
                setTimeout(() => location.href = "./index.html", 1000)
            }

            delete emps[i];
        }
    }
}

// this file is used to load the json file to the browser, and returns an array filled with the json objects.
async function getAvailability(){
    let url = 'employees.json';
    try{
        let res = await fetch(url);
        return await res.json();
    }
    catch(error){
        console.log(error);
    }
}


// this is a helper function that neatly executes the scheduling functions on one click.
async function createSchedule() {
    schedMon();
    schedTues();
    schedWeds();
    schedThur();
    schedFri();
    schedSat();
    schedSun();
}

//
//
//
// The following functions are used to call the scheduling functions for each respective day.
// The morning, afternoon, and evening are scheduled.
//
//
async function schedMon(){
    schedMM();
    schedMA();
    schedME();
}
async function schedTues(){
    schedTM();
    schedTA();
    schedTE();
}
async function schedWeds(){
    schedWM();
    schedWA();
    schedWE();
}
async function schedThur(){
    schedThM();
    schedThA();
    schedThE();
}
async function schedFri(){
    schedFM();
    schedFA();
    schedFE();
}
async function schedSat(){
    schedSM();
    schedSA();
    schedSE();
}
async function schedSun(){
    schedSuM();
    schedSuA();
    schedSuE();
}


//
//
//
//  The following functions are the sorting algorithm for the respective times.
//  Each function loops through the array, and picks the user with the highest priority to be scheduled on that date.
//  The highest priority begins with 100, and increments from there.
//  Each function below is the same as the first one, only difference in variables.
//
//
//
async function schedMM(){
    let employees = await getAvailability();        // creates json array of the file

    for(var i =0; i< employees.length;i++){         // loops through the array, scheduling one employee at a time.
        if(employees[i].employee.availability.monday_availability == 'Morning'){
            var displayID = document.getElementById('mm');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}

async function schedMA(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.monday_availability == "Afternoon"){
            var displayID = document.getElementById('ma');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedME(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.monday_availability == "Evening"){
            var displayID = document.getElementById('me');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedTM(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.tuesday_availability == "Morning"){
            var displayID = document.getElementById('tm');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedTA(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.tuesday_availability == "Afternoon"){
            var displayID = document.getElementById('ta');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedTE(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.tuesday_availability == "Evening"){
            var displayID = document.getElementById('te');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedWM(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.wednesday_availability == "Morning"){
            var displayID = document.getElementById('wm');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedWA(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.wednesday_availability == "Afternoon"){
            var displayID = document.getElementById('wa');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedWE(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.wednesday_availability == "Evening"){
            var displayID = document.getElementById('we');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedThM(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.thursday_availability == "Morning"){
            var displayID = document.getElementById('thm');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedThA(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.thursday_availability == "Afternoon"){
            var displayID = document.getElementById('tha');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedThE(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.thursday_availability == "Evening"){
            var displayID = document.getElementById('the');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedFM(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.friday_availability == "Morning"){
            var displayID = document.getElementById('fm');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedFA(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.friday_availability == "Afternoon"){
            var displayID = document.getElementById('fa');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedFE(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.friday_availability == "Evening"){
            var displayID = document.getElementById('fe');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedSM(){
    let employees = await getAvailability();
  
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.saturday_availability == "Morning"){
            var displayID = document.getElementById('sm');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedSA(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.saturday_availability == "Afternoon"){
            var displayID = document.getElementById('sa');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedSE(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.saturday_availability == "Evening"){
            var displayID = document.getElementById('se');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedSuM(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.sunday_availability == "Morning"){
            var displayID = document.getElementById('sdm');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedSuA(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.sunday_availability == "Afternoon"){
            var displayID = document.getElementById('sda');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}
async function schedSuE(){
    let employees = await getAvailability();
    
    for(var i =0; i< employees.length;i++){
        if(employees[i].employee.availability.sunday_availability == "Evening"){
            var displayID = document.getElementById('sde');
            displayID.innerHTML = employees[i].employee.first_name + " " + employees[i].employee.last_name + " " + employees[i].employee.id;
            return;
        }
    }
}

// end of file