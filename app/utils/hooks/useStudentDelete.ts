import { deleteStudent } from '@/app/services/student/deleteStudent'
import Toast from "react-native-toast-message";
import errorsMessage from '@/app/utils/functions/messageError';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

const useDeleteStudent = () => {
  
    const handleDeleteStudent = async (studentId: number, callback?: () => void) => {
      try {
        await deleteStudent(studentId);
        Toast.show({
          type: 'success',
          text1: 'Usuário deletado com sucesso!',
        });
  
        if (callback) {
          callback();
        }
      } catch (error: any) {
        errorsMessage(error as AxiosError<ErrorResponse>);
      }
    };
  
    return {
      handleDeleteStudent,
    };
  };
  
  export default useDeleteStudent;