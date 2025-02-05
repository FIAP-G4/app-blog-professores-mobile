import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import UserList from '@/app/components/UserList';
import useDeleteStudent from '@/app/utils/hooks/useStudentDelete';
import useStudentList, { IStudent } from '@/app/utils/hooks/useStudentList';
import { useFocusEffect, useRouter } from 'expo-router';
import ITeacher from '@/app/services/teachers/ITeacher';

export default function DashboardStudent(): JSX.Element {
  const { students, loading, fetchStudents } = useStudentList();
  const { handleDeleteStudent } = useDeleteStudent();
  const router = useRouter();

  const handleDeleteUser = async (id: number) => {
    await handleDeleteStudent(id, fetchStudents);
  };

  const handleEditUser = (user: ITeacher | IStudent) => {
    router.replace({
      pathname: './editUser',
      params: { user: JSON.stringify(user) }
  });
  
};


  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, [])
  );

  return (
    <SafeAreaView>
      <UserList users={students} onDelete={handleDeleteUser} onEdit={handleEditUser} loading={loading} />
    </SafeAreaView>
  );
}
