import { AuthProvider } from '@/context/AuthContext'
import { Slot, usePathname, useSegments } from 'expo-router'
import Toast from 'react-native-toast-message'
import Header from './components/shared/Header'

export default function RootLayout() {
  const pathName = usePathname()
  const segments = useSegments()
  const screenName =
    segments.length > 1
      ? segments.slice(-1)[0].charAt(0).toUpperCase() +
        segments.slice(-1)[0].slice(1)
      : pathName.charAt(1).toUpperCase() + pathName.slice(2)
  return (
    <AuthProvider>
      <Header
        pageTitle={screenName !== 'Login' ? 'Blog Escolar' : screenName}
      />
      <Slot />
      <Toast />
    </AuthProvider>
  )
}
