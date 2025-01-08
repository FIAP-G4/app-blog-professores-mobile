import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import styles from './styles'

export default function Register(): JSX.Element {
  return (
    <View style={styles.screen}>
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>Crie seu usuário</Text>
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
      </View>
    </View>
  )
}
