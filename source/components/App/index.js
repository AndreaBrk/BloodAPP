import React                    from 'react'
import { Redirect }             from 'react-router-dom'
import AppBar                   from 'components/AppBar'
import AppContent               from 'components/AppContent'
import styles                   from './styles.css'

// Esto es necesario por material-ui:
// https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

/**
 * Este componente funciona como wrapper de todas las rutas una vez que estamos logeados.
 */
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
    const { children, location } = this.props

    if (location.pathname === '/') {
      return <Redirect to="/dashboard" push />
    }

    return (
      <div className={styles.app}>
        <AppBar
          title={this.state.title}
        />

        <AppContent changeTitle={this.changeTitle} location={location}>
          { children }
        </AppContent>
      </div>
    )
  }
}
