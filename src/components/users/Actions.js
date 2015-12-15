import request from 'lib/request';

export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAIL = 'USER_FAIL';

export function get_user(data) {
  return request('/api/users/' + data.username, 'GET', data, USER_SUCCESS, USER_FAIL);
}
