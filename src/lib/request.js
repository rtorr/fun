import LCARS from 'lcars';
import history from './../lib/history';

export default function(url, type, data, action_type_success, action_type_error, redirect) {
  var request = new XMLHttpRequest();
  request.open(type, url, true);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      LCARS.dispatch({
        type: action_type_success,
        data: JSON.parse(request.responseText)
      });
      if (redirect) {
        history.push(redirect);
      }
    }
  };
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status >= 400) {
        LCARS.dispatch({
          type: action_type_error,
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
