import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert, Button, Text, TextInput, View } from 'react-native'
import styles from './styles'
import useLogin from '@/app/utils/hooks/useLogin'

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string | undefined>('')
  const [password, setPassword] = useState<string | undefined>('')
  const { setCredentials, handleLogin } = useLogin()

  const handleLoginPress = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }
    setCredentials({ email, password })
    handleLogin()
  }
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
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          editable
          value={email}
          keyboardType='email-address'
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          editable
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title='Entrar'
            color='#4e46dd'
            // onPress={() => {
            //   console.log('Código temporário para login')

            //   // if (!email || !password) {
            //   //   Alert.alert('Preencha todos os campos')
            //   //   return
            //   // }

            //   router.replace('/postagens')
            // }}
            onPress={handleLoginPress}
          />
        </View>
        {/* <View style={styles.registerRow}>
          <Text>Não tem uma conta? </Text>
          <Link href='/login/register' style={{ color: '#4e46dd' }}>
            <Text style={{ color: '#4e46dd' }}>Cadastre-se</Text>
          </Link>
        </View> */}
      </View>
    </SafeAreaView>
  )
}
