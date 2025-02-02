import api from '@/app/services/api'

export const getAllStudents = async (): Promise<any> => {
    try {
      const response = await api.get(`/student`);
  
      return response.data;
    } catch (error: any) {
      console.error(
        'Erro ao buscar professores:',
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
  