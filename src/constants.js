import { Sun, Cloud, CloudFog, CloudRain, Snowflake, CloudLightning } from 'lucide-react';

export const TRANSLATIONS = {
  en: {
    detecting: 'Detecting...',
    yourLocation: 'Your Location',
    nearby: 'Nearby Location',
    retry: 'Retry',
    oops: 'Oops.',
    timeline: 'TIMELINE',
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
    geoError: 'Geolocation denied. Using default.',
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
        calm: { quote: "A bright and sunny day outside.", advice: "Great day for a walk." },
        sarcastic: { quote: "It's disgusting how cheerful it is outside. Go touch grass.", advice: "Wear sunglasses. Glare is real." },
        roast: { quote: "The sun is actively trying to cook you alive.", advice: "Stay inside or become bacon." }
      },
      cloudy: {
        label: 'Cloudy',
        calm: { quote: "A bit cloudy, but pleasant.", advice: "Good weather for reading." },
        sarcastic: { quote: "Mediocre weather for a mediocre day.", advice: "Perfect lighting for sad selfies." },
        roast: { quote: " The sky is gray, just like your future.", advice: "Don't bother looking up." }
      },
      foggy: {
        label: 'Foggy',
        calm: { quote: "Visibility is low due to fog.", advice: "Drive carefully." },
        sarcastic: { quote: "I can't see anything. Maybe that's for the best.", advice: "The world is buffering." },
        roast: { quote: "You finally have an excuse for being lost in life.", advice: "Watch your step, genius." }
      },
      rainy: {
        label: 'Rain',
        calm: { quote: "It's raining. Nature is watering the plants.", advice: "Don't forget your umbrella." },
        sarcastic: { quote: "The sky is crying. Great excuse to rot in bed.", advice: "Umbrella required. Obviously." },
        roast: { quote: "Even the sky is sad to see you today.", advice: "You'll melt if you go out. Oh wait, you're not sugar." }
      },
      snowy: {
        label: 'Snow',
        calm: { quote: "Snow is falling. Very picturesque.", advice: "Stay warm and cozy." },
        sarcastic: { quote: "Everything is frozen. Including my will to live.", advice: "Layers. Like an onion." },
        roast: { quote: "Elsa is having a mental breakdown again.", advice: "Don't eat yellow snow. I shouldn't have to tell you this." }
      },
      stormy: {
        label: 'Storm',
        calm: { quote: "Stormy conditions reported.", advice: "Safety first, stay indoors." },
        sarcastic: { quote: "The world is ending. Finally, some excitement.", advice: "Zeus is throwing a tantrum." },
        roast: { quote: "Nature is screaming at you.", advice: "Hide. Just hide." }
      },
      unknown: {
        label: 'Unknown',
        calm: { quote: "Weather status unknown.", advice: "Check back later." },
        sarcastic: { quote: "I have no idea what's happening.", advice: "Good luck." },
        roast: { quote: "I gave up trying to guess.", advice: "You figure it out." }
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
    geoError: 'تم رفض تحديد الموقع. استخدام الافتراضي.',
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
        calm: { quote: "يوم مشمس وجميل في الخارج.", advice: "يوم رائع للمشي." },
        sarcastic: { quote: "الجو مبهج لدرجة تثير الاشمئزاز. اخرج وتنفس قليلاً.", advice: "ارتدِ نظارة شمسية. السطوع حقيقي." },
        roast: { quote: "الشمس تحاول شواءك حياً اليوم.", advice: "ابق بالداخل وإلا ستصبح لحماً مقدداً." }
      },
      cloudy: {
        label: 'غائم',
        calm: { quote: "الجو غائم قليلاً، لكنه لطيف.", advice: "طقس جيد للقراءة." },
        sarcastic: { quote: "طقس متوسط ليوم متوسط.", advice: "إضاءة مثالية لصور السيلفي الكئيبة." },
        roast: { quote: "السماء رمادية، تماماً مثل مستقبلك.", advice: "لا تكلف نفسك عناء النظر للأعلى." }
      },
      foggy: {
        label: 'ضبابي',
        calm: { quote: "الرؤية منخفضة بسبب الضباب.", advice: "قد بحذر." },
        sarcastic: { quote: "لا أستطيع رؤية شيء. ربما هذا للأفضل.", advice: "العالم قيد التحميل." },
        roast: { quote: "وأخيراً لديك عذر لكونك ضائعاً في الحياة.", advice: "انتبه لخطواتك يا عبقري." }
      },
      rainy: {
        label: 'ماطر',
        calm: { quote: "إنها تمطر. الطبيعة تسقي النباتات.", advice: "لا تنس مظلتك." },
        sarcastic: { quote: "السماء تبكي. عذر ممتاز للبقاء في السرير.", advice: "المظلة ضرورية. بديهياً." },
        roast: { quote: "حتى السماء حزينة لرؤيتك اليوم.", advice: "ستذوب إذا خرجت... أوه انتظر، أنت لست قطعة سكر." }
      },
      snowy: {
        label: 'مثلج',
        calm: { quote: "الثلوج تتساقط. منظر خلاب.", advice: "ابق دافئاً ومستريحاً." },
        sarcastic: { quote: "كل شيء متجمد. بما في ذلك رغبتي في العمل.", advice: "ارتدِ طبقات. مثل البصلة." },
        roast: { quote: "يبدو أن (إلسا) تعاني من انهيار عصبي مجدداً.", advice: "لا تأكل الثلج الأصفر. لا يجب أن أخبرك بهذا." }
      },
      stormy: {
        label: 'عاصف',
        calm: { quote: "حالة عاصفة. ابق آمناً.", advice: "السلامة أولاً، ابق بالداخل." },
        sarcastic: { quote: "العالم ينتهي. أخيراً، بعض الإثارة.", advice: "الطبيعة غاضبة جداً اليوم." },
        roast: { quote: "الطبيعة تصرخ في وجهك.", advice: "اختبئ. فقط اختبئ." }
      },
      unknown: {
        label: 'غير معروف',
        calm: { quote: "حالة الطقس غير معروفة.", advice: "تحقق لاحقاً." },
        sarcastic: { quote: "ليس لدي أي فكرة عما يحدث.", advice: "حظاً موفقاً." },
        roast: { quote: "لقد استسلمت عن المحاولة.", advice: "دبر نفسك." }
      }
    }
  }
};
