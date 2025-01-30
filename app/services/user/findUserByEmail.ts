import api from '@/app/services/api'
import { User } from './Iuser'

export const findUserByEmail = async (email: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/user/email/${email}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error: any) {
    console.error(
      'Erro ao encontrar o usuário:',
      error.response ? error.response.data : error.message,
    )
    throw error
  }
}