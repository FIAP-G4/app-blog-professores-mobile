import { View, Text, ScrollView } from 'react-native'
import styles from './styles'
import Post from '@/app/services/posts/IPost'
import Comment from '../Comment'
import { ICommentsFromGetPostById } from '@/app/services/comments/IComments'

interface CommentSectionProps {
  post: Post
}

const CommentSection = ({ post }: CommentSectionProps): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comentários</Text>
        {post.comments?.map(
          (comment: ICommentsFromGetPostById, index) => (
            console.log('COMMENT:  ', comment),
            (<Comment key={index} {...comment} />)
          ),
        )}
      </View>
    </ScrollView>
  )
}

export default CommentSection
