import LCARS from 'lcars';

export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAIL = 'USER_FAIL';

export function get_user(data) {
  var request = new XMLHttpRequest();
  request.open('GET', '/api/users/' + data.username, true);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      LCARS.dispatch({
        type: USER_SUCCESS,
        data: JSON.parse(request.responseText)
      });
    }
  };
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status >= 400) {
        LCARS.dispatch({
          type: USER_FAIL,
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

