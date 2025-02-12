import api from '@/app/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const deleteComment = async (id: string): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem('authToken')
    if (!token) {
      throw new Error('No auth token found')
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    await api.delete(`/comments/${id}`, {
      headers,
    })
  } catch (error: any) {
    console.error(
      'Erro ao deletar comentário:',
      error.response ? error.response.data : error.message,
    )
    throw error
  }
}
