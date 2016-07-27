import React from 'react';
import ReactDOM from 'react-dom';

import Comment from './comment-component';
import Pagination from './pagination-component';

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

  requestComments(page = 1) {
    var self = this;

    fetch(`//localhost:8080/comments?page=${page}`)
      .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then(function(data) {
          self.setState({
            page: data.page,
            nextPage: data.nextPage,
            comments: data.comments
          });
      });

  }

  componentWillMount() {
    this.requestComments(1);
  }

  changePage(next = true) {
    this.requestComments(next ? this.state.nextPage : this.state.page-1);
  }

  render() {

    return (
      <div>

        {this.state.comments.length ? (
            <div>
              <h4 className="pageNumber">Page {this.state.page} of 10</h4>

              <div className="row headings">
                <div className="two columns"><strong>ID</strong></div>
                <div className="three columns"><strong>Name</strong></div>
                <div className="four columns"><strong>Time</strong></div>
              </div>

              <div id="comments">
                {this.state.comments.map(comment => <Comment key={comment.id} data={comment} />)}
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="twelve columns">No Comments</div>
            </div>
          )
        }

        <Pagination page={this.state.page} change={this.changePage.bind(this)} />
      </div>
    );
  }
}

export default Comments