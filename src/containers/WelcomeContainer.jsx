import React from 'react';
import Row from '../components/general/Row.jsx';
import Column from '../components/general/Column.jsx';
import Text from '../components/general/Text.jsx';
import Image from '../components/general/Image.jsx';
import Input from '../components/general/Input.jsx';
import { connect } from 'react-redux';

class WelcomeContainer extends React.Component {
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
        <Column>
          <Text 
            value={'Hello!'}
          />
        </Column>
      </Row>
    );
  }
}

export default connect(state => state)(WelcomeContainer);