'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns-jalali';

export default function PersianClockComponent() {
  const [time, setTime] = useState<Date | null>(null);

    // این تابع اعداد انگلیسی را به فارسی تبدیل می‌کند
    const toPersianDigits = (str: string) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
    };

  useEffect(() => {
    // مقداردهی اولیه برای جلوگیری از خطای Hydration (Mismatch بین سرور و کلاینت)
    //in first time that user enter the site , one secound last that setInterval function run so in first secound time state assign
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) return null; // یا یک اسکلتون (Loading) قرار دهید

  return (
    <div className="font-sans text-x font-bol">
      <span>{toPersianDigits(format(time, 'EEEE yyyy/MM/dd'))}</span>
      <span className="mx-2 " style={{paddingLeft : "20px"}}></span>
      <span>{toPersianDigits(format(time, 'HH:mm:ss'))}</span>
    </div>
  );
}
