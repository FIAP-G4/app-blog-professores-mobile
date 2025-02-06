import { getPostById } from '@/app/services/posts/getPostById'
import Post from '@/app/services/posts/IPost'
import { useEffect, useState } from 'react'

const usePost = (id: string) => {
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
  }, [id])

  if (error) return { error }

  return { post, error }
}

export default usePost
