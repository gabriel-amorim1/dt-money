import { ArrowLeft, ArrowRight } from 'phosphor-react'
import {
  PageNumberButton,
  PaginationContainer,
  SelectPageButton,
} from './styles'

import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function Pagination() {
  const { transactionsPaginate, fetchTransactions } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        transactionsPaginate: context.transactionsPaginate,
        fetchTransactions: context.fetchTransactions,
      }
    },
  )
  const numberOfPages = Math.ceil(transactionsPaginate.total / 20)

  const getPageList = Array(numberOfPages || 1)
    .fill(0)
    .map((_, i) => i + 1)

  function handleSelectPage(pageNumber: string) {
    fetchTransactions({ page: parseInt(pageNumber) })
  }

  return (
    <PaginationContainer>
      <SelectPageButton
        disabled={transactionsPaginate.page === 1}
        onClick={() => handleSelectPage(String(transactionsPaginate.page - 1))}
      >
        <ArrowLeft size={20} />
      </SelectPageButton>
      {getPageList.map((pageNumber) => {
        return (
          <PageNumberButton
            key={pageNumber}
            disabled={numberOfPages <= 1}
            selected={pageNumber === transactionsPaginate.page ?? true}
            onClick={() => handleSelectPage(String(pageNumber))}
          >
            {pageNumber}
          </PageNumberButton>
        )
      })}
      <SelectPageButton
        disabled={
          String(transactionsPaginate.total) === '0' ||
          transactionsPaginate.page === numberOfPages
        }
        onClick={() => handleSelectPage(String(transactionsPaginate.page + 1))}
      >
        <ArrowRight size={20} />
      </SelectPageButton>
    </PaginationContainer>
  )
}
