import GlobalSearchBoxComponent from "@/components/global-search-box/global-search-box-component"
import styles from "./not-found.module.css"
import { ReactElement } from "react"

export default function NotFound() : ReactElement {
    return (
        <div className={styles["not-found"]}>
            <div className={styles.writings}>
                <div className={styles["status-code"]}>404</div>
                <h1>صفحه مورد نظر پیدا نشد</h1>
                <p>
                    با عرض پوزش ، لطفا از طریق کادر جستجو ، پزشک با مرکز درمانی مورد نظر خود را جستجو کنید.
                </p>
            </div>
            <div className={styles.visuals}>
                {/* picture */}
            </div>
            <div className={styles.search}>
                <GlobalSearchBoxComponent /> 
            </div>
        </div>
    )
}