import * as Dialog from '@radix-ui/react-dialog'
import * as z from 'zod'

import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { Controller, useForm } from 'react-hook-form'

import { Transaction } from '../../contexts/TransactionsContext'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

interface SaveModalProps {
  transactionToEdit?: Transaction
  title: string
  buttonText: string
  action: (transaction: Partial<Transaction>) => void
  closeModal: () => void
}

export function SaveTransactionModal({
  title,
  buttonText,
  transactionToEdit,
  action,
  closeModal,
}: SaveModalProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  useEffect(() => {
    if (transactionToEdit) {
      const fields = ['description', 'price', 'category', 'type'] as const

      fields.forEach((field) => setValue(field, transactionToEdit[field]))
    }
  }, [transactionToEdit, setValue])

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    action({ ...transactionToEdit, ...data })
    reset()
    closeModal()
  }

  function handleCloseModal() {
    reset()
    closeModal()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>{title}</Dialog.Title>

        <CloseButton onClick={handleCloseModal}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            {buttonText}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
