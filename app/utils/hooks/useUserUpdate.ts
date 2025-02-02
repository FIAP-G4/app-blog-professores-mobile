import { useState } from 'react';
import { updateUser } from '@/app/services/user/updateUser';
import Toast from "react-native-toast-message";
import errorsMessage from '@/app/utils/messageError';
import { AxiosError } from 'axios';
import { User } from '@/app/services/user/IUser';
import { IStudent } from './useStudentList';
import { ITeacher } from './useTeacherList';


interface ErrorResponse {
    message: string;
}

interface UseUpdateUserResult {
    loadingUpdate: boolean;
    handleUpdateUser: (
        id: number,
        values: ITeacher | IStudent,
        callback?: () => void
    ) => Promise<void>;
}

const useUpdateUser = (): UseUpdateUserResult => {
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleUpdateUser = async (
        id: number,
        values: ITeacher | IStudent,
        callback?: () => void
    ): Promise<void> => {
        try {
            setLoadingUpdate(true);
            await updateUser(id, values);
            setLoadingUpdate(false);
            if (callback) {
                callback();
            }
            Toast.show({
                type: 'success',
                text1: 'Usuário atualizado com sucesso!',

            });
        } catch (error: any) {
            errorsMessage(error as AxiosError<ErrorResponse>);
          }
    };

    return {
        loadingUpdate,
        handleUpdateUser,
    };
};

export default useUpdateUser;
