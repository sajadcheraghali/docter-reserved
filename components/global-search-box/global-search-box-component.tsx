"use client";
import { ReactElement, useEffect, useState } from "react";
import { doctors } from "@/source/mock/doctors";
import { DoctorModel } from "@/source/models/doctor.model";
import styles from "./global-search-box.module.css"
import Link from "next/link";
import SelectedCityInSearchBoxComponent from "../SelectedCityInSearchBox/SelectedCityInSearchBox";


export default function GlobalSearchBoxComponent() : ReactElement {

  const [selectedValue, setSelectedValue] = useState<string>("");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DoctorModel[]>([]);
  const [doctorInCity , setDoctorInCity] = useState(doctors)

  useEffect (() => {
    if (selectedValue === "") {
        setDoctorInCity(doctors);
        return;
    }
        let doctorInSelectedCity = doctors.filter((doctor) => doctor.address.split("،")[0] == selectedValue )
        setDoctorInCity(doctorInSelectedCity)

  } , [selectedValue])


  const handleSearch = (value: string) => {
      setQuery(value);

      if (value.trim() === "") {
        setResults([]);
        return;
      }

      const filtered = doctorInCity.filter((doctor) =>
        [doctor.name, doctor.expertise, doctor.degree, doctor.brief]
          .some(field => field.toLowerCase().includes(value.toLowerCase()))
      );

      setResults(filtered);
  };
    return(
      <div className={styles.header}>
        <div className={styles["global-search-box"]}>
            <div className={styles.prefix}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="plasmic-default__svg plasmic_all__wY2Hq PlasmicSearchInput_svg__l3Jw2__LTDrm lucide lucide-search-icon lucide-search __web-inspector-hide-shortcut__" viewBox="0 0 24 24" height="1em" role="img"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
            </div>
            <input
                 type="text"
                 placeholder="نام بیماری ، تخصص ، پزشک ، بیمارستان و ..." 
                 value={query}
                 onChange={(e) => handleSearch(e.target.value)}
            />
            <div className={styles.divider}></div>
            <div className={styles.suffix}>
                <button>
                    <SelectedCityInSearchBoxComponent value = {selectedValue} setValue = {setSelectedValue }/>
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" className="plasmic-default__svg plasmic_all__wY2Hq PlasmicProductCard_svg__uyLb1__CFocz" role="img"><path d="M12 13.43a3.12 3.12 0 100-6.24 3.12 3.12 0 000 6.24z" stroke="currentColor" stroke-width="1.5"></path><path d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 01-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05z" stroke="currentColor" stroke-width="1.5"></path></svg>
                </button>
            </div>
        </div>
            {results.length > 0 && (
              <ul className="mt-2 bg-white  shadow-md rounded">
                {results.map((doctor) => (
                  <Link href={`${doctor.id}`} >
                    <li key={doctor.id} className={styles.linkdoctor}>
                        <div className="text-sm font-semibold">{doctor.name}</div>
                        <div className="text-xs text-gray-600">{doctor.expertise}</div>
                      </li>
                  </Link>
                ))}
              </ul>
            )}
      </div>
    )
}




