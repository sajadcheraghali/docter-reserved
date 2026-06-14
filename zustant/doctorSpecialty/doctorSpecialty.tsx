
import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

interface DoctorSpecialtyState {
  selectedSpecialty: string | null;
  setSelectedSpecialty: (label: string | null) => void;
  clearSelectedSpecialty: () => void;
}

export const useDoctorSpecialtyStore = create<DoctorSpecialtyState>()(
//   persist(
    (set) => ({
      selectedSpecialty: null,
      
      setSelectedSpecialty: (label) => 
        set({ selectedSpecialty: label }),
      
      clearSelectedSpecialty: () => 
        set({ selectedSpecialty: null }),
    }),
//     {
//       name: 'doctor-filter-storage',
//       storage: createJSONStorage(() => localStorage), 
//     }
//   )
);