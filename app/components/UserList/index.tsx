import React from 'react';
import {   
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import styles from './styles'
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import { ITeacher } from '@/app/utils/hooks/useTeacherList';

interface IUser {
    users: {
        id: number;
        name: string;
        email: string;
}[],
    onDelete?: (id: number) => void;
    onEdit: (user: ITeacher) => void;
    loading?: boolean; 
}

const UserList = ({ users = [], onDelete, onEdit, loading }: IUser): JSX.Element => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setSelectedUserId(id);
        setModalVisible(true);
    };

    const confirmDelete = () => {
        if (selectedUserId && onDelete) {
            onDelete(selectedUserId);
          }
        setModalVisible(false); 
    };

    const renderItem = ({ item }: { item: ITeacher }) => (
        <View style={styles.cardWrapper}>
            <View style={styles.card}>
                <View style={[styles.cardImg, styles.cardAvatar]}>
                    <AntDesign name="user" style={styles.cardAvatarText} />
                </View>
                <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardMail}>{item.email}</Text>
                </View>
                <View style={styles.cardAction}>
                    <TouchableOpacity>
                        <AntDesign name="edit" onPress={() => onEdit(item)}  size={22} style={[styles.buttonAction, styles.buttonActionEdit]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <AntDesign name="delete" size={22} style={[styles.buttonAction, styles.buttonActionDelete]} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );


  return (
        <>
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={{ height: '100%' }}/>
        ) : (
            <>
            <FlatList
                data={users as ITeacher[]} 
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.searchContent}
                ListEmptyComponent={<Text style={styles.searchEmpty}>Sem resultados</Text>}
            />
            <ConfirmationModal
                isVisible={isModalVisible}
                message="Tem certeza que deseja excluir este usuário?"
                onConfirm={confirmDelete}
                onCancel={() => setModalVisible(false)}
                setVisible={setModalVisible}
            />
            </>
        )}
        </>
  )
}

export default UserList