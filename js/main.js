var express = require("express");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});

var app = express();
var userCRUD = require("./user_crud");
var product = require("./showshopinfo_crud");
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
//静态资源发布
//app.use(express.static("../img"));


app.post("/login", urlencodedParser, function(request, response) {

	var username = request.body.username;
	var password = request.body.password;
	userCRUD.findByLogin(username,password,function(result){
		if(result != null){
			response.send(true);
		}else{
			response.send(false);
		}
		response.end();
		
	})
	
});
app.post("/register", urlencodedParser, function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	userCRUD.findByRegister(username,function(result){
		if(result != null){
			response.send(false);
			response.end();
		}else{
			userCRUD.insertUser(username,password,function(flag){
				response.send(flag);
				response.end();
			});
		}
	})
	
	
});

//分页模块
app.get("/fenye:num",function(request,response){
	var page = request.params.num;
	console.log(page);
	if(page!=1){
		page = (page-1)*5+1;
	}
	product.findbypage(page,function(rows){
		response.send(rows);
		response.end();
	})

});
app.get("/counts",function(request,response){
	product.getcounts(function(result){
		console.log(result)
		response.send(result);
		response.end();
	});
});
//搭建服务器
var server = app.listen(8888, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为：http://%s:%s", host, port)
});