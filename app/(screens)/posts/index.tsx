import usePostList from '@/app/utils/hooks/usePostList'
import { SafeAreaView, View, FlatList, Text } from 'react-native'
import { Post } from '@/app/utils/hooks/usePostList'

const PostItem = ({ title }: Partial<Post>): JSX.Element => (
  <View>
    <Text>{title}</Text>
  </View>
)

export default function Posts(): JSX.Element {
  const { posts } = usePostList()

  console.log(posts)

  return (
    <SafeAreaView>
      <View>
        <Text>A Lista esta aqui</Text>
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostItem title={item.title} />}
          keyExtractor={(item) => item.id}
          style={{ width: '100%' }}
        />
      </View>
    </SafeAreaView>
  )
}
