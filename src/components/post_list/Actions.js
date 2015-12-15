import request from 'lib/request';
export const POST_LIST_GET_SUCCESS = 'POST_LIST_GET_SUCCESS';
export const POST_LIST_GET_FAIL = 'POST_LIST_GET_FAIL';

export function get(data) {
  return request('/api/users/posts/' + data.username, 'GET', data, POST_LIST_GET_SUCCESS, POST_LIST_GET_FAIL);
}

