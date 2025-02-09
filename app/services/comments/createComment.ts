import api from '@/app/services/api'
import { ICommentResponse } from './IComment'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const createComment = async (
  postId: string,
  content: string,
): Promise<ICommentResponse> => {
  try {
    const token = await AsyncStorage.getItem('authToken')
    if (!token) {
      throw new Error('No auth token found')
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    const response = await api.post(
      `/comments/${postId}`,
      { content: content },
      {
        headers,
      },
    )

    return response.data
  } catch (error: any) {
    throw error
  }
}
