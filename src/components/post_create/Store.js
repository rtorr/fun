import {WelpStore} from 'welp';
import {
  POST_GET_SUCCESS,
  UPDATE_TEXT
} from './Actions';

const Store = new WelpStore(
  {post: {
    uid: '',
    username: '',
    created: '',
    title: '',
    body: ''
  }},
  action => {
    switch (action.type) {
      case UPDATE_TEXT:
        return Store.set('post', action.data);
      case POST_GET_SUCCESS:
        return Store.set('post', action.data);
    }
  }
);

export default Store;
