import { create } from "zustand";

type ModalType = "login" | "register" | null;

type ModalState = {
  activeModal: ModalType;
  pendingAction: (() => void) | null;
  openModal: (type: ModalType, pendingAction?: () => void) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  pendingAction: null,

  openModal: (type, pendingAction) =>
    set({
      activeModal: type,
      pendingAction: pendingAction || null,
    }),

  closeModal: () => set({ activeModal: null, pendingAction: null }),
}));
