import api from '@/app/services/api'
import Post from './IPost'
import Tag from '../tags/ITag'

export const getPosts = async (
  page = 1,
  limit = 2,
  search = '',
  tag: number[] = [],
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
