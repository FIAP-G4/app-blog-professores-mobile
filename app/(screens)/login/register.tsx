import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, TextInput, View, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'expo-router'
import styles from './styles'
import useCreateAccountForm from '@/app/utils/hooks/useCreateAccountForm'
import Toast from 'react-native-toast-message'

// Definição do esquema de validação com Yup
const schema = Yup.object().shape({
  typeUser: Yup.string().required('Tipo de usuário é obrigatório'),
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não conferem')
    .required('Confirmação de senha é obrigatória'),
})

export default function Register(): JSX.Element {
  const { handleCreateUser, loading } = useCreateAccountForm()

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>Crie seu usuário</Text>

        {/* Formulário com Formik */}
        <Formik
          initialValues={{
            typeUser: '1',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={schema}
          onSubmit={handleCreateUser}
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
              <Text style={styles.label}>Tipo de Usuário</Text>
              <Picker
                style={styles.input}
                selectedValue={values.typeUser}
                onValueChange={(itemValue) =>
                  setFieldValue('typeUser', itemValue)
                }
              >
                <Picker.Item label='Professor' value='1' />
                <Picker.Item label='Aluno' value='2' />
              </Picker>
              {touched.typeUser && errors.typeUser && (
                <Text style={styles.error}>{errors.typeUser}</Text>
              )}

              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={values.name}
                placeholder='Digite seu nome'
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={values.email}
                placeholder='Digite seu e-mail'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType='email-address'
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={values.password}
                placeholder='Digite sua senha'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={values.confirmPassword}
                placeholder='Confirme sua senha'
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}

              <View style={styles.buttonContainer}>
                {loading ? (
                  <ActivityIndicator size='large' color='#4e46dd' />
                ) : (
                  <Button
                    title='Registrar'
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
