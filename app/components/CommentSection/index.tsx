import { View, Text, Image, ScrollView } from 'react-native'
import formattedDate from '@/app/utils/functions/formattedDate'
import styles from './styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Post from '@/app/services/posts/IPost'
import Comment from '../Comment'

interface CommentSectionProps {
  post: Post
}

const CommentSection = ({ post }: CommentSectionProps): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.footer}>
        <Text style={styles.tags}>{post.tags?.join(', ')}</Text>
      </View>
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comentários</Text>
        {post.comments?.map((comment, index) => (
          <Comment key={index} postId={post.id} content={comment.content} />
        ))}
      </View>
    </ScrollView>
  )
}

export default CommentSection
