const express = require('express');
const path = require('path');
let app = express();
const bodyParser = require('body-parser');
let fs = require('fs');


// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, '../public/index.html'));

// });

// //get request manually setting up a route
// app.get('/css/styles.css', (req, res) =>{
//     res.sendFile(path.join(__dirname, '../public/css/styles.css'));

// });

//loggin middleware

// app.use((req, res, next) => {
//     console.log(req.originalUrl);
//     next();

// });

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/contact-form', (req, res) => {

    fs.readFile('formsubmission.json', (err, data) => {
        if (err) {
            console.log("Error reading file:", err)
            res.status(500).send(err);
        }

        const submissions = JSON.parse(data);
        //let stuff = [];
        // stuff.push(req.body.name, req.body.email);
        const userDTO=req.body;
        submissions.push(userDTO);
        // console.log(stuff);
        const jsonContent = JSON.stringify(submissions);
        // console.log(jsonContent);
    
    
        fs.writeFile("formsubmission.json", jsonContent, err => {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                console.log(err);
                res.status(500).send(err);
            }
    
            console.log("JSON file has been saved.");
            res.send("Thank you for submitting!");
    
        });

    });

});



//static middleware
app.use(express.static(path.join(__dirname, '../public')));



app.listen(3000);