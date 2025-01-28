import React, { useState } from 'react'
import usePostList from '@/utils/hooks/usePostList'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import CardPost from '@/components/CardPost'
import AntDesign from '@expo/vector-icons/AntDesign'
import styles from './styles'

export default function Posts(): JSX.Element {
  const {
    posts,
    error,
    loading,
    searchTerm,
    hasMorePosts,
    loadMorePosts,
    fetchPosts,
    setSearchTerm,
    setTags,
  } = usePostList()

  const tagsOptions = posts
    ? Array.from(new Set(posts.flatMap((post) => post.tags)))
    : []

  const [tag, setTag] = useState<string>('')

  return (
    <SafeAreaView style={[styles.screen, { flex: 1 }]}>
      <View style={styles.optionSelect}>
        <Text style={styles.optionSeletText}>Selecione uma categoria...</Text>
        <Picker
          onValueChange={(itemValue) => setTags([itemValue])}
          selectedValue={tag}
          onValueChange={(itemValue) => setTag(itemValue)}
        >
          <Picker.Item label="Todas" value="" />
          {tagsOptions.map((tag) => (
            <Picker.Item key={tag} label={tag} value={tag} />
          ))}
        </Picker>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Buscar por postagens"
          onChangeText={(value) => setSearchTerm(value)}
          value={searchTerm}
        />
        <View style={styles.btnWrapper}>
          <TouchableOpacity onPress={fetchPosts}>
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
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
          loadMorePosts()
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  )
}
