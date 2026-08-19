export const TRANSLATIONS = {
  en: {
    appName: 'Mizaji',
    appTagline: 'Weather Shade & Prayer Times',
    detecting: 'Detecting Location...',
    yourLocation: 'Current Location',
    nearby: 'Nearby Location',
    searchCity: 'Search City...',
    searchPlaceholder: 'Search city (e.g. Tetouan, Casablanca, Paris)...',
    popularCities: 'Popular Cities',
    useCurrentLocation: 'Use Current GPS Location',
    noResultsFound: 'No cities found.',
    searching: 'Searching...',
    retry: 'Retry',
    oops: 'Oops!',
    timeline: '7-DAY FORECAST',
    hourly: 'HOURLY FORECAST',
    detailsTitle: 'WEATHER DETAILS',
    feelsLike: 'Feels Like',
    wind: 'Wind Speed',
    humidity: 'Humidity',
    direction: 'Wind Direction',
    pressure: 'Pressure',
    uvIndex: 'UV Index',
    precipitation: 'Rain Chance',
    rainSum: 'Rain Volume',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    visibility: 'Visibility',
    mapTitle: 'Interactive Radar Map',
    close: 'Close',
    today: 'Today',
    tomorrow: 'Tomorrow',
    yesterday: 'Yesterday',
    daysAgo: '2 Days Ago',
    loading: 'Loading Weather...',
    fetchError: 'Failed to fetch weather data. Please check your connection.',
    excuseBtn: 'Get Excuse 📋',
    excuseCopied: 'Excuse Copied to Clipboard! 🎉',
    shuffleRoast: 'Shuffle Roast 🎲',
    shareBtn: 'Share Card',
    shareTitle: 'Share Mizaji Card',
    copiedCard: 'Card Copied!',
    downloadPng: 'Download PNG',
    copiedToast: 'Copied!',
    
    // UV Levels
    uvLevels: {
      low: 'Low',
      moderate: 'Moderate',
      high: 'High',
      veryHigh: 'Very High',
      extreme: 'Extreme',
    },

    // Tabs
    tabs: {
      weather: 'Weather',
      prayer: 'Prayer Times',
      map: 'Radar Map',
    },

    // Personalities
    personalities: {
      calm: 'Calm',
      sarcastic: 'Sarcastic',
      roast: 'Roast 🔥',
    },

    // Memory comparison
    memory: {
      warmer: 'Warmer than yesterday (+{diff}°C).',
      colder: 'Colder than yesterday (-{diff}°C).',
      same: 'Identical temperature to yesterday.',
      roast_warmer: 'Warmer than yesterday. Still not an excuse to wear flip-flops in public.',
      roast_colder: 'Colder than yesterday. The weather is as cold as your ex.',
      roast_same: 'Exact copy-paste weather. How unimaginative.',
    },

    // Weather Moods
    moods: {
      sunny: {
        label: 'Clear & Sunny',
        calm: {
          quotes: [
            'A beautifully clear and bright day outside.',
            'Warm golden sunshine lighting up the sky.',
          ],
          advice: 'Great day for a walk or outdoor coffee.',
          excuses: [
            'Solar glare makes it impossible to see my computer screen.',
            'Doctor recommended emergency vitamin D absorption on the sofa.',
          ],
        },
        sarcastic: {
          quotes: [
            'The sun is out. Go touch grass before your screen burns into your eyes.',
            'Disgustingly cheerful daylight. Where is the mute button for birds?',
          ],
          advice: 'Wear sunglasses to hide your lack of sleep.',
          excuses: [
            'I am allergic to excessive happiness and bright sunlight.',
            'The sun melted my motivation down to 0%.',
          ],
        },
        roast: {
          quotes: [
            'The sun is literally trying to microwave you like leftover pizza.',
            'Step outside for 3 minutes and you become human shawarma.',
            'Even the lizards are seeking air conditioning today.',
          ],
          advice: 'Stay inside or face instant vaporization.',
          excuses: [
            'Immediate risk of spontaneous combustion if I step outside.',
            'My brain cells will evaporate in this heat.',
          ],
        },
      },
      cloudy: {
        label: 'Cloudy Sky',
        calm: {
          quotes: [
            'Gentle overcast clouds, soft diffuse lighting.',
            'Mild weather, pleasant for reading or quiet work.',
          ],
          advice: 'Keep a light layer handy just in case.',
          excuses: [
            'Low atmospheric light requires optimal rest conditions.',
            'The gloomy ambiance is interfering with my workflow.',
          ],
        },
        sarcastic: {
          quotes: [
            'Mediocre gray weather for a mediocre day.',
            'The sky looks like wet concrete. Perfectly matches Monday vibes.',
          ],
          advice: 'Ideal lighting for dramatic selfie contemplation.',
          excuses: [
            'The sky is too gray for me to function effectively.',
            'My laptop cannot find aesthetic inspiration under this gloom.',
          ],
        },
        roast: {
          quotes: [
            'The sky is gray, dull, and uninspired. Reminds me of your future plans.',
            'Even the clouds gave up on doing anything interesting today.',
          ],
          advice: 'Do not bother looking up. Nothing to see.',
          excuses: [
            'Clouds blocked my creative bandwidth.',
            'My existential dread peaked with this cloud cover.',
          ],
        },
      },
      foggy: {
        label: 'Fog & Mist',
        calm: {
          quotes: [
            'A tranquil misty morning with soft visibility.',
            'Atmospheric fog enshrouding the city.',
          ],
          advice: 'Drive carefully with fog lights on.',
          excuses: [
            'Visibility too low to navigate out of the apartment.',
            'Can not find the front door due to heavy fog.',
          ],
        },
        sarcastic: {
          quotes: [
            'I can not see five meters ahead. Maybe that is an improvement.',
            'The city is buffering in 240p resolution today.',
          ],
          advice: 'The graphics settings on Earth are set to Low.',
          excuses: [
            'Lost in the mist of my own contemplation.',
            'GPS signal lost in the silent hill simulator outside.',
          ],
        },
        roast: {
          quotes: [
            'Finally, weather that matches how lost you are in life.',
            'Thick fog outside, yet still clearer than your career goals.',
          ],
          advice: 'Watch your step, absolute genius.',
          excuses: [
            'I have physically dissolved into the fog.',
            'Navigation failed: Lost somewhere between bed and kitchen.',
          ],
        },
      },
      rainy: {
        label: 'Rainy',
        calm: {
          quotes: [
            'Soothing rainfall nourishing the trees and gardens.',
            'Gentle rain tapping softly on windows.',
          ],
          advice: 'Do not forget your umbrella and raincoat.',
          excuses: [
            'Heavy rain creates significant transit delays.',
            'Internet router threatened by humidity levels.',
          ],
        },
        sarcastic: {
          quotes: [
            'The sky is crying. The ultimate excuse to rot under blankets.',
            'Free involuntary shower for anyone foolish enough to go out.',
          ],
          advice: 'Carry an umbrella. Shockingly, water is wet.',
          excuses: [
            'I might dissolve if water hits me.',
            'My shoes are not amphibious.',
          ],
        },
        roast: {
          quotes: [
            'Even the heavens are crying after seeing what you did today.',
            'Nature decided everyone needed a bath, especially you.',
          ],
          advice: 'You will melt if you go out... wait, you are not sugar.',
          excuses: [
            'Roads flooded, submarine currently in the repair shop.',
            'Water wings deflated, transit impossible.',
          ],
        },
      },
      snowy: {
        label: 'Snow',
        calm: {
          quotes: [
            'Crisp white snow gracefully blanketing the surroundings.',
            'A peaceful, quiet winter wonderland.',
          ],
          advice: 'Dress in warm layers and sip warm tea.',
          excuses: [
            'Snow blockage at entrance. Awaiting snowplow.',
            'Sub-zero conditions require indoor containment.',
          ],
        },
        sarcastic: {
          quotes: [
            'Everything is frozen solid. Including my will to be productive.',
            'Winter cosplay: Walking around dressed like a Michelin tire.',
          ],
          advice: 'Wear five layers. Look like an onion.',
          excuses: [
            'Front door is frozen shut by Antarctic forces.',
            'Fingers too cold to type coherent emails.',
          ],
        },
        roast: {
          quotes: [
            'Elsa had another emotional breakdown outside.',
            'Freezer level cold. You are one step away from being frozen meat.',
          ],
          advice: 'Do not eat yellow snow. Basic survival tip.',
          excuses: [
            'Hibernation protocol activated. See you in Spring.',
            'My bed has claimed diplomatic immunity against the cold.',
          ],
        },
      },
      stormy: {
        label: 'Thunderstorm',
        calm: {
          quotes: [
            'Dynamic thunderstorm with thunder and dramatic lightning.',
            'Vigorous weather system moving across the region.',
          ],
          advice: 'Stay safely indoors away from open windows.',
          excuses: [
            'Severe thunderstorm alert recommends sheltering in place.',
            'High power surge risk to electronics.',
          ],
        },
        sarcastic: {
          quotes: [
            'The apocalypse has arrived. Finally, some decent entertainment.',
            'Zeus is throwing an absolute temper tantrum outside.',
          ],
          advice: 'Do not hold metal rods in the air like a lightning rod.',
          excuses: [
            'Currently negotiating peace terms with the thunder gods.',
            'Lightning took out my alarm and my conscience.',
          ],
        },
        roast: {
          quotes: [
            'Mother Nature is screaming at you specifically.',
            'Thunder roaring because it saw your browser history.',
          ],
          advice: 'Hide under the bed. Just hide.',
          excuses: [
            'Currently building Noah’s Ark in my living room.',
            'Lightning strike probability higher than my work enthusiasm.',
          ],
        },
      },
      unknown: {
        label: 'Variable',
        calm: { quotes: ['Calm atmospheric conditions.'], advice: 'Enjoy your day.', excuses: ['Awaiting data synchronization.'] },
        sarcastic: { quotes: ['Weather satellites have given up.'], advice: 'Look outside with your own eyes.', excuses: ['Meteorologist retired on the spot.'] },
        roast: { quotes: ['Even NASA has no clue what this weather is.'], advice: 'Good luck out there.', excuses: ['App server lost all hope.'] },
      },
    },

    // Prayer
    prayer: {
      title: 'Prayer Times',
      fajr: 'Fajr',
      sunrise: 'Sunrise',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
      nextPrayer: 'Next Prayer',
      remaining: 'Remaining',
      passed: 'Passed',
      qiblaTitle: 'Qibla Direction',
      qiblaDegree: 'from North',
      hijriDate: 'Hijri Date',
      method: 'Calculation Method',
      methods: {
        habous: 'Ministry of Endowments (Morocco)',
        mwl: 'Muslim World League',
        makkah: 'Umm Al-Qura (Makkah)',
        egypt: 'Egyptian General Authority',
      },
      athanToggle: 'Prayer Alert Sound',
    },
  },

  ar: {
    appName: 'مزاجي',
    appTagline: 'أرصاد جوية ساخرة ومواقيت الصلاة',
    detecting: 'جاري تحديد موقعك...',
    yourLocation: 'موقعك الحالي',
    nearby: 'منطقة قريبة',
    searchCity: 'ابحث عن مدينة...',
    searchPlaceholder: 'ابحث عن مدينة (تطوان، كازا، الرياض، القاهرة)...',
    popularCities: 'مدن مشهورة',
    useCurrentLocation: 'استخدام موقعي عبر GPS',
    noResultsFound: 'لم يتم العثور على مدن.',
    searching: 'جاري البحث...',
    retry: 'أعد المحاولة',
    oops: 'عفواً!',
    timeline: 'توقعات 7 أيام',
    hourly: 'توقعات الساعات',
    detailsTitle: 'تفاصيل الطقس الدقيقة',
    feelsLike: 'الإحساس الفعلي',
    wind: 'سرعة الرياح',
    humidity: 'نسبة الرطوبة',
    direction: 'اتجاه الرياح',
    pressure: 'الضغط الجوي',
    uvIndex: 'مؤشر الأشعة (UV)',
    precipitation: 'احتمال المطر',
    rainSum: 'كمية الأمطار',
    sunrise: 'شروق الشمس',
    sunset: 'غروب الشمس',
    visibility: 'مدى الرؤية',
    mapTitle: 'خريطة الرادار التفاعلية',
    close: 'إغلاق',
    today: 'اليوم',
    tomorrow: 'غداً',
    yesterday: 'أمس',
    daysAgo: 'قبل يومين',
    loading: 'جاري جلب الطقس...',
    fetchError: 'تعذر جلب بيانات الطقس. يرجى التحقق من الاتصال بالإنترنت.',
    excuseBtn: 'عطني عذر للغياب 📋',
    excuseCopied: 'تم نسخ العذر للحافظة! 🎉',
    shuffleRoast: 'بدّل القصف 🎲',
    shareBtn: 'مشاركة البطاقة',
    shareTitle: 'بطاقة طقس مزاجي',
    copiedCard: 'تم نسخ البطاقة!',
    downloadPng: 'تحميل PNG',
    copiedToast: 'تم النسخ بنجاح!',

    // UV Levels
    uvLevels: {
      low: 'منخفض',
      moderate: 'معتدل',
      high: 'مرتفع',
      veryHigh: 'مرتفع جداً',
      extreme: 'خطر شديد',
    },

    // Tabs
    tabs: {
      weather: 'الطقس',
      prayer: 'أوقات الصلاة',
      map: 'الرادار',
    },

    // Personalities
    personalities: {
      calm: 'هادئ 🌿',
      sarcastic: 'ساخر 😏',
      roast: 'لاذع 🔥',
    },

    // Memory comparison
    memory: {
      warmer: 'أدفأ من طقس الأمس بنحو ({diff}°+).',
      colder: 'أبرد من طقس الأمس بنحو ({diff}°-) مئوية.',
      same: 'نفس درجات حرارة الأمس تماماً.',
      roast_warmer: 'أدفأ من الأمس، لكن لا داعي للاستعراض وكأنك في ميامي.',
      roast_colder: 'أبرد من الأمس. الطقس قاسي مثل قراراتك المالية.',
      roast_same: 'طقس مستنسخ من الأمس. انعدام تام للإبداع من الطبيعة.',
    },

    // Weather Moods
    moods: {
      sunny: {
        label: 'مشمس وصافٍ',
        calm: {
          quotes: [
            'يوم مشرق ومفعم بأشعة الشمس الدافئة.',
            'سماء صافية وهواء نقي يبعث على الراحة.',
          ],
          advice: 'يوم ممتاز للمشي وشرب القهوة في الهواء الطلق.',
          excuses: [
            'انعكاس الشمس القوي يمنعني من رؤية شاشة الحاسوب.',
            'نصيحة الطبيب بالتزود بجرعة شمس على الأريكة.',
          ],
        },
        sarcastic: {
          quotes: [
            'الشمس مشرقة بتفاؤل مقزز. اخرج وتنفس هواء حقيقياً.',
            'إضاءة مفرطة في السعادة. أين زر كتم صوت العصافير؟',
          ],
          advice: 'ارتدِ نظارات شمسية لإخفاء الهالات وساعات السهر.',
          excuses: [
            'أعاني من حساسية مفرطة تجاه السعادة والشمس الساطعة.',
            'حرارة الشمس ذوبت رغبتي في العمل إلى الصفر.',
          ],
        },
        roast: {
          quotes: [
            'الشمس تحاول تحميصك اليوم كقطعة بيتزا بائتة.',
            'اخرج لخمس دقائق وستتحول تلقائياً إلى سيخ شاورما.',
            'حتى الحشرات تبحث عن مكيف هواء في هذا الجو.',
          ],
          advice: 'ابق في الظل وإلا ستصبح لحماً مقدداً مشوياً.',
          excuses: [
            'خطر الاحتراق الذاتي بمجرد فتح باب المنزل.',
            'خلايا دماغي على وشك التبخر في هذا الصهد.',
          ],
        },
      },
      cloudy: {
        label: 'غائم جزئياً',
        calm: {
          quotes: [
            'غيوم متفرقة تلطف الجو وتمنح طقساً مريحاً.',
            'أجواء هادئة ومثالية للقراءة والتركيز.',
          ],
          advice: 'احتفظ بكنزة خفيفة للمساء.',
          excuses: [
            'الغيوم تخفض مستويات الطاقة وتتطلب راحة إضافية.',
            'أجواء هادئة تتطلب الاسترخاء التام.',
          ],
        },
        sarcastic: {
          quotes: [
            'طقس رمادي متوسط، يناسب تماماً يوماً متوسطاً.',
            'السماء تشبه الإسمنت الرطب.. متناسقة جداً مع مزاج يوم الإثنين.',
          ],
          advice: 'إضاءة رائعة لصور السيلفي الدرامية الكئيبة.',
          excuses: [
            'السماء رمادية لدرجة تعطل حواسي الإنتاجية.',
            'جهازي لا يجد إلهاماً تحت هذا السحاب الكئيب.',
          ],
        },
        roast: {
          quotes: [
            'السماء رمادية وباهتة، تماماً مثل مستقبلك وخططك.',
            'حتى الغيوم استسلمت لليأس ولم تعد تكلف نفسها بالمطر.',
          ],
          advice: 'لا تكلف نفسك عناء النظر للسماء، لا جديد هناك.',
          excuses: [
            'الغيوم حجبت إشارة الإبداع والطاقة عندي.',
            'طاقتي الإيجابية اختفت خلف هذا السحاب الرمادي.',
          ],
        },
      },
      foggy: {
        label: 'ضبابي',
        calm: {
          quotes: [
            'صباح ضبابي ساحر يلف الشوارع بهدوء.',
            'رذاذ ناعم ورؤية منخفضة تضفي طابعاً هادئاً.',
          ],
          advice: 'قد بهدوء واستخدم أضواء الضباب.',
          excuses: [
            'الضباب يحجب الرؤية تماماً ولا أستطيع الخروج.',
            'لا أستطيع العثور على باب الخروج وسط الضباب.',
          ],
        },
        sarcastic: {
          quotes: [
            'لا أستطيع رؤية أكثر من مترين، وربما هذا أفضل.',
            'كوكب الأرض قيد التحميل بجودة 240p اليوم.',
          ],
          advice: 'إعدادات الجرافيكس في العالم تم خفضها لتوفير الطاقة.',
          excuses: [
            'ضائع في ضباب أفكاري العميقة.',
            'نظام الملاحة GPS ضاع في لعبة سايلنت هيل بالخارج.',
          ],
        },
        roast: {
          quotes: [
            'أخيراً طقس يطابق تماماً درجة ضياعك وتشتتك في الحياة.',
            'الضباب كثيف، ومع ذلك يبقى أوضح بكثير من أهدافك المستقبلية.',
          ],
          advice: 'انتبه لخطواتك يا عبقري زمانك.',
          excuses: [
            'ذبت في الضباب وأحتاج فرق إنقاذ لتحديد مكاني.',
            'فقدت المسار بين السرير والمطبخ.',
          ],
        },
      },
      rainy: {
        label: 'ماطر',
        calm: {
          quotes: [
            'أمطار خير وبركة تروي الأرض والنفوس.',
            'صوت قطرات المطر يبعث على السكينة والطمأنينة.',
          ],
          advice: 'لا تنسَ مظلتك وملابسك الدافئة المقاومة للماء.',
          excuses: [
            'الأمطار الغزيرة تسببت في ازدحام مروري خانق.',
            'انقطاع كابلات الإنترنت بسبب تشبع الهواء بالرطوبة.',
          ],
        },
        sarcastic: {
          quotes: [
            'السماء تبكي بحرقة.. عذر ممتاز للبقاء في الفراش طوال اليوم.',
            'دش مجاني إجباري لكل من قرر مغادرة البيت اليوم.',
          ],
          advice: 'احمل مظلة.. الماء يبلل، في حال لم تكن تدري.',
          excuses: [
            'أخشى أن أذوب إذا لمستني قطرات الماء.',
            'حذائي ليس غواصة مائية للأسف.',
          ],
        },
        roast: {
          quotes: [
            'حتى السماء انهمرت دموعها حزناً بعد رؤية إنجازاتك اليوم.',
            'الطبيعة قررت تنظيف العالم.. ابدأ بنفسك أولاً.',
          ],
          advice: 'ستذوب إذا خرجت.. أوه انتظر، أنت لست قطعة سكر.',
          excuses: [
            'الشوارع تحولت إلى أنهار وقاربي معطل في الصيانة.',
            'سفينة نوح لم تمر من أمام منزلي بعد.',
          ],
        },
      },
      snowy: {
        label: 'مثلج',
        calm: {
          quotes: [
            'ثلوج بيضاء نقية تكسو المدينة برداء شتوي بهيج.',
            'أجواء ساحرة وهدوء شتوي فريد.',
          ],
          advice: 'ارتدِ ملابس دافئة واستمتع بمشروب ساخن.',
          excuses: [
            'تراكم الثلوج أمام المدخل يعيق الحركة تماماً.',
            'درجات الحرارة تحت الصفر تستوجب البقاء في المنزل.',
          ],
        },
        sarcastic: {
          quotes: [
            'كل شيء تجمد.. بما في ذلك رغبتي في النهوض من الفراش.',
            'زي الشتاء المعتمد: التحول إلى إطار ميشلان بشري.',
          ],
          advice: 'ارتدِ 6 طبقات حتى تصبح مثل البصلة.',
          excuses: [
            'باب المنزل تجمد وأعلنت الاستسلام.',
            'أصابعي تجمدت ولا تستطيع الرد على الرسائل.',
          ],
        },
        roast: {
          quotes: [
            'يبدو أن إلسا تمر بانهيار عصبي جديد في الخارج.',
            'الجو فريزر.. أنت على بعد خطوة واحدة من أن تصبح لحماً مجمداً.',
          ],
          advice: 'لا تأكل الثلج الأصفر.. نصيحة بديهية للنجاة.',
          excuses: [
            'تم تفعيل وضع السبات الشتوي التلقائي حتى إشعار آخر.',
            'سريري حصل على حصانة دبلوماسية ضد هذا الصقيع.',
          ],
        },
      },
      stormy: {
        label: 'عاصف ورعدي',
        calm: {
          quotes: [
            'أجواء رعدية مهيبة مع وميض البرق وأصوات الرعد.',
            'عاصفة قوية تمر بالمنطقة وتغسل الأجواء.',
          ],
          advice: 'ابقَ في مكان آمن ومغلق وبعيد عن النوافذ.',
          excuses: [
            'تحذيرات السلامة توصي بعدم مغادرة المنازل أثناء العاصفة.',
            'خطر انقطاع التيار الكهربائي والصواعق الرعدية.',
          ],
        },
        sarcastic: {
          quotes: [
            'نهاية العالم بدأت.. أخيراً بعض الإثارة في هذا الكوكب.',
            'زيوس غاضب جداً اليوم ويلقي البرق في كل اتجاه.',
          ],
          advice: 'لا تمشِ بعصا حديدية مرفوعة نحو السماء.',
          excuses: [
            'أنا في مفاوضات سلام عاجلة مع آلهة الرعد.',
            'الصاعقة ضربت منبهي وضميري في آن واحد.',
          ],
        },
        roast: {
          quotes: [
            'الطبيعة تصرخ بوجهك أنت بالذات.',
            'الرعد يزمجر لأنه ألقى نظرة على سجل متصفحك.',
          ],
          advice: 'اختبئ تحت السرير ولا تخرج حتى تهدأ العاصفة.',
          excuses: [
            'أبني سفينة نوح في صالون البيت حالياً.',
            'احتمال إصابتي بصاعقة أعلى بكثير من رغبتي في العمل.',
          ],
        },
      },
      unknown: {
        label: 'متقلب',
        calm: { quotes: ['أجواء جوية مستقرة ومتفاوتة.'], advice: 'أتمنى لك يوماً طيباً.', excuses: ['جاري تحديث الأقمار الاصطناعية.'] },
        sarcastic: { quotes: ['أقمار الأرصاد استسلمت عن التخمين.'], advice: 'انظر من النافذة بعينيك.', excuses: ['خبير الأرصاد استقال اليوم.'] },
        roast: { quotes: ['حتى وكالة ناسا عاجزة عن فهم هذا الطقس.'], advice: 'دبّر أمورك بنفسك.', excuses: ['سيرفر التطبيق فقد الأمل.'] },
      },
    },

    // Prayer
    prayer: {
      title: 'مواقيت الصلاة',
      fajr: 'الفجر',
      sunrise: 'الشروق',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشاء',
      nextPrayer: 'الصلاة القادمة',
      remaining: 'متبقي',
      passed: 'مضى عليها',
      qiblaTitle: 'اتجاه القبلة المشرفة',
      qiblaDegree: 'عن الشمال',
      hijriDate: 'التاريخ الهجري',
      method: 'طريقة الحساب',
      methods: {
        habous: 'وزارة الأوقاف والشؤون الإسلامية (المغرب)',
        mwl: 'رابطة العالم الإسلامي',
        makkah: 'أم القرى (مكة المكرمة)',
        egypt: 'الهيئة المصرية العامة للمساحة',
      },
      athanToggle: 'تنبيه الأذان',
    },
  },

  ma: {
    appName: 'مزاجي',
    appTagline: 'أرصاد جوية مقطرة وأوقات الصلاة',
    detecting: 'كانقلبو على بلاصتك...',
    yourLocation: 'فين نتا دبا',
    nearby: 'الحومة اللي حداك',
    searchCity: 'قلب على شي مدينة...',
    searchPlaceholder: 'كتب سمية المدينة (تطوان، كازا، طنجة، مراكش)...',
    popularCities: 'مدن معروفة',
    useCurrentLocation: 'خدم الموقع ديالي بـ GPS',
    noResultsFound: 'مالقينا حتى مدينة بهاد السمية.',
    searching: 'كانقلبو...',
    retry: 'عاود جرب',
    oops: 'ويلي!',
    timeline: 'توقعات السيمانة (7 أيام)',
    hourly: 'الجو بالسوايع',
    detailsTitle: 'تفاصيل الجو بالتدقيق',
    feelsLike: 'الحرارة ديال بصح',
    wind: 'الشرقي / الريح',
    humidity: 'الرطوبة',
    direction: 'اتجاه الريح',
    pressure: 'الضغط الجوي',
    uvIndex: 'قوة الشمش (UV)',
    precipitation: 'احتمال الشتا',
    rainSum: 'كمية الما د الشتا',
    sunrise: 'شروق الشمش',
    sunset: 'غروب الشمش',
    visibility: 'الشوفة فالطريق',
    mapTitle: 'الخريطة والرادار لايف',
    close: 'شد',
    today: 'اليوم',
    tomorrow: 'غدا',
    yesterday: 'البارح',
    daysAgo: 'يومين دازت',
    loading: 'كانشوفو الجو كي داير...',
    fetchError: 'الكونيكسيون ميتة ولا السيرفر سخف. عاود تشيكي.',
    excuseBtn: 'عطيني شي سبة نغبر 📋',
    excuseCopied: 'ها السبة تكوبات ناضية! 🎉',
    shuffleRoast: 'بدّل القصف 🎲',
    shareBtn: 'بارطاجي الكارطة',
    shareTitle: 'كارطة طقس مزاجي',
    copiedCard: 'تكوبات الكارطة!',
    downloadPng: 'تيليشارجي PNG',
    copiedToast: 'ناضي، تكوبات!',

    // UV Levels
    uvLevels: {
      low: 'هابطة',
      moderate: 'بين وبين',
      high: 'طالعة',
      veryHigh: 'مجهدة بزاف',
      extreme: 'خطر وصهد',
    },

    // Tabs
    tabs: {
      weather: 'الجو',
      prayer: 'أوقات الصلاة',
      map: 'الرادار',
    },

    // Personalities
    personalities: {
      calm: 'بعقلي ☕',
      sarcastic: 'ضاسر 😏',
      roast: 'شمالي قاصح 🔥',
    },

    // Memory comparison
    memory: {
      warmer: 'سخن من البارح بـ ({diff}°+).',
      colder: 'بارد على البارح بـ ({diff}°-) درجات.',
      same: 'نفس الموال ونفس الحرارة د البارح.',
      roast_warmer: 'سخن من البارح.. ولكن بلا ما تلبس الصندالة ودير فيها فميامي.',
      roast_colder: 'بارد على البارح.. الجو قاصح بحال جيبك فراس الشهر.',
      roast_same: 'كوبي كولي من البارح. وا بدلوا لينا هاد الروتين!',
    },

    // Weather Moods
    moods: {
      sunny: {
        label: 'الشميسة قايلة',
        calm: {
          quotes: [
            'الجو غزال والشميسة دافية تبارك الله.',
            'سما صافية وضريب الصهد الزوين، خرج ضرب دويرة.',
          ],
          advice: 'جو واعر ديال شي قهيوة نص نص فالشميسة.',
          excuses: [
            'الشميسة ضربات ليا فعيني ومابقيتش كانشوف البيسي.',
            'الطبيب قالي خاصك فيتامين D فوق السداري.',
          ],
        },
        sarcastic: {
          quotes: [
            'الشميسة ضاوية بتفاؤل كايعصب.. نوض تحرك باراكا من النعاس.',
            'الضو كايعمي والطيور كاتغوت.. فين كايسكتو هادو؟',
          ],
          advice: 'دير النظاظر باش تخبي التبياع د العجل والسهر.',
          excuses: [
            'فيا حساسية من السعادة المفرطة ومن هاد الصهد.',
            'الحرارة ذوبات الرغبة فالحياة والخدمة.',
          ],
        },
        roast: {
          quotes: [
            'الشميسة غاتقليك بحال السردين فالمقلى اليوم.',
            'خرج 5 دقيق وغاتولي شاورما مقطرة بالزيت.',
            'حتى بوعزة الدلاح هرب للكليماتيزور فهاد الجو.',
          ],
          advice: 'بقى فداركم ولا غاتولي قطبان د بولفاف.',
          excuses: [
            'خفت نذوب يلا حطيت رجلي برا الدار.',
            'المخ ديالي كايغلي بحال المقراج.',
          ],
        },
      },
      cloudy: {
        label: 'مغيم شوية',
        calm: {
          quotes: [
            'الجو مغيم وزوين، كايبرد على القلب.',
            'أجواء هادية مناسبة للقراية والراحة.',
          ],
          advice: 'هز معاك شي فيستة خفيفة للعشية.',
          excuses: [
            'الغمام كايجيب النعاس وطيح ليا المورال.',
            'الجو مهدن كايطلب تمديدة فوق السداري.',
          ],
        },
        sarcastic: {
          quotes: [
            'السحاب كحل بحال زهرك.. غادي مع نهار الإثنين نيشان.',
            'السما رمادية بحال كوزينة كايصاوبو فيها البغرير.',
          ],
          advice: 'ضو ناضي باش تصور تصاور حزينة د التيكتوك.',
          excuses: [
            'الجو كئيب ماكيشجعش الواحد يحك راسو.',
            'البيسي ديالي مبلوكي مع هاد الغمام.',
          ],
        },
        roast: {
          quotes: [
            'السما رمادية كئيبة، تماماً بحال مستقبلك وأهدافك فهاد الحياة.',
            'حتى السحاب عيا وسخف ومابقاش باغي يصب الشتا.',
          ],
          advice: 'ماكاين علاش تعلي عينك للفوق، ماكاين والو.',
          excuses: [
            'السحاب قطع ليا الريزو د الإلهام.',
            'طاح ليا الباتري مع هاد الكآبة.',
          ],
        },
      },
      foggy: {
        label: 'الضباب والغمام',
        calm: {
          quotes: [
            'الضباب هابط على الحومة بهدوء وسكينة.',
            'أجواء زوينة والشارع ضارب فيه البرود.',
          ],
          advice: 'شعل الفروج ورد بالك فالطريق.',
          excuses: [
            'الضباب كحل وماعرفتش نخرج من الدرب.',
            'توضرت فالضباب ومالقيتش باب الدار.',
          ],
        },
        sarcastic: {
          quotes: [
            'ماكايبان والو قدامك، وراه حسن نيت باش ماتشوفش المنكر.',
            'السيرفر د كوكب الأرض تبلوكا وفيه اللاق اليوم.',
          ],
          advice: 'الكرافيكس د الدنيا طايح لـ 240p.',
          excuses: [
            'تلف ليا الريزو وغلبتني الملاحة فالضباب.',
            'توضرت بين البيت والكوزينة فالضباب.',
          ],
        },
        roast: {
          quotes: [
            'أخيراً جو كايشبه للتلفة اللي نتا عايش فيها فهاد الدنيا.',
            'الضباب كحل وقاصح، ومع دالك باين كثر من مستقبلك.',
          ],
          advice: 'حضي راسك لا تدخل فشي بوطو يا العبقري.',
          excuses: [
            'ذبت فالضباب وعيطو للوقاية المدنية يقلبو عليا.',
            'توضرت فالصالون مابقيتش عارف القبلة فين كاينة.',
          ],
        },
      },
      rainy: {
        label: 'الشتيوة كاتصب',
        calm: {
          quotes: [
            'الشتيوة خيط من السما، اللهم صيباً نافعاً.',
            'صوت المطر كايجيب الراحة والبركة للبلاد.',
          ],
          advice: 'هز المظلة ولبس مزيان باش ما تضربكش الفلقة.',
          excuses: [
            'الشتا خيط من السما والطرقان مبلوكية بالما.',
            'الروتر د الويفي تحرق مع الرطوبة العالية.',
          ],
        },
        sarcastic: {
          quotes: [
            'السما كاتبكي.. أحسن سبة باش تكمش فالمانطا وتاكل البيصارة.',
            'دوش فابور فزنقة لكل من حط رجلو برا الدار اليوم.',
          ],
          advice: 'هز المظلة راه الما كايفزك يلا مافراسكش.',
          excuses: [
            'خفت نفزك ونذوب بحال السكر.',
            'الصباط ديالي ماشي زوياك د البحر.',
          ],
        },
        roast: {
          quotes: [
            'حتى السما بكات بالدموع ملي شافت العجز ديالك اليوم.',
            'الطبيعة بغات تغسل الحومة.. نوض غسل نتا بعدا وجهك.',
          ],
          advice: 'ما تخرجش لا تفزك وتولي بحال الفلوس المبلولين.',
          excuses: [
            'الحومة ولات واد وانا الفلوكة دياولي كولهم فالبيرمي.',
            'سفينة نوح مازال ما دازت من قدام راس الدرب.',
          ],
        },
      },
      snowy: {
        label: 'التلج والبرد',
        calm: {
          quotes: [
            'التلج كايطيح بيض وزوين كايزين الجبال.',
            'منظر رائع وبرودة نقية د الشتوة.',
          ],
          advice: 'لبس التقاشر وكب شي كاس د أتاي مشحر بالشيبة.',
          excuses: [
            'التلج مبلوكي العتبة د الدار ومايمكنش نخرج.',
            'الحرارة تحت الزيرو ولاصق فالمانطا.',
          ],
        },
        sarcastic: {
          quotes: [
            'كلشي مجمد.. حتى عقلي وقف على الخدمة والتفكير.',
            'لبس قشابة فوق قشابة وتولا بحال البوطة د الغاز.',
          ],
          advice: 'لبس 8 د البيجامات باش تدفى.',
          excuses: [
            'باب الدار تجمد وساروت لصق فالباب.',
            'صبعاني مثلجين ماقادينش يكتبو ميكساج.',
          ],
        },
        roast: {
          quotes: [
            'واقيلا إلسا د الكرتون تعصبات فالحومة اليوم.',
            'الجو فريكو.. باقا ليك دقيقة وتولي كفتة مجمدة.',
          ],
          advice: 'ما تاكلش التلج الصفر.. نصيحة د النجاة فابور.',
          excuses: [
            'دخلت فسبات شتوي بحال الدب حتى لشهر 6.',
            'الفراش ديالي خدا لجوء سياسي ضد البرد.',
          ],
        },
      },
      stormy: {
        label: 'الروينة والرعد',
        calm: {
          quotes: [
            'الرعد والبرق كايسبح بحمد الله، جو قوي ومهيب.',
            'عاصفة دايزة كاتغسل الجو وترد الروح.',
          ],
          advice: 'بقى فداركم بعيد على الشراجم والضو.',
          excuses: [
            'النشرة الإنذارية كاتمنع الخروج فالعواصف.',
            'الضو كايقطع والريزو كايتخربق مع الرعد.',
          ],
        },
        sarcastic: {
          quotes: [
            'الروينة ناضت ونهاية العالم قربات.. وجد الفشار.',
            'الرعد كايضرب فالسما والجو مكهرب بحال الباك.',
          ],
          advice: 'ما تمشيش شاد تيو د الحديد ومطلعو للسما.',
          excuses: [
            'كانفاوض الرعد باش يسكت شي شوية.',
            'البرق ضرب ليا المورال والفياق.',
          ],
        },
        roast: {
          quotes: [
            'الطبيعة كاتغوت عليك نتا بالخصوص وتفركع ليك وذنيك.',
            'الرعد كايزمجر ملي شاف التاريخ د المتصفح ديالك.',
          ],
          advice: 'تخبع تحت الناموسية وماتخرجش حتى تسالي الروينة.',
          excuses: [
            'كانبني سفينة نوح فالصالون دابا.',
            'احتمال يضربني البرق كبر من احتمالية نوض نقضي شي غرض.',
          ],
        },
      },
      unknown: {
        label: 'مخلط',
        calm: { quotes: ['أجواء عادية ومستقرة.'], advice: 'نهاركم مبروك.', excuses: ['كانستناو الأقمار الاصطناعية تجيب الخبار.'] },
        sarcastic: { quotes: ['حتى الساتيليت تلف وماعرف والو.'], advice: 'طل من الشرجام بعينيك.', excuses: ['مول الأرصاد عطى استقالتو.'] },
        roast: { quotes: ['حتى ناسا مافهمات والو فهاد الجو ديالكم.'], advice: 'سلك راسك براسك.', excuses: ['السيرفر ضربات فيه التلفة.'] },
      },
    },

    // Prayer
    prayer: {
      title: 'أوقات الصلاة',
      fajr: 'الفجر',
      sunrise: 'الشروق',
      dhuhr: 'الضهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشا',
      nextPrayer: 'الصلاة الجاية',
      remaining: 'باقي ليها',
      passed: 'دازت عليها',
      qiblaTitle: 'اتجاه القبلة الشريفة',
      qiblaDegree: 'على الشمال',
      hijriDate: 'التاريخ الهجري',
      method: 'حساب الصلاة',
      methods: {
        habous: 'وزارة الأوقاف والشؤون الإسلامية (المغرب)',
        mwl: 'رابطة العالم الإسلامي',
        makkah: 'أم القرى (مكة المكرمة)',
        egypt: 'الهيئة المصرية العامة للمساحة',
      },
      athanToggle: 'تنبيه الأذان',
    },
  },
};
