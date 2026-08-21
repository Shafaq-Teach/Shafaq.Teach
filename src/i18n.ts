export type Lang = "ug" | "en" | "ar" | "tr";

export interface ProjectDetail {
  title: string;
  tagline: string;
  category: string;
  tags: string[];
  features: string[];
  deliverables: string;
}

export interface ReviewItem {
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TechItem {
  name: string;
  desc: string;
  icon: string;
}

export interface TechGroup {
  groupName: string;
  items: TechItem[];
}

export const copy = {
  ug: {
    brand: "شەپەق تېخنىكا سەھىپىسى",
    nav: { home: "باش بەت", about: "بىز ھەققىدە", services: "مۇلازىمەت", work: "ئەسەرلەر", process: "جەريان", contact: "ئالاقە", dashboard: "باشقۇرۇش سۇپىسى" },
    kicker: "لايىھە · يۇمشاق دېتال · سىستېما",
    heroTitle: "گرافىكتىن سىستېمىغىچە — بىر شەپەقتە تامام.",
    heroLead:
      "گرافىك، ئېلان، تور بەت، ئاندىروئىد ئەپ، ئىشخانا ئاپتوماتلاشتۇرۇش ۋە ئاشخانا زاكاز سىستېمىسى. زامانىۋى، كۆپ تىللىق، سېتىشقا ياردەم بېرىدىغان ھەل قىلىش چارىسى.",
    cta: "تۈر باشلاش",
    cta2: "ئەسەر كۆرۈش",
    
    // Stats
    statsTitle: "سانلىق مەلۇمات ۋە نەتىجىلەر",
    stats: [
      { val: "50+", label: "تاماملانغان تۈر", sub: "دۆلەت ئىچى ۋە خەلقئارالىق" },
      { val: "99%", label: "خېرىدار رازىمەنلىكى", sub: "ئەلا سۈپەت ۋە ئىشەنچ" },
      { val: "6+", label: "تېخنىكا مۇلازىمەت تۈرى", sub: "لايىھەدىن كودقىچە" },
      { val: "24/7", label: "تېز تېخنىكىلىق قوللاش", sub: "ئۈزلۈكسىز كاپالەت" },
    ],

    // About
    aboutTitle: "كىم؟ نېمە ئۈچۈن؟",
    about:
      "بىر كىشىلىك تولۇق دەۋر ئىستۇدىيە: كۆرۈنمە لايىھەدىن مەھسۇلات يۇمشاق دېتالىغىچە. رېستوران، سودا، ئىشخانا ۋە خەلقئارا خېرىدارلار ئۈچۈن — ئىشەنچ ۋە ئېنىق نەتىجە.",
    aboutWish: "ئەلا سۈپەت، مول تەجرىبە، تېز سۈرئەت ۋە سىزنى رازى قىلىش بىزنىڭ ئارزۇيىمىز.",

    // Tech Stack
    techTitle: "ئىشلىتىدىغان تېخنىكا ۋە قوراللار",
    techSubtitle: "خەلقئارالىق ئەڭ ئالدىنقى قاتاردىكى قوراللار بىلەن ئىشەنچلىك مەھسۇلات يارىتىمىز",
    techGroups: [
      {
        groupName: "كۆرۈنمە ۋە گرافىك لايىھە",
        items: [
          { name: "Figma", desc: "UI/UX كۆرۈنمە يۈزى", icon: "🎨" },
          { name: "Photoshop", desc: "سۈرەت ۋە ئېلان لايىھە", icon: "🖼️" },
          { name: "Illustrator", desc: "ۋېكتور ۋە لوگو كىملىكى", icon: "✒️" },
          { name: "After Effects", desc: "ھەرىكەتلىك گرافىك ۋە سىن", icon: "🎬" },
        ],
      },
      {
        groupName: "تور ۋە كودلاش تېخنىكىسى",
        items: [
          { name: "React / Vite", desc: "زامانىۋى يۇقىرى سۈرئەتلىك يۈز", icon: "⚛️" },
          { name: "TypeScript", desc: "قاتتىق تىپلىق بىخەتەر كود", icon: "📘" },
          { name: "Tailwind / CSS3", desc: "ماسلىشىشچان رەڭ ۋە لايىھە", icon: "💅" },
          { name: "Next.js", desc: "تولۇق SSR ۋە SEO كۈچەيتكۈچ", icon: "⚡" },
        ],
      },
      {
        groupName: "يانفون، ئاپتوماتلاشتۇرۇش ۋە POS",
        items: [
          { name: "Android / Kotlin", desc: "ئەسلىي كۆچمە ئەپ ياساش", icon: "📱" },
          { name: "Flutter", desc: "كۆپ سۇپىلىق كۆچمە ھەل قىلىش", icon: "🦋" },
          { name: "Python Automation", desc: "سانلىق مەلۇمات ۋە Excel ئېقىمى", icon: "🐍" },
          { name: "POS & Hardware", desc: "پىرىنتېر، سېنزور، QR سىستېما", icon: "🖨️" },
        ],
      },
    ],

    // Services
    servicesTitle: "ئالتە مۇلازىمەت",
    services: [
      { t: "گرافىك لايىھە", d: "لوگو، كىملىك سىستېمىسى، چاپلاش، ئورالما، سوتسىيال يۈزى." },
      { t: "ئېلان", d: "سىتاتىك ۋە ھەرىكەتلىك ئېلان، كىچىك سىن، كامپانىيە كۆرۈنمىسى." },
      { t: "تور بەت", d: "پورتفولىيو، سودا بېكىتى، كۆپ تىل، SEO، باشقۇرۇش تاختىسى." },
      { t: "ئاندىروئىد ئەپ", d: "Kotlin / Flutter، دۇكانقا چىقىرىش، ئىشلەتكۈچى تەجرىبىسى." },
      { t: "ئىشخانا ئاپتوماتلاشتۇرۇش", d: "خادىم، ئامبار، ھېسابات، ھۆججەت ئېقىمى، Excel دىن سىستېمىغا." },
      { t: "ئاشخانا POS", d: "ستول، زاكاز، ئاشپەز ئېكرانى، ھېساب، پىرىنتېر، كۆپ تىل تىزىملىك." },
    ],

    // Works
    workTitle: "تاللانما ئەسەرلەر",
    workHint: "تەپسىلات ۋە ئىشلىتىلگەن تېخنىكىنى كۆرۈش ئۈچۈن كارتىنى چېكىڭ",
    works: [
      { t: "رىستۇران", d: "كۆپ تىللىق زاكاز ۋە ئاشپەز ئېكرانى" },
      { t: "سودا", d: "RTL تور دۇكىنى ۋە باشقۇرۇش" },
      { t: "ماركا", d: "لوگو + قوللانما + سوتسىيال" },
      { t: "ئىشخانا", d: "ئامبار ۋە ھېسابات ئېقىمى" },
    ],
    projectDetails: [
      {
        title: "كۆپ تىللىق ئەقلىي ئاشخانا ۋە QR زاكاز سىستېمىسى",
        tagline: "ستول ئۈستى QR كودتىن ئاشپەز ئېكرانى (KDS) ۋە كاسسىرغىچە تولۇق بىر تۇتاش سىستېما",
        category: "ئاشخانا ۋە مېھمانساراي تېخنىكىسى",
        tags: ["React", "TypeScript", "QR Menu", "KDS Display", "Thermal Print", "Offline-Ready"],
        features: [
          "يانفوندىن سىمسىز QR سىكاننېرلاپ بىر كۇنۇپكا بىلەن تاماق تاللاش ۋە زاكاز بېرىش",
          "ئاشپەز كۆرۈنمە ئېكرانىدا زاكازلارنىڭ ھالىتىنى (تەييارلىنىۋاتىدۇ / پۈتتى) دەل ۋاقتىدا كۆرسىتىش",
          "ئۇيغۇرچە، خەنزۇچە، ئىنگلىزچە ۋە ئەرەبچە كۆپ تىلدا پاراللېل ئىشلەش كاپالىتى",
          "تېرمال بېلەت پىرىنتېرى بىلەن سۈرئەتلىك ئۇلىنىش، ئىنتېرنېت ئۈزۈلسىمۇ يەرلىكتە ئىشلەش",
        ],
        deliverables: "ئىشلەتكۈچى كۆرۈنمىسى + كاسسىر باشقۇرۇش سۇپىسى + ئاشخانا ئېكرانى + بېلەت تەڭشىكى",
      },
      {
        title: "RTL زامانىۋى تور دۇكىنى ۋە ئېلېكترونلۇق سودا سۇپىسى",
        tagline: "سېتىشنى تېز ئاشۇرۇش ئۈچۈن مەخسۇس لايىھەلەنگەن يۇقىرى سۈرئەتلىك تور سودا بېكىتى",
        category: "تور سودا ۋە ئېلېكترونلۇق تىجارەت",
        tags: ["Next.js", "React", "Tailwind CSS", "Cart & Checkout", "Admin Panel", "SEO"],
        features: [
          "ئۇيغۇرچە ۋە ئەرەبچە ئوڭدىن-سولغا (RTL) ئالاھىدە نۇقسانسىز يۈرۈشۈش",
          "كۆچمە يانفونلارغا %100 ماسلاشقان، يۇقىرى دەرىجىدىكى زامانىۋى مال سېتىۋېلىش تەجرىبىسى",
          "سېتىش تۈرلىرى، ئامبار قالدۇقى ۋە زاكازلارنى تولۇق نازارەت قىلىدىغان باشقۇرغۇچى تاختىسى",
          "WhatsApp، تېلېگرام ياكى بىۋاسىتە چىقىم قىلىش ئۇسۇللىرى تولۇق ئۇلانغان",
        ],
        deliverables: "باش بەت + مەھسۇلات كۆرگەزمىسى + مال سېۋىتى + باشقۇرغۇچى تاختىسى (Admin)",
      },
      {
        title: "شىركەت ۋە سودا ئورۇنلىرىنىڭ كۆرۈنمە كىملىك (VI) لايىھەسى",
        tagline: "خېرىدارلارنىڭ كاللىسىدا ئۆچمەس تەسىرات قالدۇرىدىغان ئۆزگىچە ماركا ئوبرازى",
        category: "گرافىك لايىھە ۋە ماركا كىملىكى",
        tags: ["Logo Design", "Brand Identity", "Brand Guidelines", "Social Assets", "Typography"],
        features: [
          "ئۇيغۇرچە سالاپەتلىك خەت نۇسخىلىرى بىلەن زامانىۋى سەنئەت يۇغۇرۇلغان ئۆزگىچە لوگو",
          "شىركەت رەسمىي ھۆججەتلىرى، خىزمەت كىنىشكىسى، ئىسىم كارتىسى ۋە ئورالما كۆرۈنۈشلىرى",
          "سوتسىيال تاراتقۇلاردا ئېلان چىقىرىشقا قولايلىق قېلىپلار ۋە ۋېكتورلۇق ئەسلى ھۆججەتلەر",
          "تولۇق كۆرۈنمە ئۆلچەم كىتابچىسى (Brand Style Guidelines PDF)",
        ],
        deliverables: "ۋېكتور ھۆججەت (AI/EPS/SVG) + بارلىق رازمېردىكى PNG/JPG + كىملىك قوللانمىسى",
      },
      {
        title: "ئىشخانا ئاپتوماتلاشتۇرۇش ۋە كارخانا ئامبار-ھېسابات سىستېمىسى",
        tagline: "قالايمىقان قەغەز ۋە Excel جەدۋەللىرىنى دەل ۋاقتىدا ئىشلەيدىغان ئەقلىي سىستېمىغا ئايلاندۇرۇش",
        category: "ئىشخانا يۇمشاق دېتالى ۋە ئاپتوماتلاشتۇرۇش",
        tags: ["Python", "Automation", "Excel Importer", "Inventory Ledger", "Role Access"],
        features: [
          "كونا قالايمىقان Excel ھۆججەتلىرىدىكى سانلىق مەلۇماتلارنى بىر كۇنۇپكا بىلەن كۆچۈرۈش",
          "ئامبارغا كىرىم-چىقىم بولغان مەھسۇلاتلارنى ۋە خادىملار ئىشىنى ئاپتوماتىك خاتىرىلەش",
          "ئايلىق سودا سوممىسى ۋە پايدا-زىياننى چۈشىنىشلىك دىئاگراممىلاردا سېلىشتۇرۇش",
          "سانلىق مەلۇماتنى ھەر كۈنى ئاپتوماتىك زاپاسلاش ۋە يوقاپ كېتىشنىڭ ئالدىنى ئېلىش",
        ],
        deliverables: "ئىشخانا دېتالى + Excel يۆتكەش قورالى + مەشغۇلات سىن قوللانمىسى + قاچىلاش ياردىمى",
      },
    ],

    // Project Estimator
    estimatorTitle: "ئەقلىي تۈر باھاسى مۆلچەرلىگۈچ",
    estimatorSubtitle: "ئېھتىياجىڭىزنى تاللاڭ، مۆلچەر سۈرئەت ۋە تەپسىلاتلارنى بىلىۋېلىڭ",
    estService: "مۇلازىمەت تۈرى:",
    estScale: "تۈر كۆلىمى:",
    estAddons: "قوشۇمچە تەلەپلەر:",
    estServices: [
      { id: "web", name: "تور بېكەت (Website)", baseDays: 5 },
      { id: "app", name: "ئاندىروئىد ئەپ (Android App)", baseDays: 8 },
      { id: "pos", name: "ئاشخانا POS سىستېمىسى", baseDays: 6 },
      { id: "office", name: "ئىشخانا ئاپتوماتلاشتۇرۇش", baseDays: 5 },
      { id: "brand", name: "ماركا ۋە لوگو لايىھەسى", baseDays: 3 },
    ],
    estScales: [
      { id: "quick", name: "تېز سۈرئەتلىك (ئاساسىي نۇسخا)", multiplier: 1 },
      { id: "pro", name: "كەسپىي ئۆلچەم (تولۇق كۈچلۈك)", multiplier: 1.4 },
      { id: "custom", name: "كارخانا دەرىجىلىك (مەخسۇس قۇرۇلما)", multiplier: 1.8 },
    ],
    estAddonList: [
      { id: "multilang", name: "كۆپ تىللىق سىستېما (UG / EN / AR / TR)" },
      { id: "admin", name: "مۇستەقىل ئارقا سۇپا باشقۇرۇش تاختىسى" },
      { id: "payment", name: "بىۋاسىتە پۇل تۆلەش / زاكاز ئۇلىنىشى" },
      { id: "support", name: "1 يىللىق تېخنىكىلىق كاپالەت ۋە ئاسراش" },
    ],
    estResultDays: "مۆلچەردىكى پۈتۈش ۋاقتى:",
    estResultDaysUnit: "خىزمەت كۈنى ئەتراپىدا",
    estRequestBtn: "بۇ تۈرنى بىۋاسىتە زاكاز قىلىش",

    // Testimonials
    reviewsTitle: "خېرىدارلار باھاسى",
    reviewsSubtitle: "بىز بىلەن ھەمكارلاشقان خېرىدارلارنىڭ ئەمەلىي سۆزلىرى",
    reviews: [
      {
        name: "ئۆمەرجان",
        role: "ئاشخانا مەسئۇلى",
        company: "شەپەق لەغمەن ۋە قورۇما سارىيى",
        avatar: "👨‍🍳",
        rating: 5,
        text: "ئاشخانىمىزغا QR كودلۇق كۆپ تىللىق زاكاز ۋە ئاشپەز ئېكرانىنى ئورناتقاندىن كېيىن، زاكاز ئېلىش سۈرئىتى 2 ھەسسە تېزلەشتى. خېرىدارلارمۇ بەك رازى بولدى، قەتئىي تەۋسىيە قىلىمەن!",
      },
      {
        name: "مەلىكە",
        role: "ماركا قۇرغۇچىسى",
        company: "نەپىس بۇتېك تور سودىسى",
        avatar: "👩‍💼",
        rating: 5,
        text: "تور دۇكىنىمىزنىڭ يۈكلىنىش سۈرئىتى، ئۇيغۇرچە كۆرۈنمە يۈزى ۋە پۇل تۆلەش قولايلىقلىقى ئىنتايىن يۇقىرى سەۋىيەدە چىقتى. زاكازلىرىمىز خېلى كۆپەيدى، رەھمەت سىزگە!",
      },
      {
        name: "ئابدۇللاھ",
        role: "كارخانا دىرېكتورى",
        company: "تەڭرىتاغ سودا-سانائەت گۇرۇپپىسى",
        avatar: "👨‍💼",
        rating: 5,
        text: "ئىشخانىمىزنىڭ ئامبار ۋە ھېسابات قالايمىقانچىلىقى تۈگەپ، بارلىق سانلىق مەلۇماتلار ئاپتوماتلاشتى. بىر كۇنۇپكا بىلەنلا ئايلىق دوكلات چىقىرىۋاتىمىز، ۋاقتىمىز بەك تېجەلدى.",
      },
    ],

    // FAQ
    faqTitle: "كۆپ سورىلىدىغان سوئاللار (FAQ)",
    faqSubtitle: "خېرىدارلار ئەڭ كۆپ قىزىقىدىغان سوئاللار ۋە جاۋابلار",
    faqs: [
      {
        q: "1. تۈر باشلاش باسقۇچى ۋە تەرتىپى قانداق بولىدۇ؟",
        a: "دەسلەپتە سىز بىلەن ئېھتىياجىڭىزنى تەپسىلىي مۇلاھىزە قىلىپ پىلان تۈزىمىز. سىز تەلەپكە ماقۇل بولغاندىن كېيىن كۆرۈنمە لايىھەنى كۆرسىتىمىز، ئاندىن پىروگرامما كودلاپ، سىناقتىن ئۆتكۈزۈپ تاپشۇرىمىز.",
      },
      {
        q: "2. بىر تۈر ئادەتتە قانچە كۈندە پۈتىدۇ؟",
        a: "لوگو ۋە ئېلان لايىھەلىرى 1-3 كۈندە؛ تور بېكەت ۋە ئاشخانا POS سىستېمىسى 5-10 كۈن ئىچىدە؛ مۇرەككەپ يانفون ئەپلىرى ياكى چوڭ ئاپتوماتلاشتۇرۇش تۈرلىرى 2-3 ھەپتە ئىچىدە تولۇق تاماملىنىدۇ.",
      },
      {
        q: "3. كېيىنكى تېخنىكىلىق كاپالەت ۋە ئاسراش بارمۇ؟",
        a: "ھەئە، ئەلۋەتتە! تاپشۇرۇلغان ھەربىر تۈرگە ھەقسىز كاشىلا تۈزىتىش، كېرەكلىك يېتەكلەش ۋە قەرەللىك تېخنىكىلىق قوللاش مۇلازىمىتى تولۇق كاپالەتلەندۈرۈلىدۇ.",
      },
      {
        q: "4. باشقا شەھەر ياكى چەتئەلدىن تور ئارقىلىق ھەمكارلاشساق بولامدۇ؟",
        a: "پۈتۈنلەي بولىدۇ. بىز WhatsApp، Telegram، WeChat ۋە ئېلخەت ئارقىلىق يىراقتىن پۈتۈن دۇنيادىكى خېرىدارلار بىلەن ئۈنۈملۈك ھەمكارلىشىپ كېلىۋاتىمىز.",
      },
      {
        q: "5. باھا ۋە ھەق تۆلەش تەرتىپى قانداق بېكىتىلىدۇ؟",
        a: "باھا تۈرنىڭ ئەمەلىي مۇرەككەپلىكىگە قاراپ ئەڭ مۇۋاپىق ھېسابلىنىدۇ. ئادەتتە تۈر باشلانغاندا ئالدىن پۇل، تۈر پۈتۈپ تولۇق رازى بولغاندىن كېيىن ئاخىرقى قالدۇق پۇل تاپشۇرۇلىدۇ.",
      },
    ],

    // Process
    processTitle: "ئىش جەريانى",
    steps: ["سۆھبەت", "لايىھە", "ياساش", "سىناق", "يوللاش", "قوللاش"],

    // Direct Contacts
    directContactTitle: "بىۋاسىتە ۋە تېز ئالاقىلىشىڭ",
    directContactSubtitle: "بىر چېكىش بىلەن زاكاز ياكى مەسلىھەت سوراڭ",
    whatsappBtn: "WhatsApp تا سۆزلىشىش",
    telegramBtn: "Telegram غا ئۇچۇر قىلىش",
    wechatBtn: "WeChat كۆرۈش",
    copyEmailBtn: "ئېلخەتنى كۆچۈرۈش",
    copiedToast: "ئېلخەت ئادرېسى كۆچۈرۈلدى!",
    phoneCallBtn: "تېلېفون قىلىش",

    // Contact form
    contactTitle: "تۈرۈڭىزنى سۆزلەڭ",
    name: "ئىسىم ياكى شىركەت نامى",
    msg: "تۈرىڭىز ياكى تەلەپلىرىڭىزنى تەپسىلىي بايان قىلىڭ...",
    send: "ئەۋەتىش",
    theme: "تېما",
    mode: { dark: "كېچە", light: "كۈندۈز" },
    themes: { ember: "ئالتۇن شەپەق", caspian: "كەسپىي تېڭىز", orchid: "بىنەپشە كېچە" },
    footer: "© 2026 شەپەق تېخنىكا سەھىپىسى — كەسپىي تېخنىكا ۋە لايىھە ھەل قىلىش چارىلىرى",
    ads: [
      "يېڭى: كۆپ تىللىق ئاشخانا POS — بىر ھەپتە ئىچىدە ئورنىتىش",
      "تور بەت + ئاندىروئىد ئەپ بىرلىكتە 20% ئېتىبار",
      "ئىشخانا ئاپتوماتلاشتۇرۇش: Excel دىن سىستېمىغا بىخەتەر كۆچۈرۈش",
    ],

    // DASHBOARD TRANSLATIONS
    dash: {
      title: "شەپەق تېخنىكا — باشقۇرۇش سۇپىسى",
      backToSite: "🌐 ئالدى بەتكە قايتىش",
      navOverview: "📊 ئومۇمىي مەلۇمات",
      navKanban: "📋 تۈر ئېقىمى (Kanban)",
      navLeads: "✉️ خېرىدار CRM",
      navCms: "🎨 ئەسەرلەر CMS",
      navInvoices: "🧾 باھا & Invoice",
      navPos: "🖨️ POS كۆزىتىش",
      navSettings: "⚙️ سىستېما تەڭشىكى",
      kpiRevenue: "ئومۇمىي تىجارەت كىرىمى",
      kpiRevenueSub: "+18.4% بۇ ئايلىق ئېشىش",
      kpiProjects: "ئاكتىپ تۈرلەر",
      kpiProjectsSub: "4 تۈر لايىھەدە، 4 تۈر كودلاشتا",
      kpiLeads: "يېڭى زاكاز & تەلەپلەر",
      kpiLeadsSub: "بۇ ھەپتە كەلگەن 5 يېڭى خېرىدار",
      kpiNodes: "توردا POS تۈگۈنلىرى",
      kpiNodesSub: "100% نورمال ئۇلانغان",
      monthlyGrowth: "ئايلىق تىجارەت ۋە پۈتكەن تۈرلەر ئېقىمى",
      recentActivities: "ئەڭ يېڭى ھەرىكەتلەر ۋە زاكازلار",
    },

    // 3 HIGHLIGHT PROPOSITION CARDS (سودىڭىزنى زامانىۋى تېخنىكا بىلەن...)
    ctaBanner: {
      cards: [
        {
          badge: "01 · زامانىۋى تېخنىكا",
          text: "سودىڭىزنى زامانىۋى تېخنىكا بىلەن قوراللاپ، رىقابەتتە ئالدىغا ئۆتۈپ كېتىشنى ئويلاپ باقتىڭىزمۇ؟",
          icon: "🚀",
        },
        {
          badge: "02 · تەننەرخ ۋە ئۈنۈم",
          text: "تەننەرخنى تېجەپ، خىزمەت ئۈنۈمىڭىزنى يېڭى بىر پەللىگە كۆتۈرۈشنى خالامسىز؟",
          icon: "📈",
        },
        {
          badge: "03 · ھازىرلا باشلاڭ",
          text: "نېمىگە ساقلايسىز ئۇنداقتا، بىز بىلەن ئالاقىلىشىڭ!",
          icon: "⚡",
          btnText: "ئالاقىلىشىش ➔",
        },
      ],
    },

    // USERNAME & PASSWORD AUTH / FORGOT PASSWORD / CHANGE PASSWORD
    auth: {
      loginTitle: "باشقۇرغۇچى كىرىش",
      loginSubtitle: "باشقۇرۇش سۇپىسىغا كىرىش ئۈچۈن User Name ۋە Password كىرگۈزۈڭ",
      userLabel: "ئىشلەتكۈچى نامى (User Name):",
      userPlaceholder: "admin",
      passLabel: "مەخپىي نومۇر (Password):",
      passPlaceholder: "••••••••",
      loginBtn: "كىرىش ➔",
      rememberMe: "كىرىش ھالىتىنى ساقلاش",
      forgotPass: "مەخپىي نومۇرنى ئۇنتۇپ قالدىڭىزمۇ؟",
      forgotTitle: "مەخپىي نومۇرنى ئەسلەش ۋە قايتا تەڭشەش",
      forgotHintText: "سۈكۈتتىكى باشقۇرغۇچى نامى «admin»، دەسلەپكى مەخپىي نومۇر «admin123». تۆۋەندىن بىۋاسىتە يېڭى مەخپىي نومۇر بېكىتەلەيسىز:",
      resetNewPassLabel: "يېڭى مەخپىي نومۇر بەلگىلەش:",
      resetBtn: "مەخپىي نومۇرنى يېڭىلاش 💾",
      resetSuccess: "مەخپىي نومۇر مۇۋەپپەقىيەتلىك يېڭىلاندى!",
      changePassTitle: "مەخپىي نومۇرنى ئۆزگەرتىش",
      oldPassLabel: "نۆۋەتتىكى مەخپىي نومۇر:",
      newPassLabel: "يېڭى مەخپىي نومۇر:",
      confirmPassLabel: "يېڭى مەخپىي نومۇرنى جەزملەش:",
      changePassBtn: "مەخپىي نومۇرنى ساقلاش 💾",
      changeSuccess: "مەخپىي نومۇر مۇۋەپپەقىيەتلىك ئۆزگەرتىلدى!",
      mismatchError: "يېڭى مەخپىي نومۇر ئىككى قېتىمدا ئوخشاش كىرگۈزۈلمىدى!",
      wrongOldPass: "نۆۋەتتىكى مەخپىي نومۇر خاتا!",
      loginSuccess: "خۇش كەپسىز! كىملىكىڭىز مۇۋەپپەقىيەتلىك دەلىللەندى.",
      loginError: "ئىشلەتكۈچى نامى ياكى مەخپىي نومۇر خاتا! (سۈكۈتتىكى: admin / admin123)",
      logout: "چىقىپ كېتىش 🔒",
      loggedOut: "باشقۇرۇش سۇپىسىدىن چىقىرىلدى.",
      defaultHint: "سۈكۈتتىكى: admin / admin123",
      backToLogin: "← كىرىش كۆزنىكىگە قايتىش",
    },
  },

  tr: {
    brand: "Şafak Teknoloji Merkezi",
    nav: { home: "Ana Sayfa", about: "Hakkımızda", services: "Hizmetler", work: "Projeler", process: "Süreç", contact: "İletişim", dashboard: "Yönetim Paneli" },
    kicker: "Tasarım · Yazılım · Sistemler",
    heroTitle: "Grafikten Sistemlere — Tek Şafakta Teslim.",
    heroLead:
      "Marka tasarımı, reklam, web siteleri, Android uygulamaları, ofis otomasyonu ve restoran sipariş sistemleri. Modern, çok dilli, satış odaklı çözümler.",
    cta: "Proje Başlat",
    cta2: "Projeleri Gör",

    // Stats
    statsTitle: "Başarılar ve Rakamlar",
    stats: [
      { val: "50+", label: "Tamamlanan Proje", sub: "Yurtiçi ve uluslararası" },
      { val: "99%", label: "Müşteri Memnuniyeti", sub: "Üstün kalite ve güven" },
      { val: "6+", label: "Uzmanlık Alanı", sub: "Tasarımdan kodlamaya" },
      { val: "24/7", label: "Teknik Destek", sub: "Kesintisiz hizmet garantisi" },
    ],

    // About
    aboutTitle: "Biz Kimiz ve Neden Biz?",
    about:
      "Tasarım konseptinden çalışan yazılım ürününe kadar tam döngü teknoloji stüdyosu. Restoranlar, e-ticaret, ofisler ve uluslararası müşteriler için net sonuçlar ve güvenilirlik.",
    aboutWish: "Mükemmel kalite, zengin deneyim, hızlı teslimat ve memnuniyetiniz — en büyük arzumuzdur.",

    // Tech Stack
    techTitle: "Kullanılan Teknolojiler ve Araçlar",
    techSubtitle: "Hız, kararlılık ve ölçeklenebilirlik için sektör lideri modern araçlar",
    techGroups: [
      {
        groupName: "Görsel ve Grafik Tasarım",
        items: [
          { name: "Figma", desc: "Modern UI/UX arayüzleri", icon: "🎨" },
          { name: "Photoshop", desc: "Dijital grafik ve afişler", icon: "🖼️" },
          { name: "Illustrator", desc: "Vektörel logo ve kimlik", icon: "✒️" },
          { name: "After Effects", desc: "Hareketli grafik ve video", icon: "🎬" },
        ],
      },
      {
        groupName: "Web ve Frontend Geliştirme",
        items: [
          { name: "React / Vite", desc: "Yüksek performanslı web", icon: "⚛️" },
          { name: "TypeScript", desc: "Güvenli ve temiz kod", icon: "📘" },
          { name: "Tailwind / CSS3", desc: "Duyarlı modern arayüz", icon: "💅" },
          { name: "Next.js", desc: "Tam kapsamlı SSR ve SEO", icon: "⚡" },
        ],
      },
      {
        groupName: "Mobil, Otomasyon ve POS Donanımı",
        items: [
          { name: "Android / Kotlin", desc: "Yerel mobil uygulamalar", icon: "📱" },
          { name: "Flutter", desc: "Çok platformlu yazılım", icon: "🦋" },
          { name: "Python Automation", desc: "Veri ve Excel otomasyonu", icon: "🐍" },
          { name: "POS & Hardware", desc: "Termal yazıcı, QR ve KDS", icon: "🖨️" },
        ],
      },
    ],

    // Services
    servicesTitle: "Altı Ana Hizmetimiz",
    services: [
      { t: "Grafik Tasarım", d: "Logo, kurumsal kimlik, baskı, ambalaj ve sosyal medya görselleri." },
      { t: "Reklam & Tanıtım", d: "Statik ve hareketli reklamlar, kısa videolar ve kampanya tasarımları." },
      { t: "Web Siteleri", d: "Portfolyo, e-ticaret siteleri, çok dilli sistemler, SEO ve yönetim paneli." },
      { t: "Android Uygulamaları", d: "Kotlin / Flutter ile mağaza yayını ve üstün kullanıcı deneyimi." },
      { t: "Ofis Otomasyonu", d: "Personel, stok, muhasebe ve Excel'den güvenli sistem geçişi." },
      { t: "Restoran & POS", d: "Masa QR menü, sipariş, mutfak ekranı (KDS), adisyon ve yazıcı entegrasyonu." },
    ],

    // Works
    workTitle: "Seçilmiş Projeler",
    workHint: "Detayları ve kullanılan teknolojileri görmek için karta tıklayın",
    works: [
      { t: "Restoran POS", d: "Çok dilli QR sipariş ve mutfak ekranı" },
      { t: "E-Ticaret", d: "Modern RTL/LTR online mağaza ve yönetim" },
      { t: "Marka Kimliği", d: "Logo + kurumsal kılavuz + sosyal medya" },
      { t: "Ofis ERP", d: "Stok ve muhasebe otomasyonu" },
    ],
    projectDetails: [
      {
        title: "Çok Dilli Akıllı Restoran ve QR Sipariş Sistemi",
        tagline: "Masadan QR sipariş, Mutfak Ekranı (KDS) ve kasa adisyon yönetiminin uçtan uca entegrasyonu",
        category: "Restoran ve Otomasyon Teknolojisi",
        tags: ["React", "TypeScript", "QR Menu", "KDS Display", "Thermal Print", "Offline-Ready"],
        features: [
          "Masadaki QR kod ile temassız sipariş ve anında ödeme seçeneği",
          "Mutfak ekranında sipariş durumlarının (Hazırlanıyor / Hazır) anlık takibi",
          "Uygurca, Türkçe, İngilizce ve Arapça tam çok dilli menü desteği",
          "Termal fiş yazıcıları ile tam uyum ve internet kesintisinde yerel çalışma",
        ],
        deliverables: "Müşteri Arayüzü + Kasa Yönetim Paneli + Mutfak Ekranı + Yazıcı Köprüsü",
      },
      {
        title: "Modern RTL/LTR E-Ticaret Platformu ve Mağaza",
        tagline: "Yüksek dönüşüm ve hızlı mobil alışveriş için tasarlanmış online ticaret sistemi",
        category: "E-Ticaret ve Dijital Satış",
        tags: ["Next.js", "React", "Tailwind CSS", "Cart & Checkout", "Admin Panel", "SEO"],
        features: [
          "Sağdan sola (RTL) ve soldan sağa (LTR) mükemmel çift yönlü dil desteği",
          "Mobil cihazlara %100 uyumlu, yıldırım hızında yüklenen modern sepet deneyimi",
          "Stok, ürünler, siparişler ve indirim kuponlarını yöneten güçlü admin paneli",
          "WhatsApp doğrudan sipariş ve özel ödeme altyapıları entegre",
        ],
        deliverables: "Mağaza Arayüzü + Ürün Vitrini + Sepet Sistemi + Yönetim Paneli",
      },
      {
        title: "Kurumsal Görsel Kimlik ve Marka Tasarımı (VI)",
        tagline: "Müşterilerinizin zihninde kalıcı güven oluşturan özgün ve prestijli marka kimliği",
        category: "Grafik Tasarım ve Marka Stratejisi",
        tags: ["Logo Design", "Brand Identity", "Brand Guidelines", "Social Assets", "Typography"],
        features: [
          "Uygurca, Türkçe ve evrensel hat sanatını modern estetikle birleştiren logo",
          "Resmi evraklar, kartvizit, ambalaj ve kurumsal promosyon tasarımları",
          "Sosyal medya reklam şablonları ve orijinal vektörel kaynak dosyaları",
          "Kapsamlı Kurumsal Kimlik Kılavuzu (Brand Style Guidelines PDF)",
        ],
        deliverables: "Vektörel Dosyalar (AI/EPS/SVG) + Yüksek Çözünürlüklü PNG/JPG + Kimlik Kitapçığı",
      },
      {
        title: "Ofis İş Akışı Otomasyonu ve Stok-Muhasebe ERP",
        tagline: "Karmaşık kağıt ve Excel tablolarını gerçek zamanlı akıllı dijital sisteme dönüştürme",
        category: "Ofis Yazılımları ve Otomasyon",
        tags: ["Python", "Automation", "Excel Importer", "Inventory Ledger", "Role Access"],
        features: [
          "Eski Excel tablolarındaki verileri tek tuşla güvenli veritabanına aktarma",
          "Stok giriş-çıkışları, gelir-gider ve personel görevlerini otomatik kaydetme",
          "Aylık finansal raporları ve kâr-zarar grafiklerini saniyeler içinde oluşturma",
          "Her gün otomatik veri yedekleme ve yüksek güvenlik koruması",
        ],
        deliverables: "Masaüstü Uygulama + Excel Aktarım Aracı + Kullanım Videosu + Kurulum Desteği",
      },
    ],

    // Project Estimator
    estimatorTitle: "Akıllı Proje Fiyat ve Süre Hesaplayıcı",
    estimatorSubtitle: "İhtiyaçlarınızı seçin, tahmini teslim süresini ve detayları anında görün",
    estService: "Hizmet Türü:",
    estScale: "Proje Kapsamı:",
    estAddons: "Özel Özellikler:",
    estServices: [
      { id: "web", name: "Web Sitesi (Website)", baseDays: 5 },
      { id: "app", name: "Android Uygulama (App)", baseDays: 8 },
      { id: "pos", name: "Restoran POS Sistemi", baseDays: 6 },
      { id: "office", name: "Ofis Otomasyonu", baseDays: 5 },
      { id: "brand", name: "Marka ve Logo Tasarımı", baseDays: 3 },
    ],
    estScales: [
      { id: "quick", name: "Hızlı / Temel Sürüm", multiplier: 1 },
      { id: "pro", name: "Profesyonel Standart", multiplier: 1.4 },
      { id: "custom", name: "Kurumsal Özel Mimari", multiplier: 1.8 },
    ],
    estAddonList: [
      { id: "multilang", name: "Çok Dilli Sistem (UG / TR / EN / AR)" },
      { id: "admin", name: "Özel Yönetim Paneli (Admin Dashboard)" },
      { id: "payment", name: "Doğrudan Ödeme / Sipariş Entegrasyonu" },
      { id: "support", name: "1 Yıllık Kesintisiz Teknik Destek ve Bakım" },
    ],
    estResultDays: "Tahmini Teslim Süresi:",
    estResultDaysUnit: "iş günü civarında",
    estRequestBtn: "Bu Proje İçin Teklif İste",

    // Testimonials
    reviewsTitle: "Müşteri Değerlendirmeleri",
    reviewsSubtitle: "Birlikte çalıştığımız değerli iş ortaklarımızın gerçek yorumları",
    reviews: [
      {
        name: "Ömer Can",
        role: "Restoran Müdürü",
        company: "Şafak Lezzet Restoranı",
        avatar: "👨‍🍳",
        rating: 5,
        text: "Restoranımıza çok dilli QR sipariş ve mutfak ekranı kurulduktan sonra sipariş alma hızımız 2 katına çıktı. Müşteriler çok memnun, kesinlikle tavsiye ederim!",
      },
      {
        name: "Melike",
        role: "Marka Kurucusu",
        company: "Nafis Butik E-Ticaret",
        avatar: "👩‍💼",
        rating: 5,
        text: "Online mağazamızın hızı, tipografisi ve ödeme kolaylığı mükemmel seviyede. Mobil satışlarımız açılışın hemen ardından arttı, çok teşekkürler!",
      },
      {
        name: "Abdullah",
        role: "Operasyon Direktörü",
        company: "Tanrı Dağı Sanayi ve Ticaret Grubu",
        avatar: "👨‍💼",
        rating: 5,
        text: "Ofisimizin karmaşık Excel stok takibi sona erdi, tüm iş akışı otomatikleşti. Aylık raporları tek tuşla alıyoruz, çok büyük zaman kazandık.",
      },
    ],

    // FAQ
    faqTitle: "Sıkça Sorulan Sorular (SSS)",
    faqSubtitle: "Çalışma süreci, teslimat ve teknik destek hakkında merak edilenler",
    faqs: [
      {
        q: "1. Projeye başlama süreci ve adımları nasıl ilerler?",
        a: "Öncelikle ihtiyaçlarınızı detaylıca görüşüp plan hazırlıyoruz. Onayınızın ardından prototip tasarımı sunuyor, ardından kodlama, test ve yayına alma aşamalarını tamamlıyoruz.",
      },
      {
        q: "2. Bir proje genellikle kaç günde tamamlanır?",
        a: "Logo ve tanıtım grafikleri 1-3 gün; web siteleri ve restoran POS sistemleri 5-10 gün; kapsamlı mobil uygulamalar veya büyük otomasyon sistemleri 2-3 hafta sürer.",
      },
      {
        q: "3. Teslimat sonrası teknik destek ve garanti var mı?",
        a: "Evet, kesinlikle! Teslim edilen tüm projelere ücretsiz hata düzeltme, kullanım eğitimi ve periyodik teknik bakım garantisi veriyoruz.",
      },
      {
        q: "4. Başka şehir veya ülkelerden uzaktan çalışabilir miyiz?",
        a: "Kesinlikle. WhatsApp, Telegram, Zoom ve e-posta üzerinden dünyanın dört bir yanındaki müşterilerimizle kesintisiz ve verimli iş birliği yapıyoruz.",
      },
      {
        q: "5. Fiyatlandırma ve ödeme koşulları nasıldır?",
        a: "Fiyatlar projenin büyüklüğüne ve kapsamına göre şeffaf şekilde belirlenir. Genellikle başlangıçta ön avans, proje teslim edilip onaylandıktan sonra kalan bakiye ödenir.",
      },
    ],

    // Process
    processTitle: "Çalışma Sürecimiz",
    steps: ["Görüşme", "Tasarım", "Geliştirme", "Test", "Yayın", "Destek"],

    // Direct Contacts
    directContactTitle: "Hızlı ve Doğrudan İletişim",
    directContactSubtitle: "Projenizi hemen başlatmak veya danışmanlık almak için dilediğiniz kanaldan ulaşın",
    whatsappBtn: "WhatsApp ile Yazış",
    telegramBtn: "Telegram ile Mesaj Gönder",
    wechatBtn: "WeChat Görüntüle",
    copyEmailBtn: "E-postayı Kopyala",
    copiedToast: "E-posta adresi panoya kopyalandı!",
    phoneCallBtn: "Telefonla Ara",

    // Contact form
    contactTitle: "Projenizi Anlatın",
    name: "Adınız veya Şirket Adı",
    msg: "Projenizi veya gereksinimlerinizi detaylıca açıklayın...",
    send: "Gönder",
    theme: "Tema",
    mode: { dark: "Gece", light: "Gündüz" },
    themes: { ember: "Şafak Altını", caspian: "Hazar Turkuazı", orchid: "Gece Orkidesi" },
    footer: "© 2026 Şafak Teknoloji Merkezi — Profesyonel Teknoloji ve Tasarım Çözümleri",
    ads: [
      "Yeni: Çok dilli restoran POS — bir hafta içinde kurulum",
      "Web Sitesi + Android uygulama paketinde %20 indirim",
      "Ofis Otomasyonu: Excel'den güvenli sistem geçişi",
    ],

    // DASHBOARD TRANSLATIONS
    dash: {
      title: "Şafak Teknoloji — Yönetim Paneli",
      backToSite: "🌐 Web Sitesine Dön",
      navOverview: "📊 Genel Bakış",
      navKanban: "📋 Proje Akışı (Kanban)",
      navLeads: "✉️ Müşteri CRM",
      navCms: "🎨 Portfolyo CMS",
      navInvoices: "🧾 Fatura & Teklif",
      navPos: "🖨️ POS İzleme",
      navSettings: "⚙️ Sistem Ayarları",
      kpiRevenue: "Toplam Ciro / Gelir",
      kpiRevenueSub: "Bu ay +%18.4 büyüme",
      kpiProjects: "Aktif Projeler",
      kpiProjectsSub: "4 tasarımda, 4 kodlamada",
      kpiLeads: "Gelen Sipariş & Talepler",
      kpiLeadsSub: "Bu hafta 5 yeni müşteri",
      kpiNodes: "Çevrimiçi POS Cihazları",
      kpiNodesSub: "%100 sorunsuz bağlı",
      monthlyGrowth: "Aylık Gelir ve Teslim Edilen Projeler",
      recentActivities: "Son Aktiviteler ve Siparişler",
    },

    // 3 HIGHLIGHT PROPOSITION CARDS
    ctaBanner: {
      cards: [
        {
          badge: "01 · Modern Teknoloji",
          text: "İşinizi modern teknolojiyle güçlendirip rekabette öne geçmeyi hiç düşündünüz mü?",
          icon: "🚀",
        },
        {
          badge: "02 · Maliyet ve Verimlilik",
          text: "Maliyetleri düşürüp iş verimliliğinizi yeni bir zirveye taşımak ister misiniz?",
          icon: "📈",
        },
        {
          badge: "03 · Hemen Başlayın",
          text: "Öyleyse ne bekliyorsunuz? Bizimle hemen iletişime geçin!",
          icon: "⚡",
          btnText: "İletişime Geçin ➔",
        },
      ],
    },

    // USERNAME & PASSWORD AUTH / FORGOT PASSWORD / CHANGE PASSWORD
    auth: {
      loginTitle: "Yönetici Girişi",
      loginSubtitle: "Yönetim paneline erişmek için Kullanıcı Adı ve Şifre girin",
      userLabel: "Kullanıcı Adı (Username):",
      userPlaceholder: "admin",
      passLabel: "Şifre (Password):",
      passPlaceholder: "••••••••",
      loginBtn: "Giriş Yap ➔",
      rememberMe: "Oturumu Açık Tut",
      forgotPass: "Şifrenizi mi unuttunuz?",
      forgotTitle: "Şifre Hatırlatma ve Sıfırlama",
      forgotHintText: "Varsayılan kullanıcı adı «admin», başlangıç şifresi «admin123». Aşağıdan doğrudan yeni şifre belirleyebilirsiniz:",
      resetNewPassLabel: "Yeni Şifre Belirle:",
      resetBtn: "Şifreyi Güncelle 💾",
      resetSuccess: "Şifre başarıyla güncellendi!",
      changePassTitle: "Şifre Değiştir",
      oldPassLabel: "Mevcut Şifre:",
      newPassLabel: "Yeni Şifre:",
      confirmPassLabel: "Yeni Şifre Tekrar:",
      changePassBtn: "Yeni Şifreyi Kaydet 💾",
      changeSuccess: "Şifre başarıyla değiştirildi!",
      mismatchError: "Yeni şifreler birbiriyle eşleşmiyor!",
      wrongOldPass: "Mevcut şifre hatalı!",
      loginSuccess: "Giriş başarılı! Hoş geldiniz.",
      loginError: "Kullanıcı adı veya şifre hatalı! (Varsayılan: admin / admin123)",
      logout: "Çıkış Yap 🔒",
      loggedOut: "Yönetici oturumu kapatıldı.",
      defaultHint: "Varsayılan: admin / admin123",
      backToLogin: "← Giriş Ekranına Dön",
    },
  },

  en: {
    brand: "Shafaq Tech Hub",
    nav: { home: "Home", about: "About us", services: "Services", work: "Work", process: "Process", contact: "Contact", dashboard: "Dashboard" },
    kicker: "Design · Software · Systems",
    heroTitle: "From graphics to systems — finished in one dawn.",
    heroLead:
      "Brand design, ads, websites, Android apps, office automation, and restaurant ordering. Modern, multilingual, built to convert.",
    cta: "Start a project",
    cta2: "See work",

    // Stats
    statsTitle: "Key Achievements & Numbers",
    stats: [
      { val: "50+", label: "Completed Projects", sub: "Local & international" },
      { val: "99%", label: "Client Satisfaction", sub: "Quality & reliability" },
      { val: "6+", label: "Service Domains", sub: "Design to production" },
      { val: "24/7", label: "Active Tech Support", sub: "Ongoing SLA & care" },
    ],

    // About
    aboutTitle: "Who, and why",
    about:
      "A one-person full-cycle studio: visual identity through shipped product software. For restaurants, shops, offices, and international clients — trust and clear outcomes.",
    aboutWish: "Excellent quality, rich experience, fast delivery, and your satisfaction — that is our wish.",

    // Tech Stack
    techTitle: "Technology & Tool Ecosystem",
    techSubtitle: "Built with industry-leading modern tools for speed, stability, and scale",
    techGroups: [
      {
        groupName: "UI/UX & Visual Design",
        items: [
          { name: "Figma", desc: "Interactive UI/UX interfaces", icon: "🎨" },
          { name: "Photoshop", desc: "Digital graphics & promos", icon: "🖼️" },
          { name: "Illustrator", desc: "Vector logos & brand marks", icon: "✒️" },
          { name: "After Effects", desc: "Motion visuals & short ads", icon: "🎬" },
        ],
      },
      {
        groupName: "Web & Frontend Engineering",
        items: [
          { name: "React / Vite", desc: "High-performance reactive web", icon: "⚛️" },
          { name: "TypeScript", desc: "Type-safe robust codebase", icon: "📘" },
          { name: "Tailwind / CSS3", desc: "Pixel-perfect responsive design", icon: "💅" },
          { name: "Next.js", desc: "Full-stack SSR & SEO mastery", icon: "⚡" },
        ],
      },
      {
        groupName: "Mobile, Automation & POS Hardware",
        items: [
          { name: "Android / Kotlin", desc: "Native high-tier mobile apps", icon: "📱" },
          { name: "Flutter", desc: "Multiplatform mobile software", icon: "🦋" },
          { name: "Python Automation", desc: "Data pipelines & Excel engines", icon: "🐍" },
          { name: "POS & Hardware", desc: "Thermal print, QR, KDS setups", icon: "🖨️" },
        ],
      },
    ],

    // Services
    servicesTitle: "Six services",
    services: [
      { t: "Graphic design", d: "Logo, identity systems, print, packaging, social surfaces." },
      { t: "Advertising", d: "Static and motion ads, short video, campaign look." },
      { t: "Websites", d: "Portfolios, commerce, multilingual, SEO, admin." },
      { t: "Android apps", d: "Kotlin / Flutter, store launch, product UX." },
      { t: "Office automation", d: "Staff, inventory, accounting, document flow." },
      { t: "Kitchen POS", d: "Tables, tickets, chef screen, billing, printers." },
    ],

    // Works
    workTitle: "Selected work",
    workHint: "Click on any project to inspect technical details & features",
    works: [
      { t: "Restaurant", d: "Multilingual tickets and chef display" },
      { t: "Commerce", d: "RTL storefront and admin" },
      { t: "Branding", d: "Logo, guide, social kit" },
      { t: "Office", d: "Inventory and ledger flows" },
    ],
    projectDetails: [
      {
        title: "Multilingual Smart Restaurant & QR Ordering System",
        tagline: "End-to-end QR dine-in ordering, Kitchen Display System (KDS), and cashier receipt management",
        category: "Hospitality & POS Engineering",
        tags: ["React", "TypeScript", "QR Menu", "KDS Display", "Thermal Print", "Offline-Ready"],
        features: [
          "Instant contactless menu browsing and ordering right from table QR code",
          "Real-time kitchen order synchronization with cooking status indicators",
          "Full multilingual support for Uyghur, English, Arabic, and Chinese",
          "Seamless thermal printer integration with robust offline resilience",
        ],
        deliverables: "Customer UI + Cashier Admin + Kitchen Display Screen + Thermal Print Bridge",
      },
      {
        title: "Modern RTL E-Commerce Storefront & Engine",
        tagline: "High-converting online store built for supreme performance and seamless mobile checkout",
        category: "E-Commerce & Digital Commerce",
        tags: ["Next.js", "React", "Tailwind CSS", "Cart & Checkout", "Admin Panel", "SEO"],
        features: [
          "Flawless Right-to-Left (RTL) & Left-to-Right (LTR) bidirectional layout support",
          "100% mobile-optimized checkout workflow with blazing fast load speeds",
          "Comprehensive admin dashboard for inventory, sales analytics, and discount codes",
          "Integrated WhatsApp direct order routing and custom checkout gateways",
        ],
        deliverables: "Storefront + Product Showcase + Shopping Bag + Admin Dashboard",
      },
      {
        title: "Corporate Visual Identity & Brand System (VI)",
        tagline: "Distinctive brand mark and comprehensive identity designed to leave lasting trust",
        category: "Graphic Design & Brand Strategy",
        tags: ["Logo Design", "Brand Identity", "Brand Guidelines", "Social Assets", "Typography"],
        features: [
          "Iconic logo crafted with modern multilingual calligraphy harmony",
          "Official stationery, corporate business cards, packaging, and merchandise",
          "High-converting social media templates and vector source files",
          "Comprehensive Brand Style Guidelines PDF specification book",
        ],
        deliverables: "Vector Source (AI/EPS/SVG) + High-Res PNG/JPG + Brand Guidelines PDF",
      },
      {
        title: "Office Workflow Automation & Inventory ERP",
        tagline: "Transform chaotic manual spreadsheets into automated real-time operational workflows",
        category: "Office Software & Automation",
        tags: ["Python", "Automation", "Excel Importer", "Inventory Ledger", "Role Access"],
        features: [
          "One-click migration from legacy Excel sheets to structured databases",
          "Automated tracking of stock movements, expenses, and staff tasks",
          "Interactive visual dashboards with automated monthly P&L summaries",
          "Automated daily backups with rock-solid security guarantees",
        ],
        deliverables: "Desktop App + Excel Migration Script + Video User Guide + Setup Support",
      },
    ],

    // Project Estimator
    estimatorTitle: "Interactive Project Estimator",
    estimatorSubtitle: "Select your project parameters to get an instant estimated turnaround",
    estService: "Service Category:",
    estScale: "Project Scope:",
    estAddons: "Special Features:",
    estServices: [
      { id: "web", name: "Modern Website", baseDays: 5 },
      { id: "app", name: "Android App", baseDays: 8 },
      { id: "pos", name: "Kitchen POS System", baseDays: 6 },
      { id: "office", name: "Office Automation", baseDays: 5 },
      { id: "brand", name: "Brand & Logo Design", baseDays: 3 },
    ],
    estScales: [
      { id: "quick", name: "Essential / Quick Launch", multiplier: 1 },
      { id: "pro", name: "Professional Standard", multiplier: 1.4 },
      { id: "custom", name: "Enterprise Custom Architecture", multiplier: 1.8 },
    ],
    estAddonList: [
      { id: "multilang", name: "Multilingual System (UG / TR / EN / AR)" },
      { id: "admin", name: "Custom Admin Management Dashboard" },
      { id: "payment", name: "Direct Checkout / Payment Gateway" },
      { id: "support", name: "1-Year Extended SLA & Support" },
    ],
    estResultDays: "Estimated Turnaround:",
    estResultDaysUnit: "business days approx.",
    estRequestBtn: "Request Quote for this Scope",

    // Testimonials
    reviewsTitle: "Client Testimonials",
    reviewsSubtitle: "What our verified clients say about working with us",
    reviews: [
      {
        name: "Omerjan",
        role: "Restaurant GM",
        company: "Shafaq Gourmet Dining",
        avatar: "👨‍🍳",
        rating: 5,
        text: "After implementing the multilingual QR ordering and KDS system, our order processing speed doubled. Customers love the convenience and accuracy. Highly recommended!",
      },
      {
        name: "Malika",
        role: "Brand Founder",
        company: "Nafis Boutique Online",
        avatar: "👩‍💼",
        rating: 5,
        text: "The speed and elegant typography of our e-commerce store exceeded all expectations. Mobile sales jumped immediately after rollout. Outstanding craftsmanship!",
      },
      {
        name: "Abdullah",
        role: "Operations Director",
        company: "Tengri Industrial Trade Group",
        avatar: "👨‍💼",
        rating: 5,
        text: "Our chaotic spreadsheet workflow was transformed into an automated system in days. Generating monthly reports now takes seconds instead of hours.",
      },
    ],

    // FAQ
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqSubtitle: "Clear answers to common questions about timelines, process, and support",
    faqs: [
      {
        q: "1. What is the typical process for starting a project?",
        a: "We start by discussing your exact goals and drafting a clear scope. Once approved, we build the prototype design, engineer the software, thoroughly test it, and launch.",
      },
      {
        q: "2. How long does a project typically take?",
        a: "Logo and visual assets take 1-3 days. Websites and kitchen POS setups take 5-10 days. Custom apps or complex enterprise systems take 2-3 weeks.",
      },
      {
        q: "3. Do you provide ongoing maintenance and support?",
        a: "Yes! Every delivered project includes free post-launch bug fixing, onboarding walkthroughs, and guaranteed technical maintenance.",
      },
      {
        q: "4. Can we collaborate remotely from other cities or countries?",
        a: "Absolutely. We work seamlessly with clients worldwide through WhatsApp, Telegram, Zoom, and email.",
      },
      {
        q: "5. How is pricing structured?",
        a: "Pricing is transparent based on project complexity and feature scope. Typically a deposit upon commencement, and the remainder upon final approval.",
      },
    ],

    // Process
    processTitle: "How we work",
    steps: ["Talk", "Design", "Build", "Test", "Launch", "Support"],

    // Direct Contacts
    directContactTitle: "Instant Direct Contact",
    directContactSubtitle: "Reach out via your favorite channel for a fast response",
    whatsappBtn: "Chat on WhatsApp",
    telegramBtn: "Message on Telegram",
    wechatBtn: "View WeChat",
    copyEmailBtn: "Copy Email Address",
    copiedToast: "Email copied to clipboard!",
    phoneCallBtn: "Call Now",

    // Contact form
    contactTitle: "Tell us about the project",
    name: "Your Name or Company",
    msg: "Describe your project or requirements in detail...",
    send: "Send",
    theme: "Theme",
    mode: { dark: "Night", light: "Day" },
    themes: { ember: "Ember Gold", caspian: "Caspian Teal", orchid: "Night Orchid" },
    footer: "© 2026 Shafaq Tech Hub — Premium Technology & Design Solutions",
    ads: [
      "New: multilingual kitchen POS — live in one week",
      "Website + Android app bundle: 20% off",
      "Office automation: migrate from Excel safely",
    ],

    // DASHBOARD TRANSLATIONS
    dash: {
      title: "Shafaq Tech Hub — Admin Dashboard",
      backToSite: "🌐 Back to Website",
      navOverview: "📊 Overview",
      navKanban: "📋 Project Kanban",
      navLeads: "✉️ Leads & CRM",
      navCms: "🎨 Portfolio CMS",
      navInvoices: "🧾 Invoices & Quotes",
      navPos: "🖨️ POS Telemetry",
      navSettings: "⚙️ System Settings",
      kpiRevenue: "Total Revenue",
      kpiRevenueSub: "+18.4% growth this month",
      kpiProjects: "Active Projects",
      kpiProjectsSub: "4 in design, 4 in dev",
      kpiLeads: "Pending Inquiries",
      kpiLeadsSub: "5 new leads this week",
      kpiNodes: "Online POS Nodes",
      kpiNodesSub: "100% operational",
      monthlyGrowth: "Monthly Revenue & Delivered Projects",
      recentActivities: "Recent Activities & Pipeline",
    },

    // 3 HIGHLIGHT PROPOSITION CARDS
    ctaBanner: {
      cards: [
        {
          badge: "01 · Modern Technology",
          text: "Have you thought about powering your business with modern tech to stay ahead of the competition?",
          icon: "🚀",
        },
        {
          badge: "02 · Cost & Efficiency",
          text: "Do you want to cut operational costs and elevate your efficiency to the next level?",
          icon: "📈",
        },
        {
          badge: "03 · Get Started",
          text: "What are you waiting for? Get in touch with us today!",
          icon: "⚡",
          btnText: "Contact Us ➔",
        },
      ],
    },

    // USERNAME & PASSWORD AUTH / FORGOT PASSWORD / CHANGE PASSWORD
    auth: {
      loginTitle: "Admin Login",
      loginSubtitle: "Enter Username and Password to access the Admin Dashboard",
      userLabel: "Username:",
      userPlaceholder: "admin",
      passLabel: "Password:",
      passPlaceholder: "••••••••",
      loginBtn: "Sign In ➔",
      rememberMe: "Remember session",
      forgotPass: "Forgot password?",
      forgotTitle: "Password Recovery & Reminder",
      forgotHintText: "Default credentials are username «admin» and password «admin123». You can directly set a new password below:",
      resetNewPassLabel: "Set New Password:",
      resetBtn: "Update Password 💾",
      resetSuccess: "Password updated successfully!",
      changePassTitle: "Change Password",
      oldPassLabel: "Current Password:",
      newPassLabel: "New Password:",
      confirmPassLabel: "Confirm New Password:",
      changePassBtn: "Save New Password 💾",
      changeSuccess: "Password changed successfully!",
      mismatchError: "New passwords do not match!",
      wrongOldPass: "Current password is incorrect!",
      loginSuccess: "Welcome back! Login successful.",
      loginError: "Invalid username or password! (Default: admin / admin123)",
      logout: "Logout 🔒",
      loggedOut: "Logged out from Admin Dashboard.",
      defaultHint: "Default: admin / admin123",
      backToLogin: "← Back to Login",
    },
  },

  ar: {
    brand: "منصة شفق للتقنية",
    nav: { home: "الرئيسية", about: "من نحن", services: "الخدمات", work: "الأعمال", process: "المنهج", contact: "تواصل", dashboard: "لوحة التحكم" },
    kicker: "تصميم · برمجيات · أنظمة",
    heroTitle: "من الجرافيك إلى الأنظمة — يكتمل في شفق واحد.",
    heroLead:
      "الهوية، الإعلان، المواقع، تطبيقات أندرويد، أتمتة المكاتب، وأنظمة طلبات المطابخ. حديث، متعدد اللغات، مصمم للتحويل.",
    cta: "ابدأ مشروعاً",
    cta2: "شاهد الأعمال",

    // Stats
    statsTitle: "إنجازات وأرقام رئيسية",
    stats: [
      { val: "50+", label: "مشروع مكتمل", sub: "محلي ودولي" },
      { val: "99%", label: "نسبة رضا العملاء", sub: "جودة وضمان موثوق" },
      { val: "6+", label: "مجالات تقنية متكاملة", sub: "من التصميم إلى البرمجة" },
      { val: "24/7", label: "دعم فني مستمر", sub: "متابعة وصيانة دورية" },
    ],

    // About
    aboutTitle: "من ولماذا",
    about:
      "استوديو دورة كاملة لشخص واحد: من الهوية البصرية إلى برمجيات المنتج. للمطاعم والمتاجر والمكاتب والعملاء الدوليين.",
    aboutWish: "جودة ممتازة، خبرة واسعة، سرعة في الإنجاز، وإرضاؤكم أمنيتنا.",

    // Tech Stack
    techTitle: "الأدوات والتقنيات المستخدمة",
    techSubtitle: "نستخدم أحدث المعايير البرمجية والتصميمية العالمية لضمان السرعة والاستقرار",
    techGroups: [
      {
        groupName: "التصميم وتجربة المستخدم",
        items: [
          { name: "Figma", desc: "واجهات وتجربة المستخدم", icon: "🎨" },
          { name: "Photoshop", desc: "تصميم الإعلانات والصور", icon: "🖼️" },
          { name: "Illustrator", desc: "الشعارات والهوية البصرية", icon: "✒️" },
          { name: "After Effects", desc: "موشن جرافيك وإعلانات", icon: "🎬" },
        ],
      },
      {
        groupName: "تطوير الويب والواجهات",
        items: [
          { name: "React / Vite", desc: "واجهات تفاعلية فائقة السرعة", icon: "⚛️" },
          { name: "TypeScript", desc: "كود آمن وعالي الجودة", icon: "📘" },
          { name: "Tailwind / CSS3", desc: "تصاميم متجاوبة وعصرية", icon: "💅" },
          { name: "Next.js", desc: "تطوير شامل وتهيئة محركات البحث", icon: "⚡" },
        ],
      },
      {
        groupName: "الهواتف، الأتمتة ونقاط البيع",
        items: [
          { name: "Android / Kotlin", desc: "تطبيقات هواتف أصلية", icon: "📱" },
          { name: "Flutter", desc: "تطبيقات متعددة المنصات", icon: "🦋" },
          { name: "Python Automation", desc: "أتمتة البيانات ومعالجة إكسل", icon: "🐍" },
          { name: "POS & Hardware", desc: "طابعات حرارية وشاشات مطبخ", icon: "🖨️" },
        ],
      },
    ],

    // Services
    servicesTitle: "ست خدمات",
    services: [
      { t: "تصميم جرافيكي", d: "شعار، هوية، مطبوعات، تغليف، واجهات اجتماعية." },
      { t: "إعلان", d: "ثابت ومتحرك، فيديو قصير، مظهر الحملة." },
      { t: "مواقع", d: "معارض، تجارة، تعدد لغات، سيو، إدارة." },
      { t: "أندرويد", d: "كوتلن / فلاتر، نشر المتجر، تجربة المنتج." },
      { t: "أتمتة المكتب", d: "موظفون، مخزون، حسابات، تدفق وثائق." },
      { t: "نقاط بيع المطبخ", d: "طاولات، طلبات، شاشة الشيف، فوترة، طابعات." },
    ],

    // Works
    workTitle: "أعمال مختارة",
    workHint: "اضغط على أي بطاقة عمل لعرض التفاصيل التقنية والميزات",
    works: [
      { t: "مطاعم", d: "تذاكر متعددة اللغات وشاشة الشيف" },
      { t: "متاجر", d: "واجهة يمين-يسار ولوحة إدارة" },
      { t: "هوية", d: "شعار ودليل وحزمة اجتماعية" },
      { t: "مكاتب", d: "مخزون وقيود محاسبية" },
    ],
    projectDetails: [
      {
        title: "نظام طلبات المطاعم الذكي ونقاط البيع عبر QR",
        tagline: "نظام شامل يبدأ من مسح الرمز على الطاولة إلى شاشة الطهاة (KDS) وطباعة الفواتير",
        category: "حلول المطاعم والضيافة",
        tags: ["React", "TypeScript", "QR Menu", "KDS Display", "Thermal Print", "Offline-Ready"],
        features: [
          "طلب فوري ومباشر من الهاتف عبر مسح رمز QR بدون انتظار",
          "مزامنة لحظية مع شاشات المطبخ لتنظيم إعداد الوجبات بدقة",
          "دعم كامل لتعدد اللغات (الأويغورية، العربية، الإنجليزية، الصينية)",
          "ربط سلس مع الطابعات الحرارية ويعمل حتى عند انقطاع الإنترنت",
        ],
        deliverables: "واجهة الزبائن + لوحة الكاشير + شاشة الشيف + إعدادات الطابعات",
      },
      {
        title: "متجر إلكتروني عصري متكامل مع دعم كامل للغة العربية",
        tagline: "منصة تجارة إلكترونية مصممة خصيصاً لزيادة المبيعات والتحويل السريع",
        category: "التجارة الإلكترونية والحلول الرقمية",
        tags: ["Next.js", "React", "Tailwind CSS", "Cart & Checkout", "Admin Panel", "SEO"],
        features: [
          "تصميم مثالي من اليمين إلى اليسار (RTL) متوافق تماماً مع الهواتف الذكية",
          "سلة شراء سريعة وتجربة دفع سلسة بدون تعقيدات",
          "لوحة تحكم إدارية شاملة للمنتجات والمخزون وتحليل الطلبات",
          "ربط مباشر مع واتساب وخيارات دفع متعددة",
        ],
        deliverables: "المتجر + معرض المنتجات + سلة المشتريات + لوحة الإدارة",
      },
      {
        title: "تصميم الهوية البصرية والعلامة التجارية للشركات (VI)",
        tagline: "هوية بصرية مميزة تترك أثراً قوياً وتبني الثقة مع عملائك",
        category: "التصميم الجرافيكي وبناء العلامات التجارية",
        tags: ["Logo Design", "Brand Identity", "Brand Guidelines", "Social Assets", "Typography"],
        features: [
          "شعار مبتكر يجمع بين الخطوط الأصيلة والأسلوب العصري العالمي",
          "تصميم المطبوعات الرسمية وبطاقات العمل والتغليف ومواد الترويج",
          "قوالب جاهزة لشبكات التواصل الاجتماعي وملفات فيكتور الأصلية",
          "دليل إرشادي شامل لمعايير الهوية (Brand Guidelines PDF)",
        ],
        deliverables: "ملفات فيكتور أصلية (AI/EPS/SVG) + صور بدقة عالية + كتيب الهوية",
      },
      {
        title: "أتمتة سير العمل المكتبي ونظام إدارة المخزون والحسابات",
        tagline: "تحويل الجداول الورقية وجداول إكسل المشتتة إلى نظام رقمي آلي متكامل",
        category: "أتمتة الأعمال وبرمجيات المكاتب",
        tags: ["Python", "Automation", "Excel Importer", "Inventory Ledger", "Role Access"],
        features: [
          "نقل البيانات من ملفات إكسل القديمة بضغطة زر واحدة بأمان",
          "متابعة حركة المخزون والفواتير والمهام بصورة آلية ودقيقة",
          "تقارير بيانية تفاعلية لحساب الأرباح والخسائر الشهرية في ثوانٍ",
          "نسخ احتياطي يومي تلقائي وحماية عالية للبيانات",
        ],
        deliverables: "برنامج مكتبي + أداة تحويل إكسل + فيديو توضيحي + دعم التثبيت",
      },
    ],

    // Project Estimator
    estimatorTitle: "حاسبة تقدير تكلفة وزمن المشروع",
    estimatorSubtitle: "حدد متطلباتك لمعرفة الزمن التقديري للإنجاز والتفاصيل المقترحة",
    estService: "نوع الخدمة:",
    estScale: "نطاق وحجم المشروع:",
    estAddons: "ميزات وإضافات خاصة:",
    estServices: [
      { id: "web", name: "موقع إلكتروني (Website)", baseDays: 5 },
      { id: "app", name: "تطبيق أندرويد (Android App)", baseDays: 8 },
      { id: "pos", name: "نظام نقاط بيع للمطاعم (POS)", baseDays: 6 },
      { id: "office", name: "أتمتة مكاتب وإكسل", baseDays: 5 },
      { id: "brand", name: "هوية وشعار تجاري", baseDays: 3 },
    ],
    estScales: [
      { id: "quick", name: "نسخة سريعة وأساسية", multiplier: 1 },
      { id: "pro", name: "معيار احترافي متكامل", multiplier: 1.4 },
      { id: "custom", name: "مستوى متقدم ومخصص للشركات", multiplier: 1.8 },
    ],
    estAddonList: [
      { id: "multilang", name: "دعم تعدد اللغات (UG / TR / EN / AR)" },
      { id: "admin", name: "لوحة تحكم وإدارة مخصصة" },
      { id: "payment", name: "بوابة دفع إلكتروني / ربط مباشر" },
      { id: "support", name: "دعم فني وصيانة ممتدة لمدة عام" },
    ],
    estResultDays: "المدة الزمنية التقديرية:",
    estResultDaysUnit: "أيام عمل تقريباً",
    estRequestBtn: "طلب عرض سعر لهذا النطاق",

    // Testimonials
    reviewsTitle: "آراء وتقييمات العملاء",
    reviewsSubtitle: "تجارب حقيقية من شركائنا وعملائنا الكرام",
    reviews: [
      {
        name: "عمر جان",
        role: "مدير مطعم",
        company: "مطاعم شفق للمأكولات الفاخرة",
        avatar: "👨‍🍳",
        rating: 5,
        text: "بعد تفعيل نظام طلبات QR وشاشة الشيف في مطعمنا، تضاعفت سرعة الخدمة وقلت الأخطاء تماماً. الزبائن يشيدون بالسهولة. تجربة رائعة وأنصح به بشدة!",
      },
      {
        name: "مليكة",
        role: "مؤسسة علامة تجارية",
        company: "متجر نفيس الإلكتروني",
        avatar: "👩‍💼",
        rating: 5,
        text: "سرعة المتجر ودقة التصميم فاقت كل توقعاتنا، والمبيعات عبر الهواتف زادت بشكل ملحوظ فور الإطلاق. شكراً جزيلاً على الاحترافية العالية!",
      },
      {
        name: "عبد الله",
        role: "مدير العمليات",
        company: "مجموعة تيانشان التجارية",
        avatar: "👨‍💼",
        rating: 5,
        text: "تخلصنا تماماً من فوضى جداول إكسل المعقدة، وأصبح إصدار التقارير الشهرية ومتابعة المخزون يتم في ثوانٍ معدودة. وفرتم علينا وقتاً كبيراً.",
      },
    ],

    // FAQ
    faqTitle: "الأسئلة الشائعة (FAQ)",
    faqSubtitle: "إجابات واضحة حول خطة العمل، المواعيد والدعم الفني",
    faqs: [
      {
        q: "1. كيف تبدأ خطوات تنفيذ المشروع؟",
        a: "نبدأ بجلسة استشارية لفهم أهدافكم بالتفصيل، ثم نعرض نموذج التصميم الأولي، وبعد اعتمادكم نبدأ البرمجة ثم الاختبار والإطلاق النهائي.",
      },
      {
        q: "2. كم يستغرق تسليم المشروع عادةً؟",
        a: "تصميم الشعارات والهوية يستغرق 1-3 أيام؛ المواقع وأنظمة نقاط البيع للمطاعم 5-10 أيام؛ التطبيقات والأنظمة الكبيرة 2-3 أسابيع.",
      },
      {
        q: "3. هل يتوفر دعم فني وصيانة بعد التسليم؟",
        a: "نعم بكل تأكيد! تشمل جميع مشاريعنا فترة ضمان مجانية وإصلاح أي ملاحظات وتدريب شامل على استخدام النظام.",
      },
      {
        q: "4. هل يمكننا التعاون عن بُعد من مدينة أو دولة أخرى؟",
        a: "بالتأكيد. نعمل بمرونة وكفاءة عالية مع عملاء من مختلف أنحاء العالم عبر واتساب، تيليجرام، زووم والبريد الإلكتروني.",
      },
      {
        q: "5. كيف يتم تحديد الأسعار وخطة الدفع؟",
        a: "الأسعار محددة وشفافة وفق حجم ومتطلبات المشروع دون أي تكاليف خفية، مع دفعة مقدمة عند البدء والمتبقي عند الاعتماد النهائي.",
      },
    ],

    // Process
    processTitle: "طريقة العمل",
    steps: ["حوار", "تصميم", "بناء", "اختبار", "إطلاق", "دعم"],

    // Direct Contacts
    directContactTitle: "تواصل سريع ومباشر",
    directContactSubtitle: "اختر القناة المفضلة لديك لبدء استشارتك فوراً",
    whatsappBtn: "محادثة عبر WhatsApp",
    telegramBtn: "مراسلة عبر Telegram",
    wechatBtn: "عرض WeChat",
    copyEmailBtn: "نسخ البريد الإلكتروني",
    copiedToast: "تم نسخ البريد الإلكتروني بنجاح!",
    phoneCallBtn: "اتصال هاتفي",

    // Contact form
    contactTitle: "حدّثنا عن مشروعك",
    name: "الاسم أو اسم الشركة",
    msg: "اشرح تفاصيل مشروعك ومتطلباتك...",
    send: "إرسال",
    theme: "السمة",
    mode: { dark: "ليل", light: "نهار" },
    themes: { ember: "ذهب الشفق", caspian: "تركواز قزوين", orchid: "ليل بنفسجي" },
    footer: "© 2026 منصة شفق للتقنية — حلول تقنية وتصميمية بمقاييس عالمية",
    ads: [
      "جديد: نقاط بيع مطبخ متعددة اللغات — تشغيل خلال أسبوع",
      "حزمة موقع + أندرويد بخصم 20٪",
      "أتمتة المكتب: انتقال آمن من إكسل",
    ],

    // DASHBOARD TRANSLATIONS
    dash: {
      title: "منصة شفق — لوحة التحكم الإدارية",
      backToSite: "🌐 العودة للموقع",
      navOverview: "📊 نظرة عامة",
      navKanban: "📋 سير المشاريع (Kanban)",
      navLeads: "✉️ إدارة الطلبات والعملاء",
      navCms: "🎨 إدارة الأعمال (CMS)",
      navInvoices: "🧾 الفواتير وعروض الأسعار",
      navPos: "🖨️ مراقبة أجهزة نقاط البيع",
      navSettings: "⚙️ إعدادات النظام",
      kpiRevenue: "إجمالي الإيرادات",
      kpiRevenueSub: "+18.4% نمو هذا الشهر",
      kpiProjects: "المشاريع النشطة",
      kpiProjectsSub: "4 في التصميم، 4 قيد البرمجة",
      kpiLeads: "الطلبات الواردة",
      kpiLeadsSub: "5 طلبات جديدة هذا الأسبوع",
      kpiNodes: "أجهزة POS المتصلة",
      kpiNodesSub: "100% تعمل بصورة ممتازة",
      monthlyGrowth: "الإيرادات الشهرية وإنجاز المشاريع",
      recentActivities: "الأنشطة الأخيرة ومتابعة العملاء",
    },

    // 3 HIGHLIGHT PROPOSITION CARDS
    ctaBanner: {
      cards: [
        {
          badge: "01 · تقنية حديثة",
          text: "هل فكرت يوماً في تمكين تجارتك بأحدث التقنيات والتفوق في المنافسة؟",
          icon: "🚀",
        },
        {
          badge: "02 · التكلفة والكفاءة",
          text: "هل ترغب في تقليل التكاليف ورفع كفاءة أعمالك إلى مستويات جديدة؟",
          icon: "📈",
        },
        {
          badge: "03 · انطلق الآن",
          text: "ماذا تنتظر إذن؟ تواصل معنا الآن وانطلق بمشروعك!",
          icon: "⚡",
          btnText: "تواصل معنا ➔",
        },
      ],
    },

    // USERNAME & PASSWORD AUTH / FORGOT PASSWORD / CHANGE PASSWORD
    auth: {
      loginTitle: "تسجيل دخول المسؤول",
      loginSubtitle: "أدخل اسم المستخدم وكلمة المرور للوصول إلى لوحة التحكم",
      userLabel: "اسم المستخدم (Username):",
      userPlaceholder: "admin",
      passLabel: "كلمة المرور (Password):",
      passPlaceholder: "••••••••",
      loginBtn: "تسجيل الدخول ➔",
      rememberMe: "تذكر الجلسة",
      forgotPass: "هل نسيت كلمة المرور؟",
      forgotTitle: "تذكير واستعادة كلمة المرور",
      forgotHintText: "البيانات الافتراضية: اسم المستخدم «admin» وكلمة المرور «admin123». يمكنك تعيين كلمة مرور جديدة مباشرة أدناه:",
      resetNewPassLabel: "تعيين كلمة مرور جديدة:",
      resetBtn: "تحديث كلمة المرور 💾",
      resetSuccess: "تم تحديث كلمة المرور بنجاح!",
      changePassTitle: "تغيير كلمة المرور",
      oldPassLabel: "كلمة المرور الحالية:",
      newPassLabel: "كلمة المرور الجديدة:",
      confirmPassLabel: "تأكيد كلمة المرور الجديدة:",
      changePassBtn: "حفظ كلمة المرور 💾",
      changeSuccess: "تم تغيير كلمة المرور بنجاح!",
      mismatchError: "كلمات المرور غير متطابقة!",
      wrongOldPass: "كلمة المرور الحالية غير صحيحة!",
      loginSuccess: "مرحباً بك! تم تسجيل الدخول بنجاح.",
      loginError: "اسم المستخدم أو كلمة المرور غير صحيحة! (الافتراضي: admin / admin123)",
      logout: "تسجيل الخروج 🔒",
      loggedOut: "تم تسجيل الخروج من لوحة التحكم.",
      defaultHint: "الافتراضي: admin / admin123",
      backToLogin: "← العودة لشاشة الدخول",
    },
  },
} as const;
