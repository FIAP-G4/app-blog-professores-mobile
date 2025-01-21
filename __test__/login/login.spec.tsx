import React from 'react'
import { render } from '@testing-library/react-native'
import Login from '@/app/(screens)/login/index'
import Register from '@/app/(screens)/login/register'

describe('Tela de login', () => {
  it('Deve renderizar a tela de login', () => {
    const { getByText } = render(<Login />)

    expect(getByText('Bem-vindo ao Blog Escolar!')).toBeTruthy()
    expect(getByText('Entre na sua conta')).toBeTruthy()
    expect(getByText('E-mail')).toBeTruthy()
    expect(getByText('Senha')).toBeTruthy()
    expect(getByText('Entrar')).toBeTruthy()
    expect(getByText('Não tem uma conta?')).toBeTruthy()
    expect(getByText('Cadastre-se')).toBeTruthy()
  })

  it('Deve renderizar a tela de cadastro', () => {
    const { getByText } = render(<Register />)

    expect(getByText('Crie seu usuário')).toBeTruthy()
    expect(getByText('Tipo de Usuário')).toBeTruthy()
    expect(getByText('Nome')).toBeTruthy()
    expect(getByText('E-mail')).toBeTruthy()
    expect(getByText('Senha')).toBeTruthy()
    expect(getByText('Confirmar Senha')).toBeTruthy()
    expect(getByText('Confirmar Senha')).toBeTruthy()
    expect(getByText('Faça login.')).toBeTruthy()
  })
})
