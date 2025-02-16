import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../api'
import Post from './IPost'

export const postViewed = async (postId: Partial<Post>) => {
  try {
    const token = await AsyncStorage.getItem('authToken')
    if (!token) {
      throw new Error('No auth token found')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const response = await api.post(`/posts/${postId}/viewed`, null, {
      headers,
    })
    return response.data
  } catch (error) {
    console.error(
      `Erro ao marcar post com id ${postId} como visualizado:`,
      error,
    )
    throw error
  }
}
