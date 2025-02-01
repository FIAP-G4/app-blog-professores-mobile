import React, { useState } from 'react';
import UserList from '@/app/components/UserList';
import useDeleteTeacher from '@/app/utils/hooks/useTeacherDelete';
import useTeacherList from '@/app/utils/hooks/useTeacherList';
import useUpdateUser from '@/app/utils/hooks/useUserUpdate';
import EditUserModal from '@/app/components/EditUserModal';
import { SafeAreaView } from 'react-native';
import { User } from '@/app/services/user/IUser';
import Toast from 'react-native-toast-message';


export default function DashboardTeacher(): JSX.Element {
  const { teachers, loading, fetchTeachers } = useTeacherList();
  const { handleDeleteTeacher } = useDeleteTeacher();
  const { handleUpdateUser } = useUpdateUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleDeleteUser = async (id: number) => {
    await handleDeleteTeacher(id, fetchTeachers);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleSaveUser = async (updatedUser: User) => {
    setModalVisible(false);
    await handleUpdateUser(updatedUser.id, updatedUser, fetchTeachers);
  };
  
  return (
    <>
      
      <SafeAreaView>
        <UserList users={teachers} onDelete={handleDeleteUser} loading={loading} onEdit={handleEditUser}/>
        <EditUserModal
          visible={isModalVisible}
          user={selectedUser}
          onClose={() => setModalVisible(false)}
          onSave={handleSaveUser}
        />
      </SafeAreaView>
    </>
  )
}