import api from '@/app/services/api'
import { User } from './Iuser'

export const updateUser = async (
  id: string,
  param: Partial<User>,
): Promise<User> => {
  try {
    const token = localStorage.getItem('authToken')

    const response = await api.put<User>(`/user/${id}`, param, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error: any) {
    console.error(
      'Erro ao atualizar usuário:',
      error.response ? error.response.data : error.message,
    )
    throw error
  }
}
