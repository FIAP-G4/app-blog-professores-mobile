import { Redirect } from 'expo-router'

const { isAuthenticated } = require('@/context/AuthContext')

export function RouterProtector(pathname: string) {
  if (!isAuthenticated && pathname !== '/postagens') {
    return <Redirect href='/postagens' />
  }
}
