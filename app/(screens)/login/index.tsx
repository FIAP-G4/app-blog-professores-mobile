import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from './styles'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as Yup from 'yup'
import { Formik } from 'formik'
import useLoginForm from '@/app/utils/hooks/useLoginForm'
import Toast from 'react-native-toast-message'

const schema = Yup.object().shape({
  email: Yup.string().email().required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
})

export default function Login(): JSX.Element {
  const { loading, handleLogin } = useLoginForm()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.introText}>
        <Text style={styles.loginTitle}>Bem-vindo ao Blog Escolar!</Text>
        <Text style={styles.paragraph}>
          Este espaço é exclusivo para os professores compartilharem suas
          ideias, artigos e conteúdos educacionais.
        </Text>
        <Text style={styles.paragraph}>Aqui você pode:</Text>
        <Text style={styles.paragraph}>
          Publicar conteúdos relevantes sobre educação e temas de interesse
          acadêmico.
        </Text>
        <Text style={styles.paragraph}>
          Acompanhar as últimas atualizações da comunidade de professores.
        </Text>
      </View>
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>Entre na sua conta</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={schema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                editable
                value={values.email}
                keyboardType='email-address'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <Text style={styles.label}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputPassword}
                  secureTextEntry={!isPasswordVisible}
                  // editable
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                ></TextInput>
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={24}
                    color='gray'
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={{ color: 'red' }}>{errors.password}</Text>
              )}
              <View style={styles.buttonContainer}>
                {loading ? (
                  <ActivityIndicator size='large' color='#4e46dd' />
                ) : (
                  <Button
                    title='Entrar'
                    color='#4e46dd'
                    onPress={handleSubmit as any}
                  />
                )}
              </View>
            </>
          )}
        </Formik>
      </View>
      <Toast />
    </SafeAreaView>
  )
}
