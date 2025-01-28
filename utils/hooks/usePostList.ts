import { useEffect, useState } from 'react'
import { getPosts } from '@/services/posts/getPosts'
import Post from '@/services/posts/IPost'

const usePostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<Error | unknown>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [tags, setTags] = useState<never[string]>([] as never[string])
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(false)

  const fetchPosts = async (page = 1, limit = 2) => {
    setLoading(true)
    try {
      const fetchedPosts = await getPosts(page, limit, searchTerm, tags)
      if (page === 1) {
        // Primeira página: substitui a lista de posts
        setPosts(fetchedPosts || [])
      } else {
        // Páginas subsequentes: adiciona à lista existente
        setPosts((prev) => [...prev, ...(fetchedPosts || [])])
      }
      setHasMorePosts((fetchedPosts || []).length === limit) // Verifica se há mais posts
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const loadMorePosts = async () => {
    if (loading || !hasMorePosts) return

    const nextPage = currentPage + 1

    try {
      await fetchPosts(nextPage, 2)
      setCurrentPage(nextPage)
    } catch (error) {
      console.error('Erro ao carregar mais posts:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [searchTerm, tags])

  return {
    posts,
    error,
    loading,
    searchTerm,
    hasMorePosts,
    loadMorePosts,
    fetchPosts,
    setSearchTerm,
    setTags,
  }
}

export default usePostList
