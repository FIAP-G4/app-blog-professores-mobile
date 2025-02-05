import { usePathname, useSegments } from 'expo-router'
import React from 'react'
import Header from '@/app/components/shared/Header'
import register from './register'
import postagens from './postagens'
import login from './login'
import teacher from './dashboard/teacher'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MenuTab from '../components/MenuTab'

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
      activeIcon: 'home',
      accessibilityState: { selected: false },
    },
    {
      name: 'Cadastrar',
      component: register,
      activeIcon: 'home',
    },
    {
      name: 'login',
      component: login,
      activeIcon: 'home',
    },	
    {
      name: 'Professores',
      component: teacher,
      activeIcon: 'home',
    },	
  ]
  return (
    <>
      <Header
        pageTitle={screenName !== 'Login' ? 'Blog Escolar' : screenName}
      />
      <Tab.Navigator
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
      </Tab.Navigator>
    </>
  )
}

