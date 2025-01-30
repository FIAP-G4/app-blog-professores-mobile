import { useEffect, useState } from 'react'
import { getPosts } from '@/services/posts/getPosts'
import { Post } from '@/services/posts/IPost'

const usePostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<Error | unknown>(null)

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

  return { posts, error }
}

export default usePostList
