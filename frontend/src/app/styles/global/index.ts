import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #34cb79;
    --title-color: #322153;
    --text-color: #6C6C80;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    ::-webkit-scrollbar {
      background: #282a36;
      -webkit-font-smoothing: antialiased;
      color: var(--text-color);
    }

    ::-webkit-scrollbar-track {
      background-color: #fff;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #babac0;
      border-radius: 16px;
      border: 4px solid #fff;
    }

    ::-webkit-scrollbar-button {
      display: none;
    }

    background: #f2f2f2;
  }

  body,
  input,
  button {
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }

  a {
    text-decoration: none;
  }

  label {
    font-size: 14px;
    min-height: 25px;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--title-color);
  }
`

export { GlobalStyles }
