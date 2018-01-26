import {StackNavigator} from 'react-navigation'
import FirstScreen from '../Containers/FirstScreen'
import SecondScreen from '../Containers/SecondScreen'
import ThirdScreen from '../Containers/ThirdScreen'
import{Animated,Easing} from 'react-native'

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(2)),
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

      // Since we want the card to take the same amount of time 
      // to animate downwards no matter if it's 3rd on the stack 
      // or 53rd, we interpolate over the entire range 
      // from 0 - thisSceneIndex
      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      })

      const slideFromRight = { transform: [{ translateX }] }
      const slideFromBottom = { transform: [{ translateY }] }

      // Find the top screen on the stack
      const lastSceneIndex = scenes[scenes.length - 1].index

      // Test whether we're skipping back more than one screen
      if (lastSceneIndex - toIndex > 1) {
        // Do not transoform the screen being navigated to
        if (scene.index === toIndex) return
        return slideFromBottom
      }

      return slideFromRight
    },
    // screenInterpolator: sceneProps => {
    //   const { position, layout, scene, index, scenes } = sceneProps

    //   const thisSceneIndex = scene.index
    //   const height = layout.initHeight
    //   const width = layout.initWidth

    //   // We can access our navigation params on the scene's 'route' property
    //   var thisSceneParams = scene.route.params || {}

    //   const translateX = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    //     outputRange: [width, 0, 0]
    //   })

    //   const translateY = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    //     outputRange: [height, 0, 0]
    //   })

    //   const opacity = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
    //     outputRange: [0, 1, 1],
    //   })

    //   const scale = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    //     outputRange: [4, 1, 1]
    //   })

    //   const slideFromRight = { transform: [{ translateX }] }
    //   const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
    //   const slideInFromBottom = { transform: [{ translateY }] }

    //   if (thisSceneParams.plain) return slideFromRight
    //   else if (index < 5) return slideInFromBottom
    //   else return scaleWithOpacity
    // },
    // screenInterpolator: sceneProps => {  
    //   console.log(sceneProps,"sceneProps")    
    //   const { layout, position, scene } = sceneProps

    //   const thisSceneIndex = scene.index
    //   const width = layout.initWidth
    //   const height = layout.initHeight

    //   /*const translateX = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex],
    //     outputRange: [width, 0],
    //   })*/
    //   const opacity = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
    //     outputRange: [0, 1, 1],
    //   })
    //    const scale = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    //     outputRange: [4, 1, 1]
    //   })
    //   /*const translateY = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    //     outputRange: [height, 0, 0]
    //   })*/
    //   /*const opacity = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex],
    //     outputRange: [0, 1],
    //   })*/
    //  // return { opacity } 
    //   //return { transform: [ { translateX } ] }
    //   //return { transform: [ { translateY } ] }
    //   return { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
    // },
  }
}
const App = StackNavigator({
  FirstScreen: { 
  	screen: FirstScreen,
  	navigationOptions: ({navigation}) => ({
      title: 'First Screen',
    }),
  },
  SecondScreen: { 
  	screen: SecondScreen,
  	navigationOptions: ({navigation}) => ({
      title: 'Second Screen',
    }),
  },
  ThirdScreen: { 
  	screen: ThirdScreen,
  	navigationOptions: ({navigation}) => ({
      title: 'Third Screen',
    }),
  },
 
},{
  initialRouteName: 'FirstScreen',
  transitionConfig,
})
export default App