import { Sun, Cloud, CloudFog, CloudRain, Snowflake, CloudLightning } from 'lucide-react';

export const TRANSLATIONS = {
  en: {
    detecting: 'Detecting...',
    yourLocation: 'Your Location',
    nearby: 'Nearby Location',
    retry: 'Retry',
    oops: 'Oops.',
    timeline: 'TIMELINE',
    hourly: 'HOURLY',
    feelsLike: 'Feels Like',
    wind: 'Wind',
    humidity: 'Humidity',
    direction: 'Direction',
    mapTitle: 'Weather Map',
    close: 'Close',
    today: 'Today',
    tomorrow: 'Tomorrow',
    yesterday: 'Yesterday',
    daysAgo: '2 Days Ago',
    loading: 'Loading Weather...',
    fetchError: 'Failed to fetch weather data.',
    excuseBtn: 'Copy Excuse 📋',
    excuseCopied: 'Copied!',
    shareBtn: 'Share Card',
    memory: {
      warmer: "Warmer than yesterday.",
      colder: "Colder than yesterday.",
      same: "Same old, same old.",
      roast_warmer: "At least it's not the ice age like yesterday.",
      roast_colder: "Yesterday was hot, today is a fridge. Make up your mind, nature.",
      roast_same: "Copy-paste weather. How original."
    },
    personalities: {
      calm: "Calm",
      sarcastic: "Sarcastic",
      roast: "Roast"
    },
    moods: {
      sunny: {
        label: 'Clear Sky',
        calm: { quote: "A bright and sunny day outside.", advice: "Great day for a walk.", excuse: "Solar glare prevents me from seeing my laptop screen." },
        sarcastic: { quote: "It's disgusting how cheerful it is outside. Go touch grass.", advice: "Wear sunglasses. Glare is real.", excuse: "I'm allergic to excessive happiness." },
        roast: { quote: "The sun is actively trying to cook you alive.", advice: "Stay inside or become bacon.", excuse: "Risk of spontaneous combustion." }
      },
      cloudy: {
        label: 'Cloudy',
        calm: { quote: "A bit cloudy, but pleasant.", advice: "Good weather for reading.", excuse: "The gloom is affecting my productivity." },
        sarcastic: { quote: "Mediocre weather for a mediocre day.", advice: "Perfect lighting for sad selfies.", excuse: "It's too gray to function." },
        roast: { quote: "The sky is gray, just like your future.", advice: "Don't bother looking up.", excuse: "My future is as cloudy as the sky." }
      },
      foggy: {
        label: 'Foggy',
        calm: { quote: "Visibility is low due to fog.", advice: "Drive carefully.", excuse: "I can't find my way out of the house." },
        sarcastic: { quote: "I can't see anything. Maybe that's for the best.", advice: "The world is buffering.", excuse: "Google Maps stopped working." },
        roast: { quote: "You finally have an excuse for being lost in life.", advice: "Watch your step, genius.", excuse: "I'm lost in the fog of life." }
      },
      rainy: {
        label: 'Rain',
        calm: { quote: "It's raining. Nature is watering the plants.", advice: "Don't forget your umbrella.", excuse: "Heavy rain, internet might be unstable." },
        sarcastic: { quote: "The sky is crying. Great excuse to rot in bed.", advice: "Umbrella required. Obviously.", excuse: "I might dissolve in water." },
        roast: { quote: "Even the sky is sad to see you today.", advice: "You'll melt if you go out.", excuse: "My boat has a puncture." }
      },
      snowy: {
        label: 'Snow',
        calm: { quote: "Snow is falling. Very picturesque.", advice: "Stay warm and cozy.", excuse: "Snowed in. Send hot chocolate." },
        sarcastic: { quote: "Everything is frozen. Including my will to live.", advice: "Layers. Like an onion.", excuse: "My door is frozen shut." },
        roast: { quote: "Elsa is having a mental breakdown again.", advice: "Don't eat yellow snow.", excuse: "Hibernation mode activated." }
      },
      stormy: {
        label: 'Storm',
        calm: { quote: "Stormy conditions reported.", advice: "Safety first, stay indoors.", excuse: "Power outage risk is high." },
        sarcastic: { quote: "The world is ending. Finally, some excitement.", advice: "Zeus is throwing a tantrum.", excuse: "Fighting Zeus right now." },
        roast: { quote: "Nature is screaming at you.", advice: "Hide. Just hide.", excuse: "Currently building an ark." }
      },
      unknown: {
        label: 'Unknown',
        calm: { quote: "Weather status unknown.", advice: "Check back later.", excuse: "Technical difficulties." },
        sarcastic: { quote: "I have no idea what's happening.", advice: "Good luck.", excuse: "The weatherman quit." },
        roast: { quote: "I gave up trying to guess.", advice: "You figure it out.", excuse: "Even the app doesn't know." }
      }
    }
  },
  ar: {
    detecting: 'جاري الكشف...',
    yourLocation: 'موقعك الحالي',
    nearby: 'منطقة قريبة',
    retry: 'أعد المحاولة',
    oops: 'عفواً',
    timeline: 'الجدول الزمني',
    hourly: 'بالساعة',
    feelsLike: 'الإحساس الفعلي',
    wind: 'الرياح',
    humidity: 'الرطوبة',
    direction: 'الاتجاه',
    mapTitle: 'خريطة الطقس',
    close: 'إغلاق',
    today: 'اليوم',
    tomorrow: 'غداً',
    yesterday: 'أمس',
    daysAgo: 'قبل يومين',
    loading: 'جاري تحميل الطقس...',
    fetchError: 'فشل جلب بيانات الطقس.',
    excuseBtn: 'نسخ عذر للغياب 📋',
    excuseCopied: 'تم النسخ!',
    shareBtn: 'مشاركة البطاقة',
    memory: {
      warmer: "أدفأ من طقس الأمس.",
      colder: "أبرد من طقس الأمس.",
      same: "نفس الطقس المعتاد.",
      roast_warmer: "على الأقل ليس عصراً جليدياً مثل الأمس.",
      roast_colder: "أمس كان حراً واليوم ثلاجة. الطبيعة تعاني من تقلب مزاجي.",
      roast_same: "طقس بنسخ ولصق. يا له من إبداع."
    },
    personalities: {
      calm: "هادئ",
      sarcastic: "ساخر",
      roast: "لاذع"
    },
    moods: {
      sunny: {
        label: 'سماء صافية',
        calm: { quote: "يوم مشمس وجميل في الخارج.", advice: "يوم رائع للمشي.", excuse: "الشمس قوية جداً على شاشة الحاسوب." },
        sarcastic: { quote: "الجو مبهج لدرجة تثير الاشمئزاز. اخرج وتنفس قليلاً.", advice: "ارتدِ نظارة شمسية. السطوع حقيقي.", excuse: "أعاني من حساسية ضد السعادة المفرطة." },
        roast: { quote: "الشمس تحاول شواءك حياً اليوم.", advice: "ابق بالداخل وإلا ستصبح لحماً مقدداً.", excuse: "خطر الاحتراق الذاتي." }
      },
      cloudy: {
        label: 'غائم',
        calm: { quote: "الجو غائم قليلاً، لكنه لطيف.", advice: "طقس جيد للقراءة.", excuse: "الجو الكئيب يؤثر على إنتاجيتي." },
        sarcastic: { quote: "طقس متوسط ليوم متوسط.", advice: "إضاءة مثالية لصور السيلفي الكئيبة.", excuse: "الجو رمادي جداً لأعمل." },
        roast: { quote: "السماء رمادية، تماماً مثل مستقبلك.", advice: "لا تكلف نفسك عناء النظر للأعلى.", excuse: "مستقبلي غائم مثل السماء." }
      },
      foggy: {
        label: 'ضبابي',
        calm: { quote: "الرؤية منخفضة بسبب الضباب.", advice: "قد بحذر.", excuse: "لا أستطيع إيجاد باب المنزل." },
        sarcastic: { quote: "لا أستطيع رؤية شيء. ربما هذا للأفضل.", advice: "العالم قيد التحميل.", excuse: "خرائط جوجل توقفت عن العمل." },
        roast: { quote: "وأخيراً لديك عذر لكونك ضائعاً في الحياة.", advice: "انتبه لخطواتك يا عبقري.", excuse: "أنا ضائع في ضباب الحياة." }
      },
      rainy: {
        label: 'ماطر',
        calm: { quote: "إنها تمطر. الطبيعة تسقي النباتات.", advice: "لا تنس مظلتك.", excuse: "مطر غزير، الإنترنت قد ينقطع." },
        sarcastic: { quote: "السماء تبكي. عذر ممتاز للبقاء في السرير.", advice: "المظلة ضرورية. بديهياً.", excuse: "أخشى أن أذوب في الماء." },
        roast: { quote: "حتى السماء حزينة لرؤيتك اليوم.", advice: "ستذوب إذا خرجت... أوه انتظر، أنت لست قطعة سكر.", excuse: "قواربي بها ثقب." }
      },
      snowy: {
        label: 'مثلج',
        calm: { quote: "الثلوج تتساقط. منظر خلاب.", advice: "ابق دافئاً ومستريحاً.", excuse: "محاصر بالثلج. أرسلوا الشوكولاتة الساخنة." },
        sarcastic: { quote: "كل شيء متجمد. بما في ذلك رغبتي في العمل.", advice: "ارتدِ طبقات. مثل البصلة.", excuse: "بابي متجمد بالكامل." },
        roast: { quote: "يبدو أن (إلسا) تعاني من انهيار عصبي مجدداً.", advice: "لا تأكل الثلج الأصفر.", excuse: "تم تفعيل وضع السبات الشتوي." }
      },
      stormy: {
        label: 'عاصف',
        calm: { quote: "حالة عاصفة. ابق آمناً.", advice: "السلامة أولاً، ابق بالداخل.", excuse: "خطر انقطاع الكهرباء مرتفع." },
        sarcastic: { quote: "العالم ينتهي. أخيراً، بعض الإثارة.", advice: "الطبيعة غاضبة جداً اليوم.", excuse: "أنا أحارب زيوس حالياً." },
        roast: { quote: "الطبيعة تصرخ في وجهك.", advice: "اختبئ. فقط اختبئ.", excuse: "أقوم ببناء سفينة نوح الآن." }
      },
      unknown: {
        label: 'غير معروف',
        calm: { quote: "حالة الطقس غير معروفة.", advice: "تحقق لاحقاً.", excuse: "مشاكل تقنية." },
        sarcastic: { quote: "ليس لدي أي فكرة عما يحدث.", advice: "حظاً موفقاً.", excuse: "خبير الأرصاد استقال." },
        roast: { quote: "لقد استسلمت عن المحاولة.", advice: "دبر نفسك.", excuse: "حتى التطبيق لا يعلم." }
      }
    }
  },
  ma: {
    detecting: 'كانقلب عليك...',
    yourLocation: 'فين نتا',
    nearby: 'الحومة اللي حداك',
    retry: 'عاود جرب',
    oops: 'ويلي!',
    timeline: 'الوقت',
    hourly: 'بالساعة',
    feelsLike: 'الحرارة ديال بصح',
    wind: 'الشرقي / الريح',
    humidity: 'الرطوبة',
    direction: 'الاتجاه',
    mapTitle: 'الخريطة',
    close: 'شد',
    today: 'اليوم',
    tomorrow: 'غدا',
    yesterday: 'البارح',
    daysAgo: 'يومين دازت',
    loading: 'كانشوفو الجو...',
    fetchError: 'الكونيكسيون ميتة ولا السيرفر طاح.',
    excuseBtn: 'عطيني شي سبة 📋',
    excuseCopied: 'صافي ناضي!',
    shareBtn: 'شارك الكارطة',
    memory: {
      warmer: "سخن من البارح.",
      colder: "بارد على البارح.",
      same: "نفس الموال ديال ديما.",
      roast_warmer: "بعدا ماشي العصر الجليدي بحال البارح.",
      roast_colder: "البارح الصهد واليوم التلاجة. فهم تسطى.",
      roast_same: "كوبي كولي. وا بدلو شوية!"
    },
    personalities: {
      calm: "بعقلي",
      sarcastic: "ضاسر",
      roast: "شمالي قاصح"
    },
    moods: {
      sunny: {
        label: 'الشميسة',
        calm: { quote: "الجو غزال والشميسة قايلة.", advice: "خرج ضرب دويرة.", excuse: "الشمس ضربات ليا فعيني." },
        sarcastic: { quote: "الشمس مجهدة.. غاتطيب لينا المخ.", advice: "دير النظاظر، راه كاين الضو.", excuse: "عندي حساسية من الصهد." },
        roast: { quote: "وا نوض تخدم باراكا من العجز! الشميسة كاينة.", advice: "دير الكاسكيطة لا تجيك شي ضربة د الشمس.", excuse: "خفت نذوب يلا خرجت." }
      },
      cloudy: {
        label: 'مغيم',
        calm: { quote: "الجو مغيم شوية، ولكن مزيان.", advice: "جو زوين للقراية.", excuse: "الجو كئيب ماكيشجعش." },
        sarcastic: { quote: "السحاب كحل بحال سعدك.", advice: "ماكاين ما يتشاف الفوق.", excuse: "الدنيا مضببة فعيني." },
        roast: { quote: "الجو كئيب.. نوض تحرك بدل الجو.", advice: "واش كاتسنى الشتا؟ نوض تقضي غراضك.", excuse: "الجو بحال مستقبلي، مابان ليا والو." }
      },
      foggy: {
        label: 'الضباب',
        calm: { quote: "الضباب طايح، ماكايبان والو.", advice: "رد بالك فالطريق.", excuse: "توضرت فالضباب." },
        sarcastic: { quote: "الدنيا مبلكرة، سيرفر د الأرض طاح.", advice: "حضِ راسك لا تدخل فشي حيط.", excuse: "ماعرفتش نخرج من الدرب." },
        roast: { quote: "الضباب.. العذر المثالي باش تبقا فداركم.", advice: "شعل الضو د التيلفون، راك غادي فالظلام.", excuse: "تلف ليا الريزو مع الضباب." }
      },
      rainy: {
        label: 'الشتيوة',
        calm: { quote: "الشتيوة خيط من السما.", advice: "هز معاك المظلة.", excuse: "الشتا خيط من السما، الطريق مقطوعة." },
        sarcastic: { quote: "السما كاتبكي.. عذر واعر باش تنعس.", advice: "المظلة ضرورية ا عشيري.", excuse: "خفت نفزك ونمرض." },
        roast: { quote: "الشتيوة كاتصب.. وانت مكمش فالفراش.", advice: "ما تخرجش بلا مظلة لا تفزك وتولي بحال الفلوس.", excuse: "الطريق عامرة برك د الما." }
      },
      snowy: {
        label: 'التلج',
        calm: { quote: "التلج كايطيح، المنظر واعر.", advice: "لبس مزيان باش تسخن.", excuse: "حاصرني التلج فباب الدار." },
        sarcastic: { quote: "كلشي مجمد.. حتى عقلي وقف.", advice: "لبس قشابة فوق قشابة.", excuse: "البرد قتلني، ماقادرش نتحرك." },
        roast: { quote: "وا نوض! البرد ماشي سبة باش ماتخدمش.", advice: "ما تاكلش التلج الصفر.. نصيحة لوجه الله.", excuse: "دخلت فسبات شتوي بحال الدب." }
      },
      stormy: {
        label: 'الروينة',
        calm: { quote: "الجو مكهرب، بقى فداركم.", advice: "السلامة هي اللولة.", excuse: "خفت يطيرني الريح." },
        sarcastic: { quote: "نهاية العالم قربات.. وجد راسك.", advice: "تخبع فشي قنت.", excuse: "كانسلك راسي من العاصفة." },
        roast: { quote: "الطبيعة معصبة عليك اليوم.", advice: "ما تخرجش.. الريح يدي ما يرد.", excuse: "الشرقي ناض، مايمكنش نخرج." }
      },
      unknown: {
        label: 'ماعرفت',
        calm: { quote: "ماعرفناش الجو كي داير.", advice: "رجع من بعد.", excuse: "مشاكل تقنية." },
        sarcastic: { quote: "مافهمت والو فهاد الجو.", advice: "الله يسر.", excuse: "التطبيق براسو دايخ." },
        roast: { quote: "واقيلا حتى الجو تلف.", advice: "دبر لراسك.", excuse: "حتى التطبيق ماعارفش." }
      }
    }
  }
};
