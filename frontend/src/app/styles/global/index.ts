import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
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
    background-color: #fff;
    width: 16px;
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

  }

  body, input, button {
    font: 16px '', sans-serif;
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

`

export { GlobalStyles }
