import { getPostById } from '@/app/services/posts/getPostById';
import Post from '@/app/services/posts/IPost';
import { useEffect, useState } from 'react';

const usePost = (id: string) => {
  const [post, setPost] = useState<Post | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | unknown>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getPostById(id)
        .then((data) => {
          if (data) {
            setPost(data);
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [id]);

  return { post, loading, error };
};

export default usePost;