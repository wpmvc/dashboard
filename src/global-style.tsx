import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --text-primary: #1d2327;
    --text-secondary: #50575e;
    --bg-primary: #ffffff;
    --bg-secondary: #f0f0f1;
    --bg-tertiary: #F6FAFC;
    --border-color: #ccd0d4;
    --active-bg: #F6FAFC;
    --icon-color: #8d96a0;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --wpmvc-header-height: 70px;
  }

  #wpbody-content > .notice {
    display: none;
  }

  [role = "menu"]{
    [data-active-item="true"]{
      --wp-admin-theme-color: var(--wpmvc-primary-500);
    }
  }
  .components-popover{
    --wp-admin-theme-color: var(--wpmvc-primary-500);
    --wp-components-color-gray-600: var(--wpmvc-gray-600);
    --wp-components-color-foreground: var(--wpmvc-background-dark);
  }
`;

export default GlobalStyle;
