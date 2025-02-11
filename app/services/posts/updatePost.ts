import { Post } from '@/app/services/posts/IPost';
import api from '@/app/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updatePost = async (postData: FormData, id): Promise<Post | undefined> => {
    try {
        const token = await AsyncStorage.getItem('authToken');

        const response = await api.put(`/posts/${id}`, postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        if (response.data) {
            console.log('Post atualizado:', response.data);
            return response.data;
        }
    } catch (error) {
        alert('Erro ao atualizar post:' + error);
        throw error;
    }
};
