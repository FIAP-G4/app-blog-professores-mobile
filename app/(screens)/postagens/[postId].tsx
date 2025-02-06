import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native'
import usePost from '@/app/utils/hooks/usePost'
import styles from './styles'
import CardPost from '@/app/components/CardPost'

const SinglePost = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>()
  const { post, error } = usePost(postId)

  return (
    <SafeAreaView style={[styles.screen, { flex: 1 }]}>
      {post ? (
        <CardPost {...post} />
      ) : error ? (
        <Text>Postagem não encontrada!</Text>
      ) : null}
    </SafeAreaView>
  )
}

export default SinglePost
