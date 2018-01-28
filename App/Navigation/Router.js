// import React from 'react';
// import { View, Text } from 'react-native';
// import { StackNavigator } from 'react-navigation';

// const HomeScreen = ({ navigation }) => (
//   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     <Text>Home Screen</Text>
//     <Text onPress ={() => navigation.navigate('Details')}>Next</Text>
//   </View>
// );

// const DetailsScreen = () => (
//   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     <Text>Details Screen</Text>
//   </View>
// );

// const RootNavigator = StackNavigator({
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: {headerTitle: 'Home'},
//   },
//   Details: {
//     screen: DetailsScreen,
//     navigationOptions: {headerTitle: 'Detail'},
//   },
// });

// export default RootNavigator;
import {StackNavigator} from 'react-navigation'
import HomeScreen from '../Containers/Home'
import SettingsScreen from '../Containers/Settings'
import ChatScreen from '../Containers/Chat'
import ProfileScreen from '../Containers/Profile'
import{Animated,Easing} from 'react-native'

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps
      const toIndex = index
      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      })

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1],
      })

      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      })  

      // Since we want the card to take the same amount of time 
      // to animate downwards no matter if it's 3rd on the stack 
      // or 53rd, we interpolate over the entire range 
      // from 0 - thisSceneIndex
    
      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      })


      const slideFromRight = { transform: [{ translateX }] }
      const slideFromBottom = { transform: [{ translateY }] }
      const fadeIn = {opacity}
      const fadeInWithScale = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }  
      // Find the top screen on the stack
      const lastSceneIndex = scenes[scenes.length - 1].index
      console.log(lastSceneIndex,toIndex,"lastSceneIndex")  
      // Test whether we're skipping back more than one screen
      if (lastSceneIndex - toIndex > 1) {
        // Do not transform the screen being navigated to
        if (scene.index === toIndex) return
        // Hide all screens in between  
        if (scene.index !== lastSceneIndex) return { opacity: 0 }
        // Slide top screen down
        return slideFromBottom
      }

      //return fadeIn
      //return fadeInWithScale
      //return slideFromBottom
      return slideFromRight
    },
  }
}
const App = StackNavigator({
  Home: { 
  	screen: HomeScreen,
  	navigationOptions: {
      title: 'Home',
      headerStyle:{backgroundColor: 'cadetblue'},
      headerTitleStyle : {color: '#fff'},
    },
  },
  Settings: { 
  	screen: SettingsScreen,
  	navigationOptions:{
      title: 'Settings',
      headerStyle:{backgroundColor: 'mediumpurple'},
      headerTitleStyle : {color: '#fff'},
      headerTintColor  :  '#fff', 
    },
  },
  Chat: { 
  	screen: ChatScreen,
  	navigationOptions: {
      title: 'Chat',
      headerStyle:{backgroundColor: '#cc0000'},
      headerTitleStyle : {color: '#fff'},
      headerTintColor  :  '#fff', 
    }
  },
  Profile: { 
    screen: ProfileScreen,
    navigationOptions: {
      title: 'Profile',
      headerStyle:{backgroundColor: 'lightseagreen'},
      headerTitleStyle : {color: '#fff'},
      headerTintColor  :  '#fff', 
    }
  },
 
},{
  initialRouteName: 'Home',
  transitionConfig,
})
export default App