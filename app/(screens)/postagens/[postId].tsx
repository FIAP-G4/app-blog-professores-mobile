import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Image } from 'react-native'
import usePost from '@/app/utils/hooks/usePost'
import styles from './styles'
import postStyle from '@/app/components/CardPost/styles'
import formattedDate from '@/app/utils/functions/formattedDate'

const SinglePost = () => {
  const baseApiUrl = process.env.EXPO_PUBLIC_CORS_ORIGIN
  const { postId } = useLocalSearchParams<{ postId: string }>()
  const { post, error } = usePost(postId)
  return (
    <SafeAreaView style={[styles.screen, { flex: 1 }]}>
      {post ? (
        <View style={postStyle.card}>
          {post.path_img && (
            <View>
              <Image
                source={{ uri: `${baseApiUrl}/${post.path_img}` }}
                style={postStyle.cardImage}
                alt={post.title}
              />
            </View>
          )}
          <View style={postStyle.cardContentPadding}>
            <Text style={postStyle.cardTitle}>{post.title}</Text>
            <Text style={postStyle.authorName}>{post.teacher?.user?.name}</Text>
            <Text style={postStyle.cardContent}>{post.content}</Text>
            <View style={postStyle.cardTagsWrapper}>
              {post.tags &&
                post.tags.map((tag) => (
                  <Text key={tag.id} style={postStyle.cardTags}>
                    {tag.name}
                  </Text>
                ))}
            </View>
            <View
              style={[
                postStyle.displayFlex,
                { justifyContent: 'space-between' },
              ]}
            >
              {post.created_at && (
                <View>
                  <Text style={postStyle.cardDate}>
                    {formattedDate(post.created_at)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      ) : error ? (
        <Text>Postagem não encontrada!</Text>
      ) : null}
    </SafeAreaView>
  )
}

export default SinglePost
