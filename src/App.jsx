import React from 'react';
import { templateAsyncAction } from './actions/appActions.js';
import { connect } from 'react-redux';
import './App.css';
import styled, { css } from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

export class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  render () {

    return (
      <div className={'app'}>
        <Button>Normal Button</Button>
        <Button primary>Primary Button</Button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    app: state.app
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    templateAction: (data) => {
      dispatch(templateAsyncAction(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);