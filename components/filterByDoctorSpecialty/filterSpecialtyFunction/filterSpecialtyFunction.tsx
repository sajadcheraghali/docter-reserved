// "use client"
import { specialtiesTree } from "@/source/mock/specialtiesTree"
import { doctors } from "@/source/mock/doctors"
// import { filtered } from "@/app/api/doctors/route";
import { DoctorModel, TreeNodeType } from "@/source/models/doctor.model"
// import { useEffect } from "react";

// let doctors1 = doctors
// useEffect(() => {
//   doctors1 = filtered
// },[filtered])

// Helper function to find all leaf nodes (nodes without children) under a subtree
export const getLeafLabels = (nodes: TreeNodeType[]): string[] => {
  let leaves: string[] = [];
  nodes.forEach((node) => {
    if (!node.children || node.children.length === 0) {
      leaves.push(node.label);
    } else {
      leaves = leaves.concat(getLeafLabels(node.children));
    }
  });
  return leaves;
};

// Helper function to find a node by label
export const findNode = (nodes: TreeNodeType[], target: string): TreeNodeType | null => {
  for (const node of nodes) {
    if (node.label === target) return node;
    if (node.children) {
      const found = findNode(node.children, target);
      if (found) return found;
    }
  }
  return null;
};

// Server-side function to filter doctors based on specialty
 export  const FilterSpecialtyFunction = (selectedSpecialty: string | null ): DoctorModel[] => {
  if (!selectedSpecialty) {
    return [];
  }

  // Find the selected node and get all its leaf labels
  const targetNode = findNode(specialtiesTree, selectedSpecialty);
  const subLeaves = targetNode ? getLeafLabels([targetNode]) : [];
  
  // Filter doctors based on expertise matching leaf labels
  return doctors.filter((doctor) => {
    // Split expertise string by Persian/Arabic commas and trim whitespace
    const doctorExpertise = doctor.expertise.split(/[،,]/).map(e => e.trim());
    
    // Check if any of doctor's expertise matches any leaf label
    return doctorExpertise.some((expertise) => 
      subLeaves.some(leaf => 
        expertise.includes(leaf) || leaf.includes(expertise)
      )
    );
  });
};