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
		INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);
		`;
		try{
		const [result] = await connection.execute(statement, [filename, mimetype, size, id]);
		return result;
			} catch(err) {
				return err.message;
				}
			}
};

module.exports = new FileService();
