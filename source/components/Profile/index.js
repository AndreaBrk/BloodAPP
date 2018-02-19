import React                     from 'react';
import { connect }               from 'react-redux';
import { bindActionCreators }    from 'redux';
import styles                    from './styles.css';
import { 
  fetchMyDonations,
  createDonationEvent,
}                                 from 'actions/donations';
import { 
  UpdateUser
}                                 from 'actions/users';
import { auth }                   from 'utilities/auth';
import TextField                  from 'material-ui/TextField';
import RaisedButton               from 'material-ui/RaisedButton';
import FlatButton                 from 'material-ui/FlatButton';

/*
  Component: Profile
  descripción: Vista donde el usuario además de ver sus datos y cambiarlos, podrá ver los 
  eventos que ha generado, editarlos y borrarlos
  state:
    openDialog: boolean que determina si la modal se abre o no,
    donation: donación a editar, esta es usado en la modal,
    first_name: nombre del usuario,
    last_name: appelido del usuario,
    email: email del usuario,
    password: nueva password,
    blood_type_filter: tipo de sangre que va a ser filtrado,
    password_message: mensaje de error si es que hubo 
 */


class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      openDialog: false,
      donation: null,
      first_name: auth.user().first_name,
      last_name: auth.user().last_name,
      email: auth.user().email,
      password: null,
      blood_type_filter: null,
      password_message: null,
      nombre: auth.user().first_name,
      apellido: auth.user().last_name
    }
  }

  handleClick = (url) => {
    if (this.state.password && this.state.password.length < 8) {
      this.setState({
        password_message: 'The password is too short',
      });
    } else {
      this.setState({
        password_message: null
      });
      this.props.UpdateUser(auth.headers(), {id: auth.user().id, email: this.state.email, first_name: this.state.first_name, last_name: this.state.last_name, blood_type: this.state.blood_type, password: this.state.password})
      .then(() => {
        this.setState({
          nombre: this.state.first_name,
          apellido: this.state.last_name,
          last_name: '',
          last_name: '',
          password: null
        })
      })
    }
  }



  handleOpenEditDIalog = (donation, event) => {
    this.setState({
      openDialog: true,
      donation: donation
    })
  }

  handleClose = () => {
    this.setState({
      openDialog: false,
      donation: null
    })
  }


  ChangeFirstName = (event) => {
    this.setState({
      first_name: event.target.value,
    });
  }

  ChangeLastName = (event) => {
    this.setState({
      last_name: event.target.value,
    });
  }

  ChangeBloodType = (event) => {
    this.setState({
      blood_type: event.target.value,
    });
  }


  ChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  }

  ChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  }

  handleBloodTypeFilter = (event) => {
    this.setState({
      blood_type_filter: event.target.value,
    });
  }


  render () {
    let { open, title, onLeftIconButtonTouchTap } = this.props;

    return (
      <div>
        <div>
          <TextField
            floatingLabelText={this.state.nombre}
            onChange={(event) => this.ChangeFirstName(event)}
          /><br />
          <TextField
            floatingLabelText={this.state.apellido}
            onChange={(event) => this.ChangeLastName(event)}
          /><br />
          <TextField
            hintText={this.state.email}
            onChange={(event) => this.ChangeEmail(event)}
          /><br />
          <TextField
            type='password'
            hintText={this.state.password}
            errorText={this.state.password_message}
            floatingLabelText="New Password"
            onChange={(event) => this.ChangePassword(event)}
          /><br />
          <RaisedButton
            label="Submit"
            primary={true}
            className={styles['button']}
            onClick={(event) => this.handleClick(event)}
          />
        </div>
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
    UpdateUser: bindActionCreators(UpdateUser, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
