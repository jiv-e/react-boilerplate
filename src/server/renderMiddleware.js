import debug from 'debug'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import {fetchDataOnServer} from 'redux-fetch-data'
import configureStore from '../root/configureStore'
import routes from '../root/routes'
import Root from '../root/Root'
import Page from './Page'

const log = debug('server:renderMiddleware')

const renderPage = (assets, component, initialState) => {
  try {
    return `<!doctype html>${renderToString(<Page assets={assets} component={component} initialState={initialState}/>)}`
  } catch (e) {
    console.error('Failed to render markup with error: "%s"\n===>', e.message, e)
  }
}

export default (assets) => (req, res) => {
  const store = configureStore()
  const history = createMemoryHistory(req.originalUrl)

  match({routes, location: req.url, history}, (err, redirect, renderProps) => {
    log('route', req.url)

    if (!renderProps) {
      return
    }

    log('fetching data')

    fetchDataOnServer(renderProps, store).then(() => {
      if (err) {
        res.status(500).send(err.message)
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search)
      } else if (renderProps) {
        log('rendering...')

        const component = (
          <Root store={store} key="root">
            <RouterContext {...renderProps}/>
          </Root>
        )

        log('sending response...')

        res.status(200).send(renderPage(assets, component, store.getState()))
      } else {
        res.status(404).send('Not found.')
      }
    })
  })
}
