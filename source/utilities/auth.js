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
  headers: () => {
    if (!hasLocalStorage()) { return false; }
    let headers = {
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    return headers;
  },
  roles: () => {
    if (!hasLocalStorage()) { return false; }
    let roles = localStorage.getItem('roles')
    if (roles) {
      return JSON.parse(roles)
    } else {
      return null;
    }
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
  all: () => {
    if (!hasLocalStorage()) { return false; }
    return {
      authToken: localStorage.getItem('authToken'),
      user: JSON.parse(localStorage.getItem('user'))
    };
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
  checkAdmin: () => {
    if (!hasLocalStorage()) { return false; }

    if (auth.user()) {
      let isAdmin = false
      _.map(auth.roles(), (role) => {
        let user = auth.user()
        if (role.name == 'admin') {
          isAdmin = true
        }
      })
      return isAdmin
    }
  },
  checkOperationsManager: () => {
    if (!hasLocalStorage()) { return false; }

    if (auth.user()) {
      let isAdmin = false
      _.map(auth.roles(), (role) => {
        let user = auth.user()
        if (role.name == 'sales_manager') {
          isAdmin = true
        }
      })
      return isAdmin
    }
  },
  checkSalesManager: () => {
    if (!hasLocalStorage()) { return false; }

    if (auth.user()) {
      let isAdmin = false
      _.map(auth.roles(), (role) => {
        let user = auth.user()
        if (role.name == 'operation_manager') {
          isAdmin = true
        }
      })
      return isAdmin
    }
  },
  checkController: () => {
    if (!hasLocalStorage()) { return false; }
    
    if (auth.user()) {
      let isControler = false
      _.map(auth.roles(), (role) => {
        let user = auth.user()
        if (role.name == 'controller') {
          isControler = true
        }
      })
      return isControler
    }
  },
  isSessionExpired: () => {
    let currentDate = new Date();
    let sessionDate = new Date( auth.timeSession())
    if (currentDate.getTime() >= sessionDate) {
      auth.clear()
      return true
    }
    return false
  }
};

export function requireAuth (store, nextState, replace, next) {
  if (!store.getState().auth.user) {
    replace('/login');
  }

  next();
}
