import * as Dialog from '@radix-ui/react-dialog'
import * as z from 'zod'

import {
  ActionButtonContainer,
  CloseButton,
  CompensatedCheckbox,
  CompensatedCheckboxIndicator,
  CompensatedContent,
  CompensatedLabel,
  Content,
  InputContainer,
  Overlay,
} from './styles'
import { Check, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import {
  Transaction,
  TransactionTypes,
} from '../../contexts/TransactionsContext'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

const translatedTypes = {
  RECEIPTS: 'Receitas',
  ESSENTIAL_EXPENSES: 'Despesas essenciais',
  NECESSARY_EXPENSES: 'Despesas necessárias',
  SUPERFLUOUS_EXPENSES: 'Despesas supérfluas',
  INVESTMENTS: 'Investimentos',
}

const newTransactionFormSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  clearingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.string(),
  type: z.enum([
    'RECEIPTS',
    'ESSENTIAL_EXPENSES',
    'NECESSARY_EXPENSES',
    'SUPERFLUOUS_EXPENSES',
    'INVESTMENTS',
  ]),
  compensated: z.boolean().default(false),
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
      const fields = [
        'title',
        'description',
        'price',
        'category',
        'type',
        'compensated',
        'clearingDate',
        'compensated',
      ] as const

      fields.forEach((field) =>
        setValue(field, transactionToEdit[field] as string),
      )
    }
  }, [transactionToEdit, setValue])

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    console.log(data)
    action({ ...transactionToEdit, ...data } as Transaction)
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
          <InputContainer>
            <label htmlFor="title">Título*</label>
            <input
              id="title"
              type="text"
              placeholder="Título"
              required
              {...register('title')}
            />
          </InputContainer>

          <InputContainer>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              placeholder="Descrição"
              maxLength={150}
              {...register('description')}
            />
          </InputContainer>

          <InputContainer>
            <label htmlFor="amount">Valor*</label>
            <input
              id="amount"
              type="number"
              placeholder="Preço"
              required
              {...register('price', { valueAsNumber: true })}
            />
          </InputContainer>

          <InputContainer>
            <label htmlFor="category">Categoria</label>
            <input
              id="category"
              type="text"
              placeholder="Categoria"
              {...register('category')}
            />
          </InputContainer>

          <InputContainer>
            <label htmlFor="clearingDate">Data a ser compensada*</label>
            <input
              id="clearingDate"
              type="date"
              placeholder="Data de compensação"
              required
              {...register('clearingDate')}
            />
          </InputContainer>

          <InputContainer>
            <label htmlFor="type">Tipo*</label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <>
                    <select
                      required
                      onSelect={field.onChange}
                      onChange={field.onChange}
                      name="type"
                      id="type"
                      value={field.value || ''}
                    >
                      <option value="" disabled>
                        Selecione uma opção...
                      </option>
                      {Object.values(TransactionTypes).map((type) => {
                        return (
                          <option key={type} value={type}>
                            {translatedTypes[type]}
                          </option>
                        )
                      })}
                    </select>
                  </>
                )
              }}
            />
          </InputContainer>

          <Controller
            control={control}
            name="compensated"
            render={({ field }) => {
              return (
                <CompensatedContent>
                  <CompensatedCheckbox
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    id="compensated"
                  >
                    <CompensatedCheckboxIndicator>
                      <Check size={16} />
                    </CompensatedCheckboxIndicator>
                  </CompensatedCheckbox>
                  <CompensatedLabel htmlFor="compensated">
                    Compensado
                  </CompensatedLabel>
                </CompensatedContent>
              )
            }}
          />

          <ActionButtonContainer>
            <button type="button" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting}>
              {buttonText}
            </button>
          </ActionButtonContainer>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
