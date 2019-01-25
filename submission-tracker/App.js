import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import reducer from './reducer';
import Submissions from './components/Submissions';
import Form from './components/Form';

const client = axios.create({
  baseURL: 'http://192.168.92.247:3000',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const Tabs = createBottomTabNavigator({
  Submissions: { screen: Submissions },
  Form: { screen: Form }
})

const AppContainer = createAppContainer(Tabs);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  }
});