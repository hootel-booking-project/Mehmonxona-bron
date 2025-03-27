# Mehmonxona uchun Xona bron qilish tizimi Backend API

## Loyihaning maqsadi
Foydalanuvchilar mavjud xonalarni qidirishi, band qilishi va buyurtmalarni boshqarishi mumkin. Admin esa xonalarni qo'shishi, o'zgartirishi va o'chirishi mumkin.

## Funksional talablar:

    1. Foydalanuvchilar
        - Foydalanuvchi name, email va parol orqali ro'yxardan o'tishi kerak (Sign up)
        - Foydalanuvchi agar ro'yxatdan o'tgan bo'lsa email va parol orqali tizimga kirishi kerak (Login)
        - Foydalanuvchi o'z profilini yani name, email va parolini yangilay olishi kerak
        - Foydalanuvchilar tizimga kira olgandan so'ng xonalar ro'yxatini ko'ra olishi, xonalarni narxlari yoki bo'shligiga qarab filtr qila olishi kerak (pagination, sort, filter)
        - Foydalanuvchilar xonani band qila olishi kerak bunda xonada turish kunlari oralig'i kiritiladi
        - Foydalanuvchi bron qilgan xonasini bekor qila olishi kerak

    2. Admin
        - Faqat 1 ta admin akkaunti bo'lishi kerak va u o'z email va paroli orqali tizimga kira olishi kerak
        - Admin barcha xonalarni ko'ra olishi, qo'sha olishi,  o'zgartira olishi o'chira olishi kerak

## Nofunksional talablar
    - Tezlik
    - Xavfsizlik
    - Kengaya oladigan

## Database models

    1. Users
        - id
        - name
        - email
        - password
        - role

    2. Room
        - number
        - type
        - price
        - available

    3. Bron
        - userId
        - roomId
        - day in (kirish kuni)
        - day out (chiqish kuni)