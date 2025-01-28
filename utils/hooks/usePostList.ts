import { useEffect, useState } from 'react'
import { getPosts } from '@/services/posts/getPosts'
import Post from '@/services/posts/IPost'

const usePostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<Error | unknown>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [tags, setTags] = useState<never[string]>([] as never[string])
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(false)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const posts = await getPosts(1, 2, searchTerm, tags)
      setPosts(posts || [])
      setHasMorePosts((posts || []).length > 0)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const loadMorePosts = async () => {
    if (loading || !hasMorePosts) return
    setLoading(true)
    try {
      const additionalPosts = await getPosts(
        posts.length / 10 + 1,
        10,
        searchTerm,
        tags,
      )
      setPosts((prev) => [...prev, ...(additionalPosts || [])])
      setHasMorePosts((additionalPosts || []).length > 0)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
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
