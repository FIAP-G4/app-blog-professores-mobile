import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { useAuth } from '@/context/AuthContext'
import { AntDesign } from '@expo/vector-icons'
import { ICommentsFromGetPostById } from '@/app/services/comments/IComments'
import formattedDate from '@/app/utils/functions/formattedDate'

const Comment = (comment: ICommentsFromGetPostById): JSX.Element => {
  const { loggedInUserId, isAuthenticated } = useAuth()
  const [isAuthor, setIsAuthor] = useState(false)

  useEffect(() => {
    if (loggedInUserId === comment.user_id) {
      setIsAuthor(true)
    }
  }, [loggedInUserId, comment.user_id])

  const handleEdit = (comment: ICommentsFromGetPostById) => {
    console.log(comment)
    // Lógica para editar o comentário
  }

  const handleDelete = (commentId: string) => {
    console.log(commentId)
    // Lógica para excluir o comentário
  }
  return (
    <View style={styles.commentContainer}>
      <View>
        <Text>{'É o autor? ' + isAuthor}</Text>
        <Text>{'LOGGED USER ID:  ' + loggedInUserId}</Text>
        <Text>{'USER ID:  ' + comment.user_id}</Text>
      </View>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>{comment.user.name}</Text>
        <Text style={styles.commentDate}>
          {formattedDate(comment.created_at)}
        </Text>
      </View>
      <Text style={styles.commentContent}>{comment.content}</Text>
      {isAuthor && isAuthenticated && (
        <View style={styles.cardAction}>
          <TouchableOpacity onPress={() => handleEdit(comment)}>
            <AntDesign
              name='edit'
              size={22}
              style={[styles.buttonAction, styles.buttonActionEdit]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(comment.id)}>
            <AntDesign
              name='delete'
              size={22}
              style={[styles.buttonAction, styles.buttonActionDelete]}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default Comment
