import React, { useState, useCallback } from 'react';
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
    ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';
import useCreatePostForm from '@/app/utils/hooks/useCreatePostForm';
import useTagsList from '@/app/utils/hooks/useTagList';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native'; // Importe o useFocusEffect

const schema = Yup.object().shape({
    title: Yup.string().min(5, 'O título deve ter pelo menos 5 caracteres.').required('Título é obrigatório'),
    content: Yup.string().min(5, 'O conteúdo deve ter pelo menos 5 caracteres.').required('Conteúdo é obrigatório'),
});

export default function CreatePost(): JSX.Element {
    const { handleCreatePost, loading } = useCreatePostForm();
    const { tags } = useTagsList();
    const categoryOptions = tags.map((tag) => ({ key: tag.id, value: tag.name }));
    const [selected, setSelected] = useState<number[]>([]);
    const [image, setImage] = useState<string | null>(null);

    // Resetar o estado selected e image quando a página for focada
    useFocusEffect(
        useCallback(() => {
            setSelected([]); // Reseta as categorias selecionadas
            setImage(null); // Reseta a imagem
        }, [])
    );

    const handleSelectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('É necessário permitir o acesso à galeria.');
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

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                    <Formik
                        initialValues={{ title: '', content: '' }}
                        validationSchema={schema}
                        onSubmit={(values, { resetForm }) => {
                            const selectedTags = selected.map((id) => {
                                const tag = tags.find((t) => t.id === id);
                                return tag ? { id: tag.id, name: tag.name } : null;
                            }).filter(Boolean);

                            const formData = new FormData();
                            formData.append('title', values.title);
                            formData.append('content', values.content);
                            formData.append('teacher_id', '2');

                            selectedTags.forEach((tag, index) => {
                                if (tag) {
                                    formData.append(`tags[${index}][id]`, tag.id);
                                    formData.append(`tags[${index}][name]`, tag.name);
                                }
                            });

                            if (image) {
                                fetch(image)
                                    .then((response) => response.blob())
                                    .then((blob) => {
                                        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                                        formData.append('attachment', file);
                                        handleCreatePost(formData);
                                    });
                            } else {
                                handleCreatePost(formData);
                            }

                            resetForm();
                            setImage(null);
                            setSelected([]);
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

                                <View>
                                    <MultipleSelectList
                                        setSelected={(val) => setSelected(val)}
                                        data={categoryOptions}
                                        save="key"
                                        label="Categorias"
                                        placeholder="Buscar por categorias"
                                        searchPlaceholder="Filtre por categoria"
                                        boxStyles={styles.optionSelect}
                                        dropdownStyles={styles.dropdwon}
                                        badgeStyles={{ backgroundColor: 'rgb(239, 246, 255)' }}
                                        badgeTextStyles={{ color: 'rgb(29, 78, 216)', fontWeight: '500' }}
                                        selected={selected}
                                    />
                                </View>

                                <View style={styles.buttonContainer}>
                                    {loading ? (
                                        <ActivityIndicator size="large" color="#4e46dd" />
                                    ) : (
                                        <Button onPress={handleSubmit as any} mode="contained" buttonColor="#4e46dd">
                                            Registrar
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