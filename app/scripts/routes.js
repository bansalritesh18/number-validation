import { Login, NotFound, Dashboard, Signup } from './containers'

function onEnter(nextState, transition, callback) {
  const { pathname } = nextState.location
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  if (isLoggedIn) {
    if (pathname === '/') {
      transition('/dashboard')
    }
  }
  else {
    if (pathname === '/dashboard') {
      transition('/')
    }
  }
  return callback() // go as it is.
}

export const routes = [
  {
    path: '/',
    component: Login,
    onEnter,
  },
  {
    path: '/signup',
    component: Signup,
    onEnter,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    onEnter,
  },
  {
    path: '*',
    component: NotFound,
    childRoutes: [],
  },
]
