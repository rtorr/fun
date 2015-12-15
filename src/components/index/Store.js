import {WelpStore} from 'welp';
import {
  GET_POSTS_SUCCESS
} from './Actions';

const Store = new WelpStore(
  {posts_list: {
    posts: []
  }},
  action => {
    switch (action.type) {
      case GET_POSTS_SUCCESS:
        return Store.set('posts_list', action.data);
    }
  }
);

export default Store;
