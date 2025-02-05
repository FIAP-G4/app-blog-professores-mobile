import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, TextInput, View, ActivityIndicator } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from './styles'
import useCreateAccountForm from '@/app/utils/hooks/useCreateAccountForm'
import Toast from 'react-native-toast-message'
import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'expo-router'
import globalStyles from '@/app/styles'

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
  const { isAuthenticated } = useAuth()

  return !isAuthenticated ? (
    <Redirect href='/postagens' />
  ) : (
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
              <Text style={globalStyles.label}>Tipo de Usuário</Text>
              <SelectList
                data={[
                  { key: '1', value: 'Professor' },
                  { key: '2', value: 'Aluno' }
                ]}
                setSelected={(itemValue: string) => setFieldValue('typeUser', itemValue)}
                defaultOption={{ key: '1', value: 'Professor' }}
                boxStyles={globalStyles.optionSelect}
                dropdownStyles={globalStyles.dropdwon}

              />
              {touched.typeUser && errors.typeUser && (
                <Text style={globalStyles.error}>{errors.typeUser}</Text>
              )}

              <Text style={globalStyles.label}>Nome</Text>
              <TextInput
                style={globalStyles.input}
                value={values.name}
                placeholder='Digite seu nome'
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholderTextColor={'#888'}
              />
              {touched.name && errors.name && (
                <Text style={globalStyles.error}>{errors.name}</Text>
              )}

              <Text style={globalStyles.label}>E-mail</Text>
              <TextInput
                style={globalStyles.input}
                value={values.email}
                placeholder='Digite seu e-mail'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType='email-address'
                placeholderTextColor={'#888'}
              />
              {touched.email && errors.email && (
                <Text style={globalStyles.error}>{errors.email}</Text>
              )}

              <Text style={globalStyles.label}>Senha</Text>
              <TextInput
                style={globalStyles.input}
                secureTextEntry
                value={values.password}
                placeholder='Digite sua senha'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholderTextColor={'#888'}
              />
              {touched.password && errors.password && (
                <Text style={globalStyles.error}>{errors.password}</Text>
              )}

              <Text style={globalStyles.label}>Confirmar Senha</Text>
              <TextInput
                style={globalStyles.input}
                secureTextEntry
                value={values.confirmPassword}
                placeholder='Confirme sua senha'
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                placeholderTextColor={'#888'}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={globalStyles.error}>{errors.confirmPassword}</Text>
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
