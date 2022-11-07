import { InputContainer, LoginContainer, LoginContent } from './styles'

import { NavLink } from 'react-router-dom'
import { SignIn } from 'phosphor-react'
import loginImg from '../../assets/login.svg'
import logoImg from '../../assets/logo.svg'

export function Login() {
  return (
    <LoginContainer>
      <LoginContent>
        <img src={logoImg} alt="" />
        <form>
          <h1>Login</h1>

          <InputContainer>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="exemplo@exemplo.com"
            />
          </InputContainer>

          <InputContainer>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
            />
          </InputContainer>

          <button type="submit">Entrar</button>

          <NavLink to="/transactions" title="Cadastrar">
            <SignIn />
            Não tenho cadastro
          </NavLink>
        </form>
      </LoginContent>

      <img src={loginImg} alt="heroes" />
    </LoginContainer>
  )
}
