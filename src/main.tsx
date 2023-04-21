import './i18n';

import ReactDOM from 'react-dom/client';

import { flexible } from './utils/flexible';
import App from './App';
import Providers from './Providers';

flexible(window);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
  </Providers>
);
