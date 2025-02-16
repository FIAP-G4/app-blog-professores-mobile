import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, ScrollView, Text } from 'react-native'
import usePost from '@/app/utils/hooks/usePost'
import styles from './styles'
import PostDetails from '@/app/components/PostDetails'
import Toast from 'react-native-toast-message'
// import CommentSection from '@/app/components/CommentSection'

const SinglePost = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>()
  const { post, error } = usePost(postId)

  return (
    <SafeAreaView style={[styles.screen, { flex: 1 }]}>
      {post ? (
        <FlatList
          data={[post]}
          renderItem={({ item }) => <PostDetails {...item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : error ? (
        <Text>Postagem não encontrada!</Text>
      ) : null}
      <Toast />
    </SafeAreaView>
  )
}

export default SinglePost
