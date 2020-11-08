/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import AppNavigator from './navigators/AppNavigator'
import store from './store'
import { Provider } from 'react-redux'

export default class App extends Component {

  render() {
    // console.log('store aaa', store)
    return <Provider store={store}>
      <AppNavigator />
    </Provider>
  }
}


