import { useState } from 'react'
import errorsMessage from '@/app/utils/functions/messageError'
import Toast from 'react-native-toast-message'
import { AxiosError } from 'axios'
import { createComment } from '@/app/services/comments/createComment'
import { ICommentResponse } from '@/app/services/comments/IComment'

interface ErrorResponse {
  message: string
}

interface CreateCommentForm {
  postId: string
  content: string
}

const useCreateCommentForm = () => {
  const [loadingCreateCommentForm, setLoadingCreateCommentForm] =
    useState<boolean>(false)
  const [createCommentForm, setCreateCommentForm] = useState<CreateCommentForm>(
    {
      postId: '',
      content: '',
    },
  )

  const handleChangeComment = (
    field: keyof CreateCommentForm,
    value: string,
  ) => {
    setCreateCommentForm((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleCreateComment = async (
    values: CreateCommentForm,
  ): Promise<ICommentResponse | undefined> => {
    try {
      setLoadingCreateCommentForm(true)
      const response = await createComment(values.postId, values.content)
      setLoadingCreateCommentForm(false)

      Toast.show({
        type: 'success',
        text1: 'Comentário criado com sucesso!',
      })
      return response
    } catch (error) {
      setLoadingCreateCommentForm(false)
      errorsMessage(error as AxiosError<ErrorResponse>)
    }
  }

  return {
    loadingCreateCommentForm,
    createCommentForm,
    handleChangeComment,
    handleCreateComment,
  }
}

export default useCreateCommentForm
