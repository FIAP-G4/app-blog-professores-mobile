import Toast from 'react-native-toast-message'
import errorsMessage from '@/app/utils/functions/messageError'
import { AxiosError } from 'axios'
import { deleteComment } from '@/app/services/comments/deleteComment'
import { useState } from 'react'

interface ErrorResponse {
  message: string
}

const useDeleteComment = () => {
  const [loadingDelete, setLoadingDelete] = useState(false)
  const handleDeleteComment = async (
    commentId: string,
    callback?: () => void,
  ) => {
    try {
      setLoadingDelete(true)
      await deleteComment(commentId)
      setLoadingDelete(false)
      Toast.show({
        type: 'success',
        text1: 'Comentário deletado com sucesso!',
      })
      if (callback) {
        callback()
      }
    } catch (error: any) {
      setLoadingDelete(false)
      errorsMessage(error as AxiosError<ErrorResponse>)
    }
  }

  return {
    loadingDelete,
    handleDeleteComment,
  }
}

export default useDeleteComment
