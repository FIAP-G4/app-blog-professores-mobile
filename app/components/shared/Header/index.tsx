import React, { createContext } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import styles from './styles'
import { useRouter, useSegments } from 'expo-router'

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

  const handleLogin = () => {
    router.push('/login')
  }

  const isLoginRoute = segments.includes('login')

  return (
    <HeaderContext.Provider value={props}>
      <View style={styles.headerContainer}>
        <Image style={styles.headerLogo} source={require(logoPath)} />
        <Text style={styles.headerText}>{pageTitle}</Text>
        {children}
        {!isLoginRoute && (
          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
        )}
      </View>
    </HeaderContext.Provider>
  )
}
