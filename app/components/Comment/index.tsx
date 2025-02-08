import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import IComment from '@/app/services/comments/IComment'

const Comment = ({ author, date, content }: IComment): JSX.Element => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>{author}</Text>
        <Text style={styles.commentDate}>{date}</Text>
      </View>
      <Text style={styles.commentContent}>{content}</Text>
    </View>
  )
}

export default Comment
