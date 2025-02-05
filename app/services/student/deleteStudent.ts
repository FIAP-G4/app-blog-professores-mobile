import api from '@/app/services/api'

export const deleteStudent = async (id: number): Promise<any> => {
  try {
    const response = await api.delete(`/student/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      'Erro ao remover professor:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};