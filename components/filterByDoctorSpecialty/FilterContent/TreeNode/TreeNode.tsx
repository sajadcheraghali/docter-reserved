// TreeNode.tsx
"use client";
import { useState } from "react";
import { TreeNodeType } from "@/source/models/doctor.model";
import styles from "./TreeNode.module.css"


type Props = {
  node: TreeNodeType;
  selectedLabel: string | null;
  onSelect: (label: string) => void;
  depth : number
};

export default function TreeNode({ node, selectedLabel, onSelect , depth}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedLabel === node.label;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.label);
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };


  return (
    <div>
      <div onClick={handleClick} style={{paddingRight: `${depth * 20}px`}}>
        <span>{hasChildren ? (isOpen ? "📂" : "📁") : "📄"}</span>
        <span  className={`${styles.indentStyle} ${isSelected ? styles.selected : ''}`}>{node.label}</span>
        {isSelected && <span></span>}
      </div>
      
      {isOpen && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedLabel={selectedLabel}
              onSelect={onSelect}
              depth= {depth+1}
            />
          ))}
        </div>
      )}
    </div>
  );
}