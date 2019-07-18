const mysql = require('mysql');
const { createToken } = require('../utils');
const { sqlConfig } = require('../config');
const connection = mysql.createConnection(sqlConfig)
connection.connect();

/**
 * 登录接口
 */
module.exports.Login = (req, res) => {
    const { username, password, type = 0 } = req.body;
    //把前台传过来的用户名、密码，拼接sql语句到数据库查询
    const $sql = `select * from user where username='${username}' and password='${password}' and type='${type}'`;
    connection.query($sql, (error, results) => {
        if (error) {
            res.statusCode = 500;
            res.json({
                code: 0,
                msg: error
            })
            return console.error(error)
        } else {
            if (results.length > 0) {
                const token = createToken(results[0].id)
                const $save = `update user set token='${token}' where id=${results[0].id}`;
                connection.query($save, (error, results) => {
                    if (error) {
                        return console.error(error)
                    }
                })
                res.statusCode = 200;
                res.json({
                    code: 1,
                    msg: 'success',
                    token: token
                })
            } else {
                res.statusCode = 401;
                res.json({
                    code: 0,
                    msg: '没有权限访问！'
                })
                return console.error(error)
            }
        }
    })
}

/**
 * 添加用户接口
 */
module.exports.Registry = (req, res) => {
    const { username, password, type } = req.body;
    //把前台传过来的用户名、密码，拼接sql语句到数据库查询
    const $sql = 'insert into user  (`username`, `password`,`type`) VALUES (?,?,?)';
    const $params = [username, password, type];
    connection.query($sql, $params, (error, results) => {
        if (error) {
            res.statusCode = 500;
            res.json({
                code: 0,
                msg: error
            })
            return console.error(error)
        } else {
            res.statusCode = 200;
            res.json({
                code: 1,
                msg: '插入成功！'
            })
        }
    })
}

/**
 * 查看所有用户
 */

module.exports.Show = (req, res) => {
    const $sql = 'select * from user';
    connection.query($sql, (error, results) => {
        if (error) {
            res.statusCode = 500;
            res.json({
                code: 0,
                msg: error
            })
            return console.error(error)
        } else {
            res.statusCode = 200;
            res.json({
                code: 1,
                msg: '插入成功！',
                result: results
            })
        }
    })
}


/**
 * 查看所有用户
 */

module.exports.Update = (req, res) => {
    const { uid, username, password, type } = req.body;
    const $sql = 'update user set username=?,password=?,type=? where uid=?';
    const $params = [username, password, type, uid];
    connection.query($sql, $params, (error, results) => {
        if (error) {
            res.statusCode = 500;
            res.json({
                code: 0,
                msg: error
            })
            return console.error(error)
        } else {
            res.statusCode = 200;
            res.json({
                code: 1,
                msg: '更新成功！'
            })
        }
    })
}

/**
 * 根据uid删除用户
 */
module.exports.Delete = (req, res) => {
    const { uid } = req.body;
    const $sql = 'delete from user where  uid=?';
    connection.query($sql, [uid], (error, results) => {
        if (error) {
            res.statusCode = 500;
            res.json({
                code: 0,
                msg: error
            })
            return console.error(error)
        } else {
            res.statusCode = 200;
            res.json({
                code: 1,
                msg: '删除成功'
            })
        }
    })
}