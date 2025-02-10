import React, { useCallback } from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import usePostList from '@/app/utils/hooks/usePostList';
import useDeletePost from '@/app/utils/hooks/useDeletePost';
import { useFocusEffect, useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function SuperAdmin(): JSX.Element {
    const { posts, loading, fetchPosts, loadMorePosts, hasMorePosts } = usePostList();
    const { handleDeletePost } = useDeletePost();
    const router = useRouter();

    const handleDelete = async (id: number) => {
        await handleDeletePost(id, fetchPosts);
    };

    const handleEdit = (id: number) => {
        router.navigate(`/postagens/edit/${id}`);
    };

    useFocusEffect(
        useCallback(() => {
            fetchPosts(1, 10, '', []);
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Título</Text>
                    <Text style={styles.headerText}>Ações</Text>
                </View>
                {loading ? (
                    <Text>Carregando...</Text>
                ) : (
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
                        ListFooterComponent={
                            loading && hasMorePosts ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : null
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
});