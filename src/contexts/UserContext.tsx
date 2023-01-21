import { ReactNode, createContext, useCallback, useState } from 'react'

import { api } from '../lib/axios'

interface UserProviderProps {
  children: ReactNode
}

interface User {
  id: string
  email: string
  balance: number
  username: string
}

interface UserContextType {
  user: User
  token?: string
  login: (email: string, password: string) => Promise<void>
  fetchUser: () => Promise<void>
}

export const UserContext = createContext({} as UserContextType)

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState({} as User)
  const [token, setToken] = useState<string>()

  const login = useCallback(async (email: string, password: string) => {
    const response = await api.get('users/1')

    setToken(response.headers.token || 'blablebliblolblu')
    setUser(response.data)
  }, [])

  const fetchUser = useCallback(async () => {
    const response = await api.get('user', {
      headers: { Authorization: token },
    })

    setUser(response.data.user)
  }, [token])

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        login,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
