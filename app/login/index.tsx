import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, TextInput, View } from 'react-native'
import { Link } from 'expo-router'
import styles from './styles'

export default function Login(): JSX.Element {
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
        <TextInput style={styles.input} />
        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} />
        <View style={styles.buttonContainer}>
          <Button
            title="Entrar"
            color="#4e46dd"
            onPress={() => console.log('Simple Button pressed')}
          />
        </View>
        <View style={styles.registerRow}>
          <Text>Não tem uma conta? </Text>
          <Link href="/login/register" style={{ color: '#4e46dd' }}>
            <Text style={{ color: '#4e46dd' }}>Cadastre-se</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}
