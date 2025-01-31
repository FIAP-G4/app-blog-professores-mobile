import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import api from '@/services/api'

const useLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setErrorMessage('')
    setEmail(email)
    setPassword(password)

    try {
      const response = await api.post('/user/signin', { email, password })
      console.log(response.data)
      const token = response.data.token
      const user = response.data.user
      await login(token, user)
      console.log('TOKEN:' + token)
      router.replace('/postagens')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      setErrorMessage('Falha no login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    errorMessage,
    loading,
    handleLogin,
  }
}

export default useLogin
