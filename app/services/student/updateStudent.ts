import api from '@/app/services/api'
import { Student } from './IStudent'

export const updateStudent = async (id: string, param: Partial<Student>): Promise<any> => {
  try {
    const response = await api.put(`/student/${id}`, param, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      'Erro ao atualizar estudante:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
