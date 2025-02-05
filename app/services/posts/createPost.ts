import {Post} from '@/app/services/posts/IPost';
import api from '@/app/services/api';

export const createPost = async (postData: FormData): Promise<Post | undefined> => {
    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0ZUBob3RtYWlsLmNvbSIsInR5cGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzM4NzkyNDUwLCJleHAiOjE3Mzg3OTYwNTB9.RZzXxQIm4GkK_J4vcC_CC1qEBikc2y68wUgCP5GbFzM';

        const response = await api.post('/posts', postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data) {
            console.log('Post criado:', response.data);
            return response.data;
        }
    } catch (error) {
        alert('Erro ao criar post:' + error);
        throw error;
    }
};