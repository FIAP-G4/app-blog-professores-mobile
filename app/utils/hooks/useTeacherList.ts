import { useEffect, useState } from 'react';
import { getAllTeachers } from '@/app/services/teacher/getAllTeachers';

export interface ITeacher {
  id: number;
  user_id: number;
  email: string;
  name: string;
  password: string;
  subject: Array<object>;
}

const useTeacherList = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [error, setError] = useState<Error | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const data = await getAllTeachers();
      if (data) {
        setTeachers(data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return { teachers, error, loading, fetchTeachers };
};

export default useTeacherList;
