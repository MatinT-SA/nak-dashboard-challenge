import { css } from "@emotion/react";

const globalStyles = css`
  :root {
    font-family: "Inter", sans-serif;
    line-height: 1.5;
    font-weight: 400;

    --color-background-light-1: #f4f4f4;
    --color-background-light-2: #f6f6f6;
    --color-primary: #1e1e2f;
    --color-text-dark: #222;
    --color-text-light: #fff;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(
      to bottom,
      var(--color-background-light-1),
      var(--color-background-light-2)
    );
    color: var(--color-text-dark);
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    padding: 0.6rem 1rem;
    background-color: var(--color-primary);
    color: var(--color-text-light);
    transition: background-color 0.25s ease;
  }

  button:hover {
    background-color: #2b2b44;
  }

  input,
  textarea {
    font-family: inherit;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
    transition: border-color 0.2s;
  }

  input:focus,
  textarea:focus {
    border-color: var(--color-primary);
  }
`;

export default globalStyles;
