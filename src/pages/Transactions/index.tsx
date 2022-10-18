import * as Dialog from '@radix-ui/react-dialog'

import {
  ButtonActionsContainer,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { Copy, PencilSimpleLine, Trash } from 'phosphor-react'
import {
  Transaction,
  TransactionsContext,
} from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

import { ConfirmationModal } from '../../components/ConfirmationModal'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { SaveTransactionModal } from '../../components/SaveTransactionModal'
import { SearchForm } from './components/SearchForm'
import { Summary } from '../../components/Summary'
import { useContextSelector } from 'use-context-selector'
import { useState } from 'react'

export function Transactions() {
  const {
    isModalOpen,
    openModal,
    transactions,
    selectEditTransaction,
    createTransaction,
    deleteTransaction,
  } = useContextSelector(TransactionsContext, (context) => {
    return {
      transactions: context.transactions,
      isModalOpen: context.isModalOpen,
      openModal: context.openModal,
      selectEditTransaction: context.selectEditTransaction,
      createTransaction: context.createTransaction,
      deleteTransaction: context.deleteTransaction,
    }
  })
  const [isDuplicateModalOpen, setDuplicateModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [transactionToDuplicate, setTransactionToDuplicate] =
    useState<Transaction>({} as Transaction)
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction>(
    {} as Transaction,
  )

  function handleCloseDuplicateModal() {
    setDuplicateModalOpen(false)
    setTransactionToDuplicate({} as Transaction)
  }

  function handleCloseDeleteModal() {
    setDeleteModalOpen(false)
    setTransactionToDelete({} as Transaction)
  }

  function selectTransactionToDuplicate(transaction: Transaction) {
    setTransactionToDuplicate(transaction)
  }

  function selectTransactionToDelete(transaction: Transaction) {
    setTransactionToDelete(transaction)
  }

  async function handleDuplicateTransaction(transaction: Transaction) {
    await createTransaction(transaction)
    handleCloseDuplicateModal()
  }

  async function handleDeleteTransaction(transaction: Transaction) {
    await deleteTransaction(transaction.id)
    handleCloseDeleteModal()
  }

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
                  <td width="40%">{transaction.description}</td>
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
                      <Dialog.Root
                        open={isDuplicateModalOpen}
                        onOpenChange={setDuplicateModalOpen}
                      >
                        <Dialog.Trigger asChild>
                          <button
                            onClick={() =>
                              selectTransactionToDuplicate(transaction)
                            }
                          >
                            <Copy size={20} />
                          </button>
                        </Dialog.Trigger>

                        <ConfirmationModal
                          title="Duplicar Transação"
                          message={`Tem certeza que deseja duplicar essa transação? ${transactionToDuplicate.id}`}
                          action={() =>
                            handleDuplicateTransaction(transactionToDuplicate)
                          }
                          closeModal={handleCloseDuplicateModal}
                        />
                      </Dialog.Root>

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

                      <Dialog.Root
                        open={isDeleteModalOpen}
                        onOpenChange={setDeleteModalOpen}
                      >
                        <Dialog.Trigger asChild>
                          <button
                            onClick={() =>
                              selectTransactionToDelete(transaction)
                            }
                          >
                            <Trash size={20} />
                          </button>
                        </Dialog.Trigger>

                        <ConfirmationModal
                          title="Deletar Transação"
                          message={`Tem certeza que deseja deletar essa transação? ${transactionToDelete.id}`}
                          action={() =>
                            handleDeleteTransaction(transactionToDelete)
                          }
                          closeModal={handleCloseDeleteModal}
                        />
                      </Dialog.Root>
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
