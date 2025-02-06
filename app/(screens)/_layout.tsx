import { Tabs, usePathname, useSegments} from 'expo-router'
import React from 'react'
import Toast from 'react-native-toast-message'
import Header from '../components/shared/Header'

export default function AuthLayout() {
  const pathName = usePathname()
  const segments = useSegments()
  const screenName =
    segments.length > 1
      ? segments.slice(-1)[0].charAt(0).toUpperCase() +
        segments.slice(-1)[0].slice(1)
      : pathName.charAt(1).toUpperCase() + pathName.slice(2)

  return (
    <>
      <Toast />
          <Header
            pageTitle={screenName !== 'Login' ? 'Blog Escolar' : screenName}
          />
      <Tabs>
          <Tabs.Screen name="(screens)/postagens/index" options={{title: "Postagens a"}} />
          <Tabs.Screen name="(screens)/super-admin/index" options={{title: "admin"}} />
          <Tabs.Screen name="(screens)/register/index" options={{title: "register"}} />
          <Tabs.Screen name="(screens)/student/index" options={{title: "student"}} />
          <Tabs.Screen name="(screens)/teacher/index" options={{title: "teacher"}} />
      </Tabs>
    </>
  )
}
