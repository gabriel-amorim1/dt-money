import * as Dialog from '@radix-ui/react-dialog'

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import { NewTransactionModal } from '../NewTransactionModal'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import logoImg from '../../assets/logo.svg'
import { useContextSelector } from 'use-context-selector'

export function Header() {
  const { isModalOpen, openModal } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        isModalOpen: context.isModalOpen,
        openModal: context.openModal,
      }
    },
  )

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={isModalOpen} onOpenChange={openModal}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
