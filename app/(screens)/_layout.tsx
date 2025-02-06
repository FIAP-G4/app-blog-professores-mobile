import { Tabs } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import Toast from 'react-native-toast-message'
import { View } from 'react-native'
import Header from '../components/shared/Header'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { StyleSheet } from 'react-native'


interface AnimatedTabIconProps {
  IconComponent: typeof AntDesign
  name: keyof typeof AntDesign.glyphMap
  focused: boolean
}

const AnimatedTabIcon: React.FC<AnimatedTabIconProps> = ({ IconComponent, name, focused }) => {
  const viewRef = useRef<Animatable.View & View>(null)

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate({ 0: { transform: [{ scale: 1 }] }, 1: { transform: [{ scale: 1.5 }] } }, 130)
    } else {
      viewRef.current?.animate({ 0: { transform: [{ scale: 1.5 }] }, 1: { transform: [{ scale: 1 }] } }, 130)
    }
  }, [focused])

  return (
    <Animatable.View ref={viewRef} animation="zoomIn" style={styles.iconContainer}>
      <IconComponent name={name} size={30} color={focused ? '#007bff' : '#80bdff'} />
    </Animatable.View>
  )
}

const tabScreens = [
  { name: 'postagens', title: '', headerShown: false, icon: 'home' },
  { name: 'super-admin', title: 'Super Admin', headerShown: true, icon: 'user' },
  { name: 'register', title: 'Cadastrar um usuário', headerShown: true, icon: 'adduser' },
  { name: 'student', title: 'Estudantes', headerShown: true, icon: 'team' },
  { name: 'teacher', title: 'Professor', headerShown: true, icon: 'solution1' },
]

export default function AuthLayout() {
  return (
    <>
      <Toast />
      <Header
        pageTitle='Blog Escolar'
      />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
      {tabScreens.map(({ name, title, headerShown, icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              tabBarLabel: '',
              title,
              headerShown,
              tabBarIcon: ({ focused }) => (
                <AnimatedTabIcon IconComponent={AntDesign} name={icon as keyof typeof AntDesign.glyphMap} focused={focused} />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})