import React                    from 'react';
import AppBar                   from '../../components/AppBar';
import AppMenu                  from '../../components/AppMenu';
import AppContent               from '../../components/AppContent';
import styles                   from './styles.css';

// // This is required by material-ui:
// // https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends React.Component {

  state = {
    title: 'Blood App',
  }

  changeTitle = (title) => {
    this.setState({
      title
    })
  }

  render () {
    let { children, location } = this.props;

    return (
      <div className={styles.app}>
        <AppBar
          title={this.state.title}
        />

        <AppContent changeTitle={this.changeTitle} location={location}>
          { children }
        </AppContent>
      </div>
    );
  }
}
