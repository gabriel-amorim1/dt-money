import styled from 'styled-components'

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1120px) {
    justify-content: center;

    img:last-child {
      display: none;
    }

    img:first-child {
      width: 80%;
      max-width: 350px;
    }
  }
`

export const LoginContent = styled.section`
  width: 100%;
  max-width: 350px;
  margin-right: 2rem;
  margin-left: 2rem;

  @media (max-width: 1120px) {
    form {
      width: 100%;
    }
  }

  form {
    margin-top: 6.25rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  button {
    cursor: pointer;
    width: 100%;
    height: 60px;
    border: 0;
    border-radius: 8px;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};

    margin-top: 1rem;
    text-align: center;
    text-decoration: none;

    font-weight: 700;
    font-size: 18px;
    line-height: 21px;

    :hover {
      opacity: 0.7;
      transition: opacity 0.2s;
    }
  }

  a {
    display: flex;
    align-items: center;
    margin-top: 3.5rem;
    color: #41414d;
    font-size: 18px;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;

    svg {
      margin-right: 0.5rem;
      color: ${(props) => props.theme['green-500']};
    }

    :hover {
      color: ${(props) => props.theme.white};
      transition: color 0.2s;
    }
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;
    margin-bottom: 1rem;
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  label {
    color: ${(props) => props.theme['gray-100']};
    margin-bottom: 0.5rem;
  }
`
