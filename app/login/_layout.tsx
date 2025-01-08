import { Slot, usePathname } from 'expo-router'
import React, { useContext } from 'react'
import Header from '../components/shared/Header'

export default function AuthLayout() {
  const pathName = usePathname()
  const screenName = pathName.charAt(1).toUpperCase() + pathName.slice(2)

  console.log(screenName)
  console.log(pathName)

  return (
    <>
      <Header pageTitle={screenName} />
      <Slot />
    </>
  )
}
