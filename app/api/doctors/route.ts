// // export const dynamic = "force-dynamic";
// // export const revalidate = 0;

// import { NextResponse } from "next/server";
// import { doctors } from "@/source/mock/doctors";
// import { getLeafLabels } from "@/components/filterByDoctorSpecialty/filterSpecialtyFunction/filterSpecialtyFunction";
// import { findNode } from "@/components/filterByDoctorSpecialty/filterSpecialtyFunction/filterSpecialtyFunction";
// import { specialtiesTree } from "@/source/mock/specialtiesTree"

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);

//   const gender = searchParams.get("gender");
//   const degree = searchParams.get("degree")?.split(",") || [];
//   const city  = searchParams.get("city")?.split(",") ;
//   const specialty = searchParams.get("specialty");
//   const doctorSpecialty = specialty ?  decodeURIComponent(specialty) : null

//   let filtered = doctors;


//   if (gender ) filtered = filtered.filter(d => d.gender === gender); 

//   // if condition in some is true => condition in filter is true => the city that is in filtered dont remove
//   if (city) {
//     filtered = filtered.filter(d => {
//     return city.some(selectedCity => d.address.includes(selectedCity));
//   });
//   }

//   if (degree.length > 0) {
//     filtered = filtered.filter(d =>
//       degree.includes(d.educationalLevel)
//     );
//   }

//   if (doctorSpecialty) {
//     if(doctorSpecialty == "") {
      
//     }

//       // Find the selected node and get all its leaf labels
//       const targetNode = findNode(specialtiesTree, doctorSpecialty);
//       const subLeaves = targetNode ? getLeafLabels([targetNode]) : [];
      
//       // Filter doctors based on expertise matching leaf labels
//       filtered = filtered.filter((doctor) => {
//           // Split expertise string by Persian/Arabic commas and trim whitespace
//           const doctorExpertise = doctor.expertise.split(/[،,]/).map(e => e.trim());
          
//           // Check if any of doctor's expertise matches any leaf label
//             return doctorExpertise.some((expertise) => 
//             subLeaves.some(leaf => 
//               expertise.includes(leaf) || leaf.includes(expertise)
//             )
//           );
//       });


//             // filtered = FilterSpecialtyFunction( doctorSpecialty)
//       // console.log("f",filtered)
//     // filtered = filtered.filter(() => {
//     //   FilterSpecialtyFunction(doctorSpecialty)
//     //   return true
//     // })
//     // filtered = FilterSpecialtyFunction(doctorSpecialty , )
//   //   filtered = filtered.filter((doctor) => {
//   //   // Split expertise string by Persian/Arabic commas and trim whitespace
//   //   const doctorExpertise = doctor.expertise.split(/[،,]/).map(e => e.trim());
    
//   //   // Check if any of doctor's expertise matches any leaf label
//   //   return doctorExpertise.some((expertise) => 
//   //     subLeaves.some(leaf => 
//   //       expertise.includes(leaf) || leaf.includes(expertise)
//   //     )
//   //   );
//   // });
//   }
//   return NextResponse.json(filtered , {
//     headers: { "Cache-Control": "no-store" },
//   });
// }





