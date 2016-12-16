var sessionFactory = require("./SessionFactory");
var async = require('async');

function Product() {
	this.findbypage = function(page, callback) {
		var conn = sessionFactory.getConnection();
		var findsql = "select s.shop_name,s.shop_ico,s.addr,s.main,s.shop_visit from shopinfo s limit "+(page-1)+",5";
		conn.query(findsql, function(err, rows) {
			if(err) throw err;
			conn.end();
			console.log(rows);
			callback(rows);
		});
	};

	this.getcounts = function(callback) {
		var conn = sessionFactory.getConnection();
		var totalSql = "SELECT COUNT(*) totalNum FROM shopinfo";
		conn.query(totalSql, function(err, rows) {
			if(err) throw err;
			console.log(rows[0]);
			conn.end();
			return callback(rows[0]);
		});

	}
}
module.exports = new Product();