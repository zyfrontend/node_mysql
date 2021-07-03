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
			m.id id, m.content content,m.createAt createAt, m.updateAt updateAt,
		JSON_OBJECT('id', u.id, 'name', u.name) author,
			IF(COUNT(c.id), JSON_ARRAYAGG(
				JSON_OBJECT(
				'id', c.id, 'connent', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
				'users', JSON_OBJECT('id', cu.id, 'name', cu.name
				))), NUll) comments,
			IF(COUNT(l.id), JSON_ARRAYAGG(
				JSON_OBJECT(
					'id', l.id, 'name', l.name
				)), NULL)labels
		FROM moment m
		LEFT JOIN users u ON m.users_id = u.id
		LEFT JOIN comment c ON c.moment_id = m.id
		LEFT JOIN users cu ON c.users_id = cu.id
		LEFT JOIN moment_label ml on m.id = ml.moment_id
		LEFT JOIN label l ON ml.label_id = l.id
		WHERE m.id = ? 
		GROUP BY m.id;	
		`;
		const [result] = await connection.execute(statement, [id]);
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
		const statementList = `
		SELECT 
			m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
			JSON_OBJECT('id', u.id, 'name', u.name) author,
				(SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
				(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
			FROM moment m
				LEFT JOIN users u ON m.users_id = u.id
		LIMIT ?, ?;
		`;
		const [result] = await connection.execute(statementList, [offset, size]);
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
		};
	async hasLabel(momentId, labelId) {
		const statement = `
		SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;
		`;
		const [result] = await connection.execute(statement, [momentId, labelId]);
		return result[0] ? true : false;
		};
	async addLabels(momentId, labelId) {
		const statement = `
		INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);
		`;
		const [result] = await connection.execute(statement, [momentId, labelId]);
		return result;
		}
}

module.exports = new MomentService(); 
