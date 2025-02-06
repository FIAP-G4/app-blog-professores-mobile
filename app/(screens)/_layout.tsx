import { Slot, usePathname, useSegments } from 'expo-router'
import React from 'react'
import Header from '@/app/components/shared/Header'
import register from './register'
import postagens from './postagens'
import teacher from './teacher'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MenuTab from '../components/MenuTab'
import { Entypo, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import student from './student'
import Toast from 'react-native-toast-message'

const Tab = createBottomTabNavigator()

export default function AuthLayout() {
  const pathName = usePathname()
  const segments = useSegments()
  const screenName =
    segments.length > 1
      ? segments.slice(-1)[0].charAt(0).toUpperCase() +
        segments.slice(-1)[0].slice(1)
      : pathName.charAt(1).toUpperCase() + pathName.slice(2)


  const TabArr = [
    {
      name: 'Postagens',
      component: postagens,
      activeIcon: 'newspaper-o',
      accessibilityState: { selected: false },
      byIcon: FontAwesome
    },
    {
      name: 'Novo Post',
      component: postagens,//icone de colocar postagem
      activeIcon: 'new-message',
      accessibilityState: { selected: false },
      byIcon: Entypo
    },
    {
      name: 'Cadastrar',
      component: register,
      activeIcon: 'user-plus',
      byIcon: FontAwesome5
    },
    {
      name: 'Alunos',
      component: student,
      activeIcon: 'user-graduate',
      byIcon: FontAwesome6
    },	
    {
      name: 'Professores',
      component: teacher,
      activeIcon: 'chalkboard-teacher',
      byIcon: FontAwesome5
    },
  ]

  return (
    <>
      <Toast />
      <Header
        pageTitle={screenName !== 'Login' ? 'Blog Escolar' : screenName}
      />
      {/* <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 5,
            right: 16,
            left: 16,
            borderRadius: 16,
            paddingBottom: 0,
            margin: 16,
          },
        }}
      >
        {TabArr.map((tab, index) => (
          <Tab.Screen key={index} name={tab.name} component={tab.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <MenuTab {...props}  item={tab}/>,
            }}
          />
        ))}
      </Tab.Navigator> */}
      <Slot />
    </>
  )
}
