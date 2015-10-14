var path = require('path');
var express = require('express')

, session = require('express-session')
, bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
var app = express();

//open folder public for front-end 
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//starts session all
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
//ends session all
// require path so that we can use path stuff like path.join


var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// This goes in our server.js file so that we actually use the mongoose config file!
require('./config/mongoose.js');
// this line requires and runs the code from our routes.js file and passes it app so that we can attach our routing rules to our express application!
require('./config/routes.js')(app);


var mongoose = require('mongoose');
var UserModel = mongoose.model('User');


//as router first use passport local strategy first
app.get('/logout', function(req, res){
  req.logout();
  //res.redirect('/');
});//ends logout 

app.post("/register", function(req, res){
	UserModel.findOne({ username:req.body.username }, function(err,user){
		if(user) {
			res.status(401).json({error:'username exists'});
			console.log('route-reg2',user);
		}//ends if
		else {
			var newUser = UserModel(req.body);
			newUser.save(function(err, user){
				res.json(user);
				req.login(user, function(err) {
				  if (err) { return next(err); }
				  //return res.redirect('/users/' + req.user.username);
				  return true; //true = is user logged in - check ngroutes
				}); //passport will login user
			});//ends newUser.save method
		}//ends else
	} );//ends UserModel.findOne 
// console.log('route-reg1', req.body);
});//ends register

app.get('/showimg', function(req, res) {
  UserModel.find({ url:{$exists:true} }, function(err, links) {
    res.json(links);
    // console.log('find',links);
  });
});
// add a link to the list
app.post('/uploadimg', function(req, res) {
	console.log(req.body, "req.body");
	console.log(req.body.id,"user _id");

  	UserModel.update({_id:req.body.id },{$addToSet:{url:req.body.url}},function(err){
  		//console.log('updating');
  		if(err){
  			res.send('error is here');
  		}else{
  			console.log('save');
  			//res.redirect('/#/your_profile');
  		}
  	});
  })


// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));

app.listen(8000, function() {
  console.log('cool stuff on: 8000');
});

