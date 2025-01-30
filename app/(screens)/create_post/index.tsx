import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import useCreatePostForm from '@/app/utils/hooks/useCreatePostForm';

export default function CreatePost(): JSX.Element {
    const { handleCreatePost, formPost, handleChange, loading } = useCreatePostForm();
    const { title, content } = formPost;

    const handlePublish = () => {
        console.log('Publicando...'); // Adicione um log para verificar se a função é chamada
        if (!title || !content) {
            console.log('Erro: título, conteúdo ou categoria estão vazios.');
            return;
        }

        console.log('Dados do post:', formPost);
        handleCreatePost(formPost);
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

                {/*<View style={styles.inputContainer}>*/}
                {/*    <Text style={styles.label}>Categoria</Text>*/}
                {/*    <View style={styles.dropdown}>*/}
                {/*        <Picker*/}
                {/*            selectedValue={tag}*/}
                {/*            onValueChange={(itemValue) => handleChange('tag', itemValue)}*/}
                {/*            style={{ flex: 1 }}*/}
                {/*        >*/}
                {/*            <Picker.Item label="Selecione uma categoria..." value="" />*/}
                {/*            <Picker.Item label="Redação" value="Redação" />*/}
                {/*            <Picker.Item label="Oficina" value="Oficina" />*/}
                {/*        </Picker>*/}
                {/*    </View>*/}
                {/*</View>*/}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePublish}
                    disabled={loading} // Desabilita o botão se estiver carregando
                >
                    <Text style={styles.buttonText}>{loading ? 'Publicando...' : 'Publicar'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
