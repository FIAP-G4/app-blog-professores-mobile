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
        callback();
      } // Recarrega a lista de postagens após deletar
    } catch (error) {
      console.error('Erro ao deletar postagem:', error);
    } finally {
      setLoading(false);
    }
  };

  return { handleDeletePost, loading };
};

export default useDeletePost;