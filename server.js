const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
var http = require('http');

var empInfo = []

app.use(express.static(__dirname));

fs.readFile('employees.json', 'utf8', function readFileCallback(err, data) { //loads the json file. Creates a json array that is used to manipulate the data.
    if (err) {
        req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
        throw err;
    }
    else {
        let emps = JSON.parse(data);

        emps.forEach(function (element) {   //loops through each element and places it in json array
            empInfo.push({
                employee: {
                    id: element.employee.id,
                    first_name: element.employee.first_name,
                    last_name: element.employee.last_name,
                    role: element.employee.role,
                    availability:{
                        monday_availability: element.employee.availability.monday_availability,
                        tuesday_availability: element.employee.availability.tuesday_availability,
                        wednesday_availability: element.employee.availability.wednesday_availability,
                        thursday_availability: element.employee.availability.thursday_availability,
                        friday_availability: element.employee.availability.friday_availability,
                        saturday_availability: element.employee.availability.saturday_availability,
                        sunday_availability: element.employee.availability.sunday_availability
                    }
                }
            });
        });
    }
});


app.get('/', function (req, res) {          // loads the html file
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use(express.json());

app.post('/newEmp', (req, res) => {                             // used to post the new/modified employees to the json file.
    var id = empInfo[empInfo.length - 1].employee.id + 1        // increments the id for employee's

    if (req.body.employee.id == 0) {                            // this is for new employees. initial id is set to 0, and then it is changed here. This eliminates redundancy betweeen the create/modify pages
        req.body.employee.id = id;
    }

    empInfo.push(req.body);                                     // appends the new employee to the end of the array

    fs.writeFileSync("./employees.json", JSON.stringify(empInfo, null, 2), (err) => {       //writes the array to the json, replacing the data.
        if (err) {
            console.error(err);
            return;
        }
        else {
            console.log("Created a JSON file");
        }
    });
});

app.listen(port, () => {                // used to confirm the file is loading.
    console.log(`Example app listening on port ${port}`)
});

