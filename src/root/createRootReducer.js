// @flow

import {combineReducers} from 'redux'
import {reducer as fetchingReducer} from 'redux-fetch-data'
import helloReducer from '../hello/reducer'

import type {Reducer} from '../types'
import type {RootState} from './types'

export default (): Reducer<RootState> =>
  combineReducers({
    fetching: fetchingReducer,
    hello: helloReducer,
  })
