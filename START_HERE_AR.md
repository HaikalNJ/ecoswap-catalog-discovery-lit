# ابدأ من هنا

هذه نسخة كاملة من مشروع **EcoSwap Catalog & Discovery**.

## التشغيل

1. فك ضغط ملف المشروع.
2. افتح مجلد `ecoswap-catalog-complete` في VS Code.
3. من VS Code اختر **Terminal > New Terminal**.
4. إذا ظهر PowerShell، اضغط السهم بجانب علامة `+` واختر **Command Prompt**.
5. اكتب:

```bash
npm install
```

6. بعد انتهاء التثبيت اكتب:

```bash
npm run dev
```

7. افتح الرابط الذي يظهر، وغالبًا يكون:

```text
http://localhost:5173/
```

لا تغلق Terminal أثناء تشغيل الموقع.

## إذا ظهر خطأ package.json

هذا يعني أنك فتحت Terminal في مجلد غير صحيح. نفذ:

```bash
dir
```

يجب أن ترى `package.json` في القائمة قبل تشغيل `npm run dev`.

## التجربة

- اضغط **View all** لفتح قائمة المنتجات.
- استخدم البحث أعلى الصفحة.
- جرّب الفئة والحالة والترتيب.
- اضغط بطاقة منتج لفتح التفاصيل.
- اضغط **Add** لمشاهدة عداد السلة.
- اضغط القلب لإضافة المنتج إلى المفضلة.

## الملفات التي تحتاجها للمناقشة

- `README.md`: شرح التشغيل والمسارات والأحداث.
- `docs/PROJECT_EXPLANATION_AR.md`: شرح عربي وأسئلة المناقشة.
- `docs/EcoSwap_Architecture_Diagram.pdf`: مخطط المعمارية.
- `docs/integration-notes.md`: طريقة الدمج ولماذا اخترناها.

## قبل التسليم

أضف رابط GitHub ورابط النشر الخاص بك في `README.md`. الروابط الخاصة بمشروعي
Cart وAccount والـShell يجب أخذها من بقية أعضاء المجموعة.
