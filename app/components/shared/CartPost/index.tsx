import { View, Text } from 'react-native'
import { Post } from '@/app/services/posts/getPosts'

const CardPost = ({ title }: Partial<Post>): JSX.Element => (
  <View>
    <Text>{title}</Text>
  </View>
)

export default CardPost
