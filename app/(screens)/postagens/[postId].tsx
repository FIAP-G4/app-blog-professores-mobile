import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text } from 'react-native'
import usePost from '@/app/utils/hooks/usePost'
import styles from './styles'
import PostDetails from '@/app/components/PostDetails'
// import CommentSection from '@/app/components/CommentSection'

const SinglePost = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>()
  const { post, error } = usePost(postId)

  return (
    <SafeAreaView style={[styles.screen, { flex: 1 }]}>
      {post ? (
        <ScrollView>
          <PostDetails {...post} />
        </ScrollView>
      ) : error ? (
        <Text>Postagem não encontrada!</Text>
      ) : null}
    </SafeAreaView>
  )
}

export default SinglePost
