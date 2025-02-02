import { AuthProvider } from '@/context/AuthContext'
import { Slot } from 'expo-router'
import { RouterProtector } from './middleware/RouterProtector'

export default function RootLayout() {
  return (
    <AuthProvider>
      {RouterProtector('/register')}
      <Slot />
    </AuthProvider>
  )
}
