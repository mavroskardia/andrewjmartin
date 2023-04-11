import { css } from "lit";

export const baseStyles = css`
  :root {
    --text-color: rgba(255, 255, 255, 0.7);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    position: relative;
    font-weight: normal;
  }

  * {
    font-family: monospace;
    line-height: 1.5;
    color: var(--text-color);
  }

  body {
    transition: color 0.5s, background-color 0.5s;
    line-height: 1.6;
    font-size: 15px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
