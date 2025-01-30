import React, { useEffect, useState } from 'react'
import usePostList from '@/app/utils/hooks/usePostList'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import CardPost from '@/app/components/CardPost'
import AntDesign from '@expo/vector-icons/AntDesign'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Posts(): JSX.Element {
  const { posts } = usePostList()
  const [tag, setTag] = useState('')
  const [credenciais, setCredenciais] = useState<string | null>(null)

  useEffect(() => {
    const fetchCredentials = async () => {
      const credentials = await AsyncStorage.getItem('credentials')
      setCredenciais(credentials)
    }
    fetchCredentials()
  }, [])

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.optionSelect}>
        <Text style={styles.optionSeletText}>Selecione uma categoria...</Text>
        <Picker
          style={styles.optionSelectPicker}
          selectedValue={tag}
          onValueChange={(itemValue) => setTag(itemValue)}
        >
          <Picker.Item label='' value='' />
          {/* Cödgio temporário para tags*/}
          <Picker.Item label='Redação' value='Redação' />
          <Picker.Item label='Oficina' value='Oficina' />
        </Picker>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder='Buscar por postagens'
        />
        <View style={styles.btnWrapper}>
          <TouchableOpacity onPress={() => {}}>
            <AntDesign name='search1' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: '100%' }}>
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
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  )
}
