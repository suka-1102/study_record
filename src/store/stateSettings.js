import { create } from "zustand";


const useStore = create((set) => ({

    // const [status, setStatus] = useState('learning')
  status: 'learning', 
  setStatus: (s) => set({ status: s }),
  

  openPopup: '', 
  setOpenPopup: (status) => set({ openPopup: status }),

  saveItemId: '', 
  setSaveItemId: (index) => set({ saveItemId: index }),

  calendarTime: '', 
  setCalendarTime: (time) => set({ calendarTime: time }),

  materials: JSON.parse(localStorage.getItem('materialsData')) || [],

  addMaterialState: (material) => set((state) => {
    const next = [...state.materials, material]
    localStorage.setItem('materialsData', JSON.stringify(next))
    return { materials: next }
  }),
  
  setMaterials: (materials) => set(() => {
    localStorage.setItem('materialsData', JSON.stringify(materials))
    return { materials }
  }),

  
  

  deleteMaterialState: (id) => set((state) => {
    const next = state.materials.filter((item) => item.id !== id)
    localStorage.setItem('materialsData', JSON.stringify(next))
    return { materials: next }
  }),

}));

export default useStore;