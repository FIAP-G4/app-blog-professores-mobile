import { View, Text, Image, ScrollView } from 'react-native'
import formattedDate from '@/app/utils/functions/formattedDate'
import styles from './styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Post from '@/app/services/posts/IPost'
import CommentSection from '../CommentSection'

const PostDetails = (post: Post): JSX.Element => {
  const baseApiUrl = process.env.EXPO_PUBLIC_CORS_ORIGIN

  const hasImage = !!post.path_img

  return (
    <ScrollView>
      {post.path_img && hasImage && (
        <View style={styles.cardImageWrapper}>
          <Image
            resizeMode='cover'
            source={{ uri: `${baseApiUrl}/${post.path_img}` }}
            style={styles.cardImage}
            alt={post.title}
          />
        </View>
      )}
      <View style={styles.cardContentPadding}>
        <Text style={styles.cardTitle}>{post.title}</Text>
        <Text style={styles.authorName}>{post.teacher?.user?.name}</Text>

        <Text style={styles.cardContent}>{post.content}</Text>
        <View style={styles.cardTagsWrapper}>
          {post.tags &&
            post.tags.map((tag) => (
              <Text key={tag.id} style={styles.cardTags}>
                {tag.name}
              </Text>
            ))}
        </View>
        <View style={[styles.displayFlex, { justifyContent: 'space-between' }]}>
          {post.created_at && (
            <View>
              <Text style={styles.cardDate}>
                {formattedDate(post.created_at)}
              </Text>
            </View>
          )}
          <View style={{ columnGap: 5, display: 'none' }}>
            <Ionicons name='eye-outline' size={24} color='rgb(156, 163, 175)' />
            <Text style={{ color: 'rgb(156, 163, 175)' }}>
              {post.viewedCount}
            </Text>
            <Text style={{ marginHorizontal: 5, color: 'rgb(156, 163, 175)' }}>
              |
            </Text>
            <FontAwesome
              name='comment-o'
              size={24}
              color='rgb(156, 163, 175)'
            />
            <Text style={{ color: 'rgb(156, 163, 175)' }}>
              {post.commentCount}
            </Text>
          </View>
        </View>
      </View>
      <CommentSection key={post.id} post={post} />
    </ScrollView>
  )
}

export default PostDetails
