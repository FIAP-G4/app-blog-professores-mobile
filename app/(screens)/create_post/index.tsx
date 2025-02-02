import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import styles from './styles';
import useCreatePostForm from '@/app/utils/hooks/useCreatePostForm';
import useTagsList from '@/app/utils/hooks/useTagList'
import {MultipleSelectList} from "react-native-dropdown-select-list";
import {useState} from "react";

export default function CreatePost(): JSX.Element {
    const {handleCreatePost, formPost, handleChange, loading} = useCreatePostForm();
    const {title, content} = formPost;
    const {tags} = useTagsList()
    const categoryOptions = tags.map((tag) => ({key: tag.id, value: tag.name}))
    const [selected, setSelected] = useState<[]>([])

    const handlePublish = () => {
        console.log('Publicando...');

        if (!title || !content) {
            console.log('Erro: título, conteúdo ou categoria estão vazios.');
            return;
        }

        const selectedTags = selected.map((id) => {
            const tag = tags.find((t) => t.id === id);
            return tag ? {id: tag.id, name: tag.name} : null;
        }).filter(Boolean);

        const updatedPost = {...formPost, tags: selectedTags};

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
                        style={[styles.input, {height: 100}]}
                        placeholder="Digite o conteúdo"
                        value={content}
                        onChangeText={(value) => handleChange('content', value)}
                        multiline
                    />
                </View>

                <View>
                    <MultipleSelectList
                        setSelected={(val: any) => setSelected(val)}
                        data={categoryOptions}
                        save='key'
                        label='Categorias'
                        placeholder='Buscar por categrorias'
                        searchPlaceholder='Filtre por categoria'
                        boxStyles={styles.optionSelect}
                        dropdownStyles={styles.dropdwon}
                        badgeStyles={{backgroundColor: 'rgb(239, 246, 255)'}}
                        badgeTextStyles={{color: 'rgb(29, 78, 216)', fontWeight: 500}}
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
