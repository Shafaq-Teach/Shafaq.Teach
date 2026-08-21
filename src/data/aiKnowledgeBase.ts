import { type Lang } from "../i18n";

export interface KnowledgeEntry {
  category: "estimator" | "faq" | "services" | "works" | "contact" | "general";
  keywords: {
    ug: string[];
    tr: string[];
    en: string[];
    ar: string[];
  };
  answers: {
    ug: string;
    tr: string;
    en: string;
    ar: string;
  };
  suggestedAction?: "contact" | "estimator" | "work" | "whatsapp";
}

export const aiKnowledgeDatabase: KnowledgeEntry[] = [
  // 1. TIMELINE & TURNAROUND (ۋاقىت ۋە پۈتۈش مۇددىتى)
  {
    category: "estimator",
    keywords: {
      ug: ["ۋاقىت", "كۈن", "مۇددەت", "پۈتۈش", "قانچە كۈندە", "سۈرئەت", "تېز"],
      tr: ["süre", "gün", "zaman", "teslim", "kaç gün", "ne kadar sürer", "hızlı"],
      en: ["time", "timeline", "days", "turnaround", "how long", "duration", "fast"],
      ar: ["وقت", "مدة", "أيام", "تسليم", "كم يستغرق", "سرعة", "موعد"],
    },
    answers: {
      ug: `⏱️ **تۈر پۈتۈش ۋاقتى ۋە مۆلچەر مۇددىتى:**
- 🎨 **لوگو ۋە ئېلان لايىھەسى:** 1 ~ 3 خىزمەت كۈنى
- 🌐 **زامانىۋى تور بېكەت (Website):** 5 ~ 8 خىزمەت كۈنى
- 🍽️ **كۆپ تىللىق ئاشخانا POS سىستېمىسى:** 5 ~ 7 خىزمەت كۈنى
- 📱 **ئاندىروئىد ئەپ (Android App):** 8 ~ 14 خىزمەت كۈنى
- 📊 **ئىشخانا ئاپتوماتلاشتۇرۇش (ERP & Excel):** 5 ~ 10 خىزمەت كۈنى

💡 بارلىق تۈرلەر دەل ۋاقتىدا سىناقتىن ئۆتكۈزۈلۈپ تاپشۇرۇلىدۇ.`,
      tr: `⏱️ **Proje Teslim Süreleri ve Tahmini İş Günleri:**
- 🎨 **Logo ve Grafik Tasarım:** 1 ~ 3 iş günü
- 🌐 **Modern Web Sitesi:** 5 ~ 8 iş günü
- 🍽️ **Çok Dilli Restoran POS Sistemi:** 5 ~ 7 iş günü
- 📱 **Android Mobil Uygulama:** 8 ~ 14 iş günü
- 📊 **Ofis Otomasyonu (ERP & Excel):** 5 ~ 10 iş günü

💡 Tüm projeler tam test edilerek vaktinde teslim edilir.`,
      en: `⏱️ **Project Turnaround & Estimated Timeline:**
- 🎨 **Brand & Logo Design:** 1 ~ 3 business days
- 🌐 **Modern Website:** 5 ~ 8 business days
- 🍽️ **Multilingual Restaurant POS:** 5 ~ 7 business days
- 📱 **Android Mobile App:** 8 ~ 14 business days
- 📊 **Office Automation & ERP:** 5 ~ 10 business days

💡 All projects are thoroughly tested and delivered on schedule.`,
      ar: `⏱️ **المدة الزمنية التقديرية لتسليم المشاريع:**
- 🎨 **تصميم الشعار والهوية البصرية:** 1 ~ 3 أيام عمل
- 🌐 **المواقع الإلكترونية الحديثة:** 5 ~ 8 أيام عمل
- 🍽️ **نظام نقاط بيع المطاعم الذكي (POS):** 5 ~ 7 أيام عمل
- 📱 **تطبيقات أندرويد للهواتف:** 8 ~ 14 يوم عمل
- 📊 **أتمتة المكاتب وإكسل (ERP):** 5 ~ 10 أيام عمل

💡 يتم اختبار جميع الأنظمة بدقة وتسليمها في الموعد المحدد.`,
    },
    suggestedAction: "estimator",
  },

  // 2. PRICING & QUOTATION (باھا ۋە ھەق تۆلەش)
  {
    category: "estimator",
    keywords: {
      ug: ["باھا", "پۇل", "ھەق", "تۆلەش", "قانچە پۇل", "سومما", "ئېتىبار", "خامچوت"],
      tr: ["fiyat", "ücret", "maliyet", "kaç para", "ödeme", "bütçe", "indirim", "teklif"],
      en: ["price", "cost", "pricing", "how much", "payment", "budget", "discount", "quote"],
      ar: ["سعر", "تكلفة", "أسعار", "كم السعر", "دفع", "ميزانية", "خصم", "عرض سعر"],
    },
    answers: {
      ug: `💰 **باھا بېكىتىش ۋە ھەق تۆلەش تەرتىپى:**
- باھا تۈرنىڭ كۆلىمى ۋە سىز تەلەپ قىلغان ئالاھىدە ئىقتىدارلارغا قاراپ ئەڭ مۇۋاپىق ھېسابلىنىدۇ، ھەرگىز يوشۇرۇن ھەق يوق!
- **ئالدىن تۆلەش نىسبىتى:** ئادەتتە %50 ئالدىن پۇل تاپشۇرۇلۇپ ئىش باشلىنىدۇ، قالغان %50 قالدۇق پۇل تۈر تولۇق سىناقتىن ئۆتۈپ سىز رازى بولغاندا تاپشۇرۇلىدۇ.
- 🎁 **ئالاھىدە ئېتىبار:** تور بېكەت + يانفون ئەپنى بىرلىكتە قىلدۇرغاندا %20 ئېتىبار بېرىلىدۇ.`,
      tr: `💰 **Fiyatlandırma ve Ödeme Koşulları:**
- Fiyatlar projenin kapsamına ve istediğiniz özelliklere göre tamamen şeffaf şekilde belirlenir; hiçbir gizli maliyet yoktur!
- **Ödeme Şekli:** Genellikle %50 ön avans ile başlanır, kalan %50 bakiye proje teslim edilip onayınız alındıktan sonra ödenir.
- 🎁 **Kampanya:** Web Sitesi + Mobil Uygulama paketinde %20 indirim sağlanır.`,
      en: `💰 **Pricing Structure & Payment Terms:**
- Pricing is transparently tailored based on project scope and custom requirements, with zero hidden fees.
- **Payment Milestones:** Typically a 50% deposit upon kickoff, and the remaining 50% upon final delivery and satisfaction.
- 🎁 **Bundle Discount:** 20% off for combined Website + Android App packages.`,
      ar: `💰 **هيكل الأسعار وخطة الدفع:**
- الأسعار محددة وشفافة وفق حجم ومتطلبات المشروع دون أي تكاليف خفية إطلاقاً.
- **مراحل الدفع:** عادة 50٪ دفعة أولى لبدء العمل، والمتبقي 50٪ عند التسليم النهائي والاعتماد.
- 🎁 **خصم الحزمة:** خصم 20٪ عند طلب باقة الموقع الإلكتروني + تطبيق أندرويد معاً.`,
    },
    suggestedAction: "estimator",
  },

  // 3. RESTAURANT POS & QR MENU (ئاشخانا زاكاز ۋە POS سىستېمىسى)
  {
    category: "services",
    keywords: {
      ug: ["ئاشخانا", "pos", "تاماق", "زاكاز", "پىرىنتېر", "رىستۇران", "ئاشپەز", "كاسسىر", "ستول", "بېلەت"],
      tr: ["restoran", "pos", "menü", "sipariş", "yazıcı", "mutfak", "adisyon", "kasa", "masa"],
      en: ["restaurant", "pos", "menu", "order", "printer", "kitchen", "kds", "cashier", "table", "ticket"],
      ar: ["مطعم", "نقاط بيع", "منيو", "طلب", "طابعة", "مطبخ", "شيف", "كاشير", "طاولة", "فاتورة"],
    },
    answers: {
      ug: `🍽️ **كۆپ تىللىق ئەقلىي ئاشخانا ۋە QR زاكاز سىستېمىسى (POS):**
1. **ستول ئۈستى QR تىزىملىك:** خېرىدارلار تېلېفونى بىلەن سىكاننېرلاپلا كۆپ تىلدا (ئۇيغۇرچە، خەنزۇچە، ئىنگلىزچە، تۈركچە، ئەرەبچە) تېز تاماق زاكاز قىلالايدۇ.
2. **ئاشپەز ئېكرانى (KDS):** زاكازلار ئاشخانىغا شۇ سېكۇنتتا يېتىپ بارىدۇ.
3. **تېرمال پىرىنتېر قوشۇش:** 80mm / 58mm بېلەت ۋە چىقىم قەغىزى تېز چىقىرىلىدۇ.
4. **تورسىز ھالەت كاپالىتى (Offline-First):** تور ئۈزۈلگەن تەقدىردىمۇ دۇكان ئىچىدە كاسسىر ۋە زاكاز ئۈزۈلمەي ئىشلەيدۇ.`,
      tr: `🍽️ **Çok Dilli Akıllı Restoran ve QR Sipariş Sistemi (POS):**
1. **Masa QR Menü:** Müşteriler telefonlarıyla temassız menüyü görüntüleyip çok dilli (Uygurca, Türkçe, İngilizce, Arapça) hızlı sipariş verebilir.
2. **Mutfak Ekranı (KDS):** Siparişler anında mutfaktaki ekrana düşer.
3. **Termal Yazıcı:** 80mm/58mm fiş ve adisyon yazıcılarıyla tam uyumlu.
4. **Çevrimdışı Çalışma (Offline-First):** İnternet kesilse dahi yerel ağda kesintisiz çalışır.`,
      en: `🍽️ **Smart Multilingual Restaurant QR POS System:**
1. **Tabletop QR Menu:** Customers scan to order directly from smartphones in multiple languages.
2. **Kitchen Display System (KDS):** Instant real-time ticket sync to chef screens.
3. **Thermal Printers:** Full support for 80mm/58mm high-speed receipt printing.
4. **Offline-First Reliability:** Continues working locally even if the internet drops.`,
      ar: `🍽️ **نظام طلبات المطاعم الذكي ونقاط البيع (POS) عبر QR:**
1. **منيو QR على الطاولة:** يمسح الزبائن الرمز للطلب الفوري بعدة لغات دون انتظار.
2. **شاشة المطبخ (KDS):** مزامنة لحظية للطلبات مع شاشات الطهاة فوراً.
3. **طابعات حرارية:** دعم كامل لطباعة فواتير وإيصالات سريعة 80mm / 58mm.
4. **يعمل بدون إنترنت (Offline-First):** استمرار العمل محلياً حتى في حال انقطاع الشبكة.`,
    },
    suggestedAction: "work",
  },

  // 4. WEBSITE & E-COMMERCE (تور بەت ۋە تور دۇكىنى)
  {
    category: "services",
    keywords: {
      ug: ["تور بەت", "سودا", "دۇكان", "تور دۇكىنى", "rtl", "سېۋەت", "سېتىش", "website"],
      tr: ["web sitesi", "e-ticaret", "mağaza", "online satış", "sepet", "site"],
      en: ["website", "commerce", "store", "ecommerce", "storefront", "web"],
      ar: ["موقع", "متجر", "تجارة إلكترونية", "سلة", "تسوق", "ويب"],
    },
    answers: {
      ug: `🌐 **زامانىۋى تور بېكەت ۋە RTL ئېلېكترونلۇق سودا سۇپىسى:**
- **RTL / LTR ئىككى يۆنىلىشلىك:** ئۇيغۇرچە، ئەرەبچە، تۈركچە ۋە ئىنگلىزچىگە %100 تەبىئىي ماسلىشىدۇ.
- **تېز سۈرئەت (React / Next.js):** 0.2 سېكۇنتتا يۈكلىنىدىغان خەلقئارالىق يۇقىرى سۈپەتلىك تېخنىكا.
- **سېتىش باشقۇرۇش تاختىسى:** مەھسۇلات، زاكاز، ئامبار قالدۇقى ۋە WhatsApp بىۋاسىتە زاكاز ئۇلىنىشلىرى تولۇق قاچىلانغان.`,
      tr: `🌐 **Modern Web Sitesi ve E-Ticaret Platformu:**
- **RTL / LTR Desteği:** Türkçe, Uygurca, Arapça ve İngilizce dillerine %100 kusursuz uyum.
- **Yüksek Hız (React / Next.js):** Yıldırım hızında açılan, SEO uyumlu modern mimari.
- **Yönetim Paneli:** Ürünler, stok, siparişler ve WhatsApp sipariş yönlendirmesi entegredir.`,
      en: `🌐 **Modern Websites & E-Commerce Platforms:**
- **Bidirectional RTL / LTR:** Flawless support for Uyghur, Turkish, Arabic, and English.
- **Blazing Speed (React / Next.js):** Sub-second load times built to maximize sales conversions.
- **Admin Dashboard:** Full management of products, inventory, coupons, and direct WhatsApp checkouts.`,
      ar: `🌐 **المواقع الإلكترونية والمتاجر الرقمية المتكاملة:**
- **دعم كامل لليمين-يسار (RTL/LTR):** متوافق 100٪ مع العربية، التركية، الأويغورية والإنجليزية.
- **سرعة فائقة (React/Next.js):** تحميل فوري وتوافق تام مع محركات البحث SEO.
- **لوحة تحكم إدارية:** إدارة كاملة للمنتجات، المخزون، الطلبات والربط المباشر مع واتساب.`,
    },
    suggestedAction: "work",
  },

  // 5. OFFICE AUTOMATION & EXCEL (ئىشخانا ئاپتوماتلاشتۇرۇش)
  {
    category: "services",
    keywords: {
      ug: ["ئىشخانا", "ئاپتومات", "excel", "ئامبار", "ھېسابات", "خادىم", "erp", "python"],
      tr: ["ofis", "otomasyon", "excel", "stok", "muhasebe", "erp", "python"],
      en: ["office", "automation", "excel", "inventory", "ledger", "erp", "python"],
      ar: ["أتمتة", "مكتب", "إكسل", "مخزون", "محاسبة", "تخطيط موارد", "بايثون"],
    },
    answers: {
      ug: `📊 **ئىشخانا ئاپتوماتلاشتۇرۇش ۋە كارخانا ئامبار-ھېسابات سىستېمىسى:**
- قالايمىقان، كونا Excel جەدۋەللىرىدىكى سانلىق مەلۇماتلارنى بىر كۇنۇپكا بىلەن بىخەتەر يۆتكەپ سىستېمىغا ئايلاندۇرۇش.
- كۈندىلىك ئامبار كىرىم-چىقىمى، سېتىش سوممىسى ۋە خادىملار ئىشىنى ئاپتوماتىك كۆزىتىش.
- ھەر كۈنلۈك ئاپتوماتىك زاپاسلاش (Auto-Backup) ئارقىلىق سانلىق مەلۇمات يوقاپ كېتىشنىڭ ئالدىنى ئېلىش.`,
      tr: `📊 **Ofis Otomasyonu ve Stok-Muhasebe ERP Sistemi:**
- Karmaşık ve dağınık Excel tablolarındaki verileri tek tıkla güvenli veritabanına aktarma.
- Günlük stok hareketlerini, gelir-giderleri ve personel işlerini otomatik takip etme.
- Otomatik günlük yedekleme (Backup) ile tam veri güvenliği.`,
      en: `📊 **Office Automation & Inventory ERP:**
- One-click safe migration from legacy spreadsheets into structured databases.
- Automated tracking of stock movements, expenses, and employee workflows.
- Automated daily backups to guarantee data integrity and security.`,
      ar: `📊 **أتمتة سير العمل المكتبي ونظام إدارة المخزون:**
- تحويل جداول إكسل المعقدة بضغطة زر إلى قواعد بيانات سحابية منظمة.
- تتبع حركة المخزون، المصروفات، والمهام اليومية بصورة آلية دقيقة.
- نسخ احتياطي يومي تلقائي لضمان أعلى مستويات الأمان لبياناتكم.`,
    },
    suggestedAction: "work",
  },

  // 6. TECHNICAL WARRANTY & SUPPORT (تېخنىكىلىق كاپالەت ۋە ئاسراش)
  {
    category: "faq",
    keywords: {
      ug: ["كاپالەت", "ئاسراش", "ياردەم", "قوللاش", "كاشىلا", "تۈزىتىش", "support"],
      tr: ["garanti", "bakım", "destek", "teknik destek", "hata", "düzeltme"],
      en: ["warranty", "support", "maintenance", "help", "sla", "bug", "care"],
      ar: ["ضمان", "صيانة", "دعم", "دعم فني", "متابعة", "إصلاح", "مساعدة"],
    },
    answers: {
      ug: `🛡️ **تېخنىكىلىق كاپالەت ۋە كېيىنكى قوللاش:**
- پۈتكەن بارلىق تۈرلەرگە دەسلەپكى ھەقسىز كاشىلا تۈزىتىش، سىستېمىنى ئىشلىتىش يېتەكچىلىكى ۋە مەشغۇلات سىن قوللانمىسى تەمىنلىنىدۇ.
- 24/7 تېز تېخنىكىلىق قوللاش ئارقىلىق سوئال ۋە مەسىلىلىرىڭىز شۇ ھامان جاۋابقا ئېرىشىدۇ.
- 1 يىللىق قەرەللىك سىستېما يېڭىلاش ۋە كاپالەت مۇلازىمىتى بار.`,
      tr: `🛡️ **Teknik Destek ve Garanti Hizmeti:**
- Teslim edilen tüm projelere ücretsiz hata düzeltme, kullanım eğitimi ve videolu rehber dahildir.
- 7/24 hızlı teknik destek ile sorularınıza ve sistem ihtiyaçlarınıza anında yanıt verilir.
- 1 yıllık periyodik bakım ve sistem güncelleme garantisi sunulur.`,
      en: `🛡️ **Technical Warranty & Support SLA:**
- All delivered projects include free bug fixing, user training, and comprehensive video walkthroughs.
- Active 24/7 technical assistance for rapid response to inquiries and operational needs.
- Optional 1-year extended SLA for regular updates and system care.`,
      ar: `🛡️ **الضمان الفني وخدمات الدعم المستمر:**
- تشمل جميع مشاريعنا فترة ضمان مجانية لإصلاح الملاحظات وتدريب شامل على النظام.
- دعم فني متواصل 24/7 للإجابة الفورية على استفساراتكم وحل أي إشكاليات.
- خيار صيانة دورية وتحديثات مستمرة لمدة عام كامل.`,
    },
    suggestedAction: "contact",
  },

  // 7. REMOTE COLLABORATION (يىراقتىن ھەمكارلىشىش)
  {
    category: "faq",
    keywords: {
      ug: ["يىراق", "چەتئەل", "باشقا شەھەر", "توردا", "ھەمكارلىق", "قانداق باشلايمىز"],
      tr: ["uzaktan", "yurtdışı", "başka şehir", "online", "nasıl çalışırız", "işbirliği"],
      en: ["remote", "international", "abroad", "online", "collaboration", "how to work"],
      ar: ["عن بعد", "دولي", "خارج البلاد", "مدينة أخرى", "تعاون", "كيف نعمل"],
    },
    answers: {
      ug: `🌍 **يىراقتىن ۋە دۇنيانىڭ ھەرقايسى جايلىرىدىن ھەمكارلىشىش:**
- پۈتۈنلەي مۇمكىن! بىز پۈتۈن دۇنيادىكى خېرىدارلار بىلەن WhatsApp، Telegram، Zoom، WeChat ۋە ئېلخەت ئارقىلىق ناھايىتى راۋان ۋە ئۈنۈملۈك ھەمكارلىشىپ كېلىۋاتىمىز.
- كود ۋە لايىھەلەر پات-پات سىناق ئۇلىنىشى ئارقىلىق سىزگە كۆرسىتىپ تۇرۇلىدۇ.`,
      tr: `🌍 **Uzaktan ve Uluslararası Çalışma:**
- Kesinlikle mümkün! Dünyanın dört bir yanındaki müşterilerimizle WhatsApp, Telegram, Zoom ve e-posta üzerinden kesintisiz çalışıyoruz.
- Tasarımlar ve kodlama aşamaları canlı test linkleri ile düzenli olarak sizinle paylaşılır.`,
      en: `🌍 **Seamless Remote Collaboration Worldwide:**
- Absolutely! We work efficiently with international clients across the globe via WhatsApp, Telegram, Zoom, and email.
- Live staging links and design prototypes are shared throughout the process for your ongoing feedback.`,
      ar: `🌍 **التعاون عن بُعد ومحلياً ودولياً:**
- متاح ومضمون 100٪! نعمل بمرونة وكفاءة عالية مع عملاء في مختلف الدول عبر واتساب، تيليجرام، زووم والبريد الإلكتروني.
- يتم مشاركة روابط الاختبار والنماذج الأولية معكم بصورة دورية لمتابعة الإنجاز لحظة بلحظة.`,
    },
    suggestedAction: "whatsapp",
  },

  // 8. CONTACT & DIRECT ORDER (بىۋاسىتە ئالاقە ۋە زاكاز)
  {
    category: "contact",
    keywords: {
      ug: ["ئالاقە", "تېلېفون", "whatsapp", "telegram", "ئېلخەت", "زاكاز بېرىش", "سۆھبەت"],
      tr: ["iletişim", "telefon", "whatsapp", "telegram", "eposta", "sipariş ver", "görüşme"],
      en: ["contact", "phone", "whatsapp", "telegram", "email", "order", "reach"],
      ar: ["تواصل", "هاتف", "واتساب", "تيليجرام", "ايميل", "طلب", "محادثة"],
    },
    answers: {
      ug: `📞 **بىۋاسىتە ئالاقىلىشىش ۋە زاكاز بېرىش يوللىرى:**
- 💬 **WhatsApp:** پۈتۈن كۈن تېز جاۋاب
- ✈️ **Telegram:** @shafaq_tech
- 📧 **ئېلخەت:** contact@shafaqtech.com
- 🟢 **WeChat ID:** ShafaqTechHub

تۆۋەندىكى تۈگمىنى چەكسىڭىز دەرھال سۆھبەت باشلىنىدۇ!`,
      tr: `📞 **Doğrudan İletişim ve Hızlı Sipariş:**
- 💬 **WhatsApp:** Anında hızlı yanıt
- ✈️ **Telegram:** @shafaq_tech
- 📧 **E-Posta:** contact@shafaqtech.com
- 🟢 **WeChat ID:** ShafaqTechHub

Aşağıdaki butona tıklayarak hemen görüşme başlatabilirsiniz!`,
      en: `📞 **Direct Contact & Quick Order Channels:**
- 💬 **WhatsApp:** Instant fast response
- ✈️ **Telegram:** @shafaq_tech
- 📧 **Email:** contact@shafaqtech.com
- 🟢 **WeChat ID:** ShafaqTechHub

Click the button below to start an instant conversation!`,
      ar: `📞 **قنوات التواصل المباشر والطلب السريع:**
- 💬 **واتساب:** استجابة سريعة وفورية
- ✈️ **تيليجرام:** @shafaq_tech
- 📧 **البريد الإلكتروني:** contact@shafaqtech.com
- 🟢 **معرّف WeChat:** ShafaqTechHub

اضغط على الزر أدناه لبدء المحادثة المباشرة فوراً!`,
    },
    suggestedAction: "whatsapp",
  },
];

export interface AiResponse {
  text: string;
  suggestedAction?: "contact" | "estimator" | "work" | "whatsapp";
}

/**
 * Intelligent AI matching and inference engine
 */
export function askShafaqAi(question: string, lang: Lang): AiResponse {
  const cleanQ = question.toLowerCase().trim();

  if (!cleanQ) {
    const defaultMsg =
      lang === "tr"
        ? "Merhaba! Ben Şafak AI Danışmanı. Size proje fiyatları, teslim süreleri, restoran POS sistemleri veya web siteleri hakkında nasıl yardımcı olabilirim?"
        : lang === "en"
        ? "Hello! I am Shafaq AI Assistant. How can I help you today with project timelines, pricing, kitchen POS, or web development?"
        : lang === "ar"
        ? "مرحباً بك! أنا المستشار الذكي لمنصة شفق للتقنية. كيف يمكنني مساعدتك اليوم بخصوص الأسعار، مدد التسليم، أنظمة المطاعم أو المواقع الإلكترونية؟"
        : "ياخشىمۇسىز! مەن شەپەق سۈنئىي ئىدراك مەسلىھەتچىسى. سىزگە تۈر باھاسى، پۈتۈش ۋاقتى، ئاشخانا POS ياكى تور بەت تۈرلىرى ھەققىدە قانداق ياردەم بېرەلەيمەن؟";
    return { text: defaultMsg, suggestedAction: "estimator" };
  }

  // Score each knowledge entry
  let bestScore = 0;
  let bestEntry: KnowledgeEntry | null = null;

  for (const entry of aiKnowledgeDatabase) {
    let score = 0;
    // Check keywords in current language and across languages
    const kwList = [
      ...(entry.keywords[lang] || []),
      ...(entry.keywords.ug || []),
      ...(entry.keywords.tr || []),
      ...(entry.keywords.en || []),
      ...(entry.keywords.ar || []),
    ];

    for (const kw of kwList) {
      if (cleanQ.includes(kw.toLowerCase())) {
        score += 2;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore > 0) {
    return {
      text: bestEntry.answers[lang] || bestEntry.answers.ug,
      suggestedAction: bestEntry.suggestedAction,
    };
  }

  // Fallback intelligent general answer
  const fallback =
    lang === "tr"
      ? `💡 Sorunuz için teşekkürler! **Şafak Teknoloji Merkezi** olarak grafik tasarım, web siteleri, Android uygulamaları, restoran POS sistemleri ve ofis otomasyonu konularında profesyonel çözümler sunuyoruz.

Detaylı fiyat ve süre bilgisi için Akıllı Hesaplayıcımızı kullanabilir veya doğrudan WhatsApp üzerinden bize yazabilirsiniz!`
      : lang === "en"
      ? `💡 Thank you for your question! At **Shafaq Tech Hub**, we specialize in brand design, modern websites, Android mobile apps, restaurant QR POS systems, and office automation.

Feel free to explore our Project Estimator or contact us directly on WhatsApp for an instant consultation!`
      : lang === "ar"
      ? `💡 شكراً لاستفساركم! تقدم **منصة شفق للتقنية** حلولاً تقنية وتصميمية متكاملة تشمل الهوية البصرية، المواقع الإلكترونية، تطبيقات أندرويد، أنظمة نقاط بيع المطاعم وأتمتة المكاتب.

يمكنكم حساب التكلفة والمدة عبر حاسبة المشاريع أو مراسلتنا مباشرة عبر واتساب!`
      : `💡 سوئالىڭىزغا رەھمەت! **شەپەق تېخنىكا سەھىپىسى** سىزگە لوگو لايىھە، زامانىۋى تور بېكەت، ئاندىروئىد ئەپ، كۆپ تىللىق ئاشخانا POS سىستېمىسى ۋە ئىشخانا ئاپتوماتلاشتۇرۇش بويىچە ئەڭ يۇقىرى سۈپەتلىك ھەل قىلىش چارىلىرىنى تەمىنلەيدۇ.

تەپسىلىي باھا ۋە ۋاقىت مۆلچەرى ئۈچۈن سۇپىمىزدىكى ئەقلىي مۆلچەرلىگۈچنى ئىشلەتسىڭىز ياكى WhatsApp ئارقىلىق بىۋاسىتە ئالاقىلاشسىڭىز بولىدۇ!`;

  return { text: fallback, suggestedAction: "estimator" };
}
