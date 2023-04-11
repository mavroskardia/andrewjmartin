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
    color: var(--text-color);
  }
`;

export const animationStyles = css`
  .slide-in-blurred-left {
    -webkit-animation: slide-in-blurred-left 0.6s cubic-bezier(0.23, 1, 0.32, 1)
      both;
    animation: slide-in-blurred-left 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
  }
  .fade-in-left {
    -webkit-animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
    animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
  .fade-in-right {
    -webkit-animation: fade-in-right 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
    animation: fade-in-right 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }

  /* ----------------------------------------------
 * Generated by Animista on 2023-4-11 10:17:31
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
 * ----------------------------------------
 * animation slide-in-blurred-left
 * ----------------------------------------
 */
  @-webkit-keyframes slide-in-blurred-left {
    0% {
      -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
      transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
      -webkit-transform-origin: 100% 50%;
      transform-origin: 100% 50%;
      -webkit-filter: blur(40px);
      filter: blur(40px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0) scaleY(1) scaleX(1);
      transform: translateX(0) scaleY(1) scaleX(1);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-blurred-left {
    0% {
      -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
      transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
      -webkit-transform-origin: 100% 50%;
      transform-origin: 100% 50%;
      -webkit-filter: blur(40px);
      filter: blur(40px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0) scaleY(1) scaleX(1);
      transform: translateX(0) scaleY(1) scaleX(1);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }
  /* ----------------------------------------------
 * Generated by Animista on 2023-4-11 10:19:56
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
 * ----------------------------------------
 * animation fade-in-left
 * ----------------------------------------
 */
  @-webkit-keyframes fade-in-left {
    0% {
      -webkit-transform: translateX(-50px);
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes fade-in-left {
    0% {
      -webkit-transform: translateX(-50px);
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  /* ----------------------------------------------
 * Generated by Animista on 2023-4-11 10:20:48
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
 * ----------------------------------------
 * animation fade-in-right
 * ----------------------------------------
 */
  @-webkit-keyframes fade-in-right {
    0% {
      -webkit-transform: translateX(50px);
      transform: translateX(50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes fade-in-right {
    0% {
      -webkit-transform: translateX(50px);
      transform: translateX(50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
