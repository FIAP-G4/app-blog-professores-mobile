import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import UserList from '@/app/components/UserList';
import useDeleteTeacher from '@/app/utils/hooks/useTeacherDelete';
import useTeacherList, { ITeacher } from '@/app/utils/hooks/useTeacherList';
import { useFocusEffect, useRouter } from 'expo-router';
import { IStudent } from '@/app/utils/hooks/useStudentList';

export default function DashboardTeacher(): JSX.Element {
  const { teachers, loading, fetchTeachers } = useTeacherList();
  const { handleDeleteTeacher } = useDeleteTeacher();
  const router = useRouter();

  const handleDeleteUser = async (id: number) => {
    await handleDeleteTeacher(id, fetchTeachers);
  };

  const handleEditUser = (user: ITeacher | IStudent) => {
      router.push({
        pathname: '/editUser',
        params: { user: JSON.stringify(user) }
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchTeachers();
    }, [])
  );
  
  return (
    <SafeAreaView>
      <UserList users={teachers} onDelete={handleDeleteUser} loading={loading} onEdit={handleEditUser}/>
    </SafeAreaView>
  );
}
