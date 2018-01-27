import React                     from 'react';
import { connect }               from 'react-redux';
import { bindActionCreators }    from 'redux';
import styles                    from './styles.css';
import { 
  fetchMyDonations,
  createDonationEvent
}                                 from 'actions/donations';
import { auth }                   from 'utilities/auth';
import TextField                  from 'material-ui/TextField';
import RaisedButton               from 'material-ui/RaisedButton';
import FlatButton                 from 'material-ui/FlatButton';



class Profile extends React.Component {
  constructor (props) {
    super(props);
    let params = auth.headers()
    debugger
  }

  componentWillMount() {
    this.props.fetchData(auth.headers())
  }

  handleClick = (url) => {
    this.props.onLeftIconButtonTouchTap()
    this.props.history.push(url);
  }


  render () {
    let { open, title, onLeftIconButtonTouchTap } = this.props;

    return (
      <div>
        <TextField
          hintText="Andrea"
          floatingLabelText="First Name"
        /><br />
        <TextField
          hintText="Borek"
          floatingLabelText="Last Name"
        /><br />
        <TextField
          hintText="A-"
          floatingLabelText="Blood type"
        /><br />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    donations: state.donations.my_donations,
  };
};
function mapDispatchToProps (dispatch) {
  return {
    fetchData: bindActionCreators(fetchMyDonations, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
