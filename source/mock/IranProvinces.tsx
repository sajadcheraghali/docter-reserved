export  const IranProvinces : IranProvincesType = {
            "استان‌های ایران": [
                { "name": "آذربایجان شرقی", "capital": "تبریز", "id": 1 },
                { "name": "آذربایجان غربی", "capital": "ارومیه", "id": 2 },
                { "name": "اردبیل", "capital": "اردبیل", "id": 3 },
                { "name": "اصفهان", "capital": "اصفهان", "id": 4 },
                { "name": "البرز", "capital": "کرج", "id": 5 },
                { "name": "ایلام", "capital": "ایلام", "id": 6 },
                { "name": "بوشهر", "capital": "بوشهر", "id": 7 },
                { "name": "تهران", "capital": "تهران", "id": 8 },
                { "name": "چهارمحال و بختیاری", "capital": "شهرکرد", "id": 9 },
                { "name": "خراسان جنوبی", "capital": "بیرجند", "id": 10 },
                { "name": "خراسان رضوی", "capital": "مشهد", "id": 11 },
                { "name": "خراسان شمالی", "capital": "بجنورد", "id": 12 },
                { "name": "خوزستان", "capital": "اهواز", "id": 13 },
                { "name": "زنجان", "capital": "زنجان", "id": 14 },
                { "name": "سمنان", "capital": "سمنان", "id": 15 },
                { "name": "سیستان و بلوچستان", "capital": "زاهدان", "id": 16 },
                { "name": "فارس", "capital": "شیراز", "id": 17 },
                { "name": "قزوین", "capital": "قزوین", "id": 18 },
                { "name": "قم", "capital": "قم", "id": 19 },
                { "name": "کردستان", "capital": "سنندج", "id": 20 },
                { "name": "کرمان", "capital": "کرمان", "id": 21 },
                { "name": "کرمانشاه", "capital": "کرمانشاه", "id": 22 },
                { "name": "کهگیلویه و بویراحمد", "capital": "یاسوج", "id": 23 },
                { "name": "گلستان", "capital": "گرگان", "id": 24 },
                { "name": "گیلان", "capital": "رشت", "id": 25 },
                { "name": "لرستان", "capital": "خرم‌آباد", "id": 26 },
                { "name": "مازندران", "capital": "ساری", "id": 27 },
                { "name": "مرکزی", "capital": "اراک", "id": 28 },
                { "name": "هرمزگان", "capital": "بندرعباس", "id": 29 },
                { "name": "همدان", "capital": "همدان", "id": 30 },
                { "name": "یزد", "capital": "یزد", "id": 31 }
            ]
        };


interface IranProvincesType {
    "استان‌های ایران": ProvinceType[];
}

interface ProvinceType {
    name : string
    capital : string
    id : number
}