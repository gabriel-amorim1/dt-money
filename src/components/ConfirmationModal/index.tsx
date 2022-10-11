import * as Dialog from '@radix-ui/react-dialog'

import { ConfirmationButtonsContainer, Content, Overlay } from './styles'

interface ConfirmationModalProps {
  title: string
  message: string
  action: () => void
  closeModal: () => void
}

export function ConfirmationModal({
  title,
  message,
  action,
  closeModal,
}: ConfirmationModalProps) {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{message}</Dialog.Description>
        <ConfirmationButtonsContainer>
          <button onClick={closeModal}>Cancelar</button>
          <button onClick={action}>Confirmar</button>
        </ConfirmationButtonsContainer>
      </Content>
    </Dialog.Portal>
  )
}
