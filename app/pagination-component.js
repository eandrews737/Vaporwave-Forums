import React from 'react';
import ReactDOM from 'react-dom';

class Pagination extends React.Component {

  constructor() {
    super();

    this.state = {}
  }

  render() {

    return (
      <div>
        <button 
          disabled={this.props.page <= 1} 
          onClick={e => this.props.change(false)}
        >
          Previous
        </button>

        <button 
          onClick={e => this.props.change(true)}
        >
          Next
        </button>

      </div>
    );
  }
}

export default Pagination