import { useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";
import { copy, type Lang } from "./i18n";
import type {
  LeadItem,
  ProjectItem,
  PosNode,
  StudioSettings,
  ShowcaseProject,
  PromoAdItem,
} from "./components/Dashboard";

const Dashboard = lazy(() => import("./components/Dashboard"));
import AdminAuthModal, { type AdminCredentials } from "./components/AdminAuthModal";
import AiAssistantModal from "./components/AiAssistantModal";
import {
  getCloudPromoAds,
  syncCloudPromoAds,
  getCloudShowcaseProjects,
  syncCloudShowcaseProjects,
  getCloudLeads,
  addCloudLead,
  syncCloudLeads,
  getCloudSettings,
  syncCloudSettings,
  getCloudAdminCredentials,
  syncCloudAdminCredentials,
  DEFAULT_ADMIN_HASH,
  isSha256Hex,
  sanitizeImageUrl,
  sanitizeText,
  supabase,
} from "./supabase";

const logo = "media/logo-v3.jpeg";
const heroTech = "media/hero-v3.jpg?v=9";
const aboutBg = "media/about-v1.jpg";

const WORK_NAME_COLORS = ["#14532d", "#7c2d12", "#1e3a8a", "#6b21a8"];
const WORK_DESC_COLORS = ["#0369a1", "#b45309", "#0f766e", "#be123c"];

const stepImgs = [
  "media/step-1.jpg",
  "media/step-2.jpg",
  "media/step-3.jpg",
  "media/step-4.jpg",
  "media/step-5.jpg",
  "media/step-6.jpg",
];

const navPaint = [
  { bg: "linear-gradient(120deg,#7c3aed,#c084fc,#7c3aed)", color: "#fef08a" },
  { bg: "linear-gradient(120deg,#c2410c,#fb923c,#c2410c)", color: "#dbeafe" },
  { bg: "linear-gradient(120deg,#0369a1,#38bdf8,#0369a1)", color: "#fde68a" },
  { bg: "linear-gradient(120deg,#15803d,#4ade80,#15803d)", color: "#5b21b6" },
  { bg: "linear-gradient(120deg,#b45309,#fbbf24,#b45309)", color: "#1e3a8a" },
  { bg: "linear-gradient(120deg,#0f766e,#2dd4bf,#0f766e)", color: "#991b1b" },
  { bg: "linear-gradient(120deg,#d97706,#f59e0b,#d97706)", color: "#ffffff" },
];

const STAT_PRESETS = [
  {
    icon: "🏆",
    badgeUg: "مۇۋەپپەقىيەت",
    badgeEn: "Success",
    badgeAr: "إنجاز",
    badgeTr: "Başarı",
    bgDark: "linear-gradient(145deg, rgba(124, 58, 237, 0.22), rgba(18, 20, 30, 0.85))",
    bgLight: "linear-gradient(145deg, #ffffff, #faf5ff)",
    border: "#8b5cf6",
    numDark: "#c084fc",
    numLight: "#6d28d9",
    glow: "rgba(124, 58, 237, 0.25)",
  },
  {
    icon: "⭐",
    badgeUg: "ئىشەنچ كاپالىتى",
    badgeEn: "Satisfaction",
    badgeAr: "ثقة وضمان",
    badgeTr: "Güven ve Kalite",
    bgDark: "linear-gradient(145deg, rgba(22, 163, 74, 0.22), rgba(18, 20, 30, 0.85))",
    bgLight: "linear-gradient(145deg, #ffffff, #f0fdf4)",
    border: "#16a34a",
    numDark: "#4ade80",
    numLight: "#15803d",
    glow: "rgba(22, 163, 74, 0.25)",
  },
  {
    icon: "🌐",
    badgeUg: "كۆپ ساھە",
    badgeEn: "Multi-Domain",
    badgeAr: "تخصصات شاملة",
    badgeTr: "Çok Yönlü",
    bgDark: "linear-gradient(145deg, rgba(2, 132, 199, 0.22), rgba(18, 20, 30, 0.85))",
    bgLight: "linear-gradient(145deg, #ffffff, #f0f9ff)",
    border: "#0284c7",
    numDark: "#38bdf8",
    numLight: "#0369a1",
    glow: "rgba(2, 132, 199, 0.25)",
  },
  {
    icon: "⚡",
    badgeUg: "دەل ۋاقتىدا",
    badgeEn: "Continuous",
    badgeAr: "متابعة فورية",
    badgeTr: "7/24 Kesintisiz",
    bgDark: "linear-gradient(145deg, rgba(217, 119, 6, 0.22), rgba(18, 20, 30, 0.85))",
    bgLight: "linear-gradient(145deg, #ffffff, #fffbeb)",
    border: "#d97706",
    numDark: "#fbbf24",
    numLight: "#b45309",
    glow: "rgba(217, 119, 6, 0.25)",
  },
];

const defaultStudioSettings: StudioSettings = {
  brandName: "",
  whatsapp: "+86 130 0000 0000",
  telegram: "@shafaq_tech",
  email: "contact@shafaqtech.com",
  wechat: "ShafaqTechHub",
};

const defaultPromoAds: PromoAdItem[] = [
  {
    id: "ad-1",
    text: "يېڭى: كۆپ تىللىق ئاشخانا POS — بىر ھەپتە ئىچىدە ئورنىتىش",
    image: "media/pos-v4.jpg",
  },
  {
    id: "ad-2",
    text: "تور بەت + ئاندىروئىد ئەپ بىرلىكتە 20% ئېتىبار",
    image: "media/shop-v4.jpg",
  },
  {
    id: "ad-3",
    text: "ئىشخانا ئاپتوماتلاشتۇرۇش: Excel دىن سىستېمىغا بىخەتەر كۆچۈرۈش",
    image: "media/hero-v3.jpg",
  },
];

const defaultShowcaseProjects: ShowcaseProject[] = [
  {
    id: "work-1",
    name: "رىستۇران",
    title: "كۆپ تىللىق ئەقلىي ئاشخانا ۋە QR زاكاز سىستېمىسى",
    desc: "كۆپ تىللىق زاكاز ۋە ئاشپەز ئېكرانى",
    category: "ئاشخانا ۋە مېھمانساراي تېخنىكىسى",
    image: "media/pos-v4.jpg",
    tags: ["React", "TypeScript", "QR Menu", "KDS Display", "Thermal Print"],
    nameColor: "#14532d",
    descColor: "#0369a1",
  },
  {
    id: "work-2",
    name: "سودا",
    title: "RTL زامانىۋى تور دۇكىنى ۋە ئېلېكترونلۇق سودا سۇپىسى",
    desc: "RTL تور دۇكىنى ۋە باشقۇرۇش",
    category: "تور سودا ۋە ئېلېكترونلۇق تىجارەت",
    image: "media/shop-v4.jpg",
    tags: ["Next.js", "React", "Tailwind CSS", "Cart & Checkout", "Admin Panel"],
    nameColor: "#7c2d12",
    descColor: "#b45309",
  },
  {
    id: "work-3",
    name: "ماركا",
    title: "شىركەت ۋە سودا ئورۇنلىرىنىڭ كۆرۈنمە كىملىك (VI) لايىھەسى",
    desc: "لوگو + قوللانما + سوتسىيال",
    category: "گرافىك لايىھە ۋە ماركا كىملىكى",
    image: "media/brand-v3.jpg",
    tags: ["Logo Design", "Brand Identity", "Brand Guidelines", "Social Assets"],
    nameColor: "#1e3a8a",
    descColor: "#0f766e",
  },
  {
    id: "work-4",
    name: "ئىشخانا",
    title: "ئىشخانا ئاپتوماتلاشتۇرۇش ۋە كارخانا ئامبار-ھېسابات سىستېمىسى",
    desc: "ئامبار ۋە ھېسابات ئېقىمى",
    category: "ئىشخانا يۇمشاق دېتالى ۋە ئاپتوماتلاشتۇرۇش",
    image: "media/erp-v3.jpg",
    tags: ["Python", "Automation", "Excel Importer", "Inventory Ledger"],
    nameColor: "#6b21a8",
    descColor: "#be123c",
  },
];

type Theme = "ember" | "caspian" | "orchid";
type Mode = "dark" | "light";
const themes: Theme[] = ["ember", "caspian", "orchid"];
const langLabel: Record<Lang, string> = { ug: "ئۇيغۇرچە", tr: "Türkçe", en: "English", ar: "العربية" };

const VALID_LANGS: readonly Lang[] = ["ug", "tr", "en", "ar"];
const VALID_THEMES: readonly Theme[] = ["ember", "caspian", "orchid"];
const VALID_MODES: readonly Mode[] = ["dark", "light"];
const VALID_NAV_PAGES = ["home", "about", "services", "work", "process", "contact"] as const;

const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const CONTACT_COOLDOWN_MS = 30 * 1000; // 30s anti-spam cooldown

function readSafeStorage<T extends string>(
  key: string,
  allowedValues: readonly T[],
  fallback: T,
): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw && (allowedValues as readonly string[]).includes(raw)
      ? (raw as T)
      : fallback;
  } catch {
    return fallback;
  }
}

function writeSafeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota or strict privacy mode exceptions
  }
}

function removeSafeStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  } catch {
    // Ignore
  }
}

function readValidAdminSession(): boolean {
  try {
    const rawSession = localStorage.getItem("shafaq_admin_session");
    if (!rawSession) return false;
    const parsed = JSON.parse(rawSession);
    if (!parsed || typeof parsed.token !== "string" || !parsed.token || typeof parsed.expiresAt !== "number") {
      return false;
    }
    if (Date.now() > parsed.expiresAt) {
      removeSafeStorage("shafaq_admin_session");
      removeSafeStorage("shafaq_admin_auth");
      removeSafeStorage("shafaq_admin_token");
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function writeAdminSession(token: string): void {
  const sessionPayload = JSON.stringify({
    token,
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
  writeSafeStorage("shafaq_admin_session", sessionPayload);
  writeSafeStorage("shafaq_admin_token", token);
  writeSafeStorage("shafaq_admin_auth", "true");
}

function clearAdminSession(): void {
  removeSafeStorage("shafaq_admin_session");
  removeSafeStorage("shafaq_admin_auth");
  removeSafeStorage("shafaq_admin_token");
}

function resolveHashPage(): string {
  try {
    const h = window.location.hash.replace(/^#/, "").toLowerCase();
    if (!h || h.includes("sensiz520")) return "home";
    return (VALID_NAV_PAGES as readonly string[]).includes(h) ? h : "home";
  } catch {
    return "home";
  }
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => readSafeStorage("lang", VALID_LANGS, "ug"));
  const [theme, setTheme] = useState<Theme>(() => readSafeStorage("theme", VALID_THEMES, "ember"));
  const [mode, setMode] = useState<Mode>(() => readSafeStorage("mode", VALID_MODES, "dark"));
  const [page, setPage] = useState<string>(() => resolveHashPage());
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Authentication State (Validated with token + expiration timestamp)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => readValidAdminSession());
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [credentials, setCredentials] = useState<AdminCredentials>(() => {
    try {
      const saved = localStorage.getItem("shafaq_admin_credentials");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.username === "string" && isSha256Hex(String(parsed.passwordHash || ""))) {
          return {
            username: parsed.username,
            passwordHash: String(parsed.passwordHash).toLowerCase(),
            token: typeof parsed.token === "string" ? parsed.token : "",
          };
        }
      }
    } catch {
      // fallback
    }
    return { username: "admin", passwordHash: DEFAULT_ADMIN_HASH, token: "" };
  });

  const updateCredentials = async (creds: AdminCredentials) => {
    const newToken = await syncCloudAdminCredentials(creds.username, creds.passwordHash);
    const updated: AdminCredentials = { ...creds, token: newToken || creds.token || "" };
    setCredentials(updated);
    writeSafeStorage("shafaq_admin_credentials", JSON.stringify(updated));
    if (newToken) {
      writeAdminSession(newToken);
    }
  };

  // Modals & Interactive features
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [wechatModal, setWechatModal] = useState(false);

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const lastContactSubmitRef = useRef<number>(0);

  const langBox = useRef<HTMLDivElement>(null);
  const t = copy[lang];
  const dir = lang === "en" || lang === "tr" ? "ltr" : "rtl";

  // 1. Studio Settings (Persisted and synced)
  const [settings, setSettings] = useState<StudioSettings>(() => {
    try {
      const saved = localStorage.getItem("shafaq_studio_settings");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return defaultStudioSettings;
  });

  const updateSettings = (newSettings: StudioSettings) => {
    setSettings(newSettings);
    writeSafeStorage("shafaq_studio_settings", JSON.stringify(newSettings));
    syncCloudSettings(newSettings);
  };

  // 2. Promo Ads (Persisted and synced)
  const [promoAds, setPromoAds] = useState<PromoAdItem[]>(() => {
    try {
      const saved = localStorage.getItem("shafaq_promo_ads");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return defaultPromoAds;
  });

  const [promoIndex, setPromoIndex] = useState(0);

  const isMobileScreen = () => typeof window !== "undefined" && window.innerWidth <= 768;

  const handlePrevPromo = () => {
    if (!promoAds || promoAds.length <= 1) return;
    const isMob = isMobileScreen();
    const total = promoAds.length;

    if (isMob) {
      setPromoIndex((prev) => (prev <= 0 ? total - 1 : prev - 1));
    } else {
      const maxIdx = Math.max(0, total - 2);
      setPromoIndex((prev) => {
        if (prev <= 0) return maxIdx;
        return Math.max(0, prev - 2);
      });
    }
  };

  const handleNextPromo = () => {
    if (!promoAds || promoAds.length <= 1) return;
    const isMob = isMobileScreen();
    const total = promoAds.length;

    if (isMob) {
      setPromoIndex((prev) => (prev >= total - 1 ? 0 : prev + 1));
    } else {
      const maxIdx = Math.max(0, total - 2);
      setPromoIndex((prev) => {
        if (prev >= maxIdx) return 0;
        return Math.min(maxIdx, prev + 2);
      });
    }
  };

  const updatePromoAds = (newAds: PromoAdItem[]) => {
    setPromoAds(newAds);
    writeSafeStorage("shafaq_promo_ads", JSON.stringify(newAds));
    syncCloudPromoAds(newAds);
  };

  // 3. Showcase Projects (Persisted and synced)
  const [showcaseProjects, setShowcaseProjects] = useState<ShowcaseProject[]>(() => {
    try {
      const saved = localStorage.getItem("shafaq_showcase_projects");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return defaultShowcaseProjects;
  });

  const updateShowcaseProjects = (newProjects: ShowcaseProject[]) => {
    setShowcaseProjects(newProjects);
    writeSafeStorage("shafaq_showcase_projects", JSON.stringify(newProjects));
    syncCloudShowcaseProjects(newProjects);
  };

  // 4. Leads (Persisted and synced)
  const [leads, setLeads] = useState<LeadItem[]>(() => {
    try {
      const saved = localStorage.getItem("shafaq_leads");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return [
      {
        id: "L101",
        name: "ئەكبەرجان",
        contact: "+86 138 0000 1111",
        service: "ئاشخانا POS سىستېمىسى",
        estDays: "6 كۈن",
        date: "2026-08-19",
        status: "new",
        note: "كۆپ تىللىق تىزىملىك ۋە 2 تال تېرمال پىرىنتېر قوشۇش تەلەپ قىلىندى.",
      },
      {
        id: "L102",
        name: "مەخمۇتجان",
        contact: "+86 139 2222 3333",
        service: "تور بېكەت (Website)",
        estDays: "5 كۈن",
        date: "2026-08-18",
        status: "contacted",
        note: "RTL ئۇيغۇرچە ۋە ئىنگلىزچە خەلقئارالىق تور بەت سۈرۈشتۈردى.",
      },
      {
        id: "L103",
        name: "گۈلنۇر خانىم",
        contact: "+86 135 4444 5555",
        service: "ئىشخانا ئاپتوماتلاشتۇرۇش",
        estDays: "7 كۈن",
        date: "2026-08-17",
        status: "approved",
        note: "Excel ئامبار جەدۋىلىنى بىر قېتىمدىلا سىستېمىغا يۆتكەش تۈرى.",
      },
    ];
  });

  const updateLeads = (newLeads: LeadItem[]) => {
    setLeads(newLeads);
    writeSafeStorage("shafaq_leads", JSON.stringify(newLeads));
    syncCloudLeads(newLeads);
  };

  // 🌐 INITIAL CLOUD DATA FETCH & REALTIME LISTENERS FROM SUPABASE
  useEffect(() => {
    getCloudAdminCredentials().then((cloudCreds) => {
      if (cloudCreds) {
        setCredentials(cloudCreds);
        writeSafeStorage("shafaq_admin_credentials", JSON.stringify(cloudCreds));
        const localToken = localStorage.getItem("shafaq_admin_token");
        const isAuth = readValidAdminSession();
        if (isAuth && cloudCreds.token && localToken !== cloudCreds.token) {
          setIsAdminAuthenticated(false);
          clearAdminSession();
          setPage((prev) => (prev === "dashboard" ? "home" : prev));
        }
      }
    });

    getCloudPromoAds().then((cloudAds) => {
      if (cloudAds && cloudAds.length > 0) {
        setPromoAds(cloudAds);
        writeSafeStorage("shafaq_promo_ads", JSON.stringify(cloudAds));
      }
    });

    getCloudShowcaseProjects().then((cloudProjects) => {
      if (cloudProjects && cloudProjects.length > 0) {
        setShowcaseProjects(cloudProjects);
        writeSafeStorage("shafaq_showcase_projects", JSON.stringify(cloudProjects));
      }
    });

    getCloudLeads().then((cloudLeads) => {
      if (cloudLeads && cloudLeads.length > 0) {
        setLeads(cloudLeads);
        writeSafeStorage("shafaq_leads", JSON.stringify(cloudLeads));
      }
    });

    getCloudSettings().then((cloudSettings) => {
      if (cloudSettings) {
        setSettings(cloudSettings);
        writeSafeStorage("shafaq_studio_settings", JSON.stringify(cloudSettings));
      }
    });

    try {
      const channel = supabase
        .channel("supabase-realtime-sync")
        .on("postgres_changes", { event: "*", schema: "public", table: "admin_credentials" }, () => {
          getCloudAdminCredentials().then((cloudCreds) => {
            if (cloudCreds) {
              setCredentials(cloudCreds);
              writeSafeStorage("shafaq_admin_credentials", JSON.stringify(cloudCreds));
              const localToken = localStorage.getItem("shafaq_admin_token");
              if (cloudCreds.token && localToken !== cloudCreds.token) {
                setIsAdminAuthenticated(false);
                clearAdminSession();
                setPage((prev) => (prev === "dashboard" ? "home" : prev));
                showToast("⚠️ مەخپىي نومۇر ئۆزگەرتىلدى. قايتا كىرىڭ.");
              }
            }
          });
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "promo_ads" }, () => {
          getCloudPromoAds().then((ads) => ads && setPromoAds(ads));
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "showcase_projects" }, () => {
          getCloudShowcaseProjects().then((projs) => projs && setShowcaseProjects(projs));
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
          getCloudLeads().then((lds) => lds && setLeads(lds));
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "studio_settings" }, () => {
          getCloudSettings().then((st) => st && setSettings(st));
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn("Realtime channel setup error:", err);
    }
  }, []);

  // 5. Kanban Projects (Persisted and synced)
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem("shafaq_projects");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: "p1",
        title: "ئاشخانا كۆپ تىللىق QR POS ۋە ئاشپەز ئېكرانى",
        client: "شەپەق لەغمەن سارىيى",
        category: "ئاشخانا POS",
        budget: "$1,200",
        stage: "dev",
        deadline: "2026-08-25",
        progress: 75,
      },
      {
        id: "p2",
        title: "RTL ئېلېكترونلۇق تور دۇكىنى ۋە كۆچمە سېۋەت",
        client: "نەپىس بۇتېك دۇكىنى",
        category: "تور بەت",
        budget: "$950",
        stage: "design",
        deadline: "2026-08-28",
        progress: 40,
      },
      {
        id: "p3",
        title: "كارخانا ئامبار ۋە Excel ئاپتوماتلاشتۇرۇش سىستېمىسى",
        client: "تەڭرىتاغ سودا گۇرۇپپىسى",
        category: "ئىشخانا يۇمشاق دېتالى",
        budget: "$1,800",
        stage: "shipped",
        deadline: "2026-08-15",
        progress: 100,
      },
      {
        id: "p4",
        title: "شىركەت كۆرۈنمە كىملىك VI ۋە لوگو لايىھەسى",
        client: "ئالتۇن تاغ مەبلەغ سېلىش",
        category: "ماركا لايىھە",
        budget: "$650",
        stage: "new",
        deadline: "2026-09-02",
        progress: 10,
      },
    ];
  });

  const updateProjects = (newProjects: ProjectItem[]) => {
    setProjects(newProjects);
    writeSafeStorage("shafaq_projects", JSON.stringify(newProjects));
  };

  // 6. POS Nodes (Persisted and synced)
  const [posNodes, setPosNodes] = useState<PosNode[]>(() => {
    try {
      const saved = localStorage.getItem("shafaq_pos_nodes");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: "node-01",
        name: "شەپەق لەغمەن سارىيى (باش دۇكان)",
        location: "ئۈرۈمچى شەھىرى",
        ip: "192.168.1.120",
        status: "online",
        printer: "ready",
        ping: 18,
        todayOrders: 146,
        lastSync: "دەقىقە ئىلگىرى",
      },
      {
        id: "node-02",
        name: "نەپىس بۇتېك تور كاسسىر تۈگۈنى",
        location: "تور مۇلازىمېتىرى",
        ip: "47.98.102.44",
        status: "online",
        printer: "ready",
        ping: 24,
        todayOrders: 89,
        lastSync: "دەل ۋاقتىدا",
      },
      {
        id: "node-03",
        name: "تەڭرىتاغ ئىشخانا سىستېمىسى",
        location: "مەركىزىي ئامبار",
        ip: "10.0.0.15",
        status: "online",
        printer: "ready",
        ping: 14,
        todayOrders: 42,
        lastSync: "3 دەقىقە ئىلگىرى",
      },
    ];
  });

  const updatePosNodes = (newNodes: PosNode[]) => {
    setPosNodes(newNodes);
    writeSafeStorage("shafaq_pos_nodes", JSON.stringify(newNodes));
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.mode = mode;
    document.body.dataset.lang = lang;
    writeSafeStorage("lang", lang);
    writeSafeStorage("theme", theme);
    writeSafeStorage("mode", mode);
  }, [lang, theme, mode, dir]);

  useEffect(() => {
    const handleHashNav = () => {
      const h = window.location.hash.replace(/^#/, "").toLowerCase();
      if (h.includes("sensiz520")) return;
      if ((VALID_NAV_PAGES as readonly string[]).includes(h)) {
        setPage(h);
      } else if (!h) {
        setPage("home");
      }
    };

    window.addEventListener("hashchange", handleHashNav);
    window.addEventListener("popstate", handleHashNav);
    return () => {
      window.removeEventListener("hashchange", handleHashNav);
      window.removeEventListener("popstate", handleHashNav);
    };
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!langBox.current?.contains(e.target as Node)) setLangOpen(false);
      if (
        !mobileNavRef.current?.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest(".mobile-menu-btn")
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  useEffect(() => {
    if (!toastMsg) return;
    const timer = setTimeout(() => setToastMsg(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMsg]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(settings.email || "contact@shafaqtech.com");
    showToast(t.copiedToast);
  };

  // 🔒 Secret Route Detection for /sensiz520 or #sensiz520
  useEffect(() => {
    const handleSecretRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (path.includes("sensiz520") || hash.includes("sensiz520") || search.includes("sensiz520")) {
        if (isAdminAuthenticated && readValidAdminSession()) {
          setPage("dashboard");
        } else {
          setIsAdminAuthenticated(false);
          setPage("home");
          setAuthModalOpen(true);
        }
      }
    };

    handleSecretRoute();
    window.addEventListener("popstate", handleSecretRoute);
    window.addEventListener("hashchange", handleSecretRoute);
    return () => {
      window.removeEventListener("popstate", handleSecretRoute);
      window.removeEventListener("hashchange", handleSecretRoute);
    };
  }, [isAdminAuthenticated]);

  const handleAuthSuccess = (sessionToken: string) => {
    writeAdminSession(sessionToken);
    setIsAdminAuthenticated(true);
    setAuthModalOpen(false);
    setPage("dashboard");
  };

  const handleAuthClose = () => {
    setAuthModalOpen(false);
    if (!isAdminAuthenticated) {
      setPage("home");
      try {
        const cleanUrl = window.location.origin + window.location.pathname.replace(/\/sensiz520\/?/gi, "/");
        window.history.replaceState(null, "", cleanUrl);
      } catch {
        // ignore
      }
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    clearAdminSession();
    setPage("home");
    try {
      const cleanUrl = window.location.origin + window.location.pathname.replace(/\/sensiz520\/?/gi, "/");
      window.history.replaceState(null, "", cleanUrl);
    } catch {
      // ignore
    }
    showToast(t.auth.loggedOut);
  };

  const handleBackToSite = () => {
    setPage("home");
    try {
      const cleanUrl = window.location.origin + window.location.pathname.replace(/\/sensiz520\/?/gi, "/");
      window.history.replaceState(null, "", cleanUrl);
    } catch {
      // ignore
    }
  };

  const nav = useMemo(
    () =>
      [
        ["home", t.nav.home],
        ["about", t.nav.about],
        ["services", t.nav.services],
        ["work", t.nav.work],
        ["process", t.nav.process],
        ["contact", t.nav.contact],
      ] as const,
    [t],
  );

  const displayBrand = settings.brandName && settings.brandName.trim() ? settings.brandName : t.brand;

  // Resolve Promo Ad text: use CMS custom text if modified by admin, otherwise multilingual translation
  const resolvedPromoTexts = useMemo(() => {
    const sourceAds = promoAds && promoAds.length > 0 ? promoAds : defaultPromoAds;
    return sourceAds.map((ad, idx) => {
      const isDefaultUgText = defaultPromoAds[idx] && ad.text === defaultPromoAds[idx].text;
      if (isDefaultUgText && t.ads[idx]) {
        return t.ads[idx];
      }
      return ad.text || t.ads[idx] || "";
    });
  }, [promoAds, t.ads]);

  const rollingAds = useMemo(() => {
    return [...resolvedPromoTexts, ...resolvedPromoTexts];
  }, [resolvedPromoTexts]);

  const rawWhatsapp = (settings.whatsapp || "8613000000000").replace(/[^0-9]/g, "");
  const rawTelegram = (settings.telegram || "shafaq_tech").replace("@", "");

  // Helper to resolve localized or custom CMS details for a ShowcaseProject
  const getResolvedProjectDetail = (index: number) => {
    const p = showcaseProjects[index];
    const defIdx = defaultShowcaseProjects.findIndex((d) => d.id === p?.id);
    const isUnmodifiedDefault =
      defIdx !== -1 &&
      p &&
      p.name === defaultShowcaseProjects[defIdx].name &&
      p.title === defaultShowcaseProjects[defIdx].title &&
      p.desc === defaultShowcaseProjects[defIdx].desc;

    const i18nDetail = defIdx !== -1 ? t.projectDetails[defIdx] : undefined;
    const i18nWork = defIdx !== -1 ? t.works[defIdx] : undefined;

    return {
      cardName: isUnmodifiedDefault && i18nWork ? i18nWork.t : p?.name || i18nWork?.t || "تۈر",
      cardDesc: isUnmodifiedDefault && i18nWork ? i18nWork.d : p?.desc || i18nWork?.d || p?.title || "",
      title: isUnmodifiedDefault && i18nDetail ? i18nDetail.title : p?.title || i18nDetail?.title || "",
      tagline: isUnmodifiedDefault && i18nDetail ? i18nDetail.tagline : p?.desc || i18nDetail?.tagline || "",
      category: isUnmodifiedDefault && i18nDetail ? i18nDetail.category : p?.category || i18nDetail?.category || "",
      tags: p?.tags && p.tags.length > 0 ? p.tags : i18nDetail?.tags || ["React", "TypeScript"],
      features: i18nDetail?.features || t.projectDetails[0].features,
      deliverables: i18nDetail?.deliverables || t.projectDetails[0].deliverables,
      image: sanitizeImageUrl(p?.image || defaultShowcaseProjects[defIdx !== -1 ? defIdx : 0]?.image, "media/pos-v4.jpg"),
    };
  };

  const selectProjectForInquiry = (index: number) => {
    const p = getResolvedProjectDetail(index);
    const quoteText =
      lang === "tr"
        ? `[Proje Bilgisi: ${p.title}]\nKategori: ${p.category}\nTeknolojiler: ${p.tags.join(", ")}\n\nBenzer bir proje için fiyat ve teslim süresi öğrenmek istiyorum:`
        : lang === "en"
        ? `[Inquiry for Case Study: ${p.title}]\nCategory: ${p.category}\nTags: ${p.tags.join(", ")}\n\nPlease provide quotation and timeline for a similar project:`
        : lang === "ar"
        ? `[استفسار عن عمل مماثل: ${p.title}]\nالتصنيف: ${p.category}\nالتقنيات: ${p.tags.join(", ")}\n\nأود طلب عرض سعر لنظام مماثل:`
        : `[تۈر سۈرۈشتۈرۈش: ${p.title}]\nتۈرى: ${p.category}\nئىشلىتىلگەن تېخنىكىلار: ${p.tags.join(", ")}\n\nمۇشۇنىڭغا ئوخشاش تۈر قىلدۇرۇش ئۈچۈن باھا ۋە ۋاقىت سۈرۈشتۈرمەكچى:`;

    setActiveProject(null);
    setContactMessage(quoteText);
    setPage("home");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  if (page === "dashboard" && isAdminAuthenticated) {
    return (
      <div className="app">
        <Suspense
          fallback={
            <div className="dash-suspense-wrap">
              <div className="dash-suspense-spinner" />
              <p style={{ fontWeight: 600, color: "var(--accent)" }}>
                {lang === "ug" ? "باشقۇرۇش سۇپىسى يۈكلىنىۋاتىدۇ..." : "Dashboard Loading..."}
              </p>
            </div>
          }
        >
          <Dashboard
            lang={lang}
            onSetLang={setLang}
            theme={theme}
            onCycleTheme={() => setTheme(themes[(themes.indexOf(theme) + 1) % themes.length])}
            mode={mode}
            onToggleMode={() => setMode(mode === "dark" ? "light" : "dark")}
            onBackToSite={handleBackToSite}
            onLogout={handleLogout}
            onShowToast={showToast}
            promoAds={promoAds}
            onUpdatePromoAds={updatePromoAds}
            showcaseProjects={showcaseProjects}
            onUpdateShowcaseProjects={updateShowcaseProjects}
            leads={leads}
            onUpdateLeads={updateLeads}
            projects={projects}
            onUpdateProjects={updateProjects}
            posNodes={posNodes}
            onUpdatePosNodes={updatePosNodes}
            settings={settings}
            onUpdateSettings={updateSettings}
          />
        </Suspense>
        {toastMsg && (
          <div className="toast-bar">
            <span>✨ {toastMsg}</span>
          </div>
        )}
      </div>
    );
  }

  const activeModalProject = activeProject !== null ? getResolvedProjectDetail(activeProject) : null;

  return (
    <div className="app">
      {/* Top Ticker */}
      <header className="nav">
        <div className="ticker" role="region" aria-label="Promotions">
          <div className="ticker-track">
            {rollingAds.map((ad, i) => (
              <span
                key={i}
                className="ticker-item"
                aria-hidden={i >= resolvedPromoTexts.length ? "true" : undefined}
              >
                {ad}
              </span>
            ))}
          </div>
        </div>
        <div className="wrap nav-in">
          <a
            className="brand"
            href="#home"
            onClick={() => {
              setPage("home");
              setMobileMenuOpen(false);
            }}
          >
            <img className="logo" src={logo} alt={displayBrand} width={46} height={46} />
            <span className="brand-name">{displayBrand}</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-links desktop-nav">
            {nav.map(([id, label], i) => (
              <a
                key={id}
                href={"#" + id}
                className={(page === id ? "active " : "") + "nav-chip nav-chip-" + i}
                style={{
                  color: navPaint[i]?.color || "#fff",
                  fontWeight: 700,
                  backgroundImage: navPaint[i]?.bg || "linear-gradient(120deg,#d97706,#f59e0b)",
                  backgroundSize: "220% 220%",
                  animation: `navPulse 4.5s ease-in-out ${i * 0.35}s infinite, navInk 3.2s ease-in-out ${i * 0.25}s infinite`,
                  padding: "8px 14px",
                  borderRadius: 999,
                }}
                onClick={() => {
                  setPage(id);
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Header Controls & Mobile Toggle */}
          <div className="controls">
            <div className="lang-dd" ref={langBox}>
              <button
                className={"icon-btn lang-globe-btn" + (langOpen ? " on" : "")}
                onClick={() => setLangOpen((v) => !v)}
                title="تىل تاللاش / Language"
                aria-label="Language Selector"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </button>
              <div className={"lang-menu" + (langOpen ? " open" : "")}>
                {(["ug", "tr", "en", "ar"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    className={lang === l ? "on" : ""}
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                  >
                    {langLabel[l]}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="icon-btn theme-btn"
              title={t.themes[theme]}
              onClick={() => setTheme(themes[(themes.indexOf(theme) + 1) % themes.length])}
            >
              <ThemeIcon theme={theme} />
            </button>
            <button className="icon-btn mode-btn" onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
              {mode === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              className={"mobile-menu-btn" + (mobileMenuOpen ? " open" : "")}
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle Menu"
              title="Menu"
            >
              <span className="bar top-bar" />
              <span className="bar mid-bar" />
              <span className="bar bot-bar" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        <div
          ref={mobileNavRef}
          className={"mobile-dropdown-menu" + (mobileMenuOpen ? " open" : "")}
        >
          <div className="mobile-dropdown-inner">
            <div className="mobile-dropdown-header">
              <span className="mobile-menu-label">
                {lang === "ug" ? "بەت بۆلەكلىرى" : lang === "ar" ? "قائمة الصفحات" : lang === "tr" ? "Sayfa Menüsü" : "Navigation"}
              </span>
              <button
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <nav className="mobile-nav-items">
              {nav.map(([id, label]) => {
                const icon =
                  id === "home" ? "🏠" :
                  id === "about" ? "ℹ️" :
                  id === "services" ? "⚡" :
                  id === "work" ? "💼" :
                  id === "process" ? "🔄" :
                  id === "contact" ? "📞" : "⚙️";
                return (
                  <a
                    key={id}
                    href={"#" + id}
                    className={"mobile-nav-item" + (page === id ? " active" : "")}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setPage(id);
                    }}
                  >
                    <span className="mobile-nav-icon">{icon}</span>
                    <span className="mobile-nav-text">{label.replace("⚙️ ", "")}</span>
                    <span className="mobile-nav-arrow">{dir === "rtl" ? "❮" : "❯"}</span>
                  </a>
                );
              })}
            </nav>

            <div className="mobile-dropdown-footer">
              <a
                href={`https://wa.me/${rawWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-quick-link wa"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>💬 WhatsApp</span>
              </a>
              <a
                href={`https://t.me/${rawTelegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-quick-link tg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>✈️ Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="wrap">
        {/* HERO WITH INTEGRATED 3 HIGH-CONVERTING VALUE PROPOSITION CARDS */}
        {(page === "home") && (
          <section id="home" className="hero" style={{ backgroundImage: `url(${heroTech})` }}>
            <img className="hero-bg" src={heroTech} alt="" />
            <div className="hero-veil" />
            <div className="hero-inner">
              <div className="hero-content-box">
                <div className="kicker">SHAFAQ TECH HUB · {t.kicker}</div>
                <h1>{t.heroTitle}</h1>
                <p className="lead">{t.heroLead}</p>
                <div className="cta-row">
                  <button
                    className="btn"
                    onClick={() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {t.cta}
                  </button>
                  <button
                    className="btn ghost"
                    onClick={() => {
                      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {t.cta2}
                  </button>
                </div>
              </div>

              <div className="hero-prop-col">
                {t.ctaBanner.cards.map((card, ci) => {
                  const isDark = mode === "dark";

                  const themeConfigs = [
                    {
                      border: isDark ? "#c084fc" : "#8b5cf6",
                      glow: isDark ? "rgba(168, 85, 247, 0.45)" : "rgba(139, 92, 246, 0.25)",
                      bgDark: "linear-gradient(135deg, rgba(109, 40, 217, 0.65) 0%, rgba(55, 18, 115, 0.88) 100%)",
                      bgLight: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
                      badgeColor: isDark ? "#f3e8ff" : "#6d28d9",
                      badgeBorder: isDark ? "#c084fc" : "#8b5cf6",
                      badgeBg: isDark ? "rgba(168, 85, 247, 0.35)" : "#ffffff",
                      textColor: isDark ? "#ffffff" : "#2e1065",
                      textShadow: isDark ? "0 2px 6px rgba(0, 0, 0, 0.75)" : "none",
                    },
                    {
                      border: isDark ? "#fbbf24" : "#d97706",
                      glow: isDark ? "rgba(245, 158, 11, 0.45)" : "rgba(217, 119, 6, 0.25)",
                      bgDark: "linear-gradient(135deg, rgba(180, 83, 9, 0.7) 0%, rgba(95, 35, 5, 0.9) 100%)",
                      bgLight: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                      badgeColor: isDark ? "#fef08a" : "#92400e",
                      badgeBorder: isDark ? "#fbbf24" : "#d97706",
                      badgeBg: isDark ? "rgba(245, 158, 11, 0.35)" : "#ffffff",
                      textColor: isDark ? "#ffffff" : "#451a03",
                      textShadow: isDark ? "0 2px 6px rgba(0, 0, 0, 0.75)" : "none",
                    },
                    {
                      border: isDark ? "#34d399" : "#16a34a",
                      glow: isDark ? "rgba(16, 185, 129, 0.5)" : "rgba(22, 163, 74, 0.25)",
                      bgDark: "linear-gradient(135deg, rgba(5, 150, 105, 0.7) 0%, rgba(4, 47, 36, 0.92) 100%)",
                      bgLight: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                      badgeColor: isDark ? "#a7f3d0" : "#14532d",
                      badgeBorder: isDark ? "#34d399" : "#16a34a",
                      badgeBg: isDark ? "rgba(16, 185, 129, 0.35)" : "#ffffff",
                      textColor: isDark ? "#ffffff" : "#022c22",
                      textShadow: isDark ? "0 2px 6px rgba(0, 0, 0, 0.75)" : "none",
                    },
                  ];

                  const conf = themeConfigs[ci] || themeConfigs[0];

                  return (
                    <div
                      className={`hero-prop-card hero-prop-${ci}`}
                      key={ci}
                      style={{
                        background: isDark ? conf.bgDark : conf.bgLight,
                        border: `2px solid ${conf.border}`,
                        boxShadow: `0 10px 28px ${conf.glow}`,
                      }}
                    >
                      <div className="hero-prop-card-head">
                        <span
                          className="hero-prop-badge"
                          style={{
                            borderColor: conf.badgeBorder,
                            color: conf.badgeColor,
                            background: conf.badgeBg,
                          }}
                        >
                          <span style={{ fontSize: 13 }}>{card.icon}</span> {card.badge}
                        </span>
                      </div>

                      <p
                        className="hero-prop-text"
                        style={{
                          color: conf.textColor,
                          textShadow: conf.textShadow,
                          textAlign: "center",
                        }}
                      >
                        «{card.text}»
                      </p>

                      {"btnText" in card && (card as { btnText?: string }).btnText && (
                        <button
                          className="hero-prop-btn"
                          style={{
                            background: isDark
                              ? "linear-gradient(135deg, #22c55e, #16a34a)"
                              : "linear-gradient(135deg, #16a34a, #15803d)",
                            color: "#ffffff",
                            border: isDark ? "1px solid #86efac" : "none",
                            boxShadow: isDark
                              ? "0 4px 18px rgba(34, 197, 94, 0.55)"
                              : "0 4px 14px rgba(22, 163, 74, 0.35)",
                          }}
                          onClick={() => {
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          {(card as { btnText?: string }).btnText}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* STATS BAR */}
        <section className="section stats-sec">
          <div className="section-head text-center">
            <h2>{t.statsTitle}</h2>
          </div>
          <div className="stats-cards-grid">
            {t.stats.map((st, i) => {
              const p = STAT_PRESETS[i] || STAT_PRESETS[0];
              const isDark = mode === "dark";
              const badgeText = lang === "tr" ? p.badgeTr : lang === "en" ? p.badgeEn : lang === "ar" ? p.badgeAr : p.badgeUg;
              return (
                <div
                  className="stat-card-luxury"
                  key={i}
                  style={{
                    background: isDark ? p.bgDark : p.bgLight,
                    border: `2px solid ${p.border}`,
                    boxShadow: `0 12px 32px ${isDark ? p.glow : "rgba(0,0,0,0.06)"}`,
                  }}
                >
                  <div className="stat-card-top">
                    <span className="stat-badge-chip" style={{ borderColor: p.border, color: isDark ? "#fff" : "#111" }}>
                      <span className="stat-icon">{p.icon}</span> {badgeText}
                    </span>
                  </div>
                  <div
                    className="stat-number-display"
                    style={{
                      color: isDark ? p.numDark : p.numLight,
                      textShadow: isDark ? `0 0 20px ${p.glow}` : "none",
                    }}
                  >
                    {st.val}
                  </div>
                  <h3 className="stat-title-text" style={{ color: isDark ? "#f8fafc" : "#0f172a" }}>
                    {st.label}
                  </h3>
                  <p className="stat-sub-text" style={{ color: isDark ? "#94a3b8" : "#475569" }}>
                    {st.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ABOUT */}
        {(page === "home" || page === "about") && (
          <section id="about" className="section about-sec">
            <img className="about-bg" src={aboutBg} alt="" />
            <div className="about-inner">
              <h2>{t.aboutTitle}</h2>
              <p>{t.about}</p>
              <p className="about-wish">{t.aboutWish}</p>
            </div>
          </section>
        )}

        {/* SERVICES */}
        {(page === "home" || page === "services") && (
          <section id="services" className="section">
            <h2>{t.servicesTitle}</h2>
            <div className="grid g3">
              {t.services.map((s, i) => (
                <article className={`card svc svc-${i}`} key={s.t}>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* PROMO STATIC CAROUSEL */}
        {page === "home" && (
          <section className="promo-carousel-sec">
            <div className="promo-carousel-container">
              <button
                className="promo-nav-btn promo-prev-btn"
                onClick={dir === "rtl" ? handleNextPromo : handlePrevPromo}
                aria-label="Previous Slide"
                title={lang === "ug" ? "ئالدىنقى" : lang === "ar" ? "السابق" : lang === "tr" ? "Önceki" : "Previous"}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={dir === "rtl" ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
                </svg>
              </button>

              <div className="promo-carousel-viewport">
                <div
                  className="promo-carousel-track"
                  style={{ "--promo-idx": promoIndex } as React.CSSProperties}
                >
                  {promoAds.map((ad, idx) => {
                    const adImage = sanitizeImageUrl(ad.image || defaultPromoAds[idx]?.image, "media/pos-v4.jpg");
                    const adText = resolvedPromoTexts[idx] || ad.text;
                    return (
                      <div className="promo-slide-item" key={ad.id || idx}>
                        <article className="promo-banner-card">
                          <img className="promo-banner-img" src={adImage} alt={adText} />
                          <div className="promo-banner-overlay">
                            <span className="promo-banner-text">{adText}</span>
                          </div>
                        </article>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                className="promo-nav-btn promo-next-btn"
                onClick={dir === "rtl" ? handlePrevPromo : handleNextPromo}
                aria-label="Next Slide"
                title={lang === "ug" ? "كېيىنكى" : lang === "ar" ? "التالي" : lang === "tr" ? "Sonraki" : "Next"}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={dir === "rtl" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
                </svg>
              </button>
            </div>

            <div className="promo-dots">
              {promoAds.map((_, i) => (
                <button
                  key={i}
                  className={"promo-dot" + (promoIndex === i ? " active" : "")}
                  onClick={() => setPromoIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* WORK / CASE STUDIES */}
        {(page === "home" || page === "work") && (
          <section id="work" className="section">
            <div className="section-head-row">
              <div>
                <h2>{t.workTitle}</h2>
                <p className="work-hint-badge">{t.workHint}</p>
              </div>
            </div>
            <div className="grid g2">
              {showcaseProjects.map((p, i) => {
                const resolved = getResolvedProjectDetail(i);
                const nameColor = p.nameColor || WORK_NAME_COLORS[i % WORK_NAME_COLORS.length];
                const descColor = p.descColor || WORK_DESC_COLORS[i % WORK_DESC_COLORS.length];
                return (
                  <article
                    className="card work-card interactive-work-card"
                    key={p.id || i}
                    onClick={() => setActiveProject(i)}
                  >
                    <div className="work-photo-wrap">
                      <img
                        className="work-photo"
                        src={resolved.image}
                        alt={resolved.cardName}
                        style={i === 1 ? { objectPosition: "top center" } : undefined}
                      />
                      <div className="work-inspect-overlay">
                        <span className="inspect-chip">
                          🔍 {lang === "ar" ? "عرض التفاصيل" : lang === "tr" ? "Detayları İncele" : lang === "en" ? "Inspect Details" : "تەپسىلات كۆرۈش"}
                        </span>
                      </div>
                    </div>
                    <p style={{ margin: "8px 0 0", lineHeight: 1.9, fontSize: 17 }}>
                      <b
                        className="work-name"
                        style={{ color: nameColor, background: "#ecfdf5" }}
                      >
                        {resolved.cardName}
                      </b>
                      {" — "}
                      <span style={{ color: descColor }}>{resolved.cardDesc}</span>
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* PROCESS */}
        {(page === "home" || page === "process") && (
          <section id="process" className="section">
            <h2>{t.processTitle}</h2>
            <div className="steps">
              {t.steps.map((s, i) => (
                <div className={`step step-${i}`} key={s} style={{ backgroundImage: `url(${stepImgs[i]})` }}>
                  <b>0{i + 1}</b>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DIRECT QUICK CONTACT BUTTONS BAR */}
        <section className="section direct-contact-sec">
          <div className="card direct-card">
            <div className="section-head">
              <h2>{t.directContactTitle}</h2>
              <p className="subhead">{t.directContactSubtitle}</p>
            </div>
            <div className="direct-buttons-row">
              <a
                href={`https://wa.me/${rawWhatsapp || "8613000000000"}?text=Hello%20${encodeURIComponent(displayBrand)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="direct-btn wa-btn"
              >
                <img src="media/icon-whatsapp.png" alt="WhatsApp" className="contact-icon-img" />
                <span>{t.whatsappBtn}</span>
              </a>
              <a
                href={`https://t.me/${rawTelegram || "shafaq_tech"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="direct-btn tg-btn"
              >
                <img src="media/icon-telegram.png" alt="Telegram" className="contact-icon-img" />
                <span>{t.telegramBtn}</span>
              </a>
              <a
                href={`tel:${rawWhatsapp || "8613000000000"}`}
                className="direct-btn phone-btn"
              >
                <img src="media/icon-phone.png" alt="Phone" className="contact-icon-img" />
                <span>{t.phoneCallBtn || "تېلېفون قىلىش"}</span>
              </a>
              <button
                type="button"
                className="direct-btn mail-btn"
                onClick={copyEmail}
              >
                <span className="btn-icon">📋</span>
                <span>{t.copyEmailBtn}</span>
              </button>
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        {(page === "home" || page === "contact") && (
          <section id="contact" className="section">
            <h2>{t.contactTitle}</h2>
            <form
              className="form card"
              onSubmit={(e) => {
                e.preventDefault();
                const now = Date.now();
                if (now - lastContactSubmitRef.current < CONTACT_COOLDOWN_MS) {
                  showToast(
                    lang === "tr"
                      ? "⏳ Lütfen yeni mesaj göndermeden önce birkaç saniye bekleyin."
                      : lang === "en"
                      ? "⏳ Please wait a few seconds before sending another inquiry."
                      : lang === "ar"
                      ? "⏳ يرجى الانتظار قليلاً قبل إرسال رسالة أخرى."
                      : "⏳ قايتا ئۇچۇر ئەۋەتىشتىن بۇرۇن ئازراق ساقلاڭ.",
                  );
                  return;
                }

                const trimmedName = sanitizeText(contactName, 120);
                const trimmedEmail = sanitizeText(contactEmail, 150);
                const trimmedMsg = sanitizeText(contactMessage, 1500);

                if (!trimmedName || !trimmedEmail || !trimmedMsg) {
                  showToast(
                    lang === "tr"
                      ? "⚠️ Lütfen tüm alanları eksiksiz doldurun!"
                      : lang === "en"
                      ? "⚠️ Please fill in all fields properly!"
                      : lang === "ar"
                      ? "⚠️ يرجى ملء جميع الحقول بشكل صحيح!"
                      : "⚠️ بارلىق كاتەكچىلەرنى تولۇق ۋە توغرا كىرگۈزۈڭ!",
                  );
                  return;
                }

                lastContactSubmitRef.current = now;

                const newLead: LeadItem = {
                  id: "L" + Date.now().toString().slice(-5),
                  name: trimmedName,
                  contact: trimmedEmail,
                  service: "تور بېكەت ۋە تېخنىكا",
                  estDays: "5-8 كۈن",
                  date: new Date().toISOString().slice(0, 10),
                  status: "new",
                  note: trimmedMsg,
                };
                const nextLeads = [newLead, ...leads];
                setLeads(nextLeads);
                writeSafeStorage("shafaq_leads", JSON.stringify(nextLeads));
                // Insert only the new lead to Supabase rather than overwriting cloud leads with visitor's localStorage
                addCloudLead(newLead);

                showToast(
                  lang === "tr"
                    ? "Mesajınız başarıyla iletildi ve CRM sistemine kaydedildi!"
                    : lang === "en"
                    ? "Message sent successfully and logged into CRM!"
                    : lang === "ar"
                    ? "تم إرسال رسالتكم بنجاح وتسجيلها في النظام!"
                    : "ئۇچۇرىڭىز تاپشۇرۇۋېلىندى ۋە سىستېمىغا رەسمىي كىرگۈزۈلدى!",
                );
                setContactName("");
                setContactEmail("");
                setContactMessage("");
              }}
            >
              <input
                required
                maxLength={120}
                aria-label={t.name}
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder={t.name}
              />
              <input
                type="email"
                required
                maxLength={150}
                aria-label="Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="email@domain.com"
                dir="ltr"
              />
              <textarea
                required
                maxLength={1500}
                aria-label={t.msg}
                rows={5}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder={t.msg}
              />
              <button className="btn" type="submit" aria-label={t.send}>
                {t.send}
              </button>
            </form>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer>
        <div className="wrap footer-wrap">
          <div>{settings.brandName ? `© 2026 ${settings.brandName}` : t.footer}</div>
          <div className="footer-links">
            <a href="#home">{t.nav.home}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
        </div>
      </footer>

      {/* ADMIN AUTH / LOGIN MODAL */}
      <AdminAuthModal
        lang={lang}
        isOpen={authModalOpen}
        onClose={handleAuthClose}
        onSuccess={handleAuthSuccess}
        onShowToast={showToast}
        credentials={credentials}
        onUpdateCredentials={updateCredentials}
      />

      {/* PROJECT DETAIL MODAL / LIGHTBOX */}
      {activeProject !== null && activeModalProject && (
        <div className="modal-backdrop" onClick={() => setActiveProject(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveProject(null)}>
              ✕
            </button>
            <div className="modal-image-wrap">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="modal-image"
                style={activeProject === 1 ? { objectPosition: "top center" } : undefined}
              />
              <span className="modal-cat-badge">
                {activeModalProject.category}
              </span>
            </div>
            <div className="modal-content">
              <h2 className="modal-title">{activeModalProject.title}</h2>
              <p className="modal-tagline">{activeModalProject.tagline}</p>

              <div className="modal-tags">
                {activeModalProject.tags.map((tag, idx) => (
                  <span className="modal-tag" key={idx}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="modal-section-title">
                {lang === "ar"
                  ? "أبرز الميزات والحلول المنفذة:"
                  : lang === "tr"
                  ? "Sağlanan Temel Özellikler:"
                  : lang === "en"
                  ? "Key Capabilities Delivered:"
                  : "ئاساسلىق ئىقتىدار ۋە ھەل قىلىش چارىلىرى:"}
              </div>
              <ul className="modal-features-list">
                {activeModalProject.features.map((feat, fidx) => (
                  <li key={fidx}>
                    <span className="feat-check">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="modal-deliverables">
                <strong>
                  {lang === "ar"
                    ? "المخرجات: "
                    : lang === "tr"
                    ? "Teslim Edilenler: "
                    : lang === "en"
                    ? "Deliverables: "
                    : "تاپشۇرۇلىدىغان مەھسۇلات: "}
                </strong>
                <span>{activeModalProject.deliverables}</span>
              </div>

              <div className="modal-actions">
                <button
                  className="btn"
                  onClick={() => selectProjectForInquiry(activeProject)}
                >
                  {lang === "ar"
                    ? "طلب مشروع مماثل"
                    : lang === "tr"
                    ? "Benzer Proje İçin Teklif Al"
                    : lang === "en"
                    ? "Inquire Similar Project"
                    : "مۇشۇنداق تۈر سۈرۈشتۈرۈش"}
                </button>
                <button
                  className="btn ghost"
                  onClick={() => setActiveProject(null)}
                >
                  {lang === "ar" ? "إغلاق" : lang === "tr" ? "Kapat" : lang === "en" ? "Close" : "تاقاش"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WECHAT MODAL */}
      {wechatModal && (
        <div className="modal-backdrop" onClick={() => setWechatModal(false)}>
          <div className="modal-card small-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setWechatModal(false)}>
              ✕
            </button>
            <div className="small-modal-content">
              <h3>WeChat ID</h3>
              <div className="wechat-box">
                <code>{settings.wechat || "ShafaqTechHub"}</code>
                <button
                  className="btn"
                  onClick={() => {
                    navigator.clipboard.writeText(settings.wechat || "ShafaqTechHub");
                    showToast(t.copiedToast);
                    setWechatModal(false);
                  }}
                >
                  {lang === "tr" ? "ID Kopyala" : lang === "en" ? "Copy ID" : lang === "ar" ? "نسخ المعرّف" : "ID كۆچۈرۈش"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="toast-bar">
          <span>✨ {toastMsg}</span>
        </div>
      )}

      {/* FLOATING AI ASSISTANT & KNOWLEDGE BASE CHAT */}
      <AiAssistantModal
        lang={lang}
        whatsappNumber={settings.whatsapp}
        onOpenEstimator={() => {
          setPage("home");
          setTimeout(() => {
            (document.querySelector(".estimator-sec") || document.getElementById("contact"))?.scrollIntoView({
              behavior: "smooth",
            });
          }, 80);
        }}
        onOpenContact={() => {
          setPage("home");
          setTimeout(() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }}
        onOpenWork={() => {
          setPage("home");
          setTimeout(() => {
            document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }}
      />

      {/* FLOATING QUICK CONTACT BAR */}
      <aside className="floating-contact">
        <a
          href={`tel:${rawWhatsapp || "8613000000000"}`}
          className="float-btn float-phone"
          title={t.phoneCallBtn || "Telephone"}
        >
          <img src="media/icon-phone.png" alt="Phone" className="float-icon-img" />
        </a>
        <a
          href={`https://wa.me/${rawWhatsapp || "8613000000000"}?text=Hello%20${encodeURIComponent(displayBrand)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn float-wa"
          title="WhatsApp"
        >
          <img src="media/icon-whatsapp.png" alt="WhatsApp" className="float-icon-img" />
        </a>
        <a
          href={`https://t.me/${rawTelegram || "shafaq_tech"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn float-tg"
          title="Telegram"
        >
          <img src="media/icon-telegram.png" alt="Telegram" className="float-icon-img" />
        </a>
      </aside>
    </div>
  );
}

function ThemeIcon({ theme: _theme }: { theme?: Theme } = {}) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 4a8 8 0 0 0 0 16V4z" fill="currentColor" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 13.5A7 7 0 0 1 10 4a7 7 0 1 0 6.5 9.5z" />
    </svg>
  );
}
