var express = require("express");
var app = express();
var bodyParser = require('body-parser'),
    request = require('request');

var session = require('express-session');
var flash = require('connect-flash');

app.set('view engine', 'ejs');


var mongoose = require("mongoose");
mongoose.connect('mongodb://forclass1:test123@ds013898.mlab.com:13898/forclass',function(err){
	if(err){throw err};
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect mongo")
});

var isLogin = false;

/////
var account = mongoose.model('account', {
  account: String,
  password: String
});

/*var kitty = new Cat({ name: 'Zildjian', time:'12:00'});

//使用save方法後才會存入
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});*/


//-----

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.get("/",function(req,res){

res.render('land');
});

app.post("/signin",function(req,res){
console.log(req.body);

request('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+req.body.idtoken, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
     isLogin = true;
		  }
		});

});
app.post("/signOut",function(req,res){
isLogin = false;
});


app.post("/postArticle",function(req,res){
	if(isLogin){
		console.log("謝謝~");//存入文章
	}else{
		res.send("請先登入");
	};

	res.end();
});

/*
app.post("/roll",function(req,res){

	var kitty = new Cat({ name:req.body.username, time:req.body.email});

	kitty.save(function (err) {
	  if (err) // ...
	  console.log('save err');
	});
	res.redirect('/read')
	res.end();
});


app.post("/updatelist",function(req,res){
	
	Cat.update({_id:req.body.id[0]},{time:req.body.event[0],name:req.body.event[1]},function(err){
		if(err){
		console.log(err);
	     }
	});
		res.redirect('/read');
		res.end();
});




app.post("/deletelist",function(req,res){
	

	Cat.remove({_id:req.body.id},function(err){
		if(err){throw err};
	});

		res.redirect('/read');
		res.end();
});



app.get("/read",function(req,res){

	var find = Cat.find({},{name:1,time:1,_id:1},function(err,doc){
	res.render("home",{text:doc});
	});

});
*/
app.get("/signup",function(req,res){

	res.render("signup");

});
app.get("/login",function(req,res){

	res.render("login");

});

app.post("/signup",function(req,res){
	console.log(req.body.account);
	var a = new account({ account:req.body.account,password:req.body.password});

	a.save(function (err) {
	  if (err) // ...
	  console.log('save err');
	});
	res.redirect('/')
	res.end();

});
app.post("/login",function(req,res){
	console.log(req.body.account);
	console.log(req.body.password);
/*
	var find = account.find({account:req.body.account},{password:1,_id:0},function(err,doc){
		try{
			if(doc[0].password==req.body.password){
				console.log("true");
				app.use(function(req, res, next){
				req.flash("info", "登入成功");
				next();
				});
			}else{
				console.log("false");
			};
		}catch(e){
			console.log(e);
		};
		
	});
	//res.redirect('/');
*/	res.send(req.body);
	res.end();
	
});


app.listen("3000",function(){
	console.log("listening  3000");
});



