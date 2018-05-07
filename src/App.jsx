import React from 'react';
import { templateAsyncAction } from './actions/appActions.js';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Modal from 'material-ui/Modal';
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.setState({
      ...this.state,
      isModalOpen: false
    });
  }

  handleOpenModal() {
    this.setState({
      ...this.state,
      isModalOpen: true
    });
  }

  render () {

    return (
      <div className={'app'}>
        <Button 
          variant="raised"
          color="primary"
          onClick={this.handleOpenModal}
        >
          Click me
        </Button>
        <Modal
          open={this.state.isModalOpen}
          onClose={this.handleCloseModal}
        >
          <div style={{
            backgroundColor: 'white',
            padding: '30px 50px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}>Thanks!</div>
        </Modal>
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