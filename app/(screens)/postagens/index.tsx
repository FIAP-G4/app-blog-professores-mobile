import { useState } from 'react'
import usePostList from '@/app/utils/hooks/usePostList'
import useTagsList from '@/app/utils/hooks/useTagList'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import CardPost from '@/app/components/CardPost'
import AntDesign from '@expo/vector-icons/AntDesign'
import styles from './styles'

export default function Posts(): JSX.Element {
  const {
    posts,
    error,
    loading,
    currentPage,
    searchTerm,
    hasMorePosts,
    loadMorePosts,
    fetchPosts,
    setSearchTerm,
  } = usePostList()
  const { tags } = useTagsList()
  const [selected, setSelected] = useState<[]>([])
  const categoryOptions = tags.map((tag) => ({ key: tag.id, value: tag.name }))

  return (
    <SafeAreaView style={[styles.screen, { flex: 1 }]}>
      <View>
        <MultipleSelectList
          setSelected={(val: any) => setSelected(val)}
          data={categoryOptions}
          save="key"
          label="Categorias"
          onSelect={() => console.log('Selected:' + selected)}
          placeholder="Buscar por categrorias"
          searchPlaceholder="Filtre por categoria"
          boxStyles={styles.optionSelect}
        />
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Buscar por postagens"
          onChangeText={(value) => setSearchTerm(value)}
          value={searchTerm}
        />
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            onPress={() => {
              console.log('Pagina', currentPage)
              console.log('Termo de busca', searchTerm)
              console.log('tags', selected)
              fetchPosts(currentPage, 2, searchTerm, selected)
            }}
          >
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <CardPost
            title={item.title}
            content={item.content}
            teacher={item.teacher}
            path_img={item.path_img}
            tags={item.tags}
            created_at={item.created_at}
            viewedCount={item.viewedCount}
            commentCount={item.commentCount}
          />
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={2}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          //loadMorePosts()
        }}
        ListFooterComponent={
          loading && hasMorePosts ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  )
}
