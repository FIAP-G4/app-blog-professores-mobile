import { View, Text, Image } from 'react-native'
import { Post } from '@/app/services/posts/IPost'
import usePost from '@/app/utils/hooks/usePost'
import formattedDate from '@/app/utils/functions/formattedDate'
import styles from './styles'

const CardPost = (props: Partial<Post>): JSX.Element => {
  const { id, title, content, path_img, tags, created_at, teacher } = props
  const baseApiUrl = process.env.EXPO_PUBLIC_CORS_ORIGIN

  console.log(id)

  //console.log(post?.title)

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
        {created_at && (
          <Text style={styles.cardDate}>{formattedDate(created_at)}</Text>
        )}
      </View>
    </View>
  )
}

export default CardPost
