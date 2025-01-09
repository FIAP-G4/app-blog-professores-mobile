import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'

import {
  Image,
  Text,
  View,
  Animated,
  StyleSheet,
  useAnimatedValue,
} from 'react-native'

export default function Index(): JSX.Element {
  const router = useRouter()
  const opacity = useAnimatedValue(0)

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          router.replace('/login')
        }, 500)
      })
    })
  }, [opacity])

  return (
    <View style={styles.screen}>
      <Animated.View style={{ opacity: opacity }}>
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
