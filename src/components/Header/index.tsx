import * as Dialog from '@radix-ui/react-dialog'

import {
  BalanceContainer,
  HeaderContainer,
  HeaderContent,
  InfoAndActionsContainer,
  NewTransactionButton,
} from './styles'
import {
  CreateTransactionInput,
  Transaction,
  TransactionsContext,
} from '../../contexts/TransactionsContext'
import { useContext, useState } from 'react'

import { BalanceContext } from '../../contexts/BalanceContext'
import { SaveTransactionModal } from '../SaveTransactionModal'
import logoImg from '../../assets/logo.svg'
import { priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'

export function Header() {
  const { createTransaction } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        createTransaction: context.createTransaction,
      }
    },
  )

  const { balance } = useContext(BalanceContext)

  const [isCreateModalOpen, setCreateModalOpen] = useState(false)

  function handleCloseCreateModal() {
    setCreateModalOpen(false)
  }

  async function handleCreateTransaction(transaction: Partial<Transaction>) {
    await createTransaction(transaction as CreateTransactionInput)
    handleCloseCreateModal()
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <InfoAndActionsContainer>
          <BalanceContainer>
            <strong>Saldo:</strong>
            <span>{priceFormatter.format(balance)}</span>
          </BalanceContainer>

          <Dialog.Root
            open={isCreateModalOpen}
            onOpenChange={setCreateModalOpen}
          >
            <Dialog.Trigger asChild>
              <NewTransactionButton>Nova transação</NewTransactionButton>
            </Dialog.Trigger>

            <SaveTransactionModal
              title="Nova Transação"
              buttonText="Salvar"
              action={handleCreateTransaction}
              closeModal={handleCloseCreateModal}
            />
          </Dialog.Root>
        </InfoAndActionsContainer>
      </HeaderContent>
    </HeaderContainer>
  )
}
