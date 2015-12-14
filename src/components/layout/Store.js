import {WelpStore} from 'welp';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from './Actions';

const Store = new WelpStore(
  {user: window._shared_data.user},
  action => {
    switch (action.type) {
      case LOGIN_SUCCESS:
      case LOGOUT_SUCCESS:
        return Store.set('user', action.data);
    }
  }
);

export default Store;
