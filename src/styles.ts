import { ModalTheme } from './types';

/**
 * 获取弹窗样式
 */
export function getModalStyles(theme: ModalTheme = 'default'): string {
  const baseStyles = `
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999999;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: hsl(222.2 84% 4.9%);
      box-sizing: border-box;
      --radius: 0.5rem;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.2s ease-out;
    }

    .modal-overlay.show {
      opacity: 1;
    }

    .modal-container {
      background: hsl(0 0% 100%);
      border: 1px solid hsl(214.3 31.8% 91.4%);
      border-radius: var(--radius);
      box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05),
        0 0 0 1px rgba(0, 0, 0, 0.05);
      max-width: 90vw;
      max-height: 90vh;
      overflow: hidden;
      transform: scale(0.95) translateY(-10px);
      transition: all 0.2s ease-out;
      position: relative;
      min-width: 320px;
    }

    .modal-overlay.show .modal-container {
      transform: scale(1) translateY(0);
    }

    .modal-header {
      padding: 24px 24px 16px 24px;
      border-bottom: 1px solid hsl(214.3 31.8% 91.4%);
      position: relative;
    }

    .modal-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: hsl(222.2 84% 4.9%);
      line-height: 1.4;
      letter-spacing: -0.025em;
    }

    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: calc(var(--radius) - 2px);
      cursor: pointer;
      color: hsl(215.4 16.3% 46.9%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 1;
      transition: all 0.15s ease;
      opacity: 0.7;
    }

    .modal-close:hover {
      opacity: 1;
      background: hsl(210 40% 96%);
      color: hsl(222.2 84% 4.9%);
    }

    .modal-close:focus {
      outline: 2px solid hsl(221.2 83.2% 53.3%);
      outline-offset: 2px;
    }

    .modal-body {
      padding: 16px 24px 24px 24px;
      min-width: 280px;
    }

    .modal-content {
      margin: 0;
      word-wrap: break-word;
      color: hsl(215.4 16.3% 46.9%);
      line-height: 1.6;
    }

    .modal-footer {
      padding: 0 24px 24px 24px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      flex-wrap: wrap;
    }

    .modal-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      border-radius: calc(var(--radius) - 2px);
      font-size: 14px;
      font-weight: 500;
      transition: all 0.15s ease;
      cursor: pointer;
      outline: none;
      min-height: 36px;
      padding: 8px 16px;
      min-width: 80px;
      border: 1px solid hsl(214.3 31.8% 91.4%);
      background: hsl(0 0% 100%);
      color: hsl(222.2 84% 4.9%);
    }

    .modal-button:hover {
      background: hsl(210 40% 96%);
      border-color: hsl(214.3 31.8% 85%);
    }

    .modal-button:focus {
      outline: 2px solid hsl(221.2 83.2% 53.3%);
      outline-offset: 2px;
    }

    .modal-button.primary {
      background: hsl(221.2 83.2% 53.3%);
      border-color: hsl(221.2 83.2% 53.3%);
      color: hsl(210 40% 98%);
    }

    .modal-button.primary:hover {
      background: hsl(221.2 83.2% 48%);
      border-color: hsl(221.2 83.2% 48%);
    }

    .modal-button.warning {
      background: hsl(25 95% 53%);
      border-color: hsl(25 95% 53%);
      color: hsl(210 40% 98%);
    }

    .modal-button.warning:hover {
      background: hsl(25 95% 48%);
      border-color: hsl(25 95% 48%);
    }

    .modal-button.destructive {
      background: hsl(0 84.2% 60.2%);
      border-color: hsl(0 84.2% 60.2%);
      color: hsl(210 40% 98%);
    }

    .modal-button.destructive:hover {
      background: hsl(0 84.2% 55%);
      border-color: hsl(0 84.2% 55%);
    }

    .modal-countdown {
      font-size: 12px;
      color: hsl(215.4 16.3% 56.9%);
      margin-left: 6px;
      opacity: 0.8;
    }

    @media (max-width: 640px) {
      .modal-container {
        margin: 16px;
        max-width: calc(100vw - 32px);
        min-width: auto;
      }

      .modal-header {
        padding: 20px 20px 12px 20px;
      }

      .modal-body {
        padding: 12px 20px 20px 20px;
        min-width: auto;
      }

      .modal-footer {
        padding: 0 20px 20px 20px;
        flex-direction: column-reverse;
        gap: 8px;
      }

      .modal-button {
        width: 100%;
        justify-content: center;
      }

      .modal-close {
        top: 16px;
        right: 16px;
      }
    }
  `;

  const themeStyles = {
    default: '',
    dark: `
      .modal-overlay {
        background: rgba(0, 0, 0, 0.9);
      }

      .modal-container {
        background: hsl(222.2 84% 4.9%);
        border-color: hsl(217.2 32.6% 17.5%);
        color: hsl(210 40% 98%);
      }

      .modal-header {
        border-bottom-color: hsl(217.2 32.6% 17.5%);
      }

      .modal-title {
        color: hsl(210 40% 98%);
      }

      .modal-close {
        color: hsl(215 20.2% 65.1%);
      }

      .modal-close:hover {
        background: hsl(217.2 32.6% 17.5%);
        color: hsl(210 40% 98%);
      }

      .modal-content {
        color: hsl(215 20.2% 65.1%);
      }

      .modal-button {
        background: hsl(217.2 32.6% 17.5%);
        border-color: hsl(217.2 32.6% 17.5%);
        color: hsl(210 40% 98%);
      }

      .modal-button:hover {
        background: hsl(217.2 32.6% 22%);
        border-color: hsl(217.2 32.6% 22%);
      }

      .modal-button.primary {
        background: hsl(221.2 83.2% 53.3%);
        border-color: hsl(221.2 83.2% 53.3%);
      }

      .modal-button.primary:hover {
        background: hsl(221.2 83.2% 58%);
        border-color: hsl(221.2 83.2% 58%);
      }
    `,
    minimal: `
      .modal-overlay {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
      }

      .modal-container {
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border: 1px solid hsl(214.3 31.8% 91.4%);
        border-radius: 8px;
      }

      .modal-header {
        padding: 20px 20px 12px 20px;
        border-bottom: none;
      }

      .modal-title {
        font-size: 16px;
        font-weight: 500;
        color: hsl(215.4 16.3% 46.9%);
      }

      .modal-body {
        padding: 12px 20px 20px 20px;
      }

      .modal-footer {
        padding: 0 20px 20px 20px;
        gap: 8px;
      }

      .modal-button {
        border-radius: 6px;
        font-weight: 400;
        min-height: 32px;
        padding: 6px 12px;
        font-size: 13px;
      }

      .modal-close {
        width: 20px;
        height: 20px;
        font-size: 14px;
      }
    `,
    glass: `
      .modal-overlay {
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
      }

      .modal-container {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow:
          0 25px 50px -12px rgba(0, 0, 0, 0.25),
          0 0 0 1px rgba(255, 255, 255, 0.1);
      }

      .modal-header {
        background: rgba(255, 255, 255, 0.1);
        border-bottom-color: rgba(0, 0, 0, 0.1);
      }

      .modal-button {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border-color: rgba(0, 0, 0, 0.1);
      }

      .modal-button:hover {
        background: rgba(255, 255, 255, 0.9);
      }

      .modal-button.primary {
        background: rgba(59, 130, 246, 0.9);
        backdrop-filter: blur(10px);
        border-color: rgba(59, 130, 246, 0.3);
      }

      .modal-button.primary:hover {
        background: rgba(59, 130, 246, 1);
      }
    `,
    daisyui: `
      .modal-overlay {
        background: rgba(0, 0, 0, 0.6);
      }

      .modal-container {
        background: oklch(100% 0 0);
        border: none;
        border-radius: 1rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }

      .modal-header {
        padding: 1.5rem 1.5rem 0.5rem 1.5rem;
        border-bottom: none;
      }

      .modal-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: oklch(25.3% 0.015 260.54);
      }

      .modal-body {
        padding: 0.5rem 1.5rem 1.5rem 1.5rem;
      }

      .modal-content {
        color: oklch(69.71% 0.013 260.54);
      }

      .modal-footer {
        padding: 0 1.5rem 1.5rem 1.5rem;
        gap: 0.75rem;
      }

      .modal-button {
        border-radius: 0.5rem;
        font-weight: 600;
        min-height: 3rem;
        padding: 0 1rem;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        font-size: 0.875rem;
        border: 2px solid oklch(89.84% 0.011 260.54);
        background: oklch(100% 0 0);
        color: oklch(25.3% 0.015 260.54);
      }

      .modal-button:hover {
        border-color: oklch(83.46% 0.017 260.54);
        background: oklch(96.27% 0.004 260.54);
      }

      .modal-button.primary {
        background: oklch(49.12% 0.3096 275.75);
        border-color: oklch(49.12% 0.3096 275.75);
        color: oklch(100% 0 0);
      }

      .modal-button.primary:hover {
        background: oklch(45% 0.3096 275.75);
        border-color: oklch(45% 0.3096 275.75);
      }

      .modal-button.warning {
        background: oklch(76.76% 0.184 83.87);
        border-color: oklch(76.76% 0.184 83.87);
        color: oklch(25.3% 0.015 260.54);
      }

      .modal-button.warning:hover {
        background: oklch(72% 0.184 83.87);
        border-color: oklch(72% 0.184 83.87);
      }

      .modal-close {
        background: oklch(89.84% 0.011 260.54);
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        color: oklch(25.3% 0.015 260.54);
      }

      .modal-close:hover {
        background: oklch(83.46% 0.017 260.54);
      }
    `
  };

  return baseStyles + (themeStyles[theme] || '');
}
