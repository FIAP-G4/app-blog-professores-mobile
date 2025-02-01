import React, { createContext } from 'react'
import { View, Text, Image, SafeAreaView, Pressable } from 'react-native'
import styles from './styles'
import { useRouter, useSegments } from 'expo-router'
import { useAuth } from '@/context/AuthContext'

interface HeaderProps {
  pageTitle: string
  children?: React.ReactNode
}

export const HeaderContext = createContext<HeaderProps | null>(null)

export default function Header(props: HeaderProps): JSX.Element {
  const { pageTitle, children } = props
  const logoPath = '../../../../assets/images/logo.png'
  const router = useRouter()
  const segments = useSegments() as string[]
  const { isAuthenticated, logout } = useAuth()

  const handleLogin = () => {
    router.push('/login')
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const isLoginRoute = segments.includes('login')

  return (
    <SafeAreaView style={styles.headerSafeArea}>
      <HeaderContext.Provider value={props}>
        <View style={styles.headerContainer}>
          <Image style={styles.headerLogo} source={require(logoPath)} />
          <Text style={styles.headerText}>{pageTitle}</Text>
          {children}
          {!isLoginRoute && !isAuthenticated && (
            <Pressable onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
          )}
          {!isLoginRoute && isAuthenticated && (
            <Pressable onPress={handleLogout} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Logout</Text>
            </Pressable>
          )}
        </View>
      </HeaderContext.Provider>
    </SafeAreaView>
  )
}
