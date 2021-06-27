/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：moment.service.js
*   创 建 者：ZY
*   创建日期：2021年06月19日
*   描    述：
*
================================================================*/

const connection = require('../app/database');
const sqlFragment = `
		SELECT 
			m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
			JSON_OBJECT('id', u.id, 'name', u.name) users
		FROM moment m
		LEFT JOIN users u ON m.users_id = u.id
`;
class MomentService {
	async create(userId, content) {
	
	const statement = `
		INSERT INTO moment (content, users_id) VALUES (?, ?);
		`;
	const result = await connection.execute(statement, [content, userId]);
		
		return result;
		};
	async getMomentBy(id) {
		const statement = `
		SELECT 
			m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
			JSON_OBJECT('id', u.id, 'name', u.name) users
		FROM moment m
		LEFT JOIN users u ON m.users_id = u.id
		WHERE m.id = ?;
		`;
		
		const test = `
		SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
			JSON_OBJECT( 'id', u.id, 'name', u.NAME ) users,
			JSON_ARRAYAGG(
			JSON_OBJECT( 'id', c.id, 'content', c.content, 'c.comment', c.comment_id, 'createTime', c.createAt)) comments
		FROM
			moment m
				LEFT JOIN users u ON m.users_id = u.id 
				LEFT JOIN comment c ON c.comment_id = m.id
		WHERE
		m.id = ?;
		`;

		const [result] = await connection.execute(test, [id]);
		return result[0];
		};
	async getMomentList(offset, size) {
		const statement = `
		SELECT 
			m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
			JSON_OBJECT('id', u.id, 'name', u.name) users,
			(SELECT COUNT (*) FROM comment c WHERE c.moment_id = m.id) commentCount
		FROM moment m
		LEFT JOIN users u ON m.users_id = u.id
		LIMIT ?, ?;
		`;
		const [result] = await connection.execute(statement, [offset, size]);
		return result;
		};
	async update(content, momentId) {
		const statement = `
		UPDATE moment SET content = ? WHERE id = ?;
		`;
		const [result] = await connection.execute(statement, [content, momentId]);
		return result;
		};
	async remove(momentId) {
		const statement = `
		DELETE FROM moment WHERE id = ?;
		`;
		const [result] = await connection.execute(statement, [momentId]);
		return result;
		}
}

module.exports = new MomentService(); 
