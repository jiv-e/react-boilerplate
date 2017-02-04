// @flow

import React from 'react'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'

export type RootProps = {
  store: mixed,
  children?: mixed
}

const Root = ({store, children}: RootProps) =>
  <AppContainer key={Math.random()}>
    <Provider store={store}>
      {children}
    </Provider>
  </AppContainer>

export default Root
