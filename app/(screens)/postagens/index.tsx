import React, { useState } from 'react'
import usePostList from '@/utils/hooks/usePostList'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import CardPost from '@/components/CardPost'
import AntDesign from '@expo/vector-icons/AntDesign'
import styles from './styles'

export default function Posts(): JSX.Element {
  const { posts } = usePostList()
  const [tag, setTag] = useState('')

  return (
    <SafeAreaView style={[styles.screen, { flex: 1 }]}>
      <View style={styles.optionSelect}>
        <Text style={styles.optionSeletText}>Selecione uma categoria...</Text>
        <Picker
          style={styles.optionSelectPicker}
          selectedValue={tag}
          onValueChange={(itemValue) => setTag(itemValue)}
        >
          <Picker.Item label="" value="" />
          {/* Cödgio temporário para tags*/}
          <Picker.Item label="Redação" value="Redação" />
          <Picker.Item label="Oficina" value="Oficina" />
        </Picker>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Buscar por postagens"
        />
        <View style={styles.btnWrapper}>
          <TouchableOpacity onPress={() => {}}>
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
        initialNumToRender={1}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  )
}
