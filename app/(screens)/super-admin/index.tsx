import React, {useCallback, useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, ScrollView} from 'react-native';
import usePostList from '@/app/utils/hooks/usePostList';
import useDeletePost from '@/app/utils/hooks/useDeletePost';
import { useFocusEffect, useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import ConfirmationModal from '../../components/ConfirmationModal';
import styles from './styles';

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
        }, [refresh])
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
        router.push(`/create_post?id=${id}`);
    };


    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{ height: '100%' }}/>
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={
                        <View style={styles.tableHeader}>
                            <Text style={styles.headerText}>Título</Text>
                            <Text style={styles.headerText}>Ações</Text>
                        </View>
                    }
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
                    contentContainerStyle={styles.listContent}
                />
            )}

            <ConfirmationModal
                isVisible={isModalVisible}
                message="Tem certeza que deseja excluir esta postagem?"
                onConfirm={confirmDelete}
                onCancel={() => setModalVisible(false)}
                setVisible={setModalVisible}
            />
        </SafeAreaView>
    );

}