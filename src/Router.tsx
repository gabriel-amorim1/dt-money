import { Route, Routes } from 'react-router-dom'

import { BalanceProvider } from './contexts/BalanceContext'
import { Login } from './pages/Login'
import { Transactions } from './pages/Transactions'
import { TransactionsProvider } from './contexts/TransactionsContext'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/transactions"
        element={
          <BalanceProvider>
            <TransactionsProvider>
              <Transactions />
            </TransactionsProvider>
          </BalanceProvider>
        }
      />
    </Routes>
  )
}
