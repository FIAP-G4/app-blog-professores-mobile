import { Tabs } from 'expo-router'
import React from 'react'
import Toast from 'react-native-toast-message'
import Header from '../components/shared/Header'

export default function AuthLayout() {
  return (
    <>
      <Toast />
          <Header
            pageTitle='Blog Escolar'
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
