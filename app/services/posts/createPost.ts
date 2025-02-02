import { Post } from '@/app/services/posts/IPost'
import api from '@/app/services/api'

export const createPost = async (postData: Post): Promise<Post | undefined> => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0ZUBob3RtYWlsLmNvbSIsInR5cGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzM4NTExMTczLCJleHAiOjE3Mzg1MTQ3NzN9.wSIntez27PLfXc-L2hH7nta9mcU1UhImM-Z8VDQUckk';

    const response = await api.post('/posts', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
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
