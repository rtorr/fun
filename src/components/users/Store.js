import {WelpStore} from 'welp';
import {
  USER_SUCCESS
} from './Actions';

const Store = new WelpStore(
  {user: {
    username: undefined,
    uid: undefined
  }},
  action => {
    switch (action.type) {
      case USER_SUCCESS:
        return Store.set('user', action.data);
    }
  }
);

export default Store;
