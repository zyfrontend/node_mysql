/*================================================================
*   Copyright (C) 2021 IEucd Inc. All rights reserved.
*   
*   文件名称：file.service.js
*   创 建 者：ZY
*   创建日期：2021年06月27日
*   描    述：
*
================================================================*/

const connection = require('../app/database');
const errorType = require('../constants/error.types');
class FileService {
	async createAvatar(filename, mimetype, size, id){
		const statement = `
		INSERT INTO avatar (filename, mimetype, size, users_id) VALUES (?, ?, ?, ?);
		`;
		try{
		const [result] = await connection.execute(statement, [filename, mimetype, size, id]);
		return result;
			} catch(err) {
				return err.message;
				}
			};

	async getAvatar(userId) {
		const statement = `
		SELECT * FROM avatar WHERE users_id = ?
		`;
		const [result] = await connection.execute(statement, [userId]);
		return result[0];
		};

	async createFile(filename, mimetype, size, id, momentId) {
		const statement = `
		INSERT INTO file (filename, mimetype, size, moment_id, users_id) VALUES (?, ?, ?, ?, ?);
		`;
		try{
		const [result] = await connection.execute(statement, [filename, mimetype, size, momentId, id]);
		return result;
			} catch(err) {
				console.log(err.message);
				}
		}
	async getFileByFilename(filename) {
		const statement = `
		SELECT * FROM file WHERE filename = ?;
		`;
		const [result] = await connection.execute(statement, [filename]);
		return result[0];
		}
	};

module.exports = new FileService();
