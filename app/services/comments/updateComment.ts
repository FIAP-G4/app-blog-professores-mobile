import api from '@/app/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const updateComment = async (
  id: string,
  content: string,
): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem('authToken')
    if (!token) {
      throw new Error('No auth token found')
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    await api.put(`/comments/${id}`, { content: content }, { headers: headers })
  } catch (error: any) {
    console.error(
      'Erro ao editar comentário:',
      error.response ? error.response.data : error.message,
    )
    throw error
  }
}
