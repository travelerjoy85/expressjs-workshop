var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// app.use(bodyParser.urlencoded({extended: true}));

// Exercise 1
/* app.get('/hello', function (req, res) {
  res.send('<h1>Hello World!</h1>');
}); */


// Exercise 2
/* app.get('/hello', function (req, res) {
  if(req.query.name){
    res.send("<h1>Hello" + " " + req.query.name);
  }
  else{
    res.send("<h1>Hello World!</h1>");
  }
}); */


// Exercise 3
app.get('/calculator/:operation', function (req, res) {
  var num1 = Number(req.query.num1);
  var num2 = Number(req.query.num2);
  if(req.params.operation === "add"){
    res.send({
      "operation": "add",
      "firstOperand": num1,
      "secondOperand": num2,
      "solution": num1+num2
    });
  }
  else if(req.params.operation === "multiply"){
    res.send({
      "operation": "multiply",
      "firstOperand": num1,
      "secondOperand": num2,
      "solution": num1 * num2
    });
  }
  else{
    res.status("error");
  }
  
}); 






/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
