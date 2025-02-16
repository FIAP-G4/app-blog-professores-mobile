import api from '@/app/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Post from './IPost'

export const createPost = async (
  postData: FormData,
): Promise<Post | undefined> => {
  try {
    const token = await AsyncStorage.getItem('authToken')

    const response = await api.post('/posts', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token ? `Bearer ${token}` : '',
      },
    })

    if (response.data) {
      return response.data
    }
  } catch (error) {
    alert('Erro ao criar post:' + error)
    throw error
  }
}
