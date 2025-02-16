import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native'
import Modal from 'react-native-modal'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '@/context/AuthContext'
import Post from '@/app/services/posts/IPost'
import Comment from '../Comment'
import { ICommentsFromGetPostById } from '@/app/services/comments/IComments'
import useDeleteComment from '@/app/utils/hooks/useDeleteComment'
import useCreateCommentForm from '@/app/utils/hooks/useCreateCommentForm'
import useEditCommentForm from '@/app/utils/hooks/useEditCommentForm'
import globalStyles from '@/app/styles'
import styles from './styles'
import { ICommentResponse } from '@/app/services/comments/IComment'

const schema = Yup.object().shape({
  content: Yup.string(),
})

interface CommentSectionProps {
  post: Post
}

const CommentSection = ({ post }: CommentSectionProps): JSX.Element => {
  const { loadingDelete, handleDeleteComment } = useDeleteComment()
  const { handleEditComment, loadingEditCommentForm } = useEditCommentForm()
  const [comments, setComments] = useState<ICommentsFromGetPostById[]>([])
  const { handleCreateComment, loadingCreateCommentForm } =
    useCreateCommentForm()
  const { isAuthenticated, user } = useAuth()
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

  const renderComment = ({ item }: { item: ICommentsFromGetPostById }) => (
    <Comment
      comment={item}
      onEdit={() => handleEdit(item)}
      onDelete={() => handleDelete(item.id as string)}
    />
  )

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
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Comentar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </Formik>

      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comentários:</Text>
        {comments.length === 0 ? (
          <Text style={styles.noCommentsText}>Sem comentários</Text>
        ) : (
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => (item.id ? item.id.toString() : '')}
          />
        )}
      </View>
      {commentToEdit && (
        <Modal
          animationIn='fadeIn'
          animationOut='fadeOut'
          onBackdropPress={() => {
            setModalVisible(false)
          }}
          isVisible={isModalVisible}
          useNativeDriver
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Altere seu comentário:</Text>

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
                <View style={styles.modalContent}>
                  <TextInput
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    value={values.content}
                    placeholder='Comente algo...'
                    keyboardType='twitter'
                    multiline
                    numberOfLines={5}
                    style={styles.newCommentInput}
                    placeholderTextColor={'#888'}
                  />

                  <Text style={globalStyles.error}>
                    {touched.content && errors.content ? errors.content : ''}
                  </Text>

                  {loadingEditCommentForm ? (
                    <ActivityIndicator size='large' color='#4e46dd' />
                  ) : (
                    <View style={styles.modalButtonContainer}>
                      <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={handleSubmit as any}
                      >
                        <Text style={styles.confirmText}>Salvar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={styles.cancelText}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </Formik>
          </View>
        </Modal>
      )}
    </ScrollView>
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comentários:</Text>
        {comments.length === 0 ? (
          <Text style={styles.noCommentsText}>Sem comentários</Text>
        ) : (
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => (item.id ? item.id.toString() : '')}
          />
        )}
      </View>
    </ScrollView>
  )
}

export default CommentSection
