import React                     from 'react'
import { connect }               from 'react-redux'
import { bindActionCreators }    from 'redux'
import styles                    from './styles.css'
import {
  fetchMyDonations,
  createDonationEvent,
}                                 from 'actions/donations'
import {
  getUser,
  updateUser
}                                 from 'actions/users'
import auth                       from 'auth'
import TextField                  from 'material-ui/TextField'
import RaisedButton               from 'material-ui/RaisedButton'
import FlatButton                 from 'material-ui/FlatButton'
import avatarImg                  from './avatar-placeholder.png'

/**
 * Componente encargado de mostrar los datos del usuario (Nombre y Apellido de momento)
 * y poder cambiarlos, incluyendo el password.
 */
class Profile extends React.Component {
  constructor (props) {
    super(props)

    /**
    * openDialog: boolean que determina si la modal se abre o no.
    * donation: donación a editar, esta es usado en la modal.
    * first_name: nombre del usuario.
    * last_name: appelido del usuario.
    * password: nueva password.
    * blood_type_filter: tipo de sangre que va a ser filtrado.
    * password_message: mensaje de error si es que hubo.
    */
    this.state = {
      openDialog: false,
      donation: null,
      first_name: null,
      last_name: null,
      password: null,
      blood_type_filter: null,
      password_message: null,
      errors: null
    }

    this.props.getUser(auth.headers(), {id: auth.user().id})
  }

  handleClick = (url) => {
    if (this.state.password && this.state.password.length < 8) {
      this.setState({
        password_message: 'The password is too short',
      })
    } else {
      this.setState({
        password_message: null
      })

      const first_name = this.state.first_name || this.props.user.first_name
      const last_name = this.state.last_name || this.props.user.last_name

      this.props.updateUser(
        auth.headers(),
        {id: auth.user().id, first_name: first_name, last_name: last_name, blood_type: this.state.blood_type, password: this.state.password}
      ).catch((error) => {
        setError(error.errors)
      })
      this.setState({
        last_name: null,
        first_name: null,
        password: null,
      })

      this.props.getUser(auth.headers(), {id: auth.user().id})
    }
  }

  setErrors = (errors) => {
    const errorsArray = []

    _.map(errors, (value, key) => {
      key = _.camelCase(key)
      errorsArray.push(key.concat(" ").concat(value[0]))
    })

    this.setState({
      errors: errorsArray
    })
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

  changeFirstName = (event) => {
    this.setState({
      first_name: event.target.value,
    })
  }

  changeLastName = (event) => {
    this.setState({
      last_name: event.target.value,
    })
  }

  changeBloodType = (event) => {
    this.setState({
      blood_type: event.target.value,
    })
  }


  changePassword = (event) => {
    this.setState({
      password: event.target.value,
    })
  }

  handleBloodTypeFilter = (event) => {
    this.setState({
      blood_type_filter: event.target.value,
    })
  }

  render () {
    const { open, title, onLeftIconButtonTouchTap } = this.props

    return (
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img alt="Avatar de usuario" src={avatarImg} />
        </div>

        {this.state.errors &&
          <div className={styles.errors}>
          {this.state.errors && this.state.errors.map((err, idx) => (
            <div className={styles['error']}>
              {err}
            </div>
          ))}
          </div>
        }
        <TextField
          fullWidth
          floatingLabelText={this.props.user && this.props.user.first_name || 'Nombre'}
          hintText={this.state.first_name || ''}
          onChange={(event) => this.changeFirstName(event)}
        />

        <TextField
          fullWidth
          floatingLabelText={this.props.user && this.props.user.last_name || 'Apellido'}
          hintText={this.state.last_name || ''}
          onChange={(event) => this.changeLastName(event)}
        />

        <TextField
          type='password'
          fullWidth
          hintText={this.state.password}
          errorText={this.state.password_message}
          floatingLabelText="New Password"
          onChange={(event) => this.changePassword(event)}
        />

        <RaisedButton
          label="Submit"
          primary={true}
          className={styles['button']}
          onClick={(event) => this.handleClick(event)}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    donations: state.donations.my_donations,
    user: state.auth.user
  }
}
function mapDispatchToProps (dispatch) {
  return {
    updateUser: bindActionCreators(updateUser, dispatch),
    getUser: bindActionCreators(getUser, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
