import { create } from "zustand";


const useStore = create((set) => ({

  openPopup: '', 
  setOpenPopup: (status) => set({ openPopup: status }),

  saveIndex: '', 
  setSaveIndex: (index) => set({ saveIndex: index }),

  calendarTime: '', 
  setCalendarTime: (time) => set({ calendarTime: time }),

  hoursLog: '', 
  setHoursLog: (time) => set({ hoursLog: time }),

  minutesLog: '', 
  setMinutesLog: (time) => set({ minutesLog: time }),

  // applyItemLog: '', 
  // setApplyItemLog: (time) => set({ applyItemLog: time }),

  materials: JSON.parse(localStorage.getItem('materialsData')) || [],

  addMaterialState: (material) => set((state) => {
    const next = [...state.materials, material]
    localStorage.setItem('materialsData', JSON.stringify(next))
    return { materials: next }
  }),

  deleteMaterialState: (index) => set((state) => {
    const next = state.materials.filter((_, i) => i !== index)
    localStorage.setItem('materialsData', JSON.stringify(next))
    return { materials: next }
  }),

}));

export default useStore;