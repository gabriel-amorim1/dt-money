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
  TransactionTypes,
  TransactionsContext,
} from '../../contexts/TransactionsContext'
import { priceFormatter, stringDateFormatter } from '../../utils/formatter'

import { ConfirmationModal } from '../../components/ConfirmationModal'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { SaveTransactionModal } from '../../components/SaveTransactionModal'
import { SearchForm } from './components/SearchForm'
import { Summary } from '../../components/Summary'
import { useContextSelector } from 'use-context-selector'
import { useState } from 'react'

const translatedTypes = {
  RECEIPTS: 'Receitas',
  ESSENTIAL_EXPENSES: 'Despesas essenciais',
  NECESSARY_EXPENSES: 'Despesas necessárias',
  SUPERFLUOUS_EXPENSES: 'Despesas supérfluas',
  INVESTMENTS: 'Investimentos',
}

export function Transactions() {
  const {
    transactions,
    editTransaction,
    createTransaction,
    deleteTransaction,
  } = useContextSelector(TransactionsContext, (context) => {
    return {
      transactions: context.transactions,
      editTransaction: context.editTransaction,
      createTransaction: context.createTransaction,
      deleteTransaction: context.deleteTransaction,
    }
  })

  const [isDuplicateModalOpen, setDuplicateModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>(
    {} as Transaction,
  )

  function handleCloseDuplicateModal() {
    setDuplicateModalOpen(false)
    setSelectedTransaction({} as Transaction)
  }

  function handleCloseDeleteModal() {
    setDeleteModalOpen(false)
    setSelectedTransaction({} as Transaction)
  }

  function handleCloseEditModal() {
    setEditModalOpen(false)
    setSelectedTransaction({} as Transaction)
  }

  function selectTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction)
  }

  async function handleDuplicateTransaction(transaction: Transaction) {
    await createTransaction(transaction)
    handleCloseDuplicateModal()
  }

  async function handleDeleteTransaction(transaction: Transaction) {
    await deleteTransaction(transaction.id)
    handleCloseDeleteModal()
  }

  async function handleEditTransaction(transaction: Partial<Transaction>) {
    await editTransaction(transaction as Transaction)
    handleCloseEditModal()
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
                  <td width="35%">{transaction.title}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type !== TransactionTypes.RECEIPTS && '- '}
                      {priceFormatter.format(transaction.price)}{' '}
                    </PriceHighlight>
                  </td>
                  <td>{translatedTypes[transaction.type]}</td>
                  <td>{stringDateFormatter(transaction.clearingDate)}</td>
                  <td>
                    <ButtonActionsContainer>
                      <Dialog.Root
                        open={isDuplicateModalOpen}
                        onOpenChange={setDuplicateModalOpen}
                      >
                        <Dialog.Trigger asChild>
                          <button
                            onClick={() => selectTransaction(transaction)}
                          >
                            <Copy size={20} />
                          </button>
                        </Dialog.Trigger>

                        <ConfirmationModal
                          title="Duplicar Transação"
                          message={`Tem certeza que deseja duplicar a transação "${selectedTransaction.description}"?`}
                          action={() =>
                            handleDuplicateTransaction(selectedTransaction)
                          }
                          closeModal={handleCloseDuplicateModal}
                        />
                      </Dialog.Root>

                      <Dialog.Root
                        open={isEditModalOpen}
                        onOpenChange={setEditModalOpen}
                      >
                        <Dialog.Trigger asChild>
                          <button
                            onClick={() => selectTransaction(transaction)}
                          >
                            <PencilSimpleLine size={20} />
                          </button>
                        </Dialog.Trigger>

                        <SaveTransactionModal
                          title="Editar Transação"
                          buttonText="Editar"
                          transactionToEdit={selectedTransaction}
                          action={handleEditTransaction}
                          closeModal={handleCloseEditModal}
                        />
                      </Dialog.Root>

                      <Dialog.Root
                        open={isDeleteModalOpen}
                        onOpenChange={setDeleteModalOpen}
                      >
                        <Dialog.Trigger asChild>
                          <button
                            onClick={() => selectTransaction(transaction)}
                          >
                            <Trash size={20} />
                          </button>
                        </Dialog.Trigger>

                        <ConfirmationModal
                          title="Deletar Transação"
                          message={`Tem certeza que deseja deletar a transação "${selectedTransaction.title}"?`}
                          action={() =>
                            handleDeleteTransaction(selectedTransaction)
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
