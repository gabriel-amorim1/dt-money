import { Route, Routes } from 'react-router-dom'

import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Transactions } from './pages/Transactions'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { UserProvider } from './contexts/UserContext'

export function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <UserProvider>
            <Login />
          </UserProvider>
        }
      />

      <Route
        path="/register"
        element={
          <UserProvider>
            <Register />
          </UserProvider>
        }
      />

      <Route
        path="/transactions"
        element={
          <UserProvider>
            <TransactionsProvider>
              <Transactions />
            </TransactionsProvider>
          </UserProvider>
        }
      />
    </Routes>
  )
}
