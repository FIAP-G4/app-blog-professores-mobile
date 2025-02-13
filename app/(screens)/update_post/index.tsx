import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import usePost from '@/app/utils/hooks/usePost'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ActivityIndicator } from 'react-native-paper'
import useCreatePostForm from '@/app/utils/hooks/useCreatePostForm'
import useTagsList from '@/app/utils/hooks/useTagList'
import styles from './styles'
import { FontAwesome } from '@expo/vector-icons'
import CustomMultipleSelectList from '@/app/components/CustomMultipleSelectList'

const schema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'O título deve ter pelo menos 5 caracteres.')
    .required('Título é obrigatório'),
  content: Yup.string()
    .min(5, 'O conteúdo deve ter pelo menos 5 caracteres.')
    .required('Conteúdo é obrigatório'),
})

export default function UpdatePost(): JSX.Element {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { post, loading: postLoading } = usePost(id as string)
  const { handleCreatePost, loading } = useCreatePostForm()
  const { tags } = useTagsList()
  const categoryOptions = tags.map((tag) => ({ key: tag.id, value: tag.name }))
  const [selected, setSelected] = useState<string[]>([]) // Alterado para string[]
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    if (post) {
      const updatedPost = {
        ...post,
        path_img: post.path_img
          ? `${process.env.EXPO_PUBLIC_CORS_ORIGIN}/${post.path_img.replace(
              /^\/+/,
              '',
            )}`
          : null,
      }

      setSelected(updatedPost.tags.map((tag) => tag.id.toString()))
      setImage(updatedPost.path_img)
    }
  }, [post])

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'É necessário permitir o acesso à galeria.',
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
  }

  if (postLoading && id) {
    return <ActivityIndicator animating={true} color="#0000ff" />
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          <Formik
            initialValues={{
              title: post?.title || '',
              content: post?.content || '',
            }}
            validationSchema={schema}
            onSubmit={(values, { resetForm }) => {
              const selectedTags = selected
                .map((id) => tags.find((t) => t.id.toString() === id))
                .filter(Boolean)

              const formData = new FormData()
              formData.append('title', values.title)
              formData.append('content', values.content)

              selectedTags.forEach((tag, index) => {
                formData.append(`tags[${index}][id]`, tag.id)
                formData.append(`tags[${index}][name]`, tag.name)
              })

              if (image) {
                fetch(image)
                  .then((response) => response.blob())
                  .then((blob) => {
                    if (!blob) return

                    const formData = new FormData()
                    formData.append('title', values.title)
                    formData.append('content', values.content)

                    selectedTags.forEach((tag, index) => {
                      formData.append(`tags[${index}][id]`, tag.id)
                      formData.append(`tags[${index}][name]`, tag.name)
                    })

                    formData.append('attachment', {
                      uri: image,
                      name: 'image.jpg',
                      type: 'image/jpeg',
                    })

                    handleCreatePost(formData, id).then(() => {
                      resetForm()
                      setImage(null)
                      setSelected([])
                      router.replace('/update_post')
                    })
                  })
                  .catch((err) =>
                    console.error('Erro ao converter imagem:', err),
                  )
              } else {
                const formData = new FormData()
                formData.append('title', values.title)
                formData.append('content', values.content)

                selectedTags.forEach((tag, index) => {
                  formData.append(`tags[${index}][id]`, tag.id)
                  formData.append(`tags[${index}][name]`, tag.name)
                })

                handleCreatePost(formData, id).then(() => {
                  resetForm()
                  setImage(null)
                  setSelected([])
                  router.replace('/update_post')
                })
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Título</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o título"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                  />
                  {touched.title && errors.title && (
                    <Text style={styles.errorText}>{errors.title}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Conteúdo</Text>
                  <TextInput
                    style={[styles.input, { height: 100 }]}
                    placeholder="Digite o conteúdo"
                    value={values.content}
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    multiline
                  />
                  {touched.content && errors.content && (
                    <Text style={styles.errorText}>{errors.content}</Text>
                  )}
                </View>

                <View style={styles.imageContainer}>
                  <Text style={styles.label}>Imagem</Text>
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={handleSelectImage}
                  >
                    <Text style={styles.imageButtonText}>
                      Selecionar Imagem
                    </Text>
                  </TouchableOpacity>
                  {image && (
                    <View style={styles.imagePreviewContainer}>
                      <Image
                        source={{ uri: image }}
                        style={styles.imagePreview}
                      />
                      <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={handleRemoveImage}
                      >
                        <FontAwesome name="trash" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View
                  style={[
                    styles.inputContainer,
                    Platform.OS === 'ios' && { marginHorizontal: 12 },
                  ]}
                >
                  <CustomMultipleSelectList
                    setSelected={setSelected}
                    data={categoryOptions}
                    save="key"
                    label="Categorias"
                    placeholder="Buscar por categorias"
                    searchPlaceholder="Filtre por categoria"
                    boxStyles={styles.optionSelect}
                    dropdownStyles={styles.dropdwon}
                    badgeStyles={styles.badgeStyles}
                    badgeTextStyles={styles.badgeTextStyles}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  {loading ? (
                    <ActivityIndicator
                      animating={true}
                      size="large"
                      color="#4e46dd"
                    />
                  ) : (
                    <TouchableOpacity onPress={() => handleSubmit()}>
                      <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
