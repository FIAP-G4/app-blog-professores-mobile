import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import styles from './styles';
import useCreatePostForm from '@/app/utils/hooks/useCreatePostForm';
import useTagsList from '@/app/utils/hooks/useTagList'
import {MultipleSelectList} from "react-native-dropdown-select-list";
import {useState} from "react";
import { FontAwesome } from '@expo/vector-icons'; // Importe o ícone do FontAwesome

export default function CreatePost(): JSX.Element {
    const {handleCreatePost, formPost, handleChange, loading} = useCreatePostForm();
    const {title, content} = formPost;
    const {tags} = useTagsList();
    const categoryOptions = tags.map((tag) => ({key: tag.id, value: tag.name}));
    const [selected, setSelected] = useState<[]>([]);
    const [image, setImage] = useState<string | null>(null);

    const handleSelectImage = () => {
        ImagePicker.launchImageLibrary({mediaType: 'photo', quality: 1}, (response) => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção de imagem');
            } else if (response.errorMessage) {
                console.log('Erro ao selecionar imagem:', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setImage(response.assets[0].uri);
            }
        });
    };

    const handleRemoveImage = () => {
        setImage(null); // Remove a imagem ao definir o estado como null
    };

    const handlePublish = async () => {
        console.log('Publicando...');

        if (!title || !content) {
            console.log('Erro: título, conteúdo ou categoria estão vazios.');
            return;
        }

        const selectedTags = selected.map((id) => {
            const tag = tags.find((t) => t.id === id);
            return tag ? {id: tag.id, name: tag.name} : null;
        }).filter(Boolean);

        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);
        formData.append('teacher_id', '2');

        selectedTags.forEach((tag, index) => {
            if (tag) {
                formData.append(`tags[${index}][id]`, tag.id);
            }
            if (tag) {
                formData.append(`tags[${index}][name]`, tag.name);
            }
        });

        if (image) {
            const response = await fetch(image);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', {type: 'image/jpeg'});
            formData.append('attachment', file);
        }

        await handleCreatePost(formData);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Título</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o título"
                        value={title}
                        onChangeText={(value) => handleChange('title', value)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Conteúdo</Text>
                    <TextInput
                        style={[styles.input, {height: 100}]}
                        placeholder="Digite o conteúdo"
                        value={content}
                        onChangeText={(value) => handleChange('content', value)}
                        multiline
                    />
                </View>

                <View style={styles.imageContainer}>
                    <Text style={styles.label}>Imagem</Text>
                    <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
                        <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
                    </TouchableOpacity>
                    {image && (
                        <View style={styles.imagePreviewContainer}>
                            <Image source={{uri: image}} style={styles.imagePreview}/>
                            <TouchableOpacity
                                style={styles.removeImageButton}
                                onPress={handleRemoveImage}
                            >
                                <FontAwesome name="trash" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View>
                    <MultipleSelectList
                        setSelected={(val: any) => setSelected(val)}
                        data={categoryOptions}
                        save='key'
                        label='Categorias'
                        placeholder='Buscar por categorias'
                        searchPlaceholder='Filtre por categoria'
                        boxStyles={styles.optionSelect}
                        dropdownStyles={styles.dropdwon}
                        badgeStyles={{backgroundColor: 'rgb(239, 246, 255)'}}
                        badgeTextStyles={{color: 'rgb(29, 78, 216)', fontWeight: "500"}}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePublish}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>{loading ? 'Publicando...' : 'Publicar'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}