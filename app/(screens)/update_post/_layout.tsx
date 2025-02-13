import { router, Slot, usePathname, useSegments } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import Feather from "@expo/vector-icons/Feather";

export default function PostsLayout() {
    const segments = useSegments()

    return (
        <>
            <View style={styles.subHeader}>
                <Text style={styles.pageTitle}>
                    {segments ? 'Editar Postagem' : 'Update_post'}
                </Text>
                {segments && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.navigate('/super-admin')}
                    >
                        <Feather name='arrow-left' size={24} color='black' />
                        <Text>Voltar</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Slot />
        </>
    )
}

const styles = StyleSheet.create({
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
    },
})