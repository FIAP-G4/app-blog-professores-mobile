import { Slot, Tabs } from 'expo-router'
import React from 'react'
import Header from '../components/shared/Header'
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from '@expo/vector-icons'
import { Platform, StyleSheet } from 'react-native'
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
    name: 'create_post',
    title: 'Criar postagem',
    headerShown: true,
    icon: 'marker',
    iconComponent: FontAwesome5,
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
      <Header pageTitle="Blog Escolar" />
      {isAuthenticated && isTeacher && (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: 'blue',
            tabBarStyle: styles.tabBar,
            headerTitleAlign: 'left',
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
                  headerTitleStyle: styles.headerTitle,
                  headerStyle: styles.headerStyle,
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
          <Tabs.Screen
            name="update_post"
            options={{
              tabBarButton: () => null,
              tabBarStyle: { display: 'none' },
              headerShown: false,
            }}
          />
        </Tabs>
      )}
      {(!isAuthenticated || !isTeacher) && <Slot />}
    </>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    height: 55,
    position: 'fixed',
    bottom: 0,
    borderRadius: 16,
    marginHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 0,
    marginBottom: Platform.OS === 'ios' ? 42 : 12,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    margin: 0,
    height: Platform.OS === 'ios' ? 80 : 50,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
})
