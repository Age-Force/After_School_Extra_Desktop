const express = require("express");
const session = require("client-sessions");

const PORT = 4060;
const app = express();

//get Login

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 100,
  activeDuration: 5 * 60 * 1000,
}));


/* GET CALL */

app.get("/hello", (req, res) => {

  req.session.user = "Hello world";
  res.send("Hello world");

}); 

//login page
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/login.html');

}); 


//loging into differen pages as users or Admin
app.get("/showallrecord", (req, res) => {

  const dbo = p.db("pwaCW2");
  
  dbo.collection('userdetails').find().toArray(function(err, results) {
   
  if(results)
    {
  
    console.log(results.toArray)
  
  // to see the first element
    res.send(results)
  
    }
  
  else
   console.log(err)
  
    // send HTML file populated with quotes here
  })
  
  });



//Admin search  page
app.get("/user_success", (req, res) => {
  res.sendFile(__dirname + '/user_success.html');

}); 

//user search page
app.get("/search", (req, res) => {
  res.sendFile(__dirname + '/search.html');

}); 

//courses search 
app.get("/allcourses", (req, res) => {

  const dbo = p.db("pwaCW2");
  
  dbo.collection('courses').find().toArray(function(err, results) {
   
  if(results)
    {
  
    console.log(results.toArray)
  
  // to see the first element
    res.send(results)
  
    }
  
  else
   console.log(err)
  
    // send HTML file populated with quotes here
  })
  
  });




const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


////user and Admin register 1
app.post('/form_decision', (req, res) => {
  console.log('usertype:', req.body['usertype']);
  console.log('Got Name:', req.body['name']);

var u_name = req.body['name'];
var u_pass = req.body['password'];
var u_email = req.body['email'];
var u_usertype = req.body['usertype'];

//mongo connection for the registeration
const dbo1 = p.db("pwaCW2");

dbo1.collection('userdetails').save({Name: u_name, Email:u_email ,Password:u_pass, usertype:u_usertype}, (err, result) => {
   if (err) return console.log(err)

   console.log('saved to database')
   res.redirect('/user')

 })

//user and Admin register 2
if(u_usertype=='user')
  res.redirect('/user_success');

else if (u_usertype=='provider')
  res.redirect('/search');
});





/* GET JSON */

app.get('/json', function(req, res) {

  var at = JSON.stringify({0: req.session.user, 1:req.session.user}
    )

  res.json({"foo": "bar"});

});


/* GET HTML FILE */
app.get('/sign_up', function(req, res) {

  res.locals.user = {user: req.user};
  res.sendFile(__dirname + '/sign_up.html') //create a index file 

});


/* GET HTML FILE */
app.get('/user', function(req, res) {

res.sendFile(__dirname + '/user_success.html') //create a index file 

//res.send("User Page");


});




var db

var p

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db

//mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});

MongoClient.connect('mongodb+srv://pwaCW2:Hocnd1com@cluster0-ganv4.mongodb.net/test?retryWrites=true&w=majority', function(err, db) {
  if(!err) {
  p = db
    console.log("We are connected now");
}
  else
  {
  db = client.db('pwaCW2')
  }
});




app.post('/user_success', (req, res) => {
    console.log('Got ID:', req.body['_id']);
    console.log('Got Name:', req.body['name']);

var u_name = req.body['name'];
var u_pass = req.body['password'];
var u_email = req.body['email'];


const dbo1 = p.db("pwaCW2");

dbo1.collection('userdetails').save({Name: u_name, Email:u_email ,Password:u_pass}, (err, result) => {
   if (err) return console.log(err)

   console.log('saved to database')
   res.redirect('/user')

 })


    //res.sendStatus(200);
});

/* UPDATE RECORD */

app.post('/update', (req, res) => {

const dbo2 = p.db("pwaCW2"); //database

var u_name = req.body['name'];
var u_pass = req.body['password'];
var u_email = req.body['email'];



  var myquery = { Email: "Mickey" }; //record you want to search
  var newvalues = { $set: {Email: u_email, Password: u_pass } };


  // collection
  dbo2.collection("userdetails").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
   });

});


/* DELETE RECORD */

app.post('/delete', (req, res) => {

const dbo2 = p.db("pwaCW2");

var u_name = req.body['name'];
var u_pass = req.body['password'];
var u_email = req.body['email'];



  var myquery = { Email: "okay4now" };
  var newvalues = { $set: {Email: u_email, Password: u_pass } };

  dbo2.collection("userdetails").deleteOne(myquery, function(err, res) {
    if (err) throw err;
    console.log("1 document deleted");
   });

});




// SHOW LOG THAT SERVER STARTED
app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});


