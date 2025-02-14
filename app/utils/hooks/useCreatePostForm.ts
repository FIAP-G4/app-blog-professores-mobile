import {useState} from 'react';
import {useRouter} from 'expo-router';
import {createPost} from '@/app/services/posts/createPost';
import errorsMessage from '../functions/messageError'
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';
import {updatePost} from "@/app/services/posts/updatePost";

interface ErrorResponse {
    message: string;
}

interface Tag {
    id: string;
    name: string;
}

interface FormPost {
    title: string;
    content: string;
    tags: string[];
}


const useCreatePostForm = () => { // Recebe as tags disponíveis
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

    const handleCreatePost = async (values: FormData, postId = null) => {
        try {
            setLoading(true);

            if (postId) {
                await updatePost(values, postId);
            } else {
                await createPost(values);
            }

            setLoading(false);

            Toast.show({
                type: 'success',
                text1: postId ? 'Postagem atualizada com sucesso!' : 'Postagem criada com sucesso!',
            });

            setTimeout(() => {
                router.push('/postagens');
            }, 500);
        } catch (error) {
            setLoading(false);
            errorsMessage(error as AxiosError<ErrorResponse>);
        }
    }

    return {
        loading,
        formPost,
        handleChange,
        handleCreatePost,
    };
};

export default useCreatePostForm;
