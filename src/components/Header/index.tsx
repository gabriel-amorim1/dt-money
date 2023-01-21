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
import { useContext, useEffect, useState } from 'react'

import { SaveTransactionModal } from '../SaveTransactionModal'
import { UserContext } from '../../contexts/UserContext'
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

  const userContext = useContext(UserContext)

  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [balance, setBalance] = useState(0)

  function handleCloseCreateModal() {
    setCreateModalOpen(false)
  }

  async function handleCreateTransaction(transaction: Partial<Transaction>) {
    await createTransaction(transaction as CreateTransactionInput)
    handleCloseCreateModal()
  }

  useEffect(() => {
    console.log(userContext)
    setBalance(userContext.user.balance)
  }, [userContext])

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
