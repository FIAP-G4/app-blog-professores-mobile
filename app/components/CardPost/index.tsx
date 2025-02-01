import { View, Text, Image } from 'react-native'
import formattedDate from '@/app/utils/functions/formattedDate'
import styles from './styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Post from '@/app/services/posts/IPost'

const CardPost = (props: Partial<Post>): JSX.Element => {
  const {
    id,
    title,
    content,
    path_img,
    tags,
    created_at,
    teacher,
    viewedCount,
    commentCount,
  } = props
  const baseApiUrl = process.env.EXPO_PUBLIC_CORS_ORIGIN

  return (
    <View key={id} style={styles.card}>
      {path_img && (
        <View>
          <Image
            source={{ uri: `${baseApiUrl}/${path_img}` }}
            style={styles.cardImage}
          />
        </View>
      )}
      <View style={styles.cardContentPadding}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.authorName}>{teacher?.user?.name}</Text>
        <Text style={styles.cardContent}>{content}</Text>
        <View style={styles.cardTagsWrapper}>
          {tags &&
            tags.map((tag) => (
              <Text key={tag.id} style={styles.cardTags}>
                {tag.name}
              </Text>
            ))}
        </View>
        <View style={[styles.displayFlex, { justifyContent: 'space-between' }]}>
          {created_at && (
            <View>
              <Text style={styles.cardDate}>{formattedDate(created_at)}</Text>
            </View>
          )}
          <View style={[styles.displayFlex, { columnGap: 5 }]}>
            <Ionicons name='eye-outline' size={24} color='rgb(156, 163, 175)' />
            <Text style={{ color: 'rgb(156, 163, 175)' }}>{viewedCount}</Text>
            <Text style={{ marginHorizontal: 5, color: 'rgb(156, 163, 175)' }}>
              |
            </Text>
            <FontAwesome
              name='comment-o'
              size={24}
              color='rgb(156, 163, 175)'
            />
            <Text style={{ color: 'rgb(156, 163, 175)' }}>{commentCount}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CardPost
