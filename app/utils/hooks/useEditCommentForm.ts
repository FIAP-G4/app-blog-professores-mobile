import { useState } from 'react'
import errorsMessage from '@/app/utils/functions/messageError'
import Toast from 'react-native-toast-message'
import { AxiosError } from 'axios'
import { createComment } from '@/app/services/comments/createComment'
import { ICommentResponse } from '@/app/services/comments/IComment'

interface ErrorResponse {
  message: string
}

interface EditCommentForm {
  postId: string
  content: string
}

const useEditCommentForm = () => {
  const [loadingEditCommentForm, setLoadingEditCommentForm] =
    useState<boolean>(false)
  const [editCommentForm, setEditCommentForm] = useState<EditCommentForm>({
    postId: '',
    content: '',
  })

  const handleChangeComment = (field: keyof EditCommentForm, value: string) => {
    setEditCommentForm((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleCreateComment = async (
    values: EditCommentForm,
  ): Promise<ICommentResponse | undefined> => {
    try {
      setLoadingEditCommentForm(true)
      const response = await createComment(values.postId, values.content)
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
    handleCreateComment,
  }
}

export default useEditCommentForm
