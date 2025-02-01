import useStudentList, { IStudent } from '@/app/utils/hooks/useStudentList';
import useDeleteStudent from '@/app/utils/hooks/useStudentDelete';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { User } from '@/app/services/user/IUser';
import useUpdateUser from '@/app/utils/hooks/useUserUpdate';
import UserList from '@/app/components/UserList';
import EditUserModal from '@/app/components/EditUserModal';

export default function DashboardStudent(): JSX.Element {
  const { students, loading, fetchStudents } = useStudentList();
  const { handleDeleteStudent } = useDeleteStudent();
  const { handleUpdateUser } = useUpdateUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleDeleteUser = async (id: number) => {
    await handleDeleteStudent(id, fetchStudents);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleSaveUser = async (updatedUser: IStudent) => {
    console.log("Dados enviados para atualização:", updatedUser); // Debug
    setModalVisible(false);
    await handleUpdateUser(updatedUser.user_id, updatedUser, fetchStudents);
  };

  return (
    <>
    <SafeAreaView>
      <UserList users={students} onDelete={handleDeleteUser} loading={loading} onEdit={handleEditUser}/>
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
