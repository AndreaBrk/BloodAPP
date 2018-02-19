import React                     from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle }                 from 'material-ui/Toolbar';
import styles                    from './styles.css';
import {
  FlatButton,
  MenuItem,
  IconMenu,
  IconButton
}                                from 'material-ui';
import MoreVertIcon              from 'material-ui/svg-icons/navigation/more-vert';
import SvgIcon                   from 'material-ui/SvgIcon';
import MenuIcon                  from 'material-ui/svg-icons/navigation/menu';
import Notifications             from 'material-ui/svg-icons/social/notifications';
import NavigationExpandMoreIcon  from 'material-ui/svg-icons/navigation/expand-more';
import Person                    from 'material-ui/svg-icons/social/person';
import { auth }                  from 'utilities/auth';
import { connect }               from 'react-redux';
import { logoutUser }            from 'actions/auth';
import { bindActionCreators }    from 'redux';
import {
  withRouter
} from 'react-router-dom'
class AppBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      titleAppBar: this.props.title
    }
  }
  handleClickTitle = () => {
    this.props.history.push('/dashboard');
  }

  logoutUser = () => {
    this.props.logoutUser();
    this.props.history.push('/login');
  }


  logInUser = () => {
    this.props.history.push('/login');
  }

  redirectToProfile = () => {
    this.props.history.push('/profile');
  }


  render () {
    let { title, onLeftIconButtonTouchTap } = this.props;

    return (
      <div className={styles['nav-bar']}>
        <Toolbar className={styles.toolbar}>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle className={styles['menu-title']} text={<a onClick={this.handleClickTitle}>Dashboard</a>} />
          </ToolbarGroup>
          <ToolbarGroup >
          </ToolbarGroup>
          <ToolbarGroup>
            <IconMenu
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              iconButtonElement={
                <IconButton touch={false}>
                  <Notifications color="#fff" />
                </IconButton>
              }
            >
            </IconMenu>
            <IconMenu
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              iconButtonElement={
                <IconButton touch={true}>
                  <Person color="#fff" />
                </IconButton>
              }
            >

            {auth.user() ?
            [
              <MenuItem key="profile" onClick={this.redirectToProfile} primaryText="Mi perfil" />,
              <MenuItem key="log-out" onClick={this.logoutUser} primaryText="Log Out" />
            ]
            :
            <MenuItem onClick={this.logInUser} primaryText="Log In" />
            }
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}



function mapDispatchToProps (dispatch) {
  return {
    logoutUser: bindActionCreators(logoutUser, dispatch)
  };
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(AppBar)
)