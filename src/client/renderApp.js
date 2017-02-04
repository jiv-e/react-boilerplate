// @flow

import {createElement} from 'react'
import {render} from 'react-dom'

import type {RootProps} from '../root/Root'

export default (rootComponent: any, rootProps: RootProps) =>
  render(
    createElement(rootComponent, rootProps),
    document.getElementById('app')
  )
