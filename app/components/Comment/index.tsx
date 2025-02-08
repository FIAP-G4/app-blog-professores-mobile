import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import IComment from '@/app/services/comments/IComment'

const Comment = ({ postId, content }: IComment): JSX.Element => {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{postId}</Text>
      <Text style={styles.commentContent}>{content}</Text>
    </View>
  )
}

export default Comment
