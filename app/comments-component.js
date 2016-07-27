import React from 'react';
import ReactDOM from 'react-dom';

import Comment from './comment-component';

require('es6-promise').polyfill();
require('isomorphic-fetch');
 
class Comments extends React.Component {

  constructor() {
    super();

    this.state = {
      comments : [],
      page: 1,
      nextPage: 2
    }
  }

  componentWillMount() {
    var self = this;

    fetch('//localhost:8080/comments')
      .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then(function(data) {
          self.setState({comments: data.comments});
      });
  }

  render() {

    return (
      <div>
        {this.state.comments.map(comment => <Comment key={comment.id} data={comment} />)}
      </div>
    );
  }
}

export default Comments