import React from 'react';
import ReactDOM from 'react-dom';

import Comments from './comments-component';

class App extends React.Component {

  constructor(){
    super();
    this.state = { txt: 'this is the state txt',
    cat: 0
  }
  }

  update(e){
    this.setState({txt: e.target.value})
  }

  render(){
    let txt = this.props.txt
    return (
      <div>
        <Comments />
      </div>
    );
  }
}

App.propType = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
  txt: 'this is the default txt'
}

ReactDOM.render(
  <App cat={5} />,
  document.getElementById('app')
);

export default App