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

interface CreateTransactionInput {
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
}

interface TransactionsContextType {
  transactions: Transaction[]
  isModalOpen: boolean
  transactionsPaginate: TransactionsPaginate
  transactionsToEdit?: Transaction
  fetchTransactions: (options?: FetchTransactionsOptions) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  openModal: (open: boolean) => void
  selectEditTransaction: (transaction: Transaction) => void
  editTransaction: (data: Transaction) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsToEdit, setTransactionToEdit] = useState<Transaction>()
  const [isModalOpen, setIsModalOpen] = useState(false)
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
    setTransactionToEdit(undefined)
  }, [])

  const deleteTransaction = useCallback(async (id: number) => {
    await api.delete(`transactions/${id}`)

    setTransactions((state) =>
      state.filter((transaction) => transaction.id === id),
    )
  }, [])

  const selectEditTransaction = useCallback((transaction: Transaction) => {
    setTransactionToEdit(transaction)
    setIsModalOpen(true)
  }, [])

  const openModal = useCallback((open: boolean) => {
    if (!open) {
      setTransactionToEdit(undefined)
    }

    setIsModalOpen(open)
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isModalOpen,
        transactionsPaginate,
        transactionsToEdit,
        fetchTransactions,
        createTransaction,
        openModal,
        selectEditTransaction,
        editTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
