import React from 'react';
import Row from './components/general/Row.jsx';
import Column from './components/general/Column.jsx';
import Text from './components/general/Text.jsx';
import Image from './components/general/Image.jsx';
import Input from './components/general/Input.jsx';
import { connect } from 'react-redux';

class Template extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  render () {

    return (
      <Row>

      </Row>
    );
  }
}

export default connect(state => state)(WelcomeContainer);