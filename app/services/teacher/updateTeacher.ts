import api from '@/app/services/api'
import { Teacher } from './ITeacher';

export const updateTeacher = async (id: string, param: Partial<Teacher>): Promise<any> => {
  try {
    const response = await api.put(`/teacher/${id}`, param, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      'Erro ao atualizar professor:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};