import { Post } from '@/app/services/posts/IPost'
import api from '@/app/services/api'

export const createPost = async (postData: Post): Promise<Post | undefined> => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0ZUBob3RtYWlsLmNvbSIsInR5cGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzM4MTk0NzA3LCJleHAiOjE3MzgxOTgzMDd9.2nl-O5JvbygQWNlIOaIxcYCL1ucERmCHpycVLePuWcg';

    // Enviando a requisição com o token no cabeçalho Authorization
    const response = await api.post('/posts', postData, {
      headers: {
        Authorization: `Bearer ${token}`, // Passando o token corretamente no cabeçalho
      },
    });

    if (response.data) {
      console.log('Post criado:', response.data);
      return response.data;
    }
  } catch (error) {
    alert('Erro ao criar post:'+ error);
    throw error;
  }
}
