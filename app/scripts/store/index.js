import { applyMiddleware, createStore, compose } from 'redux'
import Immutable from 'immutable'

import { combineReducers } from 'redux-immutable'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import rootSagas from '../sagas'
import rootReducer from '../reducers'

const reducer = combineReducers({ ...rootReducer, routing: routerReducer })
const sagaMiddleware = createSagaMiddleware()

const InitialState = Immutable.Map()
const newStore = (initialState = InitialState) => {
  const createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory))
  )(createStore)

  const store = createStoreWithMiddleware(reducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  sagaMiddleware.run(rootSagas)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default newStore()
