import { AuthProvider } from '@/context/AuthContext'
import { Slot } from 'expo-router'
import { RouterProtector } from './middleware/RouterProtector'
import Toast from 'react-native-toast-message'

export default function RootLayout() {
  return (
    <AuthProvider>
      {RouterProtector('/register')}
      <Slot />
      <Toast />
    </AuthProvider>
  )
}
