const express = require('express');
const bodyParser = require("body-parser");

let app = express();
app.use(bodyParser.json());

let cars = [
    {
        id: 1,
        "model": 'bmw',
        "license number": 1234,
    },
    {
        id: 2,
        "model": 'chev',
        "license number": 5678,
    }
];

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
})

// Read All Cars -------------------------------
app.get('/cars/readall', function(req, res) {
    res.send({data:cars, msg:'Success'});
})

// Read one Car --------------------------------
app.get('/cars/:id', function(req, res) {
    let cid = req.params.id;
    const car = cars.find(car => car.id==cid );
    const body ={
        data:car
    }

    car? body.msg = "Success" : body.msg = "Failed";
    res.send(body);
})


// Add Car ----------------------------------
let lastIndex = cars.length;
app.post('/cars/addcar', function(req, res) {
    car = req.body;
    car.id=String(++lastIndex);
    cars.push(car);

    const body = {
        msg:"Success"
    }
    res.send(body)
})


// Delete Car ---------------------------------
app.get('/cars/delete/:id', function(req, res) {
    cid = req.params.id;
    const carIndex = cars.findIndex(car => car.id==cid );
    const body = {};
    if(carIndex >= 0){
        cars.splice(carIndex,1);
        body.msg="Success";
    }else{
        body.msg="Not Found";
    }
    
    res.send(body)
})


app.listen(5000, function() {
    console.log("Server Started");
})