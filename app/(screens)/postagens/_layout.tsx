import { Slot, usePathname, useSegments } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

export default function PostsLayout() {
  // const pathName = usePathname()
  // const segments = useSegments()
  // const screenName =
  //   segments.length > 1
  //     ? segments.slice(-1)[0].charAt(0).toUpperCase() +
  //       segments.slice(-1)[0].slice(1)
  //     : pathName.charAt(1).toUpperCase() + pathName.slice(2)

  return (
    <>
      <View style={styles.subHeader}>
        <Text style={styles.pageTitle}>Postagens</Text>
      </View>
      <Slot />
    </>
  )
}
