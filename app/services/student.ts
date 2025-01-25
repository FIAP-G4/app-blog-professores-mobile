import api from '@/app/services/api'

interface StudentData {
  name: string;
  email: string;
  password: string;
  [key: string]: any; // Para permitir outros campos opcionais
}

export const createStudent = async (param: StudentData): Promise<any> => {
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

export const updateStudent = async (id: string, param: Partial<StudentData>): Promise<any> => {
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
