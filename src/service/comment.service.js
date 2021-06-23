/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：comment.service.js
*   创 建 者：ZY
*   创建日期：2021年06月23日
*   描    述：
*
================================================================*/
const connection = require('../app/database');
class CommentService {
	async create(momentId, content, userid){
		const statement = `
		INSERT INTO comment (content, moment_id, users_id) VALUES (?, ?, ?);
		`;
		const [result] = await connection.execute(statement, [content, momentId, userid]);
		return result;
		}
}

module.exports = new CommentService();
