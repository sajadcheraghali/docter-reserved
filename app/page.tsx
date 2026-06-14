import GlobalSearchBoxComponent from "@/components/global-search-box/global-search-box-component";
import styles from "./page.module.css"
import { ReactElement } from "react";

export default function Home() : ReactElement {
  return (
   <div className={styles.home}>
      <h1>
        {/* logo */}
        پزشک من
      </h1>
      <GlobalSearchBoxComponent />
      <div className={styles.history}>
        <div className={styles.title}>آخرین جستجو های شما</div>
        <ul>
          <li>ارتوپد</li>
          <li>قلب و عروق</li>
        </ul>
      </div>
   </div>
  );
}

