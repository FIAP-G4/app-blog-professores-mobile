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
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useState } from "react";

export default function CreatePost(): JSX.Element {
    const { handleCreatePost, formPost, handleChange, loading } = useCreatePostForm();
    const { title, content } = formPost;
    const { tags } = useTagsList();
    const categoryOptions = tags.map((tag) => ({ key: tag.id, value: tag.name }));
    const [selected, setSelected] = useState<[]>([]);
    const [image, setImage] = useState<string | null>(null);

    const handleSelectImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção de imagem');
            } else if (response.errorMessage) {
                console.log('Erro ao selecionar imagem:', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setImage(response.assets[0].uri);
            }
        });
    };

    const handlePublish = () => {
        console.log('Publicando...');

        if (!title || !content) {
            console.log('Erro: título, conteúdo ou categoria estão vazios.');
            return;
        }

        const selectedTags = selected.map((id) => {
            const tag = tags.find((t) => t.id === id);
            return tag ? { id: tag.id, name: tag.name } : null;
        }).filter(Boolean);

        const updatedPost = { ...formPost, tags: selectedTags, image };

        console.log('Dados do post:', updatedPost);
        handleCreatePost(updatedPost);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Nova Postagem</Text>
                </View>

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
                        style={[styles.input, { height: 100 }]}
                        placeholder="Digite o conteúdo"
                        value={content}
                        onChangeText={(value) => handleChange('content', value)}
                        multiline
                    />
                </View>

                {/* Seção de Upload de Imagem */}
                <View style={styles.imageContainer}>
                    <Text style={styles.label}>Imagem</Text>
                    <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
                        <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
                    </TouchableOpacity>

                    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
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
                        badgeStyles={{ backgroundColor: 'rgb(239, 246, 255)' }}
                        badgeTextStyles={{ color: 'rgb(29, 78, 216)', fontWeight: "500" }}
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
