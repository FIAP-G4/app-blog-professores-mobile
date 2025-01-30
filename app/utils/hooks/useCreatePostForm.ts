import { useState } from 'react';
import { useRouter } from 'expo-router';
import { createPost } from '@/app/services/posts/createPost';
import errorsMessage from '@/app/utils/messageError';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';

interface ErrorResponse {
  message: string;
}

interface FormPost {
  title: string;
  content: string;
  tag: string;
}

const useCreatePostForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formPost, setFormPost] = useState<FormPost>({
    title: '',
    content: '',
    tag: '',
  });

  const router = useRouter();

  const handleChange = (field: keyof FormPost, value: string) => {
    setFormPost((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleCreatePost = async (values: FormPost) => {
    try {
      setLoading(true);

      // Verifica e exibe os dados antes de criar o post
      console.log('Criando post com os dados:', values);

      // Envia somente o array de tags
      const postData = {
        ...values,
        teacher_id: 2,
        tags: [], // Transformando a tag em um array
      };

      // Agora, o campo tag não será enviado separadamente, apenas tags
      delete postData.tag;

      await createPost(postData); // Envia os dados ajustados

      setLoading(false);

      Toast.show({
        type: 'success',
        text1: 'Postagem criada com sucesso!',
      });

      setTimeout(() => {
        router.push('/postagens');
      }, 500);
    } catch (error) {
      setLoading(false);
      errorsMessage(error as AxiosError<ErrorResponse>);
    }
  };

  return {
    loading,
    formPost,
    handleChange,
    handleCreatePost,
  };
};

export default useCreatePostForm;
