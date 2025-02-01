import { useState } from 'react'
import usePostList from '@/app/utils/hooks/usePostList'
import useTagsList from '@/app/utils/hooks/useTagList'
import {
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import CardPost from '@/app/components/CardPost'
import AntDesign from '@expo/vector-icons/AntDesign'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Posts(): JSX.Element {
  const {
    posts,
    loading,
    searchTerm,
    hasMorePosts,
    loadMorePosts,
    fetchPosts,
    setCurrentPage,
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
          save='key'
          label='Categorias'
          placeholder='Buscar por categrorias'
          searchPlaceholder='Filtre por categoria'
          boxStyles={styles.optionSelect}
          dropdownStyles={styles.dropdwon}
          badgeStyles={{ backgroundColor: 'rgb(239, 246, 255)' }}
          badgeTextStyles={{ color: 'rgb(29, 78, 216)', fontWeight: 500 }}
        />
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder='Buscar por postagens'
          onChangeText={(value) => setSearchTerm(value)}
          value={searchTerm}
        />
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              fetchPosts(1, 2, searchTerm, selected)
              setCurrentPage(1)
            }}
          >
            <AntDesign name='search1' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </View>
      {loading && <ActivityIndicator size='large' color='#0000ff' />}
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
        initialNumToRender={1}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!loading && hasMorePosts) {
            loadMorePosts(searchTerm, selected)
          }
        }}
        ListFooterComponent={
          loading && hasMorePosts ? (
            <ActivityIndicator size='small' color='#0000ff' />
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  )
}
