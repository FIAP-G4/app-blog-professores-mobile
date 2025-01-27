import api from '@/services/api'
import Post from './IPost'

export const getPosts = async (
  search = '',
  tag = [],
): Promise<Post[] | undefined> => {
  try {
    const response = await api.get(`/posts`, {
      params: {
        term: search,
        tag,
      },
    })

    if (response.data) return response.data
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    throw error
  }
}
