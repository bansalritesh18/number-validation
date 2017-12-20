import { push, goBack as pop } from 'react-router-redux'

import { ActionTypes } from '../constants/index'

export function goTo(pathname, options = {}) {
  return push({
    pathname,
    search: options.search,
    state: options.state,
  })
}

export function goBack() {
  return pop()
}
