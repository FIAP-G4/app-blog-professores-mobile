import React from 'react'
import {
  Slot,
  usePathname,
  useSegments,
  useRouter,
  useLocalSearchParams,
} from 'expo-router'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'

export default function PostsLayout() {
  const pathName = usePathname() || '' // Garante que pathName nunca seja undefined
  const segments = useSegments() as string[]
  const params = useLocalSearchParams()
  const router = useRouter()

  // Verifica se há um postId válido nos segmentos (evita 'undefined')
  const segmentCheck =
    segments.length >= 3 &&
    segments.includes('[postId]') &&
    !pathName.includes('undefined')

  console.log('Path name:', pathName)
  console.log('Has pathname:', pathName.includes('undefined'))
  console.log('Params:', params)
  console.log('Has Segment:', segmentCheck)
  console.log('Segments:', segments)
  console.log('Segment length:', segments.length)

  return (
    <>
      <View style={styles.subHeader}>
        <Text style={styles.pageTitle}>
          {segmentCheck ? 'Postagem' : 'Postagens'}
        </Text>
        {segmentCheck && (
          <TouchableOpacity onPress={() => router.replace('/postagens')}>
            <Text>Voltar</Text>
          </TouchableOpacity>
        )}
      </View>
      <Slot />
    </>
  )
}
