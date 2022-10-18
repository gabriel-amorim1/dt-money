import { ReactNode, useCallback, useEffect, useState } from 'react'

import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

export interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsPaginate {
  page: number
  total: number
}

interface FetchTransactionsOptions {
  page?: number
  query?: string
  initialDate?: string
  finalDate?: string
}

interface TransactionsContextType {
  transactions: Transaction[]
  transactionsPaginate: TransactionsPaginate
  fetchTransactions: (options?: FetchTransactionsOptions) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  editTransaction: (data: Transaction) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsPaginate, setTransactionsPaginate] =
    useState<TransactionsPaginate>({} as TransactionsPaginate)

  const fetchTransactions = useCallback(
    async (options?: FetchTransactionsOptions) => {
      const response = await api.get('transactions', {
        params: {
          _page: options?.page || 1,
          _limit: 20,
          _sort: 'createdAt',
          _order: 'desc',
          q: options?.query,
          createdAt_gte: options?.initialDate,
          createdAt_lte: options?.finalDate,
        },
      })

      setTransactionsPaginate({
        page: options?.page || 1,
        total: response.headers['x-total-count'] as unknown as number,
      })

      setTransactions(response.data)
    },
    [],
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  const editTransaction = useCallback(async (data: Transaction) => {
    const { description, price, category, type } = data

    const response = await api.put(`transactions/${data.id}`, {
      description,
      price,
      category,
      type,
      createdAt: new Date(data.createdAt),
    })

    setTransactions((state) =>
      state.map((transaction) =>
        transaction.id === data.id ? response.data : transaction,
      ),
    )
  }, [])

  const deleteTransaction = useCallback(async (id: number) => {
    await api.delete(`transactions/${id}`)

    setTransactions((state) =>
      state.filter((transaction) => transaction.id !== id),
    )
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionsPaginate,
        fetchTransactions,
        createTransaction,
        editTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
