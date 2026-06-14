import { ReactElement } from "react";
import Link from "next/link";
import styles from "@/components/paggination/paggination.module.css"

interface pagginationPropType {
    pagginationProp : {
        pageInURL : number
        allPageNumber : number
    }
}

export default function PagginationComponent({pagginationProp} : pagginationPropType) : ReactElement {

     let {pageInURL , allPageNumber } = pagginationProp
    
    return(
          <div className={styles.pagginationBox}>
                {pageInURL < allPageNumber && (
                    <Link href={`?page=${pageInURL + 1}`} className={styles.pagginationHover}>صفحه بعد</Link>
                )}
                <br />
                <p>صفحه {pageInURL} از {Math.ceil(allPageNumber)}</p>
                <br />
                {pageInURL > 1 && (
                    <Link href={`?page=${pageInURL - 1}`} className={styles.pagginationHover}>صفحه قبل </Link>
                )}
            </div>
    )
}