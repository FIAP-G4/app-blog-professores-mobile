import { View, Text, ScrollView } from 'react-native'
import formattedDate from '@/app/utils/functions/formattedDate'
import styles from './styles'
import Post from '@/app/services/posts/IPost'
import Comment from '../Comment'

interface CommentSectionProps {
  post: Post
}

const CommentSection = ({ post }: CommentSectionProps): JSX.Element => {
  const dateFormatted = formattedDate(post.created_at)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comentários</Text>
        {post.comments?.map((comment, index) => (
          <Comment
            key={index}
            author={comment.user.name}
            date={dateFormatted}
            content={comment.content}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default CommentSection
