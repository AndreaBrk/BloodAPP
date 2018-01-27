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
import { history }                from 'store';



class AppBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      titleAppBar: this.props.title
    }
  }
  handleDashboard = () => {
    history.push('/');
  }
  
  logoutUser = () => {
    debugger
    this.props.logoutUser();
    history.push('/login');
  }


  logInUser = () => {  
    history.push('/login');
  }
  redirectToProfile = () => {
    history.push('/profile');
  }
  

  render () {
    let { title, onLeftIconButtonTouchTap } = this.props;

    return (
      <div>
        <Toolbar className={styles['menuButton']}>
          <ToolbarGroup className={styles['menuButtonChild']} firstChild={true}>
              <FlatButton
                className={styles['menu-button']}
                onTouchTap={onLeftIconButtonTouchTap}
                icon={<MenuIcon />}
              />
            {/* <ToolbarTitle className={styles['menuButtonChild']} onClick={this.handleDashboard} text="Kubikware"/> */}
            <ToolbarTitle  className={styles['menu-title']} text={this.state.titleAppBar} />
          </ToolbarGroup>
          <ToolbarGroup >
          </ToolbarGroup>
          <ToolbarGroup>
            <IconMenu
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              iconButtonElement={
                <IconButton touch={false}>
                  <Notifications />
                </IconButton>
              }
            >
              <MenuItem primaryText="Please take a minute to complete the standup" />
            </IconMenu>
            <IconMenu
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              iconButtonElement={
                <IconButton touch={true}>
                  <Person />
                </IconButton>
              }
            >
            {!auth.user &&
              <MenuItem onClick={this.logInUser} primaryText="Log In" />
            }
            {auth.user &&
              [<MenuItem onClick={this.redirectToProfile} primaryText="User Profile" />,
              <MenuItem onClick={this.logoutUser} primaryText="Log Out" />]
              // <MenuItem onClick={this.redirectToProfile} primaryText="User Profile" />
              // <MenuItem onClick={this.logoutUser} primaryText="Log out" />
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

export default connect(
  null,
  mapDispatchToProps
)(AppBar);