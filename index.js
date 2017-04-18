var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var mysql = require('promise-mysql');

var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root', 
    password : '',
    database: 'reddit',
    connectionLimit: 10
});

var RedditAPI = require('./reddit');

var myReddit = new RedditAPI(connection);


// app.use(bodyParser.urlencoded({extended: true}));

// Exercise 1
app.get('/hello', function (req, res) {
  res.send('<h1>Hello World!</h1>');
}); 


// Exercise 2
app.get('/hello', function (req, res) {
  if(req.query.name){
    res.send("<h1>Hello" + " " + req.query.name);
  }
  else{
    res.send("<h1>Hello World!</h1>");
  }
}); 


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


// Exercise 4
app.get('/posts', function(req, res){
  myReddit.getAllPosts()
  .then(function(posts) {
     //res.send(posts);
     //console.log(posts);
    
    var output = "";
    
    posts.forEach((post) => {
      output = output + `<li class="post-item">
                            <h2 class="post-item__title">
                              <a href="${post.url}">${post.title}</a>
                            </h2>
                            <p>Created by ${post.user.username}</p>
                          </li>`;
    });
    //console.log(posts[0].post_url);
    
    // for (var i = 0; i < posts.length; i++) {
    //   var post = posts[i];
    //   output = output + "<li>" + post.title + "</li>";
    // }
    
    //output = output + "</ul>";
    
    res.send(`<div id="posts">
                <h1>List of posts</h1>
                <ul class="posts-list"> ${output}  </ul>
              </div>
    `);
  })
}); 






/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
