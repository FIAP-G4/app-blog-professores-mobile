import { AxiosError } from 'axios'
import Toast from 'react-native-toast-message'

interface ErrorResponse {
  message?: string
  errors?: Record<string, { _errors: string[] }>
}

const errorsMessage = (error: AxiosError<ErrorResponse>) => {
  if (error.response) {
    const { data } = error.response

    if (data.errors) {
      Object.keys(data.errors).forEach((field) => {
        const fieldErrors = data.errors?.[field]._errors
        if (fieldErrors && fieldErrors.length > 0) {
          fieldErrors.forEach((errorMsg) => {
            Toast.show({
              type: 'info',
              text1: `Campo ${field}`,
              text2: errorMsg,
            })
          })
        }
      })
    } else {
      Toast.show({
        type: 'info',
        text1: 'Erro',
        text2: data.message || 'Ocorreu um erro inesperado.',
      })
    }
  } else {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: error.message || 'Ocorreu um erro inesperado.',
    })
  }
}

export default errorsMessage
