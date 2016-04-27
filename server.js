var express = require("express");
var app = express();
var bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
    request = require('request');

var mongo = require('./mongo.js')
app.set('view engine', 'ejs');

app.use(express.static('scripts'));
app.use(express.static('views'));
mongo.connect();

var isLogin = false;
var getToken ;
/////;


/*var kitty = new Cat({ name: 'Zildjian', time:'12:00'});

//使用save方法後才會存入
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});*/


//-----

app.use(bodyParser.urlencoded({ extended: false }));


app.get("/",function(req,res){

res.render('land');
});

app.post("/signin",function(req,res){
//console.log(req.body );

request('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+req.body.idtoken, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	//console.log(JSON.parse(body).name)
  	//console.log(JSON.parse(body).email)
  	mongo.userSign(JSON.parse(body).name,JSON.parse(body).email)
    _name=JSON.parse(body).name//為了讓mongo.post知道username
     isLogin = true;
		  }
		});
});

app.post("/signOut",function(req,res){
isLogin = false;
});


app.post("/postArticle",function(req,res){
	if(isLogin){
		console.log(req.session)
		mongo.post(_name,req.body.標題,req.body.內容);
		
	}else{
		res.send("請先登入");
	};

	res.end();
});
app.post("/articleData",function(req,res){
	
	mongo.find(res);	
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

app.get("/login",function(req,res){
//console.log(getToken)

});

app.listen("3000",function(){
	console.log("listening  3000");
});



