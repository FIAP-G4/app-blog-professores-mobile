import React from 'react'
import { View, TextInput, Button } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useCreateCommentForm from '@/app/utils/hooks/useCreateCommentForm'
import { useAuth } from '@/context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-animatable'
import globalStyles from '@/app/styles'
import { ActivityIndicator } from 'react-native'
import styles from './styles'
import Toast from 'react-native-toast-message'

const schema = Yup.object().shape({
  content: Yup.string().required('Escreva algo para comentar...'),
})

interface PostId {
  postId: string
}

export default function CreateComment({ postId }: PostId): JSX.Element {
  const { handleCreateComment, loadingCreateCommentForm, createCommentForm } =
    useCreateCommentForm()
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? (
    <SafeAreaView>
      <Formik
        initialValues={{
          postId: postId,
          content: createCommentForm.content,
        }}
        validationSchema={schema}
        onSubmit={handleCreateComment}
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
            <Text>Comentário:</Text>
            <TextInput
              onChangeText={handleChange('content')}
              onBlur={handleBlur('content')}
              value={values.content}
              placeholder='Escreva seu comentário...'
              keyboardType='twitter'
              placeholderTextColor={'#888'}
            />
            <Text style={globalStyles.error}>
              {touched.content && errors.content ? errors.content : ''}
            </Text>
            <View style={styles.buttonContainer}>
              {loadingCreateCommentForm ? (
                <ActivityIndicator size='large' color='#4e46dd' />
              ) : (
                <Button
                  title='Comentar'
                  color='#4e46dd'
                  onPress={handleSubmit as any}
                />
              )}
            </View>
          </View>
        )}
      </Formik>
      <Toast />
    </SafeAreaView>
  ) : (
    <></>
  )
}
