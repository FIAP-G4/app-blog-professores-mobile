import { useState } from 'react';
import { useRouter } from 'expo-router';
import { createPost } from '@/app/services/posts/createPost';
import errorsMessage from '@/app/utils/messageError';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

interface FormPost {
  title: string;
  content: string;
  tags: string[];
}

const useCreatePostForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formPost, setFormPost] = useState<FormPost>({
    title: '',
    content: '',
    tags: [],
  });

  const router = useRouter();

  const handleChange = (field: keyof FormPost, value: string | string[]) => {
    setFormPost((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleCreatePost = async (values: FormPost & { selectedTags: { id: number; name: string }[]; attachment?: File }) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('teacher_id', '2'); // Enviando como string, pois FormData não suporta números diretamente

      values.selectedTags.forEach((tag, index) => {
        formData.append(`tags[${index}][id]`, tag.id.toString());
        formData.append(`tags[${index}][name]`, tag.name);
      });

      if (values.attachment) {
        formData.append('attachment', values.attachment);
      }

      await createPost(formData);

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
