import api from '@/app/services/api'

interface TeacherData {
  name: string;
  email: string;
  password: string;
  [key: string]: any; // Para permitir outros campos opcionais
}

export const createTeacher = async (param: TeacherData): Promise<any> => {
  try {
    const response = await api.post(`/teacher`, param, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {

    throw error;
  }
};

export const updateTeacher = async (id: string, param: Partial<TeacherData>): Promise<any> => {
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
