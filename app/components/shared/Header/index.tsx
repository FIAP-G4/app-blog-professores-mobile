import React, { createContext } from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'

interface HeaderProps {
  pageTitle: string
  children?: React.ReactNode
}

export const HeaderContext = createContext<HeaderProps | null>(null)

export default function Header(props: HeaderProps): JSX.Element {
  const { pageTitle, children } = props

  return (
    <HeaderContext.Provider value={props}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerLogo}
          source={require('../../../../assets/images/logo.png')}
        />
        <Text style={styles.headerText}>{pageTitle}</Text>
        {children}
      </View>
    </HeaderContext.Provider>
  )
}
