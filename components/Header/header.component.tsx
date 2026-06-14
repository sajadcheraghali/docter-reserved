"use client";

import { ReactElement } from "react";
import styles from "./header.module.css"
import Link from "next/link";
import { usePathname } from "next/navigation";
import PersianClockComponent from "../PersianClock/PersianClock";

export default function HomeComponent():ReactElement {
    const pathname : string = usePathname();
    return(
        <header className={styles.header}>
            <nav>
                <ul>
                    <li>
                        <Link href={"/"} className={pathname === "/" ? styles.active : ""}>خانه</Link>
                    </li>
                    <li>
                        <Link href={"/DoctorList"} className={pathname === "/DoctorList" ? styles.active : ""}>پزشکان</Link>
                    </li>
                </ul>
            </nav>
            <PersianClockComponent />
            <button className={styles.cta}> ورود | ثبت نام</button>
        </header>
    )
}