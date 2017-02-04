// @flow

import React from 'react'
import {Router, browserHistory} from 'react-router'
import {FetchData} from 'redux-fetch-data'
import renderApp from './renderApp'
import configureStore from '../root/configureStore'
import Root from '../root/Root'
import routes from '../root/routes'

export default () => {
  const store = configureStore()

  const rootProps = {
    history: browserHistory,
    store,
    children: (
      <Router
        render={(renderProps) => <FetchData {...renderProps}/>}
        history={browserHistory}
        routes={routes}
      />
    ),
  }

  renderApp(Root, rootProps)

  if (module.hot) {
    // $FlowFixMe
    module.hot.accept('../root/Root', () => {
      const nextRoot = require('../root/Root').default
      renderApp(nextRoot, rootProps)
    })
  }

  if (process.env.NODE_ENV === 'production') {
    require('./enableOfflineMode')
  }
}
