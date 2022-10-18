import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { api } from '../lib/axios'

interface BalanceProviderProps {
  children: ReactNode
}

interface BalanceContextType {
  balance: number
  fetchBalance: () => Promise<void>
}

export const BalanceContext = createContext({} as BalanceContextType)

export function BalanceProvider({ children }: BalanceProviderProps) {
  const [balance, setBalance] = useState(0)

  const fetchBalance = useCallback(async () => {
    const response = await api.get('balance')

    setBalance(response.data.balance)
  }, [])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  return (
    <BalanceContext.Provider
      value={{
        balance,
        fetchBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  )
}
