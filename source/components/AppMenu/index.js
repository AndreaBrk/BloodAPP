import React                    from 'react';
import {
  Drawer,
}                                from 'material-ui';
import { default as MuiAppBar } from 'material-ui/AppBar';
import styles                    from './styles.css';
import { connect }               from 'react-redux';
import { logoutUser }            from 'actions/auth';
import { bindActionCreators }    from 'redux';


class AppMenu extends React.Component {
  constructor (props) {
    super(props);
  }

  handleClick = (url) => {
    this.props.onLeftIconButtonTouchTap()
    this.props.router.push(url);
  }

renderIndex = () => {
  this.props.router.push('/index')
}
  render () {
    let { open, title, onLeftIconButtonTouchTap } = this.props;

    return (
      <Drawer 
        open={open} 
        docked={false}
      >
        <MuiAppBar
          title={title}
          onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
          className={styles['menu']}
        />
      </Drawer>
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
)(AppMenu);