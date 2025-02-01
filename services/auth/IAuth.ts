export interface User {
  email: string
  name: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface TokenPayload {
  id: number
  email: string
  type: string
  iat: number
  exp: number
}
