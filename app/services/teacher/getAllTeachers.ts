import api from '@/app/services/api'

export const getAllTeachers = async (): Promise<any> => {
    try {
      const response = await api.get(`/teacher`);
  
      return response.data;
    } catch (error: any) {
      console.error(
        'Erro ao buscar professores:',
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
  