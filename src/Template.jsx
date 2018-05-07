import React from 'react';
import { connect } from 'react-redux';

export class Template extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  render () {

    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch(actionCreator)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Template);