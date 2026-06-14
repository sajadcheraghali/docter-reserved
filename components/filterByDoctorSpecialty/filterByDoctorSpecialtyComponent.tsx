
import { specialtiesTree } from "@/source/mock/specialtiesTree"
import FilterContentComponent from "./FilterContent/FilterContentComponent";
import { FilterSpecialtyFunction } from "./filterSpecialtyFunction/filterSpecialtyFunction";
import styles from "./filterByDoctorSpecialtyComponent.module.css"

interface PageProps {
  searchParams?: Promise<{
    specialty?: string;
  }>;
}

export default async function FilterByDoctorSpecialtyComponent1({ 
  searchParams 
}: PageProps) {
  // Await searchParams if it's a Promise (Next.js 15+)
  const params = await searchParams;
  const selectedSpecialty = params?.specialty 
    ? decodeURIComponent(params.specialty) 
    : null;
  
  // Filter doctors on the server
   const filteredDoctors = FilterSpecialtyFunction(selectedSpecialty);

  return (
    // <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          {/* Tree Column */}
          <div className={styles.specialtyBox}>
            <div className={styles.specialtyBox2}>
              <span>👨‍⚕️</span>
              <h3>دسته‌بندی تخصص‌ها</h3>
            </div>
            
            {specialtiesTree.map((node) => (
              <FilterContentComponent
                key={node.id}
                node={node}
              />
            ))}
          </div>
        </div>
      </div>
    // </Suspense>
  );
}