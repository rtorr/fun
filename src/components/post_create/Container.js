import React from 'react';
import marked from 'marked';
import {save, edit, update_text} from './Actions';
import Store from './Store';
import {WelpComponent} from 'welp';

class Create extends WelpComponent {
  constructor(props) {
    super(props, [Store]);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.rawMarkup = this.rawMarkup.bind(this);

    if (this.props.params.post_id) {
      edit({post_id: this.props.params.post_id});
    }else {
      this.state = {
        post: {
          uid: '',
          username: '',
          created: '',
          title: '',
          body: ''
        }
      };
    }
  }

  handleChange() {
    return update_text({
      title: this.refs.post_title.value,
      body: this.refs.textarea.value
    });
  }

  handleSave() {
    return save({
      post_id: this.props.params.post_id,
      uid: this.state.post.uid,
      title: this.state.post.title,
      body: this.state.post.body
    });
  }

  rawMarkup() {
    return { __html: marked(this.state.post.body, {sanitize: true}) };
  }

  render() {
    const {title, body} = this.state.post;
    return (
      <div className="post__create">
        <div className="post__create__container">
          <input ref="post_title" onChange={this.handleChange} className="post__create__title" type="text" name="title" value={title} placeholder="Title"/>
          <textarea placeholder="Start typing some markdown here!" className="post__markdown__editor" ref="textarea" onChange={this.handleChange} value={body}></textarea>
          <div className="post__markdown__result" dangerouslySetInnerHTML={this.rawMarkup()}></div>
          <input onClick={this.handleSave} className="post__create__save" type="submit" value="save"/>
        </div>
      </div>
    );
  }
}

export default Create;
