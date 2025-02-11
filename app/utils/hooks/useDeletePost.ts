import { useState } from 'react';
import api from '@/app/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useDeletePost = () => {
  const [loading, setLoading] = useState(false);

  const handleDeletePost = async (id: number, callback?: () => void) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');

      await api.delete(`/posts/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (callback) {
        setTimeout(() => {
          callback();
        }, 300); // Pequeno delay para garantir atualização correta
      }
    } catch (error) {
      console.error('Erro ao deletar postagem:', error);
    } finally {
      setLoading(false);
    }
  };


  return { handleDeletePost, loading };
};

export default useDeletePost;