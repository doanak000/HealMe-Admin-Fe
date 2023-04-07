import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    /* font-family: 'Montserrat', sans-serif; 'Roboto', sans-serif; */
  }
  .ant-form-item-label>label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before { content: "";}
`
