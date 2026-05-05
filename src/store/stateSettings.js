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

}));

export default useStore;