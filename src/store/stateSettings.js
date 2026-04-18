import { create } from "zustand";


const useStore = create((set, get) => ({

  openPopup: '', 
  setOpenPopup: (status) => set({ openPopup: status }),

  saveIndex: '', 
  setSaveIndex: (index) => set({ saveIndex: index }),

}));

export default useStore;