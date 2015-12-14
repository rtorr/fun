import LCARS from 'lcars';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export function login(data) {
  var request = new XMLHttpRequest();
  request.open('POST', '/api/authenticate', true);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      LCARS.dispatch({
        type: LOGIN_SUCCESS,
        data: JSON.parse(request.responseText)
      });
    }
  };
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status >= 400) {
        LCARS.dispatch({
          type: LOGIN_FAIL,
          data: JSON.parse(request.responseText)
        });
      }
    }
  };

  request.onerror = function() {
    throw new Error('There was a problem with the request');
  };
  request.send(JSON.stringify(data));
}

export function logout() {
  var request = new XMLHttpRequest();
  request.open('POST', '/api/logout', true);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      LCARS.dispatch({
        type: LOGOUT_SUCCESS,
        data: JSON.parse(request.responseText)
      });
    }
  };
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status >= 400) {
        LCARS.dispatch({
          type: LOGOUT_FAIL,
          data: JSON.parse(request.responseText)
        });
      }
    }
  };

  request.onerror = function() {
    throw new Error('There was a problem with the request');
  };
  request.send(JSON.stringify({}));
}

