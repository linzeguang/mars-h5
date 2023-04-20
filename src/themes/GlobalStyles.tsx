import React from 'react';
import { Global } from '@emotion/react';

const GlobalStyles: React.FC = () => (
  <Global
    styles={() => ({
      html: {
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #FFF 0%, #F3F4F7 54%, #F3F4F7 100%)',
      },

      a: {
        color: 'inherit',
        textDecoration: 'none',
      },

      '*': {
        boxSizing: 'border-box',
      },

      '.w-affix': {
        zIndex: 20,
      },
    })}
  />
);

export default GlobalStyles;
