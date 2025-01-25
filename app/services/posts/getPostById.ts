import { Post } from '@/app/services/posts/IPost'
import api from '@/app/services/api'

export const getPostById = async (id: string): Promise<Post | undefined> => {
  try {
    const response = await api.get(`/posts/${id}`)

    if (response.data) {
      console.log(response.data)
      return response.data
    }
  } catch (error) {
    console.error('Erro ao buscar post:', error)
    throw error
  }
}
