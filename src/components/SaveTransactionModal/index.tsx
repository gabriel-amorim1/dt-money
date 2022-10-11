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

import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function SaveTransactionModal() {
  const { transactionsToEdit, createTransaction, openModal, editTransaction } =
    useContextSelector(TransactionsContext, (context) => {
      return {
        transactionsToEdit: context.transactionsToEdit,
        createTransaction: context.createTransaction,
        openModal: context.openModal,
        editTransaction: context.editTransaction,
      }
    })

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
    if (transactionsToEdit) {
      const fields = ['description', 'price', 'category', 'type'] as const

      fields.forEach((field) => setValue(field, transactionsToEdit[field]))
    }
  }, [transactionsToEdit, setValue])

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data

    if (transactionsToEdit) {
      await editTransaction({
        ...transactionsToEdit,
        description,
        price,
        category,
        type,
      })
    } else {
      await createTransaction({
        description,
        price,
        category,
        type,
      })
    }

    reset()
    openModal(false)
  }

  function handleCloseModal() {
    reset()
    openModal(false)
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

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
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
