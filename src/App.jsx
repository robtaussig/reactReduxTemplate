import React from 'react';
import { templateAsyncAction } from './actions/appActions.js';
import { connect } from 'react-redux';
import './App.css';

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