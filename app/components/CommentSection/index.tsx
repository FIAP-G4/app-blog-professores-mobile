import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Button,
  Modal,
} from 'react-native'
import Post from '@/app/services/posts/IPost'
import Comment from '../Comment'
import { ICommentsFromGetPostById } from '@/app/services/comments/IComments'
import useDeleteComment from '@/app/utils/hooks/useDeleteComment'
import globalStyles from '@/app/styles'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { TextInput } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-toast-message'
import useCreateCommentForm from '@/app/utils/hooks/useCreateCommentForm'
import styles from './styles'
import { ICommentResponse } from '@/app/services/comments/IComment'
import useEditCommentForm from '@/app/utils/hooks/useEditCommentForm'

const schema = Yup.object().shape({
  content: Yup.string(),
})
interface CommentSectionProps {
  post: Post
}

const CommentSection = ({ post }: CommentSectionProps): JSX.Element => {
  const { loadingDelete, handleDeleteComment } = useDeleteComment()
  const { loadingEditCommentForm, handleEditComment } = useEditCommentForm()
  const [comments, setComments] = useState<ICommentsFromGetPostById[]>([])
  const { handleCreateComment, loadingCreateCommentForm, createCommentForm } =
    useCreateCommentForm()
  const { isAuthenticated, loggedInUserId, user } = useAuth()
  const [isModalVisible, setModalVisible] = useState(false)

  const [commentToEdit, setCommentToEdit] =
    useState<ICommentsFromGetPostById | null>(null)

  useEffect(() => {
    setComments(post.comments)
  }, [post.comments])

  const updateComments = (deletedCommentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletedCommentId),
    )
  }

  if (loadingDelete) {
    return <ActivityIndicator size='large' color='#0000ff' />
  }

  // const handleEdit = (comment: ICommentsFromGetPostById) => {
  //   handleEditComment(comment.id as string)
  //   updateCommentsAfterEdition(comment)
  // }

  const handleEdit = (comment: ICommentsFromGetPostById) => {
    setCommentToEdit(comment)
    setModalVisible(true)
  }

  const handleDelete = (commentId: string) => {
    handleDeleteComment(commentId)
    updateComments(commentId)
  }

  const handleCreate = async (
    values: { content: string; postId: string },
    resetForm: () => void,
  ) => {
    const response = await handleCreateComment(values)
    updateCommentsAfterCreation(response)
    resetForm()
  }

  const updateCommentsAfterCreation = (
    response: ICommentResponse | undefined,
  ) => {
    if (response) {
      setComments((prevComments) => [
        ...prevComments,
        {
          ...response,
          user: {
            name: user.name,
          },
        },
      ])
    }
  }

  const updateCommentsAfterEdition = (comment: ICommentsFromGetPostById) => {
    setComments((prevComments) =>
      prevComments.map((prevComment) =>
        prevComment.id === comment.id ? comment : prevComment,
      ),
    )
  }

  const handleEditSubmit = async (values: { content: string }) => {
    if (commentToEdit) {
      await handleEditComment(commentToEdit.id as string, values.content)
      updateCommentsAfterEdition({ ...commentToEdit, content: values.content })
      setModalVisible(false)
      setCommentToEdit(null)
    }
  }

  return isAuthenticated ? (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          postId: post.id,
          content: '',
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          handleCreate(values, resetForm)
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
            <TextInput
              onChangeText={handleChange('content')}
              onBlur={handleBlur('content')}
              value={values.content}
              placeholder='Deixe seu comentário...'
              keyboardType='twitter'
              multiline
              numberOfLines={5}
              style={styles.newCommentInput}
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

      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comentários</Text>
        {comments?.map((comment: ICommentsFromGetPostById, index) => (
          <Comment
            key={index}
            comment={comment}
            onEdit={() => handleEdit(comment)}
            onDelete={() => handleDelete(comment.id as string)}
          />
        ))}
      </View>
      {commentToEdit && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible)
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Comentário</Text>

              <Formik
                initialValues={{ content: commentToEdit.content }}
                validationSchema={schema}
                onSubmit={(values) => handleEditSubmit(values)}
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
                    <TextInput
                      onChangeText={handleChange('content')}
                      onBlur={handleBlur('content')}
                      value={values.content}
                      placeholder='Edite seu comentário...'
                      keyboardType='twitter'
                      multiline
                      numberOfLines={5}
                      style={styles.editCommentInput}
                      placeholderTextColor={'#888'}
                    />

                    <Text style={globalStyles.error}>
                      {touched.content && errors.content ? errors.content : ''}
                    </Text>

                    <View style={styles.modalButtonContainer}>
                      {loadingEditCommentForm ? (
                        <ActivityIndicator size='large' color='#4e46dd' />
                      ) : (
                        <Button
                          title='Salvar alterações'
                          color='#4e46dd'
                          onPress={handleSubmit as any}
                        />
                      )}
                    </View>
                  </View>
                )}
              </Formik>

              <Button
                title='Cancelar'
                color='#ff0000'
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comentários</Text>
        {comments?.map((comment: ICommentsFromGetPostById, index) => (
          <Comment
            key={index}
            comment={comment}
            onEdit={() => handleEdit(comment)}
            onDelete={() => handleDelete(comment.id as string)}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default CommentSection
