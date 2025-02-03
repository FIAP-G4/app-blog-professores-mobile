import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import UserList from '@/app/components/UserList';
import useDeleteTeacher from '@/app/utils/hooks/useTeacherDelete';
import useTeacherList from '@/app/utils/hooks/useTeacherList';
import { useFocusEffect } from 'expo-router';

export default function DashboardTeacher(): JSX.Element {
  const { teachers, loading, fetchTeachers } = useTeacherList();
  const { handleDeleteTeacher } = useDeleteTeacher();

  const handleDeleteUser = async (id: number) => {
    await handleDeleteTeacher(id, fetchTeachers);
  };

  useFocusEffect(
    useCallback(() => {
      fetchTeachers();
    }, [])
  );
  
  return (
    <SafeAreaView>
      <UserList users={teachers} onDelete={handleDeleteUser} loading={loading}/>
    </SafeAreaView>
  );
}
