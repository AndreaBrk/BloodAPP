import React            from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar           from '../../components/AppBar';
import AppMenu          from '../../components/AppMenu';
import AppContent       from '../../components/AppContent';
import styles           from './styles.css';


// // This is required by material-ui:
// // https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.state = {
      menuOpen: false,
      title: 'My Application'
    };
  }

  handleMenuToggle () {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  changeTitle = (title) => {
    this.setState({
      title
    })
  }

  render () { 
    let { children } = this.props;

    return (
      <MuiThemeProvider>
        <div className={styles.app}>
          <AppBar
            title={this.state.title}
            onLeftIconButtonTouchTap={this.handleMenuToggle}
          />

          <AppMenu
            {...this.props}
            title={''}
            open={this.state.menuOpen}
            onLeftIconButtonTouchTap={this.handleMenuToggle}
          />

          <AppContent changeTitle={this.changeTitle}>
            { children }
          </AppContent>
        </div>
        {'adjnaksdnal jkdlsa'}
      </MuiThemeProvider>
    );
  }
}
