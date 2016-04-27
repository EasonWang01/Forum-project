module.exports = {
	connect:function(){
			    mongoose = require("mongoose");
				mongoose.connect('mongodb://forclass1:test123@ds013898.mlab.com:13898/forclass',function(err){
					if(err){throw err};
				});
				var db = mongoose.connection;
				db.on('error', console.error.bind(console, 'connection error:'));
				db.once('open', function() {
				  console.log("connect mongo")
				});
				//schema
				user = mongoose.model('User', {
			    name: String,
			    email:String
				});
				article= mongoose.model('Article', {
				author:String,
			    title: String,
			    content:String
				});
				//
		    },
 	userSign:function(id,email){
 				//使用者登入後，檢查是否已存在資料庫，如沒有才存入
 				var user1 = new user({ name: id, email:email});
	 			user.find({email:email},function(err,doc){
				if(doc.length==0){
				  console.log("目前沒有這個資料");
				  user1.save(function (err) {
				  if (err) console.log(err)
				  console.log('success Save User');
				});
				}else{
					console.log("user已存在");
				}
				});


 			},
    post:function(author,title,content){
    			var article1 = new article({author:author,title: title,content:content});
    			article1.save(function (err) {
				  if (err) console.log(err)
				  console.log('success Save Article');
				});
            },
    find:function(res){
    	 		article.find({},function(err,doc){
			
				  if (err) console.log(err)
				  res.json(doc)
				  res.end()
				});

        }
} 