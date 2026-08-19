# 🌦️ مزاجي | Mizaji — Weather Shade & Islamic Prayer Times

<div align="center">

![Mizaji Logo](https://img.shields.io/badge/Mizaji-Weather%20%26%20Prayer-orange?style=for-the-badge&logo=sun&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-green?style=for-the-badge&logo=pwa&logoColor=white)

**رفيقك الجوي الساخر ومواقيت الصلاة بتصميم زجاجي فاخر**  
*Your sarcastic weather companion & Islamic prayer hub with an ultra-premium glassmorphism UI.*

[عربي](#-نظرة-عامة-عن-التطبيق) • [English](#-overview) • [الميزات](#-الميزات-الرئيسية-key-features) • [التثبيت](#-التثبيت-والتشغيل-installation--setup) • [هيكلة المشروع](#-هيكلة-المشروع-project-structure)

</div>

---

## 📖 نظرة عامة عن التطبيق

**مزاجي (Mizaji)** هو تطبيق ويب تقدمي (PWA) فائق الجودة يجمع بين توقعات الطقس الدقيقة والذكاء الساخر وخفة الظل (بالدارجة المغربية، العربية الفصحى، والإنجليزية)، بالإضافة إلى مركز متكامل لمواقيت الصلاة واتجاه القبلة، كل ذلك داخل واجهة تفاعلية زجاجية (Glassmorphism) مريحة للعين وتدعم الوضعين المظلم والفاتح.

---

## ✨ الميزات الرئيسية (Key Features)

### 1. 🎭 شخصيات وأمزجة الطقس الساخرة (Sarcastic Weather Personas)
* **هادئ (Calm 🌿):** توقعات جوية لطيفة ونصائح صباحية مريحة.
* **ساخر (Sarcastic 😏):** تعليقات كوميدية طريفة على الأجواء اليومية.
* **شمالي قاصح / قصف (Roast 🔥):** قصف جبهات ناري باللهجة المغربية والعربية، مع واجهة جمرية متوهجة واهتزاز لمسي ومؤثرات صوتية فريدة (Web Audio API) تعمل دون الحاجة للإنترنت!
* **زر "بدّل القصف" (Shuffle Roast 🎲):** لتغيير الردود الساخرة لنفس حالة الطقس ديناميكياً.

### 2. 📋 مولد وناسخ أعذار الغياب الذكي (Excuse Generator)
* توليد أعذار غياب ذكية وطريفة تناسب حالة الطقس الحالية للعمل أو الدراسة مع زر نسخ مباشر إلى الحافظة وإشعار احتفالي.

### 3. 🕌 مواقيت الصلاة والقبلة (Islamic Prayer Hub)
* **عرض دقيق للصلوات الست:** (الفجر، الشروق، الظهر، العصر، المغرب، العشاء).
* **بطاقة الصلاة القادمة والعداد التنازلي الحي:** مع شريط تقدم ومعالجة تلقائية للانتقال لصلاة فجر الغد بعد العشاء.
* **التاريخ الهجري:** متزامن بلغات التطبيق الثلاث.
* **بوصلة القبلة الذكية (Qibla Compass):** حساب زاوية اتجاه القبلة الدقيقة نحو الكعبة المشرفة بناءً على إحداثيات موقعك.

### 4. 🔍 البحث الفوري عن المدن وتحديد الموقع (Instant City Search & GPS)
* بحث لحظي مع إكمال تلقائي (Autocomplete) عبر Open-Meteo Geocoding API.
* قائمة مدن مغربية وعالمية شهيرة جاهزة (تطوان، طنجة، كازا، الرباط، مراكش، فاس، أكادير، الرياض، القاهرة، دبي، باريس، لندن، إلخ).
* دعم كامل لتحديد الموقع عبر الـ GPS والتسمية العكسية الدقيقة للمدينة (Reverse Geocoding).

### 5. 📊 تحليلات الطقس المفصلة وتوقعات 7 أيام (Detailed Weather & Timeline)
* **توقعات الـ 24 ساعة:** شريط تمرير أفقي سلس يتوجه تلقائياً (Auto-scroll) للساعة الحالية مع مؤشر لاحتمالية الأمطار.
* **توقعات 7 أيام تفاعلية:** النقر على أي يوم يحدث الساعات والتفاصيل بنافذة العرض الرئيسية مباشرة.
* **شبكة المقاييس الستة:** الإحساس الفعلي، الرطوبة، سرعة واتجاه الرياح، مؤشر الأشعة فوق البنفسجية (UV Index) مع مستويات الخطورة، الضغط الجوي، ونسبة الأمطار، وساعات شروق وغروب الشمس.

### 6. 🎨 تصميم زجاجي وتأثيرات حركية فاخرة (Ultra-Premium Aesthetics)
* **خلفيات حركية تتفاعل مع الجو:** شمس ناعمة، غيوم متحركة، قطرات مطر، وميض البرق، ثلوج، وجمرات نارية.
* **أفضل خطوط الطباعة:** خطوط Google الرسمية (`Cairo` و `Tajawal` للعربية والدارجة، و `Plus Jakarta Sans` للإنجليزية).
* **دعم اللغات الثلاث:** التبديل الفوري بين الدارجة المغربية (MA)، العربية (AR)، والإنجليزية (EN) مع اتجاهات (RTL / LTR) مثالية.

### 7. 📸 بطاقة المشاركة التفاعلية (Share Card Generator)
* تصدير بطاقة بتصميم ستوري إنستغرام وواتساب بدقة عالية (2.5x) تدعم التنزيل كصورة PNG، والمشاركة المباشرة عبر المتصفح (`navigator.share`)، والنسخ الفوري.

### 8. 📱 تطبيق ويب تقدمي (PWA & Offline Ready)
* قابل للتثبيت على جميع الهواتف والأجهزة الذكية.
* Service Worker مخصص للتخزين المؤقت والعمل دون اتصال بالإنترنت.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

| التقنية | الاستخدام |
| :--- | :--- |
| **React 18** | بناء واجهات المستخدم وإدارة الحالة |
| **Vite 5** | بيئة التطوير وحزم الملفات السريع |
| **TailwindCSS 3** | نظام التصميم الزجاجي والمؤثرات البصرية |
| **Lucide React** | حزمة الأيقونات العصرية والمتناسقة |
| **Open-Meteo API** | جلب بيانات الطقس والتوقعات والبحث عن المدن |
| **Aladhan API** | جلب مواقيت الصلاة والتقويم الهجري |
| **Web Audio API** | توليد المؤثرات الصوتية والاهتزازات محلياً بدون إنترنت |
| **HTML2Canvas** | توليد بطاقات المشاركة بجودة عالية |

---

## 📁 هيكلة المشروع (Project Structure)

```
Mizaji-qpp/
├── public/
│   ├── manifest.json          # إعدادات تطبيق الـ PWA
│   ├── sw.js                  # Service Worker للتخزين المؤقت
│   ├── icon-192.png           # أيقونة التطبيق 192px
│   └── icon-512.png           # أيقونة التطبيق 512px
├── src/
│   ├── hooks/                 # الخطافات المخصصة (Custom Hooks)
│   │   ├── useWeather.js      # جلب وإدارة بيانات الطقس والتوقعات
│   │   ├── useLocation.js     # إدارة الـ GPS والبحث عن المدن
│   │   ├── usePrayerTimes.js  # مواقيت الصلاة وحساب القبلة
│   │   └── useSoundEffects.js # محرك الأصوات التفاعلي والاهتزاز
│   ├── components/            # المكونات المعيارية المنظمة
│   │   ├── common/            # الشريط العلوي والسفلي (Header, BottomNav)
│   │   ├── weather/           # مكونات الطقس (Hero, Metrics, Hourly, Daily, Atmosphere)
│   │   ├── prayer/            # أوقات الصلاة وبوصلة القبلة (PrayerTimesView, QiblaCompass)
│   │   ├── location/          # نافذة البحث عن المدن (LocationSearchModal)
│   │   ├── share/             # بطاقة المشاركة (ShareCardModal)
│   │   └── map/               # خريطة الرادار التفاعلية (WeatherMapModal)
│   ├── constants/             # القواميس والنصوص والترجمات
│   │   └── translations.js    # الترجمات بالدارجة والعربية والإنجليزية
│   ├── utils/                 # الدوال المساعدة والرياضية
│   │   ├── weatherHelpers.js  # دوال ترميز الطقس والألوان والتواريخ
│   │   └── prayerHelpers.js   # دوال حساب الوقت والقبلة والتنازلي
│   ├── App.jsx                # المنسق الرئيسي للتطبيق
│   ├── index.css              # المتغيرات والأنماط الزجاجية والخطوط
│   └── main.jsx               # نقطة انطلاق تطبيق React
├── index.html                 # الصفحة الرئيسية وتحميل الخطوط
├── tailwind.config.js         # إعدادات TailwindCSS
└── package.json
```

---

## 🚀 التثبيت والتشغيل (Installation & Setup)

### 1. استنساخ المستودع (Clone Repository)
```bash
git clone https://github.com/evile92/Mizaji-qpp.git
cd Mizaji-qpp
```

### 2. تثبيت الحزم (Install Dependencies)
```bash
npm install
```

### 3. تشغيل الخادم المحلي للتطوير (Run Dev Server)
```bash
npm run dev
```
افتح المتصفح على الرابط: `http://localhost:5173/`

### 4. بناء نسخة الإنتاج (Production Build)
```bash
npm run build
```

---

## 🌐 نشر التطبيق (Deployment)

التطبيق جاهز للنشر الفوري بنقرة واحدة على منصات مثل:
* **Vercel**
* **Netlify** (ملف `netlify.toml` متضمن)
* **GitHub Pages**
* **Cloudflare Pages**

---

## 📄 الترخيص (License)

هذا المشروع مرخص تحت رخصة **MIT License** — يمكنك استخدامه وتطويره بحرية.

---

<div align="center">
صُنِع بكل ❤️ وإتقان لتقديم أفضل تجربة طقس ومواقيت صلاة
</div>
