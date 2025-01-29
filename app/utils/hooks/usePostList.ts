import { useEffect, useState } from 'react'
import { getPosts } from '@/app/services/posts/getPosts'
import Post from '@/app/services/posts/IPost'
import Tag from '@/app/services/tags/ITag'

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
    p0: number,
    searchTerm: string,
    tags: number[],
  ) => {
    setLoading(true)
    try {
      const fetchedPosts = await getPosts(
        currentPage,
        postsPerPage,
        searchTerm,
        tags,
      )

      setPosts(fetchedPosts || [])
      setPosts((prev) => [...prev, ...(fetchedPosts || [])])
      setHasMorePosts((fetchedPosts || []).length === postsPerPage) // Verifica se há mais posts
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const loadMorePosts = async () => {
    if (loading || !hasMorePosts) return

    const nextPage = currentPage + 1
    setCurrentPage(nextPage)

    try {
      await fetchPosts(nextPage, 2, searchTerm, tags)
      setCurrentPage(nextPage)
    } catch (error) {
      console.error('Erro ao carregar mais posts:', error)
    }
  }

  useEffect(() => {
    fetchPosts(currentPage, 2, searchTerm, tags)
  }, [currentPage])

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
    setSearchTerm,
    setTags,
  }
}

export default usePostList
