import api from '@/services/api'
import { Post } from './IPost'

export const getPosts = async (
  page = 1,
  limit = 3,
  search = '',
  tag = [],
): Promise<Post[] | undefined> => {
  try {
    const response = await api.get(`/posts`, {
      params: {
        page,
        limit,
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
