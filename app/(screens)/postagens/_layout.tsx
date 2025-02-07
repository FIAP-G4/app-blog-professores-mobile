import React from 'react'
import { Slot, usePathname, useSegments, useRouter } from 'expo-router'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import Feather from '@expo/vector-icons/Feather'

export default function PostsLayout() {
  const pathName = usePathname() || '' 
  const segments = useSegments() as string[]
  const router = useRouter()

  const segmentCheck =
    segments.length >= 3 &&
    segments.includes('[postId]') &&
    !pathName.includes('undefined')

  return (
    <>
      <View style={styles.subHeader}>
        <Text style={styles.pageTitle}>
          {segmentCheck ? 'Postagem' : 'Postagens'}
        </Text>
        {segmentCheck && (
          <TouchableOpacity
            style={[
              styles.btnWrapper,
              {
                backgroundColor: 'transparent',
                flexDirection: 'row',
                columnGap: 5,
              },
            ]}
            onPress={() => router.navigate('/postagens')}
          >
            <Feather name="arrow-left" size={24} color="black" />
            <Text>Voltar</Text>
          </TouchableOpacity>
        )}
      </View>
      <Slot />
    </>
  )
}
