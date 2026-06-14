"use client"
import { ReactElement , useEffect , useState } from "react";
import Image from "next/image";
import doctorimage from "@/public/doctor.png"
import styles from "./DoctorList.module.css"
import OrderByComponent from "../OrderBy/OrderBy.component";
import { sortedDoctorsByDate } from "../persiantoEnglishConvertor/persiantoEnglishConvertor";
import { DoctorModel } from "@/source/models/doctor.model";
import Link from "next/link";

interface DoctorCardProp {
    doctorsProp : DoctorModel[]
    doctorsNumber : DoctorModel[]
}

export default  function DoctorListComponent({doctorsProp , doctorsNumber} : DoctorCardProp) : ReactElement{

    //converse english number to persian and split tree number with ,
    function toPersianNumber(num : number) {
        return new Intl.NumberFormat("fa-IR").format(num).replace(/٬/g, ",");
    }

    //display spicific number of string
    function truncateText(text : string, maxLength : number) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    }

    const [sortBy, setSortBy] = useState("none");
    const [sortedDoctors, setSortedDoctors] = useState(doctorsProp);
    const [loading , setLoading] = useState(true)

  useEffect(() => {
    // کپی از آرایه اصلی برای جلوگیری از تغییر مستقیم آن
    let copied = [...doctorsProp];

    if (sortBy === "rating") {
      copied = copied.sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0));
    } else if (sortBy === "votes") {
      copied = copied.sort((a, b) => (b.totalVotes ?? 0) - (a.totalVotes ?? 0));
    } else if (sortBy === "date") {
      copied = sortedDoctorsByDate;
    }

    setLoading(false)
    setSortedDoctors(copied);
  }, [sortBy, doctorsProp]);

    return(
      <div className={styles.header8}>
            <div className={styles.header10}>
                <div>
                     <OrderByComponent sortBy = {sortBy} setSortBy = {setSortBy}/>
                </div>
                <div> تعداد پزشکان : {doctorsNumber.length}</div>
            </div>
        {loading ? (
            <p>در حال بارگذاری پزشکان...</p>
        ) : (
            sortedDoctors.map((x , index) => (
            <Link href={`${x.id}`} key={x.id || `${index}-${x.name}`}>
                <div className={styles.header7} >
                    <div className={styles.header}>
                        <div className={styles.picture}>
                            <Image src={doctorimage} alt="doctor" className={styles.picturedoctor} fill />
                        </div> 
                        <div className={styles.header2}>
                            <h1>{x.name}</h1>
                            <div><p className={styles.p1}>{x.degree}</p></div>
                            <div>
                                <div className={styles.header3}>
                                    {
                                        x.expertise.split("،").map((x, index) => (
                                    <p className={styles.p2} key={`${index}}`}>{x}</p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={styles.header4}>
                                ⭐
                                {/* <svg style={{color : "yellow"}} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 47.94 47.94"  height="1em"  className="plasmic-default__svg plasmic_all__wY2Hq PlasmicProductCard_svg___4KelP__E0thA" role="img"><path d="M26.285 2.486l5.407 10.956a2.58 2.58 0 001.944 1.412l12.091 1.757c2.118.308 2.963 2.91 1.431 4.403l-8.749 8.528a2.582 2.582 0 00-.742 2.285l2.065 12.042c.362 2.109-1.852 3.717-3.746 2.722l-10.814-5.685a2.585 2.585 0 00-2.403 0l-10.814 5.685c-1.894.996-4.108-.613-3.746-2.722l2.065-12.042a2.582 2.582 0 00-.742-2.285L.783 21.014c-1.532-1.494-.687-4.096 1.431-4.403l12.091-1.757a2.58 2.58 0 001.944-1.412l5.407-10.956c.946-1.919 3.682-1.919 4.629 0z" fill="currentColor"></path></svg> */}
                                <h3>{x.averageRating}</h3>
                                <h3> ( {x.totalVotes} نظر )</h3>
                            </div>   
                        </div>
                    </div>
                    <div>
                        <div className={styles.header9}>
                            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" className="plasmic-default__svg plasmic_all__wY2Hq PlasmicProductCard_svg__uyLb1__CFocz" role="img"><path d="M12 13.43a3.12 3.12 0 100-6.24 3.12 3.12 0 000 6.24z" stroke="currentColor" stroke-width="1.5"></path><path d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 01-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05z" stroke="currentColor" stroke-width="1.5"></path></svg>
                            <p>{truncateText(x.address , 40)}</p>
                        </div>
                        <div className={styles.header9}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="plasmic-default__svg plasmic_all__wY2Hq PlasmicProductCard_svg__oF6__LKpdB w-5 h-5 min-w-[1.25rem]" viewBox="0 0 24 24" height="1em" role="img"><path d="M19.3 7.92v5.15c0 3.08-1.76 4.4-4.4 4.4H6.11c-.45 0-.88-.04-1.28-.13-.25-.04-.49-.11-.71-.19-1.5-.56-2.41-1.86-2.41-4.08V7.92c0-3.08 1.76-4.4 4.4-4.4h8.79c2.24 0 3.85.95 4.28 3.12.07.4.12.81.12 1.28z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22.301 10.92v5.15c0 3.08-1.76 4.4-4.4 4.4h-8.79c-.74 0-1.41-.1-1.99-.32-1.19-.44-2-1.35-2.29-2.81.4.09.83.13 1.28.13h8.79c2.64 0 4.4-1.32 4.4-4.4V7.92c0-.47-.04-.89-.12-1.28 1.9.4 3.12 1.74 3.12 4.28z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.498 13.14a2.64 2.64 0 100-5.28 2.64 2.64 0 000 5.28zM4.78 8.3v4.4m11.442-4.4v4.4" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <p><span style={{fontWeight : 800, color : "black"}}> ویزیت آنلاین : </span>{toPersianNumber(x.visitFee)} تومان </p>
                        </div>
                        <div className={styles.header9}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" className="plasmic-default__svg plasmic_all__wY2Hq PlasmicProductCard_svg___2BpJ__EkaYv" role="img"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0zm9-4a.75.75 0 00-1.5 0v4c0 .25.125.485.334.624l3 2a.75.75 0 10.832-1.248l-2.666-1.777V8z" fill="currentColor"></path></svg>
                            <p><span style={{fontWeight : 800, color : "black"}}>نزدیک ترین زمان رزرو : </span>{x.firstAvailableAppointment}</p>
                        </div>

                    </div>
                    <div>
                        <div className={styles.header5}>
                            {
                                x.badges.map((y, index) => (
                                    <p key={`${index}}`}>🏷️{y}</p>
                                ))

                            }
                        </div>
                    </div>
                    <button className={styles.header6}>
                        online visit
                    </button>
                </div>
            </Link>
       
            ))
        )
        }
      </div>
    )
}

