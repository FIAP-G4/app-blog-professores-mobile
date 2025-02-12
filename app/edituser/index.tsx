import React from 'react'
import {
  View,
  Text,
  TextInput,
  Switch,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { Formik } from 'formik'
import { useRouter, useLocalSearchParams } from 'expo-router'
import styles from './styles'
import principalStyles from '@/app/styles'
import schema from './schema'
import { ITeacher } from '@/app/utils/hooks/useTeacherList'
import useUpdateUser from '@/app/utils/hooks/useUserUpdate'
import { IStudent } from '@/app/utils/hooks/useStudentList'
import Header from '../components/shared/Header'

export default function EditUser(): JSX.Element {
  const router = useRouter()
  const { user, typeUser } = useLocalSearchParams()
  const { handleUpdateUser } = useUpdateUser()

  let parsedUser: ITeacher | IStudent | null = null
  try {
    parsedUser = user ? JSON.parse(user as string) : null
  } catch (error) {
    console.error('Error parsing user object:', error)
    router.back()
    return <Text>Error loading user data.</Text>
  }

  if (!parsedUser) {
    return <Text>No user data provided.</Text>
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#f3f4f6', height: '100%' }}>
      <Header pageTitle="Blog Escolar" />
      <View style={principalStyles.subHeader}>
        <Text style={principalStyles.pageTitle}>Editar usuario</Text>
      </View>

      <Formik
        enableReinitialize
        initialValues={{
          name: parsedUser.name || '',
          email: parsedUser.email || '',
          password: '',
          confirmPassword: '',
          changePassword: false,
        }}
        validationSchema={schema}
        onSubmit={async (values) => {
          const updatedUser = {
            ...parsedUser,
            name: values.name,
            email: values.email,
            ...(values.changePassword ? { password: values.password } : {}),
          }

          await handleUpdateUser(updatedUser.user_id, updatedUser)
          console.log('User updated:', updatedUser)
          if (typeUser === 'teacher') router.push('/(screens)/teacher')
          if (typeUser === 'student') router.push('/(screens)/student')
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          validateForm,
        }) => (
          <View style={principalStyles.screen}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={values.name}
                placeholder="Digite seu nome"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholderTextColor={'#888'}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={values.email}
                placeholder="Digite seu e-mail"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                placeholderTextColor={'#888'}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>

            <View
              style={{
                marginBottom: 10,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}
              >
                Deseja alterar a senha?
              </Text>
              <Switch
                style={{ marginLeft: 10 }}
                value={values.changePassword}
                onValueChange={(value) => {
                  setFieldValue('changePassword', value)
                  validateForm()
                }}
              />
            </View>

            {values.changePassword && (
              <View style={{ marginTop: 20 }}>
                <View style={{ marginBottom: 12 }}>
                  <Text style={styles.label}>Senha</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={values.password}
                    placeholder="Digite sua senha"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholderTextColor={'#888'}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>

                <View style={{ marginBottom: 12 }}>
                  <Text style={styles.label}>Confirmar Senha</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={values.confirmPassword}
                    placeholder="Confirme sua senha"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    placeholderTextColor={'#888'}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}
                </View>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <View
                style={[styles.buttonWrapper, { backgroundColor: '#dd4646' }]}
              >
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={() => handleSubmit()}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  )
}
