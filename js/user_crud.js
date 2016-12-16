function UserCRUD() {
	var sessionFactory = require("./SessionFactory");

	//查询所有
	this.findAll = function(callback) {
		var conn = sessionFactory.getConnection();
		var findAllSQL = "SELECT  id,username,password from users";
		conn.query(findAllSQL, function(err, rows) {
			if(err) throw err;
			conn.end();
			//使用回调函数实现值的回传
			return callback(rows);
		});

	}

	this.findByLogin = function(username,password, callback) {
		var conn = sessionFactory.getConnection();
		//条件查询
		var findByUserSQL = "SELECT id from users where username='" + username + "' and password='" + password + "'";
		conn.query(findByUserSQL, function(err, rows) {
			if(err) throw err;
			conn.end();
			return callback(rows[0]); //使用回调函数异步传值,注意rows为数组
		});
	}
	this.findByRegister = function(username,callback) {
		var conn = sessionFactory.getConnection();
		//条件查询
		var findByUserSQL = "SELECT id from users where username='" + username +"'";
		conn.query(findByUserSQL, function(err, rows) {
			if(err) throw err;
			conn.end();
			return callback(rows[0]); //使用回调函数异步传值,注意rows为数组
		});
	}
	this.insertUser = function(usernameVal, passwordVal, callback) {
		var conn = sessionFactory.getConnection();
		//插入数据
		var insertSQL = "insert into users(username,password) values('" + usernameVal + "','" + passwordVal + "')";
	
		conn.query(insertSQL, function(err, res) {
			if(err) throw err;
			var flag = false;
			if(res.affectedRows > 0) flag = true;
			conn.end();
			callback(flag);
		});
	}

	this.deleteUser = function(id, callback) {
		var conn = sessionFactory.getConnection();
		//删除数据
		var delSQL = "delete from users where id=" + id;
		conn.query(delSQL, function(err, res) {
			if(err) throw err;
			var flag = false;
			if(res.affectedRows > 0) flag = true;
			conn.end();
			callback(flag);
		});
	}

	this.updateUser = function(updateId, newUsernameVal, newPasswordVal, callback) {
		//修改数据
		var conn = sessionFactory.getConnection();
		var updateSQL = "update users set username='" + newUsernameVal + "',password='" + newPasswordVal + "' where id=" + updateId;
		conn.query(updateSQL, function(err, res) {
			if(err) throw err;
			var flag = false;
			if(res.affectedRows > 0) flag = true;
			conn.end();
			callback(flag);
		});
	}
	
	//有待完成
//	this.login  = function(username,password,callback){
//		
//	}
//	
//	this.registry = function(){
//		
//	}

}

module.exports = new UserCRUD();