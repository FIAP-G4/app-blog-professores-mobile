import { AuthProvider } from '@/context/AuthContext'
import { Slot } from 'expo-router'
import Toast from 'react-native-toast-message'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
      <Toast />
    </AuthProvider>
  )
}
