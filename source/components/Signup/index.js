import React                     from 'react'
import { connect }               from 'react-redux'
import { bindActionCreators }    from 'redux'
import {
  signUp,
}                                from 'actions/auth'
import styles                    from './styles.css'
import _                         from 'lodash'
import Paper                     from 'material-ui/Paper'
import TextField                 from 'material-ui/TextField'
import RaisedButton              from 'material-ui/RaisedButton'
import { List, ListItem }        from 'material-ui/List'
import auth                      from 'auth'
import FlatButton                from 'material-ui/FlatButton'
import { blue500 }               from 'material-ui/styles/colors'
// import bg from './pattern.svg'
import { debuglog }              from 'util'

/**
 * Componente encargado de registrar un nuevo usuario.
*/
class Signup extends React.Component {
  componentWillMount () {
    const { auth } = this.props
    if (auth.user) {
      this.props.history.push('/dashboard')
    }
    this.state = {
      email: null,
      password: null,
      errors: null,
      first_name: null,
      last_name: null,
      messages: null
    }
  }

  onLoginClick (creds) {
    this.props.loginUser(creds)
    .catch(err => {
      this.setState({
        errors: [err.toString()]
      })
    })
  }

  handleClick (event) {
    const email = this.state.email
    const password = this.state.password
    const last_name = this.state.last_name
    const first_name = this.state.first_name
    let err = null
    if (!email || !password || !last_name || !first_name) {
      err = ['El Nombre, Appelido, Email y Contraseña son requeridos']
      this.setState({
        errors: err
      })
    } else {
      this.setState({
        errors: err
      })
      const creds = { first_name: first_name, last_name: last_name, email: email, password: password }
      this.props.signUp(creds)
      .then((e) => {
        this.setMessage("Se le ha enviado un mensaje, revise su casilla y confirme el email")
      })
      .catch((errors) => {
        this.setErrors(errors.errors)
      })
    }
  }

  setMessage = (message) => {
    this.setState({
      messages: [message]
    })
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

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    })
  }

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    })
  }

  handleChangeName = (event) => {
    this.setState({
      first_name: event.target.value,
    })
  }

  handleChangeLastName = (event) => {
    this.setState({
      last_name: event.target.value,
    })
  }

  handleClickRecover = (url) => {
    this.props.history.push('/recover_password')
  }

  checkLogin() {
    if (auth.user()) {
      this.props.history.push('/dashboard')
    }
  }

  render () {

    return (
      <div className={styles['image-body']}  onEnter={this.checkLogin()}>
        <div className={styles.box}>
          <Paper className={styles.paper} zDepth={2}>
            <h3>Registrarme</h3>

            {this.state.errors &&
            <div className={styles.errors}>
            {this.state.errors && this.state.errors.map((err, idx) => (
              <div className={styles['error']}>
                {err}
              </div>
            ))}
            </div>
            }

            {this.state.messages &&
            <div className={styles.successful}>
            {this.state.messages && this.state.messages.map((mes, idx) => (
              <div className={styles['successful']}>
                {mes}
              </div>
            ))}
            </div>
            }
            <TextField
              hintText="Nombre"
              fullWidth
              className={styles.field}
              value={this.state.first_name}
              onChange={this.handleChangeName}
            />

            <TextField
              hintText="Apellido"
              fullWidth
              className={styles.field}
              value={this.state.last_name}
              onChange={this.handleChangeLastName}
            />

            <TextField
              type='email'
              hintText="Email"
              fullWidth
              className={styles.field}
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />

            <TextField
              type='password'
              hintText="Contraseña"
              fullWidth
              className={styles.field}
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </Paper>

          <div className={styles.actions}>
            <RaisedButton
              label="Enviar"
              style={{ height: 45 }}
              backgroundColor={blue500}
              labelColor={"#fff"}
              className={styles['button']}
              onClick={(event) => this.handleClick(event)}
            />
          </div>

          <ul className={styles['extra-links']}>
            <li>¿Ya recuerdas tu datos de inicio? <a onClick={(event) => this.props.history.push('/login')}>Volver al login</a></li>
          </ul>
        </div>
      </div>
    )
  }
}


function mapStateToProps (state) {
  return {
    auth: state.auth,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    signUp: bindActionCreators(signUp, dispatch),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)

