export function hasLocalStorage (): Boolean {
  return (window.localStorage.length !== undefined);
}

export const auth = {
  clear: () => {
    if (!hasLocalStorage()) { return false; }
    localStorage.removeItem('roles');
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    localStorage.removeItem('uid');
    localStorage.removeItem('client');
    localStorage.removeItem('cltime-sessionient');
  },
  set: (user, headers, roles) => {
    if (!hasLocalStorage()) { return false; }
    if (!headers || !headers.client || !headers['access-token'] || !headers.uid || !user || !roles) {return false}
    let timeSession = (new Date())
    timeSession.setDate(timeSession.getDate() + 2)
    localStorage.setItem('access-token', headers['access-token']);
    localStorage.setItem('client', headers.client);
    localStorage.setItem('uid', headers.uid);
    localStorage.setItem('time-session', timeSession.getTime());
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  },
  setName: (name) => {

  },
  headers: () => {
    if (!hasLocalStorage()) { return false; }
    let headers = {
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    return headers;
  },

  user: () => {
    if (!hasLocalStorage()) { return false; }
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user)
    } else {
      return user
    }
  },
  timeSession: () => {
    return localStorage.getItem('time-session')
  },
  parse: () => {
    if (!hasLocalStorage()) { return false; }
    let token = localStorage.getItem('authToken');

    let segments = token.split('.');
    let dataset = JSON.parse(atob(segments[1]));
  },
};

export function requireAuth (store, nextState, replace, next) {
  if (!store.getState().auth.user) {
    replace('/login');
  }
  next();
}
