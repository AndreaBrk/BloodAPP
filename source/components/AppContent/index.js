import React        from 'react';
import cx           from 'classnames';
import styles       from './styles.css';



export default class AppContent extends React.Component {
  state = {
    maxWidth: 980,
    marginTop: 50
  }

  componentDidMount() {
    this.setState({
      maxWidth: this.props.location.pathname === '/profile' ? 400 : 980,
      marginTop: this.props.location.pathname === '/profile' ? '19vh' : 50
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        maxWidth: nextProps.location.pathname === '/profile' ? 400 : 980,
        marginTop: nextProps.location.pathname === '/profile' ? '19vh' : 50
      })
    }
  }

  render () {
    const { children,  } = this.props;
    const { maxWidth, marginTop } = this.state;

    return (
      <div className={cx(styles.content)} style={{ maxWidth, marginTop }}>
        {children}
      </div>
    );
  }
}
