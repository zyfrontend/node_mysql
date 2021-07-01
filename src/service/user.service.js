/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：user.service.js
*   创 建 者：ZY
*   创建日期：2021年06月15日
*   描    述：
*
================================================================*/
const connection = require('../app/database');
class UserService {
	// 写入数据
	async create(user){
		// 1. 解构 user 获取用户注册信息
		const { name,  password } = user;
		// 2. mysql 数据库操作，将 user 信息写入数据库
		const statement = `
		INSERT INTO users (name, password) VALUES (?, ?);
		`;
		const result = await connection.execute(statement, [name, password]);

		// 将 user 存储到数据库中 
		return result[0];
		};
	// 查询数据
	async getUserByName(name) {
		// 1. 查询用户名
		const statement = `
		SELECT * FROM users WHERE name = ?;
		`;
		const result = await connection.execute(statement, [name]);
		return result[0];
		};

}

module.exports = new UserService;
