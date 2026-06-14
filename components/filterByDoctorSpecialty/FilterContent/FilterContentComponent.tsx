// FilterContent.tsx (Client Component)
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import TreeNode from "@/components/filterByDoctorSpecialty/FilterContent/TreeNode/TreeNode";
import { TreeNodeType } from "@/source/models/doctor.model";
import { useDoctorSpecialtyStore } from "@/zustant/doctorSpecialty/doctorSpecialty";


interface FilterContentProps {
  node: TreeNodeType;
  // selectedSpecialty: string | null;
  // onSelectSpecialty : (lable : string) => void
}

export default function FilterContentComponent({ node  }: FilterContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { selectedSpecialty, setSelectedSpecialty, clearSelectedSpecialty } = useDoctorSpecialtyStore()

  const handleSelect = (label: string) => {
    // ذخیره در Zustand
    setSelectedSpecialty(label);
  };

  // const shareUrl = () => {
  //   navigator.clipboard.writeText(window.location.href);
  //   alert("لینک کپی شد!");
  // };


  return (
    <>
      <TreeNode
        key={node.id}
        node={node}
        selectedLabel={selectedSpecialty}
        onSelect={handleSelect}
        depth={0}
      />
      
    </>
  );
}