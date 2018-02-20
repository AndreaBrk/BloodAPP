
const hasLocalStorageSupport = typeof(Storage) !== void(0)

/**
 * Este objeto funciona como namespace para los métodos de autenticación.
 */
export default {
  // Limpia todos los datos de autenticación
  clear: () => {
    if (!hasLocalStorageSupport) { return false }
    localStorage.removeItem('roles')
    localStorage.removeItem('user')
    localStorage.removeItem('access-token')
    localStorage.removeItem('uid')
    localStorage.removeItem('client')
    localStorage.removeItem('time-session')
  },
  /**
   * Establece los datos de autenticación.
   *
   * @param {Object} headers Las cabeceras de la petición.
   * @param {Object} user Los datos del usuario.
   * @param {string[]} roles Los roles del usuario.
   */
  set: (headers, user, roles) => {
    if (!hasLocalStorageSupport) { return false }
    if (!headers || !headers.client || !headers['access-token'] || !headers.uid || !user || !roles) {return false}
    const timeSession = (new Date())
    timeSession.setDate(timeSession.getDate() + 2)
    localStorage.setItem('access-token', headers['access-token'])
    localStorage.setItem('client', headers.client)
    localStorage.setItem('uid', headers.uid)
    localStorage.setItem('time-session', timeSession.getTime())
    localStorage.setItem('roles', JSON.stringify(roles))
    localStorage.setItem('user', JSON.stringify(user))

    return user
  },
  /**
   * Devuelve las cabeceras almacenadas previamente por el método 'set'.
   *
   * @see set
   */
  headers: () => {
    if (!hasLocalStorageSupport) { return false }
    const headers = {
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    return headers
  },
  /**
   * Devuelve los datos del usuario almacenadas previamente por el método 'set'.
   *
   * @see set
   */
  user: () => {
    if (!hasLocalStorageSupport) { return false }
    const user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    } else {
      return user
    }
  },
  /**
   * Devuelve el 'time-session' establecido previamente por el método 'set'.
   * 'time-session' indica la fecha en la que expira la sesión actual.
   *
   * @see set
   */
  timeSession: () => {
    return localStorage.getItem('time-session')
  },
}