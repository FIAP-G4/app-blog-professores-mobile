import api from '@/app/services/api'
import errorsMessage from '@/app/utils/functions/messageError'
import Post from '@/app/services/posts/IPost'
import { useState } from 'react'
import { AxiosError } from 'axios'

interface ErrorResponse {
  message: string
}

export const usePostViewed = () => {
  const [isLoadingPostViewed, setIsLoadingPostViewed] = useState(false)
  const [error, setError] = useState(null)

  const handlePostViewed = async (
    isStudent: boolean,
    postId: Partial<Post>,
  ) => {
    setIsLoadingPostViewed(true)
    setError(null)

    try {
      if (isStudent) {
        const response = await api.post(`/posts/${postId}/viewed`)
        setIsLoadingPostViewed(false)
        return response.data
      } else {
        return
      }
    } catch (error) {
      errorsMessage(error as AxiosError<ErrorResponse>)
      setIsLoadingPostViewed(false)
      throw error
    }
  }

  return { handlePostViewed, isLoadingPostViewed, error }
}
