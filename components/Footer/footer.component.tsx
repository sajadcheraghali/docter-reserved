import { ReactElement } from "react";
import styles from "./footer.module.css"
import Link from "next/link";
import Image from "next/image";
import  Certificatelogo  from "@/public/hospitel.jpg";
import  Certificatelogo2  from "@/public/kish.jpg";
import  Certificatelogo3  from "@/public/melat.jpg";
import telegram from "@/public/telegram.jpg"
import instagram from "@/public/instagram.jpg"
import linkedin from "@/public/linkedin.jpg"
import aparat from "@/public/aparat.jpg"

export default function FooterComponent() :ReactElement {
    return(
        <footer className={styles.footer}>
            <div className={styles.writings}>
                <div className={styles.logo}>پزشک من 
                    {/* logo */}
                    </div>
                <p className={styles.description}>
                    تجربه مشاوره آنلاین و دریافت نوبت از بهترین پزشکان و بیمارستان های ایران
                </p>
            </div>
            <div className={styles.visuals}>
                {/* <ul className={styles.certificates}>
                    <li>
                        <Link href={"#"}>
                            <Image src={Certificatelogo} alt="logo" className={styles.iconephoto}/>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"}>
                            <Image src={Certificatelogo2} alt="logo" className={styles.iconephoto}/>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"}>
                            <Image src={Certificatelogo3} alt="logo" className={styles.iconephoto}/>
                        </Link>
                    </li>
                </ul> */}
                <ul className={styles.socials}>
                    <li>
                        <Link href={"#"} target="_blank">
                            <Image src={telegram} alt="logo" className={styles.iconephoto}/>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"} target="_blank">
                            <Image src={instagram} alt="logo" className={styles.iconephoto}/>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"} target="_blank">
                            <Image src={linkedin} alt="logo" className={styles.iconephoto}/>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"} target="_blank">
                            <Image src={aparat} alt="logo" className={styles.iconephoto}/>
                        </Link>
                    </li>
                </ul>
            </div>
            <p className={styles.copy}>
                تمامی حقوق مادی و معنوی این وبسایت متعلق به من می باشد
            </p>
        </footer>
    )
}