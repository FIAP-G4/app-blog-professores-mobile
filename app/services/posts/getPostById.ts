import api from '../api'
import Post from './IPost'

export const getPostById = async (id: string): Promise<Post | undefined> => {
  try {
    const response = await api.get(`/posts/${id}`)

    if (response.data) {
      return response.data
    }
  } catch (error) {
    console.error('Erro ao buscar post:', error)
    throw error
  }
}
