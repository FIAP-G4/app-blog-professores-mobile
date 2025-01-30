import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { useRouter } from 'expo-router'
import { ActivityIndicator, Alert, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'core-js/stable/atob'
import { jwtDecode } from 'jwt-decode'
import { TokenPayload } from '@/interfaces/IAuth'

interface AuthContextProps {
  isAuthenticated: boolean
  isTeacher: boolean
  isStudent: boolean
  loggedInUserId: number | null
  user: any
  login: (token: string, userData: any) => Promise<void>
  logout: () => Promise<void>
  handleTokenExpiration: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const handleUserType = useCallback((token: string) => {
    try {
      const jwt = jwtDecode<TokenPayload>(token)
      console.log('DECODED JWT: ', jwt)
      const userType = jwt.type
      setIsTeacher(userType === 'teacher')
      setIsStudent(userType === 'student')
    } catch (error) {
      console.error('Erro ao decodificar o token:', error)
    }
  }, [])

  const loggedUserId = (token: string): number | null => {
    try {
      const jwt = jwtDecode<TokenPayload>(token)
      setLoggedInUserId(jwt.id)
      return jwt.id || null
    } catch (error) {
      console.error('Erro ao extrair userId do token:', error)
      return null
    }
  }

  const login = async (token: string, userData: any): Promise<void> => {
    await AsyncStorage.setItem('authToken', token)
    await AsyncStorage.setItem('user', JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
    handleUserType(token)
  }

  const logout = useCallback(async (): Promise<void> => {
    await AsyncStorage.removeItem('authToken')
    await AsyncStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
    setIsTeacher(false)
    setIsStudent(false)
    setTimeout(() => {
      router.replace('/')
    }, 0)
  }, [router])

  const isTokenExpired = useCallback((token: string): boolean => {
    try {
      const decoded = jwtDecode<TokenPayload>(token)
      const currentTime = Math.floor(Date.now() / 1000)
      return decoded.exp < currentTime
    } catch (error) {
      console.error('Erro ao verificar validade do token:', error)
      return true
    }
  }, [])

  const handleTokenExpiration = useCallback(async (): Promise<void> => {
    const token = await AsyncStorage.getItem('authToken')
    if (token && isTokenExpired(token)) {
      logout()
      Alert.alert(
        'Sessão Expirada',
        'Sua sessão expirou, faça login novamente.',
      )
    }
  }, [isTokenExpired, logout])

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken')
      const storedUser = await AsyncStorage.getItem('user')
      if (token && storedUser) {
        setIsAuthenticated(true)
        setUser(JSON.parse(storedUser))
        handleUserType(token)
        loggedUserId(token)

        if (isTokenExpired(token)) {
          logout()
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [handleUserType, isTokenExpired, logout])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    )
  }

  const value: AuthContextProps = {
    isAuthenticated,
    isTeacher,
    isStudent,
    loggedInUserId,
    user,
    login,
    logout,
    handleTokenExpiration,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const AuthConsumer = ({
  children,
}: {
  children: (context: AuthContextProps) => ReactNode
}): JSX.Element => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        if (!context) {
          throw new Error('AuthConsumer must be used within an AuthProvider')
        }
        return children(context)
      }}
    </AuthContext.Consumer>
  )
}
