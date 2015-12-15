import React from 'react';
import {WelpComponent} from 'welp';
import {get_posts} from './Actions';
import Store from './Store';
import marked from 'marked';

class Index extends WelpComponent {
  constructor(props) {
    super(props, [Store]);
    get_posts();
  }

  render() {
    const posts = this.state.posts_list.posts.map(post => {
      return (
        <div key={post.key} className="post___list__item">
          <h2>{post.value.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: marked(post.value.body, {sanitize: true}) }}></div>
          <small>by {post.value.username}</small>
        </div>
      );
    });
    return (
      <div className="index">
        <div className="post__list">
          {posts}
        </div>
      </div>
    );
  }
}

export default Index;
