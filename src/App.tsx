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
  syncCloudLeads,
  getCloudSettings,
  syncCloudSettings,
  getCloudAdminCredentials,
  syncCloudAdminCredentials,
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
  brandName: "", // Empty by default so it naturally follows t.brand
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

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "ug");
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "ember");
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem("mode") as Mode) || "dark");
  const [page, setPage] = useState("home");
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem("shafaq_admin_auth") === "true" || sessionStorage.getItem("shafaq_admin_auth") === "true";
    } catch {
      return false;
    }
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [credentials, setCredentials] = useState<AdminCredentials>(() => {
    try {
      const saved = localStorage.getItem("shafaq_admin_credentials");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return { username: "admin", passwordHash: "admin123", token: "" };
  });

  const updateCredentials = async (creds: AdminCredentials) => {
    const newToken = await syncCloudAdminCredentials(creds.username, creds.passwordHash);
    const updated: AdminCredentials = { ...creds, token: newToken || creds.token || "" };
    setCredentials(updated);
    localStorage.setItem("shafaq_admin_credentials", JSON.stringify(updated));
    if (newToken) {
      localStorage.setItem("shafaq_admin_token", newToken);
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
    localStorage.setItem("shafaq_studio_settings", JSON.stringify(newSettings));
    syncCloudSettings(newSettings);
  };

  // 2. Promo Ads (Persisted and synced)
  const [promoAds, setPromoAds] = useState<PromoAdItem[]>(() => {
    try {
      const saved = localStorage.getItem("shafaq_promo_ads");
      if (saved) return JSON.parse(saved);
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
      // 📱 Mobile: Slide 1 card at a time
      setPromoIndex((prev) => (prev <= 0 ? total - 1 : prev - 1));
    } else {
      // 💻 Desktop/PC: Slide 2 cards at a time
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
      // 📱 Mobile: Slide 1 card at a time
      setPromoIndex((prev) => (prev >= total - 1 ? 0 : prev + 1));
    } else {
      // 💻 Desktop/PC: Slide 2 cards at a time
      const maxIdx = Math.max(0, total - 2);
      setPromoIndex((prev) => {
        if (prev >= maxIdx) return 0;
        return Math.min(maxIdx, prev + 2);
      });
    }
  };

  const updatePromoAds = (newAds: PromoAdItem[]) => {
    setPromoAds(newAds);
    localStorage.setItem("shafaq_promo_ads", JSON.stringify(newAds));
    syncCloudPromoAds(newAds);
  };

  // 3. Showcase Projects (Persisted and synced)
  const [showcaseProjects, setShowcaseProjects] = useState<ShowcaseProject[]>(() => {
    try {
      const saved = localStorage.getItem("shafaq_showcase_projects");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return defaultShowcaseProjects;
  });

  const updateShowcaseProjects = (newProjects: ShowcaseProject[]) => {
    setShowcaseProjects(newProjects);
    localStorage.setItem("shafaq_showcase_projects", JSON.stringify(newProjects));
    syncCloudShowcaseProjects(newProjects);
  };

  // 4. Leads (Persisted and synced)
  const [leads, setLeads] = useState<LeadItem[]>(() => {
    try {
      const saved = localStorage.getItem("shafaq_leads");
      if (saved) return JSON.parse(saved);
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
    localStorage.setItem("shafaq_leads", JSON.stringify(newLeads));
    syncCloudLeads(newLeads);
  };

  // 🌐 INITIAL CLOUD DATA FETCH & REALTIME LISTENERS FROM SUPABASE
  useEffect(() => {
    // 0. Fetch Cloud Admin Credentials & Invalidate Stale Session
    getCloudAdminCredentials().then((cloudCreds) => {
      if (cloudCreds) {
        setCredentials(cloudCreds);
        localStorage.setItem("shafaq_admin_credentials", JSON.stringify(cloudCreds));
        const localToken = localStorage.getItem("shafaq_admin_token");
        const isAuth = localStorage.getItem("shafaq_admin_auth") === "true";
        if (isAuth && cloudCreds.token && localToken !== cloudCreds.token) {
          setIsAdminAuthenticated(false);
          localStorage.removeItem("shafaq_admin_auth");
          localStorage.removeItem("shafaq_admin_token");
          sessionStorage.removeItem("shafaq_admin_auth");
          setPage((prev) => (prev === "dashboard" ? "home" : prev));
        }
      }
    });

    // 1. Fetch Cloud Promo Ads
    getCloudPromoAds().then((cloudAds) => {
      if (cloudAds && cloudAds.length > 0) {
        setPromoAds(cloudAds);
        localStorage.setItem("shafaq_promo_ads", JSON.stringify(cloudAds));
      }
    });

    // 2. Fetch Cloud Showcase Projects
    getCloudShowcaseProjects().then((cloudProjects) => {
      if (cloudProjects && cloudProjects.length > 0) {
        setShowcaseProjects(cloudProjects);
        localStorage.setItem("shafaq_showcase_projects", JSON.stringify(cloudProjects));
      }
    });

    // 3. Fetch Cloud Leads
    getCloudLeads().then((cloudLeads) => {
      if (cloudLeads && cloudLeads.length > 0) {
        setLeads(cloudLeads);
        localStorage.setItem("shafaq_leads", JSON.stringify(cloudLeads));
      }
    });

    // 4. Fetch Cloud Settings
    getCloudSettings().then((cloudSettings) => {
      if (cloudSettings) {
        setSettings(cloudSettings);
        localStorage.setItem("shafaq_studio_settings", JSON.stringify(cloudSettings));
      }
    });

    // 5. Setup Realtime sync
    try {
      const channel = supabase
        .channel("supabase-realtime-sync")
        .on("postgres_changes", { event: "*", schema: "public", table: "admin_credentials" }, () => {
          getCloudAdminCredentials().then((cloudCreds) => {
            if (cloudCreds) {
              setCredentials(cloudCreds);
              localStorage.setItem("shafaq_admin_credentials", JSON.stringify(cloudCreds));
              const localToken = localStorage.getItem("shafaq_admin_token");
              if (localToken !== cloudCreds.token) {
                setIsAdminAuthenticated(false);
                localStorage.removeItem("shafaq_admin_auth");
                localStorage.removeItem("shafaq_admin_token");
                sessionStorage.removeItem("shafaq_admin_auth");
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
    localStorage.setItem("shafaq_projects", JSON.stringify(newProjects));
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
    localStorage.setItem("shafaq_pos_nodes", JSON.stringify(newNodes));
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.mode = mode;
    document.body.dataset.lang = lang;
    localStorage.setItem("lang", lang);
    localStorage.setItem("theme", theme);
    localStorage.setItem("mode", mode);
  }, [lang, theme, mode, dir]);

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

  // Toast timer
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
        if (isAdminAuthenticated) {
          setPage("dashboard");
        } else {
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

  const handleAuthSuccess = () => {
    setIsAdminAuthenticated(true);
    setAuthModalOpen(false);
    if (credentials.token) {
      localStorage.setItem("shafaq_admin_token", credentials.token);
    }
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
    localStorage.removeItem("shafaq_admin_auth");
    localStorage.removeItem("shafaq_admin_token");
    sessionStorage.removeItem("shafaq_admin_auth");
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

  // Public Navigation Links (Dashboard is completely hidden from public eyes)
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

  // Dynamic Brand name: follows current language (t.brand) or user custom settings if specifically set
  const displayBrand = settings.brandName && settings.brandName.trim() ? settings.brandName : t.brand;

  // Dynamic Rolling Ticker ads: naturally multilingual with current language
  const rollingAds = useMemo(() => {
    return [...t.ads, ...t.ads];
  }, [t.ads]);

  const rawWhatsapp = (settings.whatsapp || "8613000000000").replace(/[^0-9]/g, "");
  const rawTelegram = (settings.telegram || "shafaq_tech").replace("@", "");

  const selectProjectForInquiry = (index: number) => {
    const p = t.projectDetails[index];
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

  // If dashboard is active and authenticated, render full Dashboard view (SINGLE HEADER INSIDE DASHBOARD)
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

  return (
    <div className="app">
      {/* Top Ticker */}
      <header className="nav">
        <div className="ticker">
          <div className="ticker-track">
            {rollingAds.map((ad, i) => (
              <span key={i} className="ticker-item">
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

            {/* Mobile Menu Hamburger Button */}
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

            {/* Quick action shortcuts in mobile drawer */}
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
        {(page === "home") && (\n          <section id="home" className="hero" style={{ backgroundImage: `url(${heroTech})` }}>
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

              {/* 🌟 3 HIGH-CONVERTING VALUE PROPOSITION CARDS (STACKED VERTICALLY IN HERO REGION) */}
              <div className="hero-prop-col">
                {t.ctaBanner.cards.map((card, ci) => {
                  const isDark = mode === "dark";

                  // 3 DISTINCT, ATTRACTIVE, EYE-CATCHING COLOR THEMES
                  const themeConfigs = [
                    // Card 0: Royal Electric Violet / Purple
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
                    // Card 1: Vibrant Sunset Amber / Fire Gold
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
                    // Card 2: Cyber Emerald / Mint Jade
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

                      {"btnText" in card && (card as any).btnText && (
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
                          {(card as any).btnText}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 🌟 STATS BAR — LUXURIOUS ENHANCED CARDS */}
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
            <div className="section-head">
              <div className="kicker">{t.servicesKicker}</div>
              <h2>{t.servicesTitle}</h2>
            </div>
            <div className="grid col-3">
              {t.services.map((s, i) => (
                <div className="card service-card" key={i}>
                  <div className="card-top">
                    <span className="badge">{s.tag}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <ul className="service-bullets">
                    {s.bullets.map((b, bi) => (
                      <li key={bi}>
                        <span className="check-icon">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 🚀 LIVE PROMO & SPECIAL OFFERS BANNER CAROUSEL */}
        {promoAds && promoAds.length > 0 && (
          <section className="section promo-carousel-sec">
            <div className="promo-carousel-container">
              <div className="promo-carousel-head">
                <div className="promo-badge-tag">
                  <span className="promo-pulse-dot" />
                  <span>{lang === "ug" ? "ئالاھىدە پائالىيەت ۋە ئېتىبارلار" : lang === "ar" ? "العروض والخصومات الخاصة" : lang === "tr" ? "Özel Kampanyalar & İndirimler" : "Special Offers & Discounts"}</span>
                </div>
                <div className="promo-nav-buttons">
                  <button
                    className="promo-nav-btn"
                    onClick={handlePrevPromo}
                    aria-label="Previous Offer"
                    title={dir === "rtl" ? "كېيىنكىسى" : "Previous"}
                  >
                    {dir === "rtl" ? "❯" : "❮"}
                  </button>
                  <button
                    className="promo-nav-btn"
                    onClick={handleNextPromo}
                    aria-label="Next Offer"
                    title={dir === "rtl" ? "ئالدىنقىسى" : "Next"}
                  >
                    {dir === "rtl" ? "❮" : "❯"}
                  </button>
                </div>
              </div>

              {/* Promo Cards Viewport */}
              <div className="promo-cards-viewport">
                <div
                  className="promo-cards-track"
                  style={{
                    transform: isMobileScreen()
                      ? (dir === "rtl" ? `translateX(${promoIndex * 100}%)` : `translateX(-${promoIndex * 100}%)`)
                      : (dir === "rtl" ? `translateX(${promoIndex * 50}%)` : `translateX(-${promoIndex * 50}%)`),
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {promoAds.map((ad, idx) => (
                    <div className="promo-card" key={ad.id || idx}>
                      <div className="promo-card-img-wrap">
                        <img
                          src={ad.image || "media/pos-v4.jpg"}
                          alt={ad.text}
                          className="promo-card-img"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "media/pos-v4.jpg";
                          }}
                        />
                        <div className="promo-card-overlay" />
                        <span className="promo-card-pill">🔥 {lang === "ug" ? "قىزىق تەۋسىيە" : lang === "ar" ? "عرض حصري" : lang === "tr" ? "Fırsat" : "Hot Offer"}</span>
                      </div>
                      <div className="promo-card-body">
                        <p className="promo-card-text">{ad.text}</p>
                        <button
                          className="promo-card-action-btn"
                          onClick={() => {
                            setContactMessage(`[پائالىيەت سۈرۈشتۈرۈش: ${ad.text}]\n\nمۇشۇ ئېتىبار پائالىيەت توغرىسىدا تەپسىلىي ئۇچۇر ئالماقچى:`);
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          <span>{lang === "ug" ? "سۈرۈشتۈرۈش" : lang === "ar" ? "استفسار الآن" : lang === "tr" ? "Bilgi Al" : "Inquire Now"}</span>
                          <span>{dir === "rtl" ? "←" : "→"}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot Indicators */}
              {promoAds.length > 1 && (
                <div className="promo-dots">
                  {promoAds.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      className={`promo-dot ${dotIdx === promoIndex ? "active" : ""}`}
                      onClick={() => setPromoIndex(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* WORK / SHOWCASE SECTION */}
        {(page === "home" || page === "work") && (
          <section id="work" className="section">
            <div className="section-head">
              <div className="kicker">{t.workKicker}</div>
              <h2>{t.workTitle}</h2>
            </div>

            {/* Custom Interactive Tabs / Showcase Cards */}
            <div className="grid col-2 work-grid-v2">
              {showcaseProjects.map((item, idx) => (
                <div
                  className="card work-card-v2"
                  key={item.id || idx}
                  onClick={() => selectProjectForInquiry(idx % t.projectDetails.length)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="work-thumb-wrap">
                    <img
                      className="work-thumb"
                      src={item.image || "media/pos-v4.jpg"}
                      alt={item.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "media/pos-v4.jpg";
                      }}
                    />
                    <div className="work-thumb-badge">
                      <span className="badge" style={{ background: "rgba(10, 15, 29, 0.85)", color: "#38bdf8", border: "1px solid #0284c7" }}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="work-card-info">
                    <div className="work-card-meta-row">
                      <span
                        className="work-brand-tag"
                        style={{
                          color: item.nameColor || WORK_NAME_COLORS[idx % WORK_NAME_COLORS.length],
                          fontWeight: 700,
                        }}
                      >
                        {item.name}
                      </span>
                      <span
                        className="work-desc-tag"
                        style={{
                          color: item.descColor || WORK_DESC_COLORS[idx % WORK_DESC_COLORS.length],
                          fontSize: 13,
                        }}
                      >
                        {item.desc}
                      </span>
                    </div>
                    <h3 className="work-title">{item.title}</h3>
                    <div className="tags-cloud">
                      {item.tags.map((tg, ti) => (
                        <span className="tech-tag" key={ti}>
                          {tg}
                        </span>
                      ))}
                    </div>
                    <div className="work-inquiry-hint">
                      <span>{lang === "ug" ? "سۈرۈشتۈرۈش ۋە زاكاز قىلىش" : lang === "ar" ? "طلب استفسار أو عرض سعر" : lang === "tr" ? "Fiyat ve Süreç İste" : "Inquire & Order Similar"}</span>
                      <span className="arrow">{dir === "rtl" ? "←" : "→"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROCESS */}
        {(page === "home" || page === "process") && (
          <section id="process" className="section">
            <div className="section-head">
              <div className="kicker">{t.processKicker}</div>
              <h2>{t.processTitle}</h2>
            </div>
            <div className="process-grid">
              {t.steps.map((st, i) => (
                <div className="process-card" key={i}>
                  <div className="process-img-wrap">
                    <img className="process-img" src={stepImgs[i]} alt={st.title} />
                    <span className="step-badge">{st.num}</span>
                  </div>
                  <div className="process-text">
                    <h3>{st.title}</h3>
                    <p>{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT */}
        <section id="contact" className="section contact-sec">
          <div className="section-head">
            <div className="kicker">{t.contactKicker}</div>
            <h2>{t.contactTitle}</h2>
          </div>

          <div className="contact-wrap">
            {/* Direct Contact Buttons */}
            <div className="contact-methods">
              <a
                href={`https://wa.me/${rawWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card wa-card"
              >
                <div className="contact-icon">💬</div>
                <div className="contact-details">
                  <h4>WhatsApp</h4>
                  <p>{settings.whatsapp || "+86 130 0000 0000"}</p>
                  <span className="contact-badge">{lang === "ug" ? "دەرھال جاۋاب" : lang === "ar" ? "رد فوري" : lang === "tr" ? "Hızlı Yanıt" : "Instant Reply"}</span>
                </div>
              </a>

              <a
                href={`https://t.me/${rawTelegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card tg-card"
              >
                <div className="contact-icon">✈️</div>
                <div className="contact-details">
                  <h4>Telegram</h4>
                  <p>{settings.telegram || "@shafaq_tech"}</p>
                  <span className="contact-badge">{lang === "ug" ? "دەل ۋاقتىدا" : lang === "ar" ? "متصل دائماً" : lang === "tr" ? "Çevrimiçi" : "Always Online"}</span>
                </div>
              </a>

              <div className="contact-card email-card" onClick={copyEmail} style={{ cursor: "pointer" }}>
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>{settings.email || "contact@shafaqtech.com"}</p>
                  <span className="contact-badge">{lang === "ug" ? "كۆچۈرۈۋېلىش" : lang === "ar" ? "نسخ البريد" : lang === "tr" ? "Kopyala" : "Click to Copy"}</span>
                </div>
              </div>
            </div>

            {/* Quick Contact / Request Form */}
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!contactName.trim()) {
                  showToast(lang === "ug" ? "ئىسمىڭىزنى يېزىڭ" : "Please enter name");
                  return;
                }

                // Add to leads automatically
                const newLead: LeadItem = {
                  id: "L" + Date.now().toString().slice(-4),
                  name: contactName,
                  contact: contactEmail,
                  service: "تور بېكەت / يۇمشاق دېتال تەلەپ",
                  estDays: "3-5 كۈن",
                  date: new Date().toISOString().slice(0, 10),
                  status: "new",
                  note: contactMessage,
                };
                updateLeads([newLead, ...leads]);

                showToast(lang === "ug" ? "✅ ئۇچۇرىڭىز تاپشۇرۇلدى! سىز بىلەن ئالاقىلىشىمىز." : "✅ Message sent! We will contact you soon.");
                setContactName("");
                setContactEmail("");
                setContactMessage("");
              }}
            >
              <h3 style={{ margin: "0 0 16px 0", fontSize: 18, color: "var(--text-color)" }}>
                {lang === "ug" ? "تۈر سۈرۈشتۈرۈش ياكى باھا تەلەپ قىلىش" : lang === "ar" ? "طلب استشارة أو عرض أسعار" : lang === "tr" ? "Proje veya Teklif Talebi" : "Project Inquiry / Request Quote"}
              </h3>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={lang === "ug" ? "ئىسمىڭىز (مەسىلەن: ئەلى)" : lang === "ar" ? "اسمك الكريم" : lang === "tr" ? "Adınız" : "Your Name"}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={lang === "ug" ? "تېلېفون ياكى WhatsApp / Telegram ئادرېسىڭىز" : lang === "ar" ? "رقم الهاتف أو WhatsApp" : lang === "tr" ? "Telefon veya İletişim Bilgisi" : "Phone / WhatsApp / Contact Info"}
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  rows={4}
                  placeholder={lang === "ug" ? "تۈر ھەققىدە قىسقىچە تەلەپلىرىڭىزنى يېزىڭ..." : lang === "ar" ? "اكتب تفاصيل طلبك هنا..." : lang === "tr" ? "Projeniz hakkında kısa bilgi verin..." : "Tell us briefly about your project..."}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                />
              </div>
              <button type="submit" className="btn submit-btn">
                {lang === "ug" ? "يوللاش 🚀" : lang === "ar" ? "إرسال 🚀" : lang === "tr" ? "Gönder 🚀" : "Submit Request 🚀"}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <img className="logo" src={logo} alt={displayBrand} width={38} height={38} />
            <span className="brand-name">{displayBrand}</span>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} {displayBrand}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ADMIN AUTH MODAL */}
      <AdminAuthModal
        isOpen={authModalOpen}
        onClose={handleAuthClose}
        onSuccess={handleAuthSuccess}
        lang={lang}
        credentials={credentials}
        onUpdateCredentials={updateCredentials}
      />

      {/* AI ASSISTANT FLOATING BUTTON & MODAL */}
      <AiAssistantModal
        lang={lang}
        onSelectInquiry={(inqText) => {
          setContactMessage(inqText);
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* TOAST MESSAGE */}
      {toastMsg && (
        <div className="toast-bar">
          <span>✨ {toastMsg}</span>
        </div>
      )}
    </div>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "ember") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    );
  }
  if (theme === "caspian") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm0 16a7 7 0 0 1-7-7 7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7z" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
