/// <reference types="vite/client" />
/// <reference types="@emotion/react/types/css-prop" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_MARS_TRANSFER_ADDRESS: `0x${string}`;
  readonly VITE_USDT_TRANSFER_ADDRESS: `0x${string}`;
  readonly VITE_MARS_ADDRESS: `0x${string}`;
  readonly VITE_USDT_ADDRESS: `0x${string}`;
  readonly VITE_WITHDRAW_ADDRESS: `0x${string}`;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
