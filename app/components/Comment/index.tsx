import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { useAuth } from '@/context/AuthContext'
import { AntDesign } from '@expo/vector-icons'
import { ICommentsFromGetPostById } from '@/app/services/comments/IComments'
import formattedDate from '@/app/utils/functions/formattedDate'
import ConfirmationModal from '../ConfirmationModal'

const Comment = ({
  comment,
  onEdit,
  onDelete,
}: {
  comment: ICommentsFromGetPostById
  onEdit: (comment: ICommentsFromGetPostById) => void
  onDelete: (id: string) => void
}): JSX.Element => {
  const { loggedInUserId, isAuthenticated } = useAuth()
  const [isAuthor, setIsAuthor] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  )

  const handleDelete = (id: string) => {
    setSelectedCommentId(id)
    setModalVisible(true)
  }

  const confirmDelete = () => {
    if (selectedCommentId && onDelete) {
      onDelete(selectedCommentId)
    }
    setModalVisible(false)
  }

  useEffect(() => {
    if (loggedInUserId === comment.user_id) {
      setIsAuthor(true)
    }
  }, [loggedInUserId, comment.user_id])

  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>{comment.user.name}</Text>
        <Text style={styles.commentDate}>
          {formattedDate(comment.created_at)}
        </Text>
      </View>
      <Text style={styles.commentContent}>{comment.content}</Text>
      {isAuthor && isAuthenticated && (
        <View style={styles.cardAction}>
          <TouchableOpacity onPress={() => onEdit(comment)}>
            <AntDesign
              name='edit'
              size={22}
              style={[styles.buttonAction, styles.buttonActionEdit]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(comment.id as string)}>
            <AntDesign
              name='delete'
              size={22}
              style={[styles.buttonAction, styles.buttonActionDelete]}
            />
          </TouchableOpacity>
        </View>
      )}
      <ConfirmationModal
        isVisible={isModalVisible}
        message='Tem certeza que deseja excluir este comentário?'
        onConfirm={confirmDelete}
        onCancel={() => setModalVisible(false)}
        setVisible={setModalVisible}
      />
    </View>
  )
}

export default Comment
