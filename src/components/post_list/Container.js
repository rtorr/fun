import React from 'react';
import {WelpComponent} from 'welp';
import history from 'lib/history';
import Store from './Store';
import UserStore from './../layout/Store';
import {get} from './Actions';
import PostItem from './views/PostItem';

class Index extends WelpComponent {

  constructor(props) {
    super(props, [UserStore, Store]);
    this.handlCreate = this.handlCreate.bind(this);
    get({username: this.state.user.username});
  }

  handlCreate() {
    return history.push('/post/create');
  }

  render() {
    const posts = this.state.posts.map(post => {
      return (
        <PostItem key={post.key} post_id={post.key} title={post.value.title} />
      );
    });

    return (
      <div className="post">
        <div className="post__list">
          <div className="post__list__card" onClick={this.handlCreate}>
            <div className="post__list__body">
              <span className="post__new__icon">+</span>
            </div>
            <div className="post__list__card__label">
              Make a new Post
            </div>
          </div>
          {posts}
        </div>
      </div>
    );
  }
}

export default Index;
