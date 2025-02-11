import React, {useCallback, useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, ScrollView} from 'react-native';
import usePostList from '@/app/utils/hooks/usePostList';
import useDeletePost from '@/app/utils/hooks/useDeletePost';
import { useFocusEffect, useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import ConfirmationModal from '../../components/ConfirmationModal';

export default function SuperAdmin(): JSX.Element {
    const { posts, loading, fetchPosts, loadMorePosts, hasMorePosts } = usePostList();
    const { handleDeletePost } = useDeletePost();
    const router = useRouter();

    const [refresh, setRefresh] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    useFocusEffect(
        useCallback(() => {
            fetchPosts(1, 10, '', []);
        }, [refresh]) // Sempre que refresh mudar, os posts serão atualizados
    );

    const handleDelete = async (id: number) => {
        setSelectedPostId(id);
        setModalVisible(true);
    };

    const confirmDelete = async () => {
        if (selectedPostId) {
            await handleDeletePost(selectedPostId, () => {
                setRefresh((prev) => !prev);
                setModalVisible(false);
            });
        }
    };

    const handleEdit = (id: number) => {
        router.push(`/create_post?id=${id}`); // Navega para create_post com o id na URL
    };


    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{ height: '100%' }}/>
            ) : (
                <>
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.headerText}>Título</Text>
                                <Text style={styles.headerText}>Ações</Text>
                            </View>
                            <FlatList
                                data={posts}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.tableRow}>
                                        <Text style={styles.rowText}>{item.title}</Text>
                                        <View style={styles.actions}>
                                            <TouchableOpacity onPress={() => handleEdit(item.id)}>
                                                <Feather name="edit" size={24} color="blue" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                                <Feather name="trash-2" size={24} color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                                onEndReached={() => {
                                    if (hasMorePosts && !loading) {
                                        loadMorePosts();
                                    }
                                }}
                                onEndReachedThreshold={0.5}
                                ListEmptyComponent={<Text style={styles.searchEmpty}>Sem resultados</Text>}
                                ListFooterComponent={
                                    loading && hasMorePosts ? (
                                        <ActivityIndicator size="small" color="#0000ff" />
                                    ) : null
                                }
                            />
                        </View>
                    </ScrollView>
                    <ConfirmationModal
                        isVisible={isModalVisible}
                        message="Tem certeza que deseja excluir esta postagem?"
                        onConfirm={confirmDelete}
                        onCancel={() => setModalVisible(false)}
                        setVisible={setModalVisible}
                    />
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    scrollContainer: {
        flex: 1,
    },
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    rowText: {
        flex: 1,
    },
    actions: {
        flexDirection: 'row',
        gap: 16,
    },
    searchEmpty: {
        textAlign: 'center',
        padding: 20,
    }
});
