import React from 'react';
import { Global } from '@emotion/react';

const GlobalStyles: React.FC = () => (
  <Global
    styles={(theme) => ({
      html: {
        minHeight: '100vh',
        background: theme.fn.gradient({ from: '#FFF', to: '#F3F4F7', deg: 180 }),
      },

      a: {
        color: 'inherit',
        textDecoration: 'none',
      },
    })}
  />
);

export default GlobalStyles;
