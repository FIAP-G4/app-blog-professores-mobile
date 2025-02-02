import React from 'react';
import { SafeAreaView } from 'react-native';
import UserList from '@/app/components/UserList';
import useDeleteStudent from '@/app/utils/hooks/useStudentDelete';
import useStudentList from '@/app/utils/hooks/useStudentList';

export default function DashboardStudent(): JSX.Element {
  const { students, loading, fetchStudents } = useStudentList();
  const { handleDeleteStudent } = useDeleteStudent();

  const handleDeleteUser = async (id: number) => {
    await handleDeleteStudent(id, fetchStudents);
  };
  
  return (
    <SafeAreaView>
      <UserList users={students} onDelete={handleDeleteUser} loading={loading}/>
    </SafeAreaView>
  );
}
