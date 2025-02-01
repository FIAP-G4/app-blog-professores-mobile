import { useEffect, useState } from 'react';
import { getAllStudents } from '@/app/services/student/getAllStudents';

export interface IStudent {
  id: number;
  user_id: number;
  email: string;
  name: string;
}

const useStudentList = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [error, setError] = useState<Error | unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      if (data) {
        setStudents(data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, error, loading, fetchStudents };
};

export default useStudentList;
