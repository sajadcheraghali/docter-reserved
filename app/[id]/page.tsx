
import DoctorProfileCard from "@/components/DoctorProfileCard/DoctorProfileCardComponent";
import { doctors } from "@/source/mock/doctors"
import { ReactElement } from 'react';

export default async function DoctorPage({params} : { params:  { id :number }} )  {
    let {id} =await params

    console.log("param",id)
    console.log("param",params)


  return (
    <>
      <main className="container mx-auto p-4 bg-blue">
        <h1 className="text-4xl font-bold text-center my-8 text-gray-800">
          پزشکان ما
        </h1>
        <div className="flex flex-wrap justify-center gap-4 bg-danger">

            <DoctorProfileCard params = {params}/>

        </div>
      </main>
    </>
  );
};

