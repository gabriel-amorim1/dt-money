import { TransactionTypes } from '../../contexts/TransactionsContext'
import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`

export const ButtonActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    padding: 0.5rem;
    background: transparent;
    color: ${(props) => props.theme.white};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme['gray-300']};
      transition: background-color 0.2s;
    }
  }
`

interface PriceHighlightProps {
  variant: TransactionTypes
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === TransactionTypes.RECEIPTS
      ? props.theme['green-300']
      : props.theme['red-300']};
`
