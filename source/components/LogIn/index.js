import React                     from 'react';
import { connect }               from 'react-redux';
import { bindActionCreators }    from 'redux';
import {
  loginUser,
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
import { blue500 } from 'material-ui/styles/colors';
// import bg from './pattern.svg';
import { debuglog } from 'util';



// https://github.com/mjrussell/redux-auth-wrapper/blob/master/examples/localStorage/components/Login.js
// https://github.com/auth0-blog/redux-auth/blob/master/components/Login.js
// https://www.sitepoint.com/introduction-to-using-jwt-in-rails/
// http://stackoverflow.com/questions/35381276/redux-async-requests-with-fetch-api

class LogIn extends React.Component {
  constructor (props) {
    super(props)
    // this.props.dispatch({
    //   type: 'CHANGED_TITLE',
    //   data: 'Login'
    // });
  }
  componentWillMount () {
    let { auth } = this.props;
    if (auth.user) {
      this.props.history.push('/dashboard');
    }
    this.state = {
      email: null,
      password: null,
      errors: null
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
    const password = this.state.password;
    let err = null
    if (!email || !password) {
      err = ['Email y Contraseña son requeridos']
      this.setState({
        errors: err
      })
    } else {
      this.setState({
        errors: err
      })
      const creds = { email: email, password: password };
      this.onLoginClick(creds)
    }
  }

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleClickRecover = (url) => {
    this.props.history.push('/recover_password');
  }

  checkLogin() {
    if (auth.user()) {
      this.props.history.push('/dashboard');
    }
  }

  render () {

    return (
      <div className={styles['image-body']}  onEnter={this.checkLogin()}>
        <div className={styles.box}>
          <Paper className={styles.paper} zDepth={2}>
            <h3>Ingresar</h3>

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
            {/*
            <div>
                <FlatButton className={styles['text-reset-pass']}  label="Recover Password" onClick={this.handleClickRecover}/>
            </div>
            */}
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

          <div className={styles.actions}>
            <RaisedButton
              label="Registrarse"
              style={{ height: 45 }}
              backgroundColor={blue500}
              labelColor={"#fff"}
              className={styles['button']}
              onClick={(event) => this.props.history.push('/signup')}
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
    loginUser: bindActionCreators(loginUser, dispatch),

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);

