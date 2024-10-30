import { create } from 'zustand';

type DialogType = {
  open: boolean;
  type: string;
  openDialog: (type: string) => void;
  closeDialog: () => void;
};

const useDialogStore = create<DialogType>((set) => ({
  open: false,
  type: '',
  openDialog: (type:string) => set(() => ({ open: true, type })),
  closeDialog: () =>
    set(() => ({
      open: false,
      type: '',
    })),
}));

export default useDialogStore;
