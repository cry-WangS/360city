function ShowShopInfo(){
	var sessionFactory = require("./SessionFactory");
	this.insertjson = function(shop_id,shop_name,shop_ico,addr,main,shop_visit){
		//与数据库建立连接
		var conn = sessionFactory.getConnection();
		//插入数据
		var inserSQL = "insert into shopinfo (shop_id,shop_name,shop_ico,addr,main,shop_visit) values('"+shop_id+"','"+shop_name+"','"+shop_ico+"','"+addr+"','"+main+"','"+shop_visit+"')";
		conn.query(inserSQL,function(err,res){
			if(err) throw err;
			conn.end();
		});
	}
}
module.exports = new ShowShopInfo();