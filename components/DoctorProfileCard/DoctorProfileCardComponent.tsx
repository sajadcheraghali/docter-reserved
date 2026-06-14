// components/DoctorProfileCard.tsx
import React, { ReactElement } from 'react';
import Image from 'next/image'; 
import { doctors } from "@/source/mock/doctors";
import styles from "./DoctorProfileCard.module.css"



export default async function DoctorProfileCard({params} : { params: { id: number } })  {

    let {id} = await params
    console.log("param2",id)

    // let selectedDoctor 
    let doctor = doctors.find(doctor => doctor.id == id)
  return (
    <div className={styles.DoctorProfile1}>
      <div className="flex items-center mb-4 ">
        <div className="relative w-24 h-24 mr-4 rounded-full overflow-hidden border-2 border-blue-500">
          {/* فرض می‌کنیم تصاویر در پوشه public/images قرار دارند */}
          <Image
            src="/doctor.png"
            alt={doctor?.name ?? "picture"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.DoctorProfile2}>
          <div className="font-bold text-xl mb-1 text-gray-800 flex items-center  ">
            <h2 className={styles.DoctorProfile3}>{doctor?.name}</h2>
            {doctor?.isVerified && (
              <span className="ml-2 text-blue-500 text-sm bg-blue-100 px-2 py-1 rounded-full">
                تایید شده
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{doctor?.degree}</p>
          <div className="flex items-center mt-1">
            <svg className="w-4 h-4 fill-current text-yellow-500 mr-1" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
            </svg>
            <p className="text-sm text-gray-600">{doctor?.averageRating} ({doctor?.totalVotes} رای)</p>
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-base mb-3 leading-relaxed ">
        {doctor?.brief}
      </p>

      <div className="mb-3 text-sm text-gray-700">
        <span className="font-semibold">تخصص: </span>
        {doctor?.expertise}
      </div>

      <div className="mb-3 text-sm text-gray-700">
        <span className="font-semibold">مدرک: </span>
        {doctor?.educationalLevel}
      </div>

      <div className="mb-3 text-sm text-gray-700">
        <span className="font-semibold">آدرس: </span>
        {doctor?.address}
      </div>

      <div className="mb-3 text-sm text-gray-700">
        <span className="font-semibold">هزینه ویزیت: </span>
        {doctor?.visitFee.toLocaleString('fa-IR')} تومان
      </div>

      <div className="mb-3 text-sm text-gray-700">
        <span className="font-semibold">اولین نوبت در دسترس: </span>
        {doctor?.firstAvailableAppointment}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {doctor?.badges.map((badge, index) => (
          <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            🏷️{badge}
          </span>
        ))}
      </div>
    </div>
  );
};


