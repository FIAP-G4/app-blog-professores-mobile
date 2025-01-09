import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import styles from './styles'
import { useRouter, Link } from 'expo-router'

export default function Register(): JSX.Element {
  const [selectedUserType, setSelectedUserType] = useState('teacher')
  const [name, setName] = useState<string | undefined>('Digite seu nome')
  const [email, setEmail] = useState<string | undefined>('Digite seu e-mail')
  const [password, setPassword] = useState<string | undefined>('')
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>('')
  const router = useRouter()
  const handleRegister = () => {
    router.replace('/dashboard/super-admin')
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>Crie seu usuário</Text>
        <Text style={styles.label}>Tipo de Usuário</Text>
        <Picker
          style={styles.input}
          onValueChange={(itemValue: string) => setSelectedUserType(itemValue)}
        >
          <Picker.Item label="Professor" value="teacher" />
          <Picker.Item label="Aluno" value="student" />
        </Picker>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          editable
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          editable
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          editable
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          editable
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Registar"
            color="#4e46dd"
            onPress={() => handleRegister()}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={{ marginTop: -1, fontSize: 15 }}>
            Já possui uma conta? <Link href="/login">Faça login.</Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
