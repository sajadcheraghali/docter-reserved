
"use client";
import { useState , useEffect } from "react";
import { useRouter , usePathname} from "next/navigation";
import { useDoctorSpecialtyStore } from "@/zustant/doctorSpecialty/doctorSpecialty";
import styles from "./DoctorFilter.module.css"

interface FiltersProps {
  genderArray: string[];
  cityArray: string[];
  degreeLevel: string[];
  selected: {
    gender: string;
    cities: string[];
    degrees: string[];
  };
}

export default function DoctorFilterComponent({
  genderArray,
  cityArray,
  degreeLevel,
  selected,
}: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {selectedSpecialty} = useDoctorSpecialtyStore()

  const [gender, setGender] = useState(selected.gender);
  const [cities, setCities] = useState(selected.cities);
  const [degrees, setDegrees] = useState(selected.degrees);

  //state in react change asynchrone , so we use useEffect when state (e.g gender) cause rerender component fully , we use state
  useEffect(() => {
    const buildQueryParams = () => {
      const params = new URLSearchParams();
      if (gender) {
        params.set("gender", gender);
      }
      if (cities.length) params.set("city", cities.join(","));
      if (degrees.length) params.set("degree", degrees.join(","));
      if (selectedSpecialty) params.set("specialty", encodeURIComponent(selectedSpecialty));
      return params.toString();
    };

    const qs = buildQueryParams();
    if (qs) {
       router.push(`?${qs}`, { scroll: false });
    } else {
       router.push( `${pathname}?${qs}`, { scroll: false });
    }

  }, [gender, cities, degrees, router , selectedSpecialty]);

  return (
    <div>
      <div className={styles.filterBox}>
        <h2>فیلترها</h2>
        <div>
          <h3 >جنسیت</h3>
          {genderArray.map((x , index) => (
            <div>
               <label key={index}  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  value={x}
                  checked={gender === x}
                  onChange={(e) => {
                    const val = e.target.checked ? x : "";
                    setGender(val);
                  }}
                />
                {x}
              </label>
            </div>          
          ))}
        </div>

        <div style={{ marginTop: "10px" }}>
          <h3>شهر</h3>
          {cityArray.map((x) => (
            <div>
              <label key={x} >
                <input
                  type="checkbox"
                  value={x}
                  checked={cities.includes(x)}
                  onChange={(e) => {
                    const newCities = e.target.checked
                      ? [...cities, x]
                      : cities.filter((c) => c !== x);
                    setCities(newCities);
                  }}
                />
                {x}
              </label>
            </div>           
          ))}
        </div>

        <div style={{ margin: "10px 0", width : "100px" }}>
          <h3>مدرک تحصیلی</h3>
          {degreeLevel.map((x) => (
            <div>
               <label key={x}  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  value={x}
                  checked={degrees.includes(x)}
                  onChange={(e) => {
                    const newDegrees = e.target.checked
                      ? [...degrees, x]
                      : degrees.filter((d) => d !== x);
                    setDegrees(newDegrees);
                  }}
                />
                {x}
              </label>
            </div>
          ))}
        </div>
      </div>
     </div> 
  );
  
}
