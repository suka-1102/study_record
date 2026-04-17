import { create } from "zustand";


const useStore = create((set, get) => ({

  openPopup: '', 
  setOpenPopup: (status) => set({ openPopup: status }),

}));

export default useStore;