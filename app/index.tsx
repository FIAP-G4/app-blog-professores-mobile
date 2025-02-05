import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

const Index = (): JSX.Element => {
  const router = useRouter()
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 2000 })
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 2000 })
      setTimeout(() => {
        router.replace('/postagens')
      }, 2000)
    }, 2000)
  }, [opacity, router])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <View style={styles.screen}>
      <Animated.View style={animatedStyle}>
        <Image
          style={styles.image}
          source={require('../assets/images/logo.png')}
        />
        <Text style={styles.h1}>Blog Escolar</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#212836',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    marginTop: 30,
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    objectFit: 'cover',
  },
})

export default Index
