import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import api from '@/services/api'
import { LoginResponse } from '@/interfaces/IAuth'

const useLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async () => {
    setLoading(true)
    setErrorMessage('')

    try {
      console.log(credentials)
      const response = await api.post<LoginResponse>(
        '/user/signin',
        credentials,
      )
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
    credentials,
    setCredentials,
    errorMessage,
    loading,
    handleLogin,
  }
}

export default useLogin
