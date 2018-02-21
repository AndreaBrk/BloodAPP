import React        from 'react'
import cx           from 'classnames'
import styles       from './styles.css'

/**
 * Componente simple en el que se renderizan las rutas hijas.
 * Su utilidad es meramente para facilitar los estilos y funcionar como layout.
 */
export default class AppContent extends React.Component {
  render () {
    const { children, location } = this.props

    const isProfile = location.pathname === '/profile'

    return (
      <div className={cx(styles.content, isProfile && styles.profile)}>
        {children}
      </div>
    )
  }
}
