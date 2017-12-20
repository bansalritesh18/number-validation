import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import { syncHistoryWithStore } from 'react-router-redux'
import 'react-hot-loader/patch'
import 'core-js/shim'
import 'isomorphic-fetch'
import 'classlist-polyfill'

import Root from './containers/Root'
import store from './store'

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing')
  },
})

function renderApp(RootComponent) {
  const target = document.getElementById('react')

  if (target) {
    ReactDOM.render(
      (<AppContainer>
        <RootComponent
          history={history}
          store={store}
        />
      </AppContainer>),
      target,
    )
  }
}

renderApp(Root)
