import { useEffect, useState } from 'react'
import { getPostById } from '@/services/posts/getPostById'
import { Post } from '@/services/posts/IPost'

const usePost = (id: string = 'adbe2c41-6947-43f0-96bf-8f7f20d47f3c') => {
  const [post, setPost] = useState<Post | undefined>()
  const [error, setError] = useState<Error | unknown>(null)

  useEffect(() => {
    getPostById(id)
      .then((data) => {
        if (data) {
          setPost(data)
        }
      })
      .catch((err) => {
        setError(err)
      })
  }, [])

  return { post, error }
}

export default usePost
