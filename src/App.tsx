import { BalanceProvider } from './contexts/BalanceContext'
import { GlobalStyle } from './styles/global'
import { ThemeProvider } from 'styled-components'
import { Transactions } from './pages/Transactions'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <BalanceProvider>
        <TransactionsProvider>
          <Transactions />
        </TransactionsProvider>
      </BalanceProvider>
    </ThemeProvider>
  )
}
