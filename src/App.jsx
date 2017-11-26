import React from 'react';
import Row from './components/general/Row.jsx';
import Column from './components/general/Column.jsx';
import Text from './components/general/Text.jsx';
import Input from './components/general/Input.jsx';
import Image from './components/general/Image.jsx';
import { connect } from 'react-redux';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Row>
        {this.props.children}
      </Row>
    );
  }
}

export default connect(state => state)(App);