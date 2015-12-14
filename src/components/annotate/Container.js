import React from 'react';
import marked from 'marked';
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

class Annotate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectText = this.handleSelectText.bind(this);
    this.state = {
      selection: '',
      markdown: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at mi tempor odio commodo laoreet. Phasellus maximus odio a ante lacinia commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis aliquam eu enim ut pulvinar. Cras eget nulla sit amet tellus placerat scelerisque. Mauris varius ut arcu at scelerisque. Praesent euismod augue id tortor porta, eget gravida nulla varius. Maecenas eget tortor sit amet nibh egestas dapibus nec sit amet mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas sed interdum erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam mattis consequat leo.


Curabitur et metus urna. Sed egestas turpis vel nunc commodo ornare. Vestibulum tellus lacus, pulvinar in rhoncus sit amet, ornare a ex. Nam quis tellus risus. Cras vestibulum sed justo non efficitur. Donec tempor posuere viverra. Integer iaculis nisi purus, a sodales est ultricies eget.


Donec laoreet pretium cursus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque eu efficitur diam. Nullam libero justo, venenatis ut condimentum id, rhoncus eu elit. Phasellus accumsan volutpat consequat. Quisque laoreet efficitur metus, condimentum tincidunt ex feugiat et. In in lectus hendrerit, venenatis odio at, vestibulum quam. Nunc et dolor at tellus vulputate vestibulum. Nam nec luctus massa.


Fusce finibus at purus vel commodo. Aliquam convallis pharetra gravida. Cras vehicula molestie nulla. Fusce ac ultricies nibh. Sed vitae nunc ac ante fermentum rhoncus. Integer rhoncus congue justo, ut dapibus neque condimentum vel. Vestibulum vehicula semper bibendum. Vestibulum in neque tellus. Integer a efficitur odio, eu hendrerit neque. Nam consequat placerat arcu vitae aliquam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Donec interdum ac erat a bibendum. Maecenas laoreet lectus ligula, in ultrices urna posuere id.


Nullam posuere sem magna, sit amet bibendum magna gravida a. Donec vel nibh ut lorem vestibulum efficitur vitae vitae augue. Proin turpis tellus, congue eget risus vel, hendrerit imperdiet nunc. Donec ultrices risus eget pretium pulvinar. Phasellus semper tempus nisi, eu fermentum odio. Nam non felis quis odio aliquet molestie. Phasellus ac facilisis lectus. Nullam blandit dui nisl, at tempor augue faucibus vitae. Nullam vel tristique nisi. Nunc a turpis vitae velit mollis placerat. Nunc fermentum cursus augue eu pulvinar. Suspendisse blandit ex eget purus porta elementum. Phasellus condimentum porttitor quam nec faucibus. Nam nisi nisi, auctor sit amet ullamcorper non, lacinia ut nibh.`
    };
  }

  handleSelectText(e) {
    if (window.getSelection) {
      this.setState({selection: window.getSelection().toString()});
    }
  }

  render() {
    const {markdown, selection} = this.state;
    const md = marked(markdown.replace(selection, `***${selection}***`));
    return (
      <div className="annotate">
        <h1>Demo title</h1>
        <div className="annotate__container">
          <div className="annotate__text">
            <div ref="annotation_text" dangerouslySetInnerHTML={{__html: md}}  onMouseUp={this.handleSelectText}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Annotate;
