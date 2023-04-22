import { ComboInfo } from '@/types/market';

export interface PayDrawerProps {
  opened: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
  setComboInfo: React.Dispatch<React.SetStateAction<ComboInfo | undefined>>;
}
