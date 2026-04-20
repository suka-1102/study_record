import { create } from "zustand";


const useStore = create((set, get) => ({

  openPopup: '', 
  setOpenPopup: (status) => set({ openPopup: status }),

  saveIndex: '', 
  setSaveIndex: (index) => set({ saveIndex: index }),

  itemTime: '', 
  setItemTime: (time) => set({ itemTime: time }),

}));

export default useStore;