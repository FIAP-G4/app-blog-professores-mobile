import api from '@/app/services/api'
import { Teacher } from './ITeacher';


export const createTeacher = async (param: Teacher): Promise<any> => {
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
