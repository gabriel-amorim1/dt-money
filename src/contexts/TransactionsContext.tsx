/* eslint-disable no-unused-vars */
import { ReactNode, useCallback, useContext, useEffect, useState } from 'react'

import { UserContext } from './UserContext'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

export enum TransactionTypes {
  RECEIPTS = 'RECEIPTS',
  ESSENTIAL_EXPENSES = 'ESSENTIAL_EXPENSES',
  NECESSARY_EXPENSES = 'NECESSARY_EXPENSES',
  SUPERFLUOUS_EXPENSES = 'SUPERFLUOUS_EXPENSES',
  INVESTMENTS = 'INVESTMENTS',
}

export interface Transaction {
  id: number
  title: string
  description: string
  type: TransactionTypes
  category: string
  price: number
  compensated: boolean
  clearingDate: string
  createdAt: string
  compensatedAt?: string
  userId: string
}

export interface CreateTransactionInput {
  title: string
  description: string
  price: number
  category: string
  type: TransactionTypes
  compensated: boolean
  clearingDate: string
}

interface TransactionsPaginate {
  page: number
  total: number
}

export interface FetchTransactionsOptions {
  page?: number
  query?: string
  type?: TransactionTypes
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
  const userContext = useContext(UserContext)
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
          type: options?.type,
          clearingDate_gte: options?.initialDate,
          clearingDate_lte: options?.finalDate,
        },
        headers: {
          Authorization: userContext.token,
        },
      })

      setTransactionsPaginate({
        page: options?.page || 1,
        total: response.headers['x-total-count'] as unknown as number,
      })

      setTransactions(response.data)
    },
    [userContext],
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const {
        title,
        description,
        price,
        category,
        type,
        clearingDate,
        compensated,
      } = data

      const response = await api.post(
        'transactions',
        {
          title,
          description,
          price,
          category,
          type,
          clearingDate,
          compensated,
          createdAt: new Date(),
          userId: userContext.user.id,
        },
        {
          headers: {
            Authorization: userContext.token,
          },
        },
      )

      setTransactions((state) => [response.data, ...state])
    },
    [userContext],
  )

  const editTransaction = useCallback(
    async (data: Transaction) => {
      const {
        id,
        title,
        description,
        price,
        category,
        type,
        clearingDate,
        compensated,
      } = data

      const response = await api.patch(
        `transactions/${id}`,
        {
          title,
          description,
          price,
          category,
          type,
          clearingDate,
          compensated,
        },
        {
          headers: {
            Authorization: userContext.token,
          },
        },
      )

      setTransactions((state) =>
        state.map((transaction) =>
          transaction.id === data.id ? response.data : transaction,
        ),
      )
    },
    [userContext],
  )

  const deleteTransaction = useCallback(
    async (id: number) => {
      await api.delete(`transactions/${id}`, {
        headers: {
          Authorization: userContext.token,
        },
      })

      setTransactions((state) =>
        state.filter((transaction) => transaction.id !== id),
      )
    },
    [userContext],
  )

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
