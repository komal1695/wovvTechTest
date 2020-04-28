/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Screens 
import Home from "./Screens/Home";
import EnterdId from "./Screens/EnterdId";
import RandomId from "./Screens/RandomId";


const AppNavigator = createStackNavigator(
  {
    Home: Home,
    EnterdId: EnterdId,
    RandomId: RandomId
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home'
  }
)


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }

}
