import React from 'react';
import history from 'lib/history';

class PostItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    return history.push(`/post/edit/${this.props.post_id}`);
  }

  render() {
    return (
      <div className="post__list__card" onClick={this.handleClick}>
        <div className="post__list__body">
          <div className="post__pseudo__text">
            <div className="post__pseudo__text__long"></div>
            <div className="post__pseudo__text__long"></div>
            <div className="post__pseudo__text__short"></div>
            <div className="post__pseudo__text__medium"></div>
            <div className="post__pseudo__text__long"></div>
            <div className="post__pseudo__text__long"></div>
            <div className="post__pseudo__text__short"></div>
            <div className="post__pseudo__text__medium"></div>
            <div className="post__pseudo__text__medium"></div>
          </div>
        </div>
        <div className="post__list__card__label">
          {this.props.title}
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post_id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};

export default PostItem;
