import * as Dialog from '@radix-ui/react-dialog'

import {
  ButtonActionsContainer,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { Copy, PencilSimpleLine, Trash } from 'phosphor-react'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { SaveTransactionModal } from '../../components/SaveTransactionModal'
import { SearchForm } from './components/SearchForm'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function Transactions() {
  const { isModalOpen, openModal, transactions, selectEditTransaction } =
    useContextSelector(TransactionsContext, (context) => {
      return {
        transactions: context.transactions,
        isModalOpen: context.isModalOpen,
        openModal: context.openModal,
        selectEditTransaction: context.selectEditTransaction,
      }
    })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                  <td>
                    <ButtonActionsContainer>
                      <button>
                        <Copy size={20} />
                      </button>
                      <Dialog.Root open={isModalOpen} onOpenChange={openModal}>
                        <Dialog.Trigger asChild>
                          <button
                            onClick={() => selectEditTransaction(transaction)}
                          >
                            <PencilSimpleLine size={20} />
                          </button>
                        </Dialog.Trigger>

                        <SaveTransactionModal />
                      </Dialog.Root>
                      <button>
                        <Trash size={20} />
                      </button>
                    </ButtonActionsContainer>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
      <Pagination />
    </div>
  )
}
