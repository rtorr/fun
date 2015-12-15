import request from 'lib/request';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export function login(data) {
  return request('/api/authenticate', 'POST', data, LOGIN_SUCCESS, LOGIN_FAIL, '/posts');
}

export function logout(data) {
  return request('/api/logout', 'POST', data, LOGOUT_SUCCESS, LOGOUT_FAIL, '/');
}
