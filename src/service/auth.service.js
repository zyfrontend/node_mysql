/*================================================================
 *   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：auth.service.js
*   创 建 者：ZY
*   创建日期：2021年06月20日
*   描    述：
*
================================================================*/

const connection = require('../app/database');

class AuthService {
	async checkMoment(momentId, userId) {
		console.log(momentId, userId);
		const statement = `
		SELECT * FROM moment WHERE id = ? AND users_id = ?;
		`;
		const [result] = await connection.execute(statement, [momentId, userId]);
		return result.length === 0 ? false: true;
	}
};

module.exports = new AuthService();
