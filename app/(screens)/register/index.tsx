import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from '@/app/styles/register'
import useCreateAccountForm from '@/app/utils/hooks/useCreateAccountForm'
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
  let { isAuthenticated } = useAuth()
  isAuthenticated = true

  return !isAuthenticated ? (
    <Redirect href="/postagens" />
  ) : (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.loginBox}>
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
          onSubmit={(values, { resetForm }) =>
            handleCreateUser(values, resetForm)
          }
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
            <View style={styles.fields}>
              <Text style={globalStyles.label}>Tipo de Usuário</Text>
              <SelectList
                data={[
                  { key: '1', value: 'Professor' },
                  { key: '2', value: 'Aluno' },
                ]}
                setSelected={(itemValue: string) =>
                  setFieldValue('typeUser', itemValue)
                }
                defaultOption={{ key: '1', value: 'Professor' }}
                boxStyles={globalStyles.registerOptionSelect}
                dropdownStyles={globalStyles.dropdwon}
              />
              <Text style={globalStyles.error}>
                {touched.typeUser && errors.typeUser ? errors.typeUser : ''}
              </Text>

              <Text style={globalStyles.label}>Nome</Text>
              <TextInput
                style={globalStyles.input}
                value={values.name}
                placeholder="Digite seu nome"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholderTextColor={'#888'}
              />
              <Text style={globalStyles.error}>
                {touched.name && errors.name ? errors.name : ''}
              </Text>

              <Text style={globalStyles.label}>E-mail</Text>
              <TextInput
                style={globalStyles.input}
                value={values.email}
                placeholder="Digite seu e-mail"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                placeholderTextColor={'#888'}
              />
              <Text style={globalStyles.error}>
                {touched.email && errors.email ? errors.email : ''}
              </Text>

              <Text style={globalStyles.label}>Senha</Text>
              <TextInput
                style={globalStyles.input}
                secureTextEntry
                value={values.password}
                placeholder="Digite sua senha"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholderTextColor={'#888'}
              />
              <Text style={globalStyles.error}>
                {touched.password && errors.password ? errors.password : ''}
              </Text>

              <Text style={globalStyles.label}>Confirmar Senha</Text>
              <TextInput
                style={globalStyles.input}
                secureTextEntry
                value={values.confirmPassword}
                placeholder="Confirme sua senha"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                placeholderTextColor={'#888'}
              />
              <Text style={globalStyles.error}>
                {touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : ''}
              </Text>

              <View style={styles.buttonContainer}>
                {loading ? (
                  <ActivityIndicator size="large" color="#4e46dd" />
                ) : (
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <Text style={styles.buttonText}>Registrar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}
