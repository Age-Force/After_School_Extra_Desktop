const express = require("express");
const session = require("client-sessions");
const path = require("path");
const webpush = require("web-push");
const bodyParser = require('body-parser');

const PORT = 5000;
const app = express();


//get Login
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 200,
  activeDuration: 5 * 60 * 1000,

}));

app.use(express.static(path.join(__dirname, 'templates')));


const publicVapidKey = 'BMf_9maerv-SRY2ES8nL8PkDROZt1chj_HSQ2orVRDcr8SMqNW350WAyXU5EWS6fl5mLUc1dPmKG7ftrrihgDt8';


const privateVapidKey = 'jkhEdQwFsWmX7JYNZxdlPoSicvwVrsLOURn1Xb7i7BI';

webpush.setVapidDetails('mailto:user@gmail.com', publicVapidKey, privateVapidKey);


app.post('/subcribe', (req, res) => {
    const subcription = req.body;

    res.statust(201).json({});

    const payload =JSON.stringify({title: 'Push Test'});

    webpush
    .sendNotification(subcription, payload)
    .catch(err => console.error(err));
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('templates'))


//login page
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/templates/index.html');

}); 


//Courses loading from the data Mongo
app.get("/showallrecord", (req, res) => {

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
  })
  });

  //calling all pages
  app.get('/userpage', function(req, res) {
    res.sendFile(__dirname + '/templates/userPage.html') //create a index file
    //res.send("User Page");
    });
  
  /* GET HTML FILE */
  app.get('/register', function(req, res) {
    res.sendFile(__dirname + '/templates/register.html') //create a index file
  });
  
  
  /* GET HTML FILE */
  app.get('/userPage', function(req, res) {
  res.sendFile(__dirname + '/templates/userPage.html') //create a index file
  //res.send("User Page");
  });
  
  /* GET HTML FILE */
  app.get("/adminPage", function(req, res) {
    res.sendFile(__dirname + '/templates/adminPage.html') //create a index file
    //res.send("User Page");
    });

//Admin search  page
app.get("/userPage", (req, res) => {
  res.sendFile(__dirname + '/templates/userPage.html');

}); 

//user adminPage page
app.get("/adminPage", (req, res) => {
  res.sendFile(__dirname + '/templates/adminPage.html');

}); 



//courses adminPage /
app.get("/allcourses", (req, res) => {

  const dbo = p.db("pwaCW2");
  
  dbo.collection('courses').find().toArray(function(err, results) {
   
  if(results)
    {
  
    console.log(results.toArray)
  
  // to see the first element
    res.json(results)
  
    }
  
  else
   console.log(err)
  
    // send HTML file populated with quotes here
  })
  
  });


//show all comments 
app.get("/allcomments", (req, res) => {

  const dbo = p.db("pwaCW2");
  
  dbo.collection('comments').find().toArray(function(err, results) {
   
  if(results)
    {
  
    console.log(results.toArray)
  
  // to see the first element
    res.json(results)
  
    }
  
  else
   console.log(err)
  
    // send HTML file populated with quotes here
  })
  
  });


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

dbo1.collection('userdetails').save({name: u_name, email:u_email ,password:u_pass, usertype:u_usertype}, (err, result) => {
   if (err) return console.log(err)

   console.log('saved to database')
   res.redirect('/userPage')

 })

//user and Admin register 2
if(u_usertype==='user')
  res.redirect('/userPage');

else if (u_usertype==='provider')
  res.redirect('/adminPage');
});





/* GET JSON */

app.get('/json', function(req, res) {

  var at = JSON.stringify({0: req.session.user, 1:req.session.user}
    )

  res.json({"foo": "bar"});

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
    console.log("Server is connected");
}
  else
  {
  db = client.db('pwaCW2')
  }
});





app.post('/logindecision', (req, res) => {
  console.log('Got Name:', req.body['name']);
  console.log('Got ID:', req.body['email']);

var u_name = req.body['name'];
var u_pass = req.body['password'];
var u_email = req.body['email'];


console.log(u_name);

const dbo = p.db("pwaCW2");

var query = { email: u_email };

  dbo.collection('userdetails').find(query).toArray(function(err, results) {
   



  if(results.length !== 0) //User exists
    {
    
  // to see the first element
    // res.send('user found' +JSON.stringify(results))

    req.session.user = results[0].name;   // Saving User details in Sessions to show name across all pages


    console.log('user found ' + results[0].name);
      //redirect

          //redirect - admin and normal user
        if (results[0].usertype === "provider")
            res.redirect('/adminPage')
        else if (results[0].usertype === "user")
            res.redirect('/userPage')


    }
    else if (results.length === 0)
    { 

      console.log('This user does not exist'); 
  }
  else
   console.log(err)
  })
});

app.post('/userPage', (req, res) => {
    console.log('Got ID:', req.body['_id']);
    console.log('Got Name:', req.body['name']);

var u_name = req.body['name'];
var u_pass = req.body['password'];
var u_email = req.body['email'];


const dbo1 = p.db("pwaCW2");

dbo1.collection('userdetails').save({Name: u_name, Email:u_email ,Password:u_pass}, (err, result) => {
   if (err) return console.log(err)

   console.log('saved to database')
   res.redirect('/userPage')

 })


});

 //Postscomments
app.post('/postcomments', (req, res) => {

  var u_topic = req.body['topic'];
  var u_comment = req.body['comment'];
  var u_rating = req.body['rating'];


const dbo1 = p.db("pwaCW2");

  dbo1.collection('comments').save({topic: u_topic, comment:u_comment ,rating:u_rating}, (err, result) => {
    if(err) return console.log(err)
    console.log('Courses commented')

    res.redirect('templates/userPage');
  })
 });



/* UPDATE course */

app.post('/update', (req, res) => {

const dbo2 = p.db("pwaCW2"); //database

var u_topic = req.body['topic'];
var u_location = req.body['location'];
var u_price = req.body['price'];

  var myquery = { courses: u_topic }; //record you want to search
  var newvalues = { $set: {topic:u_topic, location:u_location,  pirce:u_price } };


  // collection
  dbo2.collection("courses").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
   });

});


// DELETE RECORD 

app.post('/delete', (req, res) => {

const dbo2 = p.db("pwaCW2");

var u_topic = req.body['topic'];

  var myquery = { courses: u_topic };
    dbo2.collection("courses").deleteOne(myquery, function(err, res) {
    if (err) throw err;
    console.log("1 course deleted");
   });

});

// Add course 
  
  app.post('/add', (req, res) => {
    console.log('topic:', req.body['topic']);
    console.log('Amount:', req.body['price']);
  
  var u_topic = req.body['topic'];
  var u_location = req.body['location'];
  var u_price = req.body['price'];
  
  //mongo connection for the registeration
  const dbo1 = p.db("pwaCW2");
  
  dbo1.collection('courses').save({topic: u_topic, location:u_location ,price:u_price}, (err, result) => {
     if (err) return console.log(err)
  
     console.log('1 course saved to database')
  });
  
  })


// SHOW LOG THAT SERVER STARTED
app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});


