import React                     from 'react';
import { connect }               from 'react-redux';
import { bindActionCreators }    from 'redux';
import {
  resetPassword,
}                                from 'actions/auth';
import styles                    from './styles.css';
import _                         from 'lodash';
import Paper                     from 'material-ui/Paper';
import TextField                 from 'material-ui/TextField';
import RaisedButton              from 'material-ui/RaisedButton';
import { List, ListItem }        from 'material-ui/List';
import { auth }                  from 'utilities/auth';
import { generateApiUrl }        from 'api/system'
import FlatButton                from 'material-ui/FlatButton';
import { blue500 }               from 'material-ui/styles/colors';
// import bg from './pattern.svg';
import { debuglog }              from 'util';


class ResetPass extends React.Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    let { auth } = this.props;
    if (auth.user) {
      this.props.history.push('/dashboard');
    }
    this.state = {
      email: null,
      errors: null,
      messages: null
    };
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
    const email = this.state.email;
    let err = null
    if (!email) {
      err = ['Email y Contraseña son requeridos']
      this.setState({
        errors: err
      })
    } else {
      this.setState({
        errors: err
      })
      const creds = { email: email};
      this.props.resetPassword(creds)
      .catch((errors) => {
        this.setErrors(errors.errors)
      })
      this.setMessage("Se le ha enviado un mensaje, revise su casilla de emails")
    }
  }

  setMessage = (message) => {
    this.setState({
      messages: [message]
    })
  }

  setErrors = (errors) => {
    let error_a = []
    _.map(errors, (value, key) => {
      key = _.camelCase(key)
      error_a.push(key.concat(" ").concat(value[0]))
    });
    this.setState({
      errors: error_a
    })
  }

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };



  render () {

    return (
      <div className={styles['image-body']} >
        <div className={styles.box}>
          <Paper className={styles.paper} zDepth={2}>
            <h3>Registrate</h3>

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
              type='email'
              hintText="Email"
              fullWidth
              className={styles.field}
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
          </Paper>

          <div className={styles.actions}>
            <RaisedButton
              label="Enviar Email"
              style={{ height: 45 }}
              backgroundColor={blue500}
              labelColor={"#fff"}
              className={styles['button']}
              onClick={(event) => this.handleClick(event)}
            />
          </div>

          <div className={styles.actions}>
            <RaisedButton
              label="Ir a Login"
              style={{ height: 45 }}
              backgroundColor={blue500}
              labelColor={"#fff"}
              className={styles['button']}
              onClick={(event) => this.props.history.push('/login')}
            />
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    resetPassword: bindActionCreators(resetPassword, dispatch),

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPass);

