import { useState } from 'react'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'
import { AxiosError } from 'axios'
import errorsMessage from '../messageError'
import api from '@/app/services/api'
import { useAuth } from '@/context/AuthContext'

interface ErrorResponse {
  message: string
}

interface FormLogin {
  email: string
  password: string
}

const useLoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: '',
  })
  const router = useRouter()
  const { login } = useAuth()

  const handleChange = (field: keyof FormLogin, value: string) => {
    setFormLogin((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleLogin = async (values: FormLogin) => {
    try {
      setLoading(true)
      const response = await api.post('/user/signin', {
        email: values.email,
        password: values.password,
      })
      const token = response.data.token
      const user = response.data.user
      await login(token, user)
      setLoading(false)
      Toast.show({
        type: 'success',
        text1: 'Login efetuado com sucesso!',
      })
      setTimeout(() => {
        router.push('/postagens')
      }, 500)
    } catch (error) {
      setLoading(false)
      errorsMessage(error as AxiosError<ErrorResponse>)
    }
  }

  return {
    loading,
    formLogin,
    handleChange,
    handleLogin,
  }
}

export default useLoginForm
