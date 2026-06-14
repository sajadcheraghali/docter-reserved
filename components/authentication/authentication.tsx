'use client';
import { useState } from 'react';

export default function AuthPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: ورود شماره، 2: وارد کردن کد
  const [loading, setLoading] = useState(false);

  // ارسال شماره تلفن
  const handleSendOtp = async () => {
    setLoading(true);
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
    if (res.ok) setStep(2);
    else alert('خطا در ارسال کد');
    setLoading(false);
  };

  // تایید کد
  const handleVerifyOtp = async () => {
    setLoading(true);
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, code: otp }),
    });
    const data = await res.json();
    if (data.success) alert('با موفقیت وارد شدید!');
    else alert('کد اشتباه است');
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="mb-6 text-xl font-bold text-center">ورود به پنل</h1>
        
        {step === 1 ? (
          <>
            <input 
              type="text" placeholder="شماره موبایل (مثال: 0912...)"
              className="w-full p-2 mb-4 border rounded"
              onChange={(e) => setPhone(e.target.value)}
            />
            <button 
              onClick={handleSendOtp} disabled={loading}
              className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {loading ? 'در حال ارسال...' : 'ارسال کد تایید'}
            </button>
          </>
        ) : (
          <>
            <input 
              type="text" placeholder="کد ۶ رقمی"
              className="w-full p-2 mb-4 border rounded"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button 
              onClick={handleVerifyOtp} disabled={loading}
              className="w-full p-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              {loading ? 'در حال بررسی...' : 'تایید و ورود'}
            </button>
            <button 
              onClick={() => setStep(1)}
              className="w-full mt-2 text-sm text-gray-500 underline"
            >
              ویرایش شماره
            </button>
          </>
        )}
      </div>
    </div>
  );
}
