import {WelpStore} from 'welp';
import {
  POST_LIST_GET_SUCCESS
} from './Actions';

const Store = new WelpStore(
  {posts: []},
  action => {
    switch (action.type) {
      case POST_LIST_GET_SUCCESS:
        return Store.set('posts', action.data.posts);
    }
  }
);

export default Store;
