import * as z from 'zod'

import { InputContainer, LoginContainer, LoginContent } from './styles'
import { NavLink, useNavigate } from 'react-router-dom'

import { ErrorMessage } from '@hookform/error-message'
import { SignIn } from 'phosphor-react'
import { UserContext } from '../../contexts/UserContext'
import loginImg from '../../assets/login.svg'
import logoImg from '../../assets/logo.svg'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

export function Login() {
  const navigate = useNavigate()
  const userContext = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleLogin(data: LoginFormInputs) {
    try {
      await userContext.login(data.email, data.password)
      navigate('/transactions')
    } catch (error) {
      alert('Email ou senha incorretos.')
    }
    reset()
  }

  return (
    <LoginContainer>
      <LoginContent>
        <img src={logoImg} alt="" />
        <form onSubmit={handleSubmit(handleLogin)}>
          <h1>Login</h1>

          <InputContainer>
            <label htmlFor="email">Email</label>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p>{message}</p>}
            />
            <input
              type="email"
              id="email"
              placeholder="exemplo@exemplo.com"
              {...register('email')}
            />
          </InputContainer>

          <InputContainer>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              required
              {...register('password')}
            />
          </InputContainer>

          <button type="submit">Entrar</button>

          <NavLink to="/register" title="Cadastrar">
            <SignIn />
            Não tenho cadastro
          </NavLink>
        </form>
      </LoginContent>

      <img src={loginImg} alt="" />
    </LoginContainer>
  )
}
