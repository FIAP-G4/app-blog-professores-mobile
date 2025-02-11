import { getPosts } from '@/app/services/posts/getPosts';
import Post from '@/app/services/posts/IPost';
import { useEffect, useState } from 'react';

const usePostList = (initialPage = 1, postsPerPage = 10) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<Error | unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<number[]>([]);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  const fetchPosts = async (page: number, limit: number, searchTerm: string, tags: number[]) => {
    setLoading(true);
    try {
      const fetchedPosts = await getPosts(page, limit, searchTerm, tags);

      if (page === 1) {
        setPosts(fetchedPosts || []);
      } else {
        setPosts((prev) => [...prev, ...(fetchedPosts || [])]);
      }
      setHasMorePosts((fetchedPosts || []).length === limit); // Verifica se há mais posts
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = async () => {
    if (loading || !hasMorePosts) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    try {
      await fetchPosts(nextPage, postsPerPage, searchTerm, tags);
    } catch (error) {
      console.error('Erro ao carregar mais posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, postsPerPage, searchTerm, tags);
  }, [currentPage, searchTerm, tags]);

  return {
    posts,
    error,
    loading,
    currentPage,
    searchTerm,
    hasMorePosts,
    tags,
    loadMorePosts,
    fetchPosts,
    setCurrentPage,
    setSearchTerm,
    setTags,
  };
};

export default usePostList;