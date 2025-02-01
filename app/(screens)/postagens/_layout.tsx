import { Slot } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

export default function PostsLayout() {
  return (
    <>
      <View style={styles.subHeader}>
        <Text style={styles.pageTitle}>Postagens</Text>
      </View>
      <Slot />
    </>
  )
}
