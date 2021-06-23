/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：database.js
*   创 建 者：ZY
*   创建日期：2021年06月17日
*   描    述：
*
================================================================*/

const mysql = require('mysql2');

const config = require('./config');

const connections = mysql.createPool({
	host: config.MYSQL_HOST,
	port: config.MYSQL_PORT,
	database: config.MYSQL_DATABASE,
	user: config.MYSQL_USER,
	password: config.MYSQL_PASSWORD
});

connections.getConnection((err, conn) => {
	conn.connect((err) => {
		if(err){
			console.log("数据库连接失败~", err);
			} else {
				console.log("数据库连接成功")
				}
	})
});

module.exports = connections.promise();
