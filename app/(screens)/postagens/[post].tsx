import usePost from '@/app/utils/hooks/usePost'
import React from 'react'
import { Text } from 'react-native'

const Post = () => {
  const { post, error } = usePost()
  return (
    <>
      <Text>{post?.title}</Text>
    </>
  )
}

export default Post
