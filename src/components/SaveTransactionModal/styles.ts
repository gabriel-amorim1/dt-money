import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'

import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100%;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);

  max-height: 80vh;
  overflow-y: auto;

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    input,
    textarea {
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
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      padding: 1rem;

      border-right: 1rem solid transparent;
    }

    textarea {
      height: 90px;
      resize: none;
      display: block;
      overflow: hidden;
    }

    label {
      color: ${(props) => props.theme['gray-100']};
    }
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const ActionButtonContainer = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  gap: 1rem;

  button {
    flex: 1;
    height: 58px;
    border: 0;
    background: ${(props) => props.theme['gray-600']};
    color: ${(props) => props.theme['red-300']};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    margin-top: 1.5rem;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
      transition: opacity 0.2s;
    }
  }

  button[type='submit'] {
    height: 58px;
    border: 0;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    margin-top: 1.5rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-700']};
      transition: background-color 0.2s;
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};

  &:hover {
    color: ${(props) => props.theme['red-500']};
    transition: color 0.2s;
  }
`

export const CompensatedContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding-top: 0.5rem;
`

export const CompensatedLabel = styled.label`
  color: ${(props) => props.theme['gray-300']};
  padding-left: 1rem;
  cursor: pointer;
`

export const CompensatedCheckbox = styled(CheckboxPrimitive.Root)`
  all: unset;
  background: ${(props) => props.theme['gray-900']};
  width: 25px;
  height: 25px;
  border-radius: 4px;
  cursor: pointer;
`

export const CompensatedCheckboxIndicator = styled(CheckboxPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.white};
`
