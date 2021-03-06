/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {NavigationActions} from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
})

export default class Chat extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Chat!
        </Text>
        <Text style={styles.instructions} onPress={() =>this.props.navigation.navigate('Profile')}>
          Go forward
        </Text>
        <Text style={styles.instructions} onPress={()=> this.props.navigation.dispatch(resetAction)}>
          Back to Home
        </Text>
      </View>
    );
  }
}
//this.props.navigation.navigate('FourthScreen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'slategray',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    color: '#fff'
  },
});
