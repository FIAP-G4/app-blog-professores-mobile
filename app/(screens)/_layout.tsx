import { Slot, Tabs } from 'expo-router'
import React from 'react'
import Toast from 'react-native-toast-message'
import Header from '../components/shared/Header'
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import AnimatedTabIcon from '../components/AnimatedTabIcon'
import { useAuth } from '@/context/AuthContext'

const tabScreens = [
  {
    name: 'postagens',
    title: '',
    headerShown: false,
    icon: 'newspaper-o',
    iconComponent: FontAwesome,
  },
  {
    name: 'super-admin',
    title: 'Administrar Postagens',
    headerShown: true,
    icon: 'file-tray-full',
    iconComponent: Ionicons,
  },
  {
    name: 'register',
    title: 'Cadastrar um usuário',
    headerShown: true,
    icon: 'user-plus',
    iconComponent: FontAwesome5,
  },
  {
    name: 'student',
    title: 'Estudantes',
    headerShown: true,
    icon: 'user-graduate',
    iconComponent: FontAwesome6,
  },
  {
    name: 'teacher',
    title: 'Professor',
    headerShown: true,
    icon: 'chalkboard-teacher',
    iconComponent: FontAwesome5,
  },
]

export default function AuthLayout() {
  const { isAuthenticated, isTeacher } = useAuth()

  return (
    <>
      <Toast />
      <Header pageTitle='Blog Escolar' />
      {isAuthenticated && isTeacher && (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: 'blue',
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabLabel,
          }}
        >
          {tabScreens.map(
            ({ name, title, headerShown, icon, iconComponent }) => (
              <Tabs.Screen
                key={name}
                name={name}
                options={{
                  tabBarLabel: '',
                  title,
                  headerShown,
                  tabBarIcon: ({ focused }) => (
                    <AnimatedTabIcon
                      IconComponent={iconComponent}
                      name={icon as keyof typeof AntDesign.glyphMap}
                      focused={focused}
                    />
                  ),
                }}
              />
            ),
          )}
        </Tabs>
      )}
      {(!isAuthenticated || !isTeacher) && <Slot />}
    </>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 55,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 16,
    marginHorizontal: 12,
    paddingTop: 8,
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
