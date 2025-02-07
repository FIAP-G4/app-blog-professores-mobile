import { getPosts } from '@/app/services/posts/getPosts'
import Post from '@/app/services/posts/IPost'
import { useEffect, useState } from 'react'

const usePostList = (initial = 1, postsPerPage = 2) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<Error | unknown>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [tags, setTags] = useState<number[]>([])
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(false)

  const fetchPosts = async (
    nextPage: number,
    limit: number,
    searchTerm: string,
    tags: number[],
  ) => {
    setLoading(true)
    try {
      const fetchedPosts = await getPosts(nextPage, limit, searchTerm, tags)

      if (nextPage === 1) {
        setPosts(fetchedPosts || [])
      } else {
        setPosts((prev) => [...prev, ...(fetchedPosts || [])])
      }
      setHasMorePosts((fetchedPosts || []).length === limit) // Verifica se há mais posts
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const loadMorePosts = async (searchTerm: string, tags: number[]) => {
    if (loading || !hasMorePosts) return

    const nextPage = currentPage + 1
    setCurrentPage(nextPage)

    try {
      await fetchPosts(nextPage, postsPerPage, searchTerm, tags)
    } catch (error) {
      console.error('Erro ao carregar mais posts:', error)
    }
  }

  useEffect(() => {
    fetchPosts(currentPage, postsPerPage, searchTerm, tags)
  }, [])

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
  }
}

export default usePostList
