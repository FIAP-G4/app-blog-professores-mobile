import { useEffect, useState } from 'react'
import { getPosts } from '@/services/posts/getPosts'
import { postViewed } from '@/services/posts/postViewed'
import Post from '@/services/posts/IPost'

const usePostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<Error | unknown>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  // const [currentPage, setCurrentPage] = useState(initialPage)
  // const [hasMorePosts, setHasMorePosts] = useState(false)
  const [tags, setTags] = useState([])

  const handleSearchPosts = async () => {
    try {
      setLoading(true)
      const search = searchTerm || ''
      const posts = await getPosts(search, tags)
      if (posts) {
        setPosts(posts)
      }
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
      setError('Ocorreu um erro ao carregar os posts.')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handlePostViewed = async (postId: Partial<Post>) => {
    try {
      await postViewed(postId)
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, viewedCount: post.viewedCount + 1 }
            : post,
        ),
      )
    } catch (error) {
      console.error('Erro ao marcar post como visualizado:', error)
    }
  }

  useEffect(() => {
    getPosts()
      .then((data) => {
        if (data) {
          setPosts(data)
        }
      })
      .catch((err) => {
        setError(err)
      })
  }, [])

  return { posts, error, handleSearchPosts, handlePostViewed }
}

export default usePostList
