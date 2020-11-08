import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'
import { cos } from 'react-native-reanimated'

const logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('dispatch a function')
    } else {
        console.log(`dispatch a ${action}`)
    }

    const result = next(action)
    console.log('next State', store.getState())
    return result
}

const middlewares = [   
    logger,
    thunk
]

export default createStore(reducers, applyMiddleware(...middlewares))