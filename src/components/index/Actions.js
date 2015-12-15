import request from 'lib/request';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL';

export function get_posts(data) {
  return request('/api/posts', 'GET', data, GET_POSTS_SUCCESS, GET_POSTS_FAIL);
}
