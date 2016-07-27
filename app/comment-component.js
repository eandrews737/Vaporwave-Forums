import React from 'react';
import ReactDOM from 'react-dom';
 
class Comment extends React.Component {

  constructor() {
    super();

    this.state = {}
  }

  render() {
    let comment = this.props.data;

    return (
      <div>
        {comment.comment} {comment.media}
      </div>
    );
  }
}

export default Comment