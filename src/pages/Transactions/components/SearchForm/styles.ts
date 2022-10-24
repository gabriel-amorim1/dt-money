import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr 0.75fr 0.75fr auto;
  gap: 1rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }

  select,
  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;

    ::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  select {
    border-right: 1rem solid transparent;
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['green-300']};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-500']};
      border: 1px solid ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`
