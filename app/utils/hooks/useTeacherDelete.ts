import { useState } from "react";
import { deleteTeacher } from '@/app/services/teacher/deleteTeacher'
import Toast from "react-native-toast-message";
import errorsMessage from '@/app/utils/messageError';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

const useDeleteTeacher = () => {
  
    const handleDeleteTeacher = async (teacherId: number, callback?: () => void) => {
      try {
        await deleteTeacher(teacherId);
        Toast.show({
          type: 'success',
          text1: 'Usuário criado com sucesso!',
        });
  
        if (callback) {
          callback();
        }
      } catch (error: any) {
        errorsMessage(error as AxiosError<ErrorResponse>);
      }
    };
  
    return {
      handleDeleteTeacher,
    };
  };
  
  export default useDeleteTeacher;