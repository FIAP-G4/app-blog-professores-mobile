import { useState } from 'react';
import { useRouter } from 'expo-router'; 
import { createTeacher } from '@/app/services/teacher/createTeacher';
import { createStudent } from '@/app/services/student/createStudent';
import errorsMessage from '@/app/utils/messageError';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

interface FormUser {
  typeUser: '1' | '2';
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useCreateAccountForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formUser, setFormUser] = useState<FormUser>({
    typeUser: '1',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter(); 

  const handleChange = (field: keyof FormUser, value: string) => {
    setFormUser((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleCreateUser = async (values: FormUser) => {
    try {
      setLoading(true);
      if (values.typeUser === '1') {
        await createTeacher(values);
      } else if (values.typeUser === '2') {
        await createStudent(values);
      }

      setLoading(false);
      
      Toast.show({
        type: 'success',
        text1: 'Usuário criado com sucesso!',
      });
      setTimeout(() => {
        router.push('/login');
      }, 500);
    } catch (error) {
      setLoading(false);
      errorsMessage(error as AxiosError<ErrorResponse>);
    }
  };

  return {
    loading,
    formUser,
    handleChange,
    handleCreateUser,
  };
};

export default useCreateAccountForm;
