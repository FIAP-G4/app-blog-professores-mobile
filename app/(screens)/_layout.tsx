import { Slot, Tabs } from 'expo-router'
import React from 'react'
import Toast from 'react-native-toast-message'
import Header from '../components/shared/Header'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import AnimatedTabIcon from '../components/AnimatedTabIcon'
import { useAuth } from '@/context/AuthContext'


const tabScreens = [
  { name: 'postagens', title: '', headerShown: false, icon: 'home' },
  { name: 'super-admin', title: 'Super Admin', headerShown: true, icon: 'user' },
  { name: 'register', title: 'Cadastrar um usuário', headerShown: true, icon: 'adduser' },
  { name: 'student', title: 'Estudantes', headerShown: true, icon: 'team' },
  { name: 'teacher', title: 'Professor', headerShown: true, icon: 'solution1' },
]

export default function AuthLayout() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Toast />
      <Header
        pageTitle='Blog Escolar'
      />
      {isAuthenticated && (
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
      )}
      {!isAuthenticated && (
        <Slot/>
      )}
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