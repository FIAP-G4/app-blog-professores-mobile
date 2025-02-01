import api from '@/app/services/api'
import Tag from './ITag'

export const getTags = async (
  page = 1,
  limit = 5,
  search = '',
): Promise<Tag[] | undefined> => {
  try {
    const response = await api.get(`/tag`, {
      params: {
        page,
        limit,
        term: search,
      },
    })
    if (response.data) return response.data
  } catch (error) {
    console.error('Erro ao buscar tags:', error)
    throw error
  }
}
