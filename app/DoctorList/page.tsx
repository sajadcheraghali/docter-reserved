
// import { DoctorModel } from "@/source/models/doctor.model";
// import DoctorFilterComponent from "@/components/DoctorFilter/DoctorFilter.component";
// import LazyLoadingInDoctorListComponent from "../../components/lazyLoadingInDoctorList/lazyLoadingInDoctorListComponent";
// import styles from "./DoctorList.module.css"
// import FilterByDoctorSpecialtyComponent from "@/components/filterByDoctorSpecialty/filterByDoctorSpecialtyComponent";



// export interface Doctor extends DoctorModel {
//   city: string;
// }

// interface Props {
//   searchParams: Promise <{
//     gender?: string;
//     city?: string;
//     degree?: string;
//     specialty?: string
//   }>;
// }

// export default async function DoctorList({ searchParams }: Props) {

//   // use await for searchParams because read URL is long
//   const param = await searchParams
//   const gender = param.gender || "";
//   const cities = param.city ? param.city.split(",") : [];
//   const degrees = param.degree ? param.degree.split(",") : [];
//   const specialty = param.specialty ? decodeURIComponent(param.specialty) : null

//   // ساخت کوئری استرینگ برای API
//   const params = new URLSearchParams();
//     if (gender) params.set("gender", gender);
//     if (cities.length > 0) params.set("city", cities.join(","));
//     if (degrees.length > 0) params.set("degree", degrees.join(","));
//     if (specialty) params.set("specialty", encodeURIComponent(specialty));

//   const qs = params.toString();

//   // Fetch از سرور (نه کلاینت)
//   // const res = await fetch(`${process.env.next_public_base_url}/api/doctors?${qs}`, );
//   const res = await fetch(`https://docter-reserved-ap37of55g-sajads-projects-f9b66e16.vercel.app/api/doctors?${qs}`, );
//   const doctors: Doctor[] = res.ok ? await res.json()  : [];

//   const degreeLevel: string[] = ["متخصص", "فوق تخصص", "دکترا عمومی", "کارشناسی"];
//   const cityArray: string[] = ["تهران", "مشهد", "اصفهان"];
//   const genderArray: string[] = ["زن", "مرد"];

//   return (
//     <div className={styles.doctorpage}>
//       <div className={styles.filterBox}>
//         <DoctorFilterComponent
//           genderArray={genderArray}
//           cityArray={cityArray}
//           degreeLevel={degreeLevel}
//           selected={{ gender, cities, degrees }}
//         />

//         <FilterByDoctorSpecialtyComponent searchParams= {searchParams} />

//       </div>
//       {doctors.length > 0 ? (
//         <LazyLoadingInDoctorListComponent  allDoctorsProp={doctors} doctorsNumber = {doctors}/>
//       ) : (
//         <p>پزشکی با فیلترهای انتخابی یافت نشد.</p>
//       )}
//     </div>
//   );
// }




import { DoctorModel } from "@/source/models/doctor.model";
import { doctors } from "@/source/mock/doctors";
import { specialtiesTree } from "@/source/mock/specialtiesTree";

import DoctorFilterComponent from "@/components/DoctorFilter/DoctorFilter.component";
import LazyLoadingInDoctorListComponent from "@/components/lazyLoadingInDoctorList/lazyLoadingInDoctorListComponent";
import FilterByDoctorSpecialtyComponent from "@/components/filterByDoctorSpecialty/filterByDoctorSpecialtyComponent";

import {
  getLeafLabels,
  findNode,
} from "@/components/filterByDoctorSpecialty/filterSpecialtyFunction/filterSpecialtyFunction";

import styles from "./DoctorList.module.css";

export interface Doctor extends DoctorModel {
  city: string;
}

interface Props {
  searchParams: Promise<{
    gender?: string;
    city?: string;
    degree?: string;
    specialty?: string;
  }>;
}

export default async function DoctorList({ searchParams }: Props) {
  const param = await searchParams;

  const gender = param.gender || "";
  const cities = param.city ? param.city.split(",") : [];
  const degrees = param.degree ? param.degree.split(",") : [];
  const specialty = param.specialty
    ? decodeURIComponent(param.specialty)
    : null;

  let filteredDoctors = [...doctors];

  // gender
  if (gender) {
    filteredDoctors = filteredDoctors.filter(
      (d) => d.gender === gender
    );
  }

  // city
  if (cities.length > 0) {
    filteredDoctors = filteredDoctors.filter((d) =>
      cities.some((selectedCity) =>
        d.address.includes(selectedCity)
      )
    );
  }

  // degree
  if (degrees.length > 0) {
    filteredDoctors = filteredDoctors.filter((d) =>
      degrees.includes(d.educationalLevel)
    );
  }

  // specialty
  if (specialty) {
    const targetNode = findNode(
      specialtiesTree,
      specialty
    );

    const subLeaves = targetNode
      ? getLeafLabels([targetNode])
      : [];

    filteredDoctors = filteredDoctors.filter((doctor) => {
      const doctorExpertise = doctor.expertise
        .split(/[،,]/)
        .map((e) => e.trim());

      return doctorExpertise.some((expertise) =>
        subLeaves.some(
          (leaf) =>
            expertise.includes(leaf) ||
            leaf.includes(expertise)
        )
      );
    });
  }

  const degreeLevel = [
    "متخصص",
    "فوق تخصص",
    "دکترا عمومی",
    "کارشناسی",
  ];

  const cityArray = [
    "تهران",
    "مشهد",
    "اصفهان",
  ];

  const genderArray = [
    "زن",
    "مرد",
  ];

  return (
    <div className={styles.doctorpage}>
      <div className={styles.filterBox}>
        <DoctorFilterComponent
          genderArray={genderArray}
          cityArray={cityArray}
          degreeLevel={degreeLevel}
          selected={{
            gender,
            cities,
            degrees,
          }}
        />

        <FilterByDoctorSpecialtyComponent
          searchParams={searchParams}
        />
      </div>

      {filteredDoctors.length > 0 ? (
        <LazyLoadingInDoctorListComponent
          allDoctorsProp={filteredDoctors}
          doctorsNumber={filteredDoctors}
        />
      ) : (
        <p>پزشکی با فیلترهای انتخابی یافت نشد.</p>
      )}
    </div>
  );
}