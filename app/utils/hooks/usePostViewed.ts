import api from '@/app/services/api'
import errorsMessage from '@/app/utils/functions/messageError'
import Post from '@/app/services/posts/IPost'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { postViewed } from '@/app/services/posts/postViewed'

interface ErrorResponse {
  message: string
}

export const usePostViewed = () => {
  const [isLoadingPostViewed, setIsLoadingPostViewed] = useState(false)
  const [error, setError] = useState(null)

  const fetchPostViewed = async (postId: string) => {
    setIsLoadingPostViewed(true)
    setError(null)

    try {
      setIsLoadingPostViewed(true)
      const response = await api.get<Post>(`/posts/${postId}`)
      setIsLoadingPostViewed(false)
      return response.data
    } catch (error) {
      setIsLoadingPostViewed(false)
      errorsMessage(error as AxiosError<ErrorResponse>)
      throw error
    } finally {
      setIsLoadingPostViewed(false)
    }
  }

  const handlePostViewed = async (
    isStudent: boolean,
    postId: string | undefined,
  ) => {
    setIsLoadingPostViewed(true)
    setError(null)

    try {
      setIsLoadingPostViewed(true)
      if (isStudent && postId) {
        const response = await postViewed(postId)
        setIsLoadingPostViewed(false)
        return response.data
      } else {
        return
      }
    } catch (error) {
      setIsLoadingPostViewed(false)
      errorsMessage(error as AxiosError<ErrorResponse>)
      throw error
    } finally {
      setIsLoadingPostViewed(false)
    }
  }

  return { handlePostViewed, fetchPostViewed, isLoadingPostViewed, error }
}
