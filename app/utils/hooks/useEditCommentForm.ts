import { useState } from 'react'
import errorsMessage from '@/app/utils/functions/messageError'
import Toast from 'react-native-toast-message'
import { AxiosError } from 'axios'
import { createComment } from '@/app/services/comments/createComment'
import { ICommentResponse } from '@/app/services/comments/IComment'
import { ICommentsFromGetPostById } from '@/app/services/comments/IComments'
import { updateComment } from '@/app/services/comments/updateComment'

interface ErrorResponse {
  message: string
}

interface EditCommentForm {
  id: string
  content: string
}

const useEditCommentForm = () => {
  const [loadingEditCommentForm, setLoadingEditCommentForm] =
    useState<boolean>(false)
  const [editCommentForm, setEditCommentForm] = useState<EditCommentForm>({
    id: '',
    content: '',
  })

  const handleChangeComment = (field: keyof EditCommentForm, value: string) => {
    setEditCommentForm((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleEditComment = async (
    id: string,
    content: string,
  ): Promise<ICommentResponse | undefined> => {
    try {
      setLoadingEditCommentForm(true)
      const response = await updateComment(id, content)
      setLoadingEditCommentForm(false)

      Toast.show({
        type: 'success',
        text1: 'Comentário criado com sucesso!',
      })
      return response
    } catch (error) {
      setLoadingEditCommentForm(false)
      errorsMessage(error as AxiosError<ErrorResponse>)
    }
  }

  return {
    loadingEditCommentForm,
    editCommentForm,
    handleChangeComment,
    handleEditComment,
  }
}

export default useEditCommentForm
