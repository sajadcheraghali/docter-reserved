import styles from "./OrderBy.module.css"
import { ReactElement } from "react";

interface OrderByComponentProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function OrderByComponent({sortBy , setSortBy} : OrderByComponentProps) : ReactElement {

    return (
        <div className={styles.order}>
            <h1>مرتب‌سازی بر اساس : </h1>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              
            >
              <option value="date">زمان حضور</option>
              <option value="rating">امتیاز </option>
              <option value="votes">تعداد نظرات </option>
            </select>
        </div>
    )
}