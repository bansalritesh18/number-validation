import { createBrowserHistory as createHistory } from 'history'

let _history = createHistory()

export default {
  bind: (history) => {
    _history = history
  },
  push: (...args) => _history.push(...args),
  goBack: (...args) => _history.goBack(...args),
  listen: (...args) => _history.listen(...args),
  replace: (...args) => _history.replace(...args),
}
