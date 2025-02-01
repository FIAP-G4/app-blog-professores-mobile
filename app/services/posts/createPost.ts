import { Post } from '@/app/services/posts/IPost'
import api from '@/app/services/api'

export const createPost = async (postData: Post): Promise<Post | undefined> => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0ZUBob3RtYWlsLmNvbSIsInR5cGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzM4NDM0ODA0LCJleHAiOjE3Mzg0Mzg0MDR9.IZRID1UpgCNc1Lkhabg6jvhOL8ZYWdYfiheMBQX92BM';

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
