import styled from 'styled-components'

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
`

interface PageNumberButtonProps {
  selected?: boolean
}

export const PageNumberButton = styled.button<PageNumberButtonProps>`
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  border: 0;
  padding: 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  ${(props) => {
    if (props.selected) {
      return {
        background: props.theme['green-500'],
        color: props.theme.white,
      }
    }

    return {
      background: props.theme['gray-600'],
      color: props.theme['gray-400'],
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const SelectPageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  border: 0;
  padding: 0.5rem;
  background: transparent;
  color: ${(props) => props.theme['green-500']};
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    color: ${(props) => props.theme['gray-400']};
  }
`
