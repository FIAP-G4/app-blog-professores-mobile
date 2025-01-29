import api from '@/app/services/api'
import Post from './IPost'

export const postViewed = async (postId: Partial<Post>) => {
  try {
    const token = localStorage.getItem('authToken')
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
