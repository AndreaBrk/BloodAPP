import React                      from 'react';
import Dialog                     from 'material-ui/Dialog';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import TextField                  from 'material-ui/TextField';
import FlatButton                 from 'material-ui/FlatButton';
import RaisedButton               from 'material-ui/RaisedButton';
import { 
  editDonationEvent
}                                 from 'actions/donations';
import { auth }                   from 'utilities/auth';
import styles                     from './styles.css';



/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class EditDialog extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: true,
      id: this.props.id,
      name: this.props.name,
      type: this.props.type,
      size: this.props.size
    };
  }


  handleClose = () => {
    this.setState({open: false});
    this.props.handleClose()
  };

  handleSubmit = () => {
    this.props.editDonationEvent(auth.headers(), {id: this.state.id, name: this.state.name, type: this.state.type, size: this.state.size})
    this.setState({open: false});
    this.props.handleClose()
  };


  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeBloodType = (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  handleChangeSize = (event) => {
    this.setState({
      size: event.target.value,
    });
  };

  render() {
    const { id, name, type, size, handleClose} = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
          <TextField
            floatingLabelText="Name"
            hintText={this.state.name}
            ref='name'
            className={styles['field']}
            underlineShow={false}
            value={this.state.name}
            onChange={this.handleChangeName}
          />
          <TextField
            floatingLabelText="Blood type"
            hintText={this.state.type}
            ref='blood_type'
            className={styles['field']}
            underlineShow={false}
            value={this.state.type}
            onChange={this.handleChangeBloodType}
          />
          <TextField
            floatingLabelText="Size"
            type='number'
            hintText={this.state.size}
            ref='size'
            className={styles['field']}
            underlineShow={false}
            value={this.state.size}
            onChange={this.handleChangeSize}
          />
        </Dialog>
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    donations: state.donations.dashboard,
  };
};
function mapDispatchToProps (dispatch) {
  return {
    editDonationEvent: bindActionCreators(editDonationEvent, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDialog);
