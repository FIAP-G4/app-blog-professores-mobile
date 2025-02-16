import { Link } from 'expo-router'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import formattedDate from '@/app/utils/functions/formattedDate'
import styles from './styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Post from '@/app/services/posts/IPost'
import { usePostViewed } from '@/app/utils/hooks/usePostViewed'
import { useAuth } from '@/context/AuthContext'

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
  const { handlePostViewed } = usePostViewed()
  const { isStudent } = useAuth()
  const baseApiUrl = process.env.EXPO_PUBLIC_CORS_ORIGIN
  const hasImage = !!path_img

  const handleCardClick = async (
    id: string | undefined,
    isStudent: boolean,
  ) => {
    try {
      await handlePostViewed(isStudent, id)
    } catch (error) {
      console.error('Erro ao marcar post como visualizado:', error)
    }
  }

  return (
    <Link
      key={id}
      id={id}
      style={styles.card}
      href={`/postagens/${id}`}
      onPress={() => {
        handleCardClick(id, isStudent)
      }}
    >
      <View style={styles.container}>
        {path_img && (
          <View style={styles.cardImageWrapper}>
            <Image
              resizeMode='cover'
              source={{ uri: `${baseApiUrl}/${path_img}` }}
              style={styles.cardImage}
              alt={title}
            />
          </View>
        )}
        <View style={styles.cardContentPadding}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.authorName}>{teacher?.user?.name}</Text>
            </View>
          </View>

          <Text style={styles.cardContent}>
            {(hasImage &&
              (content && content.length > 100
                ? content.slice(0, 100) + '[...]'
                : content)) ||
              (content && content.length > 100
                ? content.slice(0, 200) + '[...]'
                : content)}
          </Text>
          <View style={styles.cardTagsWrapper}>
            {tags &&
              tags.map((tag) => (
                <Text key={tag.id} style={styles.cardTags}>
                  {tag.name}
                </Text>
              ))}
          </View>
          <View
            style={[styles.displayFlex, { justifyContent: 'space-between' }]}
          >
            {created_at && (
              <View>
                <Text style={styles.cardDate}>{formattedDate(created_at)}</Text>
              </View>
            )}
            <View style={styles.stats}>
              <Text style={styles.stat}>
                <Ionicons name='eye' size={16} /> {viewedCount}
              </Text>
              <Text style={styles.stat}>
                <FontAwesome name='comments' size={16} /> {commentCount}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Link>
  )
}

export default CardPost
