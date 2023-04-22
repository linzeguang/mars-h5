import { store } from 'foca';

store.init({
  compose: 'redux-devtools',
});

// https://cn.vitejs.dev/guide/api-hmr.html#hot-acceptcb
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    //
  });
}
