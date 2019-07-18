import request from '@/utils/request';
import { ADD_USER_DEFAULY_TYPE } from '@/config';

/**
 * 登录接口
 * @param {Object} payload 
 */
export function userLogin(payload) {
    const url = '/user/login';
    return request.post(url, {
        ...ADD_USER_DEFAULY_TYPE,
        ...payload
    })
}

/**
 * 添加用户接口
 * @param {Object} payload 
 */
export async function addUser(payload) {
    const url = '/user/add';
    const result = await request.post(url, {
        ...ADD_USER_DEFAULY_TYPE,
        ...payload
    })
    return result;
}

/**
 * 获取用户列表
 */
export function getUserList() {
    const url = '/user/getUserList';
    return request.get(url)
}

/**
 * 更新用户信息
 * @param {Object} payload 
 */
export function updateUser(payload) {
    const url = '/user/update';
    return request.post(url, {
        ...payload
    })
}

export function deleteUser(uid) {
    const url = '/user/delete';
    return request.post(url, {
        uid
    });
}