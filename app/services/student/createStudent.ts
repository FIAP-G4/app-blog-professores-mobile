import api from '@/app/services/api'
import { Student } from './IStudent'


export const createStudent = async (param: Student): Promise<any> => {
  try {
    const response = await api.post(`/student`, param, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      'Erro ao criar estudante:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};