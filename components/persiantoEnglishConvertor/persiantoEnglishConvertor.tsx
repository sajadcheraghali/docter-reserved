import { doctors } from "@/source/mock/doctors";

// تابعی برای تبدیل ارقام فارسی به انگلیسی
const persianToEnglishNumbers = (str: string): string => {
  const persianDigits = /[\u06f0-\u06f9]/g;
  const map: { [key: string]: string } = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
  };
  return str.replace(persianDigits, (match) => map[match]);
};

const getNumericDate = (dateStr: string): number => {
  // 1. تبدیل ارقام فارسی به انگلیسی
  const englishDateStr = persianToEnglishNumbers(dateStr);

  // 2. تقسیم و تبدیل به عدد
  const parts = englishDateStr.split('/');

  // بررسی کنید که آیا تقسیم به درستی انجام شده است (3 بخش)
  if (parts.length !== 3) {
    console.error(`Invalid date format: ${dateStr} (processed as ${englishDateStr})`);
    return NaN; // یا یک مقدار پیش‌فرض مناسب برگردانید
  }

  const [year, month, day] = parts.map(Number);

  // 3. بررسی کنید که آیا تبدیل به عدد موفق بوده است
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    console.error(`Failed to convert parts to numbers: ${parts} from ${englishDateStr}`);
    return NaN;
  }

  // 4. ترکیب برای مقایسه
  return year * 10000 + month * 100 + day;
};


// از [...doctors] برای اطمینان از عدم تغییر آرایه اصلی استفاده کنید
export  const sortedDoctorsByDate = [...doctors].sort((a, b) => {
  const numericA = getNumericDate(a.firstAvailableAppointment);
  const numericB = getNumericDate(b.firstAvailableAppointment);

  // مدیریت NaN در صورت بروز خطا
  if (isNaN(numericA) || isNaN(numericB)) {
    console.error("Sorting failed due to NaN values.");
    // می‌توانید اینجا تصمیم بگیرید که چه اتفاقی بیفتد.
    // مثلاً موارد نامعتبر را به انتها بفرستید یا خطا برگردانید.
    // در اینجا، فرض می‌کنیم موارد نامعتبر را به انتها می‌فرستیم.
    if (isNaN(numericA) && isNaN(numericB)) return 0;
    if (isNaN(numericA)) return 1; // a نامعتبر است، آن را بعد از b قرار بده
    if (isNaN(numericB)) return -1; // b نامعتبر است، آن را بعد از a قرار بده
  }

  return numericA - numericB;
});
