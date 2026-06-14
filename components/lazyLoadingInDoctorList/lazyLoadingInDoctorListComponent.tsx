
"use client"
import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DoctorListComponent from "@/components/DoctorList/DoctorListComponent";
import { DoctorModel } from "@/source/models/doctor.model";
import PagginationComponent from "../paggination/pagginationComponent";

interface DoctorListPageProp {
    allDoctorsProp  : DoctorModel[]
    doctorsNumber  : DoctorModel[]
}

export default function LazyLoadingInDoctorListComponent({allDoctorsProp , doctorsNumber} : DoctorListPageProp) {
    const searchParams = useSearchParams();
    const page = searchParams.get("page");
    let pageInURL = Number(page) || 1;
    let doctorInPage = 5;
    
    // محاسبه لیست پزشکان صفحه فعلی
    const currentPageDoctors = useMemo(() => {
        const firstIndex = (pageInURL - 1) * doctorInPage;
        const lastIndex = pageInURL * doctorInPage;
        return allDoctorsProp.slice(firstIndex, lastIndex);
    }, [pageInURL, doctorInPage , allDoctorsProp]);
    
    const [visibleCount, setVisibleCount] = useState(3); // تعداد آیتم‌های نمایش داده شده
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const allPageNumber = Math.ceil(allDoctorsProp.length / doctorInPage);
    
    // آیتم‌های قابل مشاهده بر اساس تعداد
    const visibleProduct = currentPageDoctors.slice(0, visibleCount)
    
    useEffect(() => {
        if (!loadMoreRef.current) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && visibleCount < currentPageDoctors.length) {
                    // بارگذاری 10 آیتم بعدی
                    setVisibleCount(prev => Math.min(prev + 3, currentPageDoctors.length));
                }
            },
            { rootMargin: "1px" } // افزایش margin برای بارگذاری زودتر
        );
        
        observer.observe(loadMoreRef.current);
        
        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [currentPageDoctors.length, visibleCount]);
    
    // بازنشانی visibleCount وقتی صفحه تغییر می‌کند
    useEffect(() => {
        setVisibleCount(3);
    }, [pageInURL]);


    return(
        <div style={{width : "100%"}}>
            <Suspense fallback={<div>loading ...</div>}>
                <DoctorListComponent doctorsProp={visibleProduct} doctorsNumber = {doctorsNumber}/>
            </Suspense>

            
            <div ref={loadMoreRef}>
                {visibleCount < currentPageDoctors.length 
                    ? "load more ..." 
                    : visibleCount === currentPageDoctors.length && currentPageDoctors.length > 0
                        ? "" 
                        : ""}
            </div>

            {/*  when more than one prop pass to component , in really we pass a object , so should put prop in two {{}} one for JSX expression and other for JS object */}
          <PagginationComponent pagginationProp = {{pageInURL , allPageNumber}}/>
        </div>
    )
}