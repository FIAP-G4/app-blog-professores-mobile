import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import styles from './styles'
import Post from '@/app/services/posts/IPost'
import Comment from '../Comment'
import { ICommentsFromGetPostById } from '@/app/services/comments/IComments'
import useDeleteComment from '@/app/utils/hooks/useDeleteComment'
import { useEffect, useState } from 'react'

interface CommentSectionProps {
  post: Post
}

const CommentSection = ({ post }: CommentSectionProps): JSX.Element => {
  const { loadingDelete, handleDeleteComment } = useDeleteComment()
  const [comments, setComments] = useState<ICommentsFromGetPostById[]>([])

  useEffect(() => {
    setComments(post.comments)
  }, [post.comments])

  const updateComments = (deletedCommentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletedCommentId),
    )
  }

  if (loadingDelete) {
    return <ActivityIndicator size='large' color='#0000ff' />
  }

  const handleEdit = (comment: ICommentsFromGetPostById) => {
    console.log(comment)
    // Lógica para editar o comentário
  }

  const handleDelete = (commentId: string) => {
    handleDeleteComment(commentId)
    updateComments(commentId)
    console.log(commentId)
    // Lógica para excluir o comentário
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comentários</Text>
        {comments?.map(
          (comment: ICommentsFromGetPostById, index) => (
            console.log('COMMENT:  ', comment),
            (
              <Comment
                key={index}
                comment={comment}
                onEdit={() => handleEdit(comment)}
                onDelete={() => handleDelete(comment.id)}
              />
            )
          ),
        )}
      </View>
    </ScrollView>
  )
}

export default CommentSection
