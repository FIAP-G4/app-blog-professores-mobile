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
import CustomMultipleSelectList from '@/app/components/CustomMultipleSelectList'
import CardPost from '@/app/components/CardPost'
import AntDesign from '@expo/vector-icons/AntDesign'
import styles from './styles'

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
      <View style={styles.contentMultiSelect}>
        <CustomMultipleSelectList
          setSelected={(val: any) => {
            console.log(val)
            setSelected(val)
          }}
          onSelect={() => {
            console.log(selected)
          }}
          data={categoryOptions}
          save="key"
          label="Categorias"
          placeholder="Buscar por categrorias"
          searchPlaceholder="Filtre por categoria"
          boxStyles={styles.optionSelect}
          dropdownStyles={styles.dropdown}
          badgeStyles={styles.badgeStyles}
          badgeTextStyles={styles.badgeTextStyles}
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
            style={styles.btn}
            onPress={() => {
              fetchPosts(1, 2, searchTerm, selected)
              setCurrentPage(1)
            }}
          >
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return (
            <CardPost
              id={item.id}
              title={item.title}
              content={item.content}
              teacher={item.teacher}
              path_img={item.path_img}
              tags={item.tags}
              created_at={item.created_at}
              viewedCount={item.viewedCount}
              commentCount={item.commentCount}
            />
          )
        }}
        keyExtractor={(item) => item.id}
        initialNumToRender={1}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!loading && hasMorePosts) {
            loadMorePosts(1, 2, searchTerm, selected)
          }
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  )
}
