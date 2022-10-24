import * as z from 'zod'

import { Controller, useForm } from 'react-hook-form'
import {
  FetchTransactionsOptions,
  TransactionTypes,
  TransactionsContext,
} from '../../../../contexts/TransactionsContext'

import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { useContextSelector } from 'use-context-selector'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

const translatedTypes = {
  RECEIPTS: 'Receitas',
  ESSENTIAL_EXPENSES: 'Despesas essenciais',
  NECESSARY_EXPENSES: 'Despesas necessárias',
  SUPERFLUOUS_EXPENSES: 'Despesas supérfluas',
  INVESTMENTS: 'Investimentos',
}

const searchFormSchema = z.object({
  query: z.string().optional(),
  type: z
    .enum([
      'RECEIPTS',
      'ESSENTIAL_EXPENSES',
      'NECESSARY_EXPENSES',
      'SUPERFLUOUS_EXPENSES',
      'INVESTMENTS',
      '',
    ])
    .optional(),
  initialDate: z.string(),
  finalDate: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactions,
  )

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  useEffect(() => {
    const now = new Date()

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    setValue('initialDate', firstDay.toISOString().split('T')[0])
    setValue('finalDate', lastDay.toISOString().split('T')[0])
  }, [setValue])

  async function handleSearchTransactions(data: SearchFormInputs) {
    if (!data.type) {
      delete data.type
    }

    await fetchTransactions(data as FetchTransactionsOptions)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <Controller
        control={control}
        name="type"
        render={({ field }) => {
          return (
            <>
              <select
                onSelect={field.onChange}
                onChange={field.onChange}
                name="type"
                id="type"
                value={field.value || ''}
              >
                <option value="">Selecione uma opção...</option>
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

      <input
        type="date"
        placeholder="Data inicial"
        {...register('initialDate')}
      />

      <input type="date" placeholder="Data final" {...register('finalDate')} />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
