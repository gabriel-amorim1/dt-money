import { TransactionsContext } from '../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function useSummary() {
  const transactions = useContextSelector(
    TransactionsContext,
    (context) => context.transactions,
  )

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'RECEIPTS') {
        acc.incomes += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcomes += transaction.price
        acc.total -= transaction.price
      }

      return acc
    },
    {
      incomes: 0,
      outcomes: 0,
      total: 0,
    },
  )

  return summary
}
