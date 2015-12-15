import request from 'lib/request';
import LCARS from 'lcars';
export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS';
export const POST_CREATE_FAIL = 'POST_CREATE_FAIL';

export const POST_UPDATE_SUCCESS = 'POST_CREATE_SUCCESS';
export const POST_UPDATE_FAIL = 'POST_CREATE_FAIL';

export const POST_GET_SUCCESS = 'POST_GET_SUCCESS';
export const POST_GET_FAIL = 'POST_GET_FAIL';

export const UPDATE_TEXT = 'UPDATE_TEXT';


export function save(data) {
  if (!data.post_id) {
    return request('/api/posts/create', 'POST', data, POST_CREATE_SUCCESS, POST_CREATE_FAIL, '/posts');
  }
  return request('/api/posts/update/' + data.post_id, 'PUT', data, POST_UPDATE_SUCCESS, POST_UPDATE_FAIL, '/posts');
}

export function edit(data) {
  return request('/api/posts/' + data.post_id, 'GET', data, POST_GET_SUCCESS, POST_GET_FAIL);
}

export function update_text(data) {
  LCARS.dispatch({
    type: UPDATE_TEXT,
    data: data
  });
}
