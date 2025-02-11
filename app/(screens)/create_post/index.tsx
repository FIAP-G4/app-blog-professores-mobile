import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import usePost from '@/app/utils/hooks/usePost';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, ActivityIndicator } from 'react-native-paper';
import useCreatePostForm from '@/app/utils/hooks/useCreatePostForm';
import useTagsList from '@/app/utils/hooks/useTagList';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';

const schema = Yup.object().shape({
    title: Yup.string().min(5, 'O título deve ter pelo menos 5 caracteres.').required('Título é obrigatório'),
    content: Yup.string().min(5, 'O conteúdo deve ter pelo menos 5 caracteres.').required('Conteúdo é obrigatório'),
});

export default function CreatePost(): JSX.Element {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { post, loading: postLoading } = usePost(id as string);
    const { handleCreatePost, loading } = useCreatePostForm();
    const { tags } = useTagsList();
    const categoryOptions = tags.map(tag => ({ key: tag.id, value: tag.name }));
    const [selected, setSelected] = useState<number[]>([]);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        if (post) {
            const updatedPost = {
                ...post,
                path_img: post.path_img ? `${process.env.EXPO_PUBLIC_CORS_ORIGIN}/${post.path_img.replace(/^\/+/, '')}` : null,
            };
            setSelected(updatedPost.tags.map(tag => tag.id));
            setImage(updatedPost.path_img);
        }
    }, [post]);

    const handleSelectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'É necessário permitir o acesso à galeria.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    if (postLoading && id) {
        return <ActivityIndicator animating={true} color="#0000ff" />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                    <Formik
                        initialValues={{
                            title: post?.title || '',
                            content: post?.content || '',
                        }}
                        validationSchema={schema}
                        onSubmit={(values, { resetForm }) => {
                            const selectedTags = selected.map(id => tags.find(t => t.id === id)).filter(Boolean);

                            const formData = new FormData();
                            formData.append('title', values.title);
                            formData.append('content', values.content);

                            selectedTags.forEach((tag, index) => {
                                formData.append(`tags[${index}][id]`, tag.id);
                                formData.append(`tags[${index}][name]`, tag.name);
                            });

                            if (image) {
                                fetch(image)
                                    .then(response => response.blob())
                                    .then(blob => {
                                        if (!blob) return;
                                        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                                        formData.append('attachment', file);
                                        handleCreatePost(formData, id).then(() => {
                                            resetForm();
                                            setImage(null);
                                            setSelected([]);
                                            router.replace('/create_post'); // Garante que a URL será /create_post após a criação
                                        });
                                    })
                                    .catch(err => console.error('Erro ao converter imagem:', err));
                            } else {
                                handleCreatePost(formData, id).then(() => {
                                    resetForm();
                                    setImage(null);
                                    setSelected([]);
                                    router.replace('/create_post'); // Garante que a URL será /create_post após a criação
                                });
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Título</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Digite o título"
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                    />
                                    {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Conteúdo</Text>
                                    <TextInput
                                        style={[styles.input, { height: 100 }]}
                                        placeholder="Digite o conteúdo"
                                        value={values.content}
                                        onChangeText={handleChange('content')}
                                        onBlur={handleBlur('content')}
                                        multiline
                                    />
                                    {touched.content && errors.content && <Text style={styles.errorText}>{errors.content}</Text>}
                                </View>

                                <View style={styles.imageContainer}>
                                    <Text style={styles.label}>Imagem</Text>
                                    <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
                                        <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
                                    </TouchableOpacity>
                                    {image && (
                                        <View style={styles.imagePreviewContainer}>
                                            <Image source={{ uri: image }} style={styles.imagePreview} />
                                            <TouchableOpacity style={styles.removeImageButton} onPress={handleRemoveImage}>
                                                <FontAwesome name="trash" size={20} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>

                                <MultipleSelectList
                                    setSelected={setSelected}
                                    data={categoryOptions}
                                    save="key"
                                    label="Categorias"
                                    placeholder="Buscar por categorias"
                                    searchPlaceholder="Filtre por categoria"
                                    boxStyles={styles.optionSelect}
                                    dropdownStyles={styles.dropdwon}
                                />

                                <View style={styles.buttonContainer}>
                                    {loading ? (
                                        <ActivityIndicator animating={true} size="medium" color="#007bff" />
                                    ) : (
                                        <Button onPress={handleSubmit} mode="contained" buttonColor="#007bff">
                                            {id ? 'Salvar Alterações' : 'Criar Postagem'}
                                        </Button>
                                    )}
                                </View>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
