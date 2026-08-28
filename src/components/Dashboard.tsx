import { useState, useEffect, useRef } from "react";
import { copy, type Lang } from "../i18n";

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  budget: string;
  stage: "new" | "design" | "dev" | "shipped";
  deadline: string;
  progress: number;
}

export interface LeadItem {
  id: string;
  name: string;
  contact: string;
  service: string;
  estDays: string;
  date: string;
  status: "new" | "contacted" | "approved";
  note: string;
}

export interface PosNode {
  id: string;
  name: string;
  location: string;
  ip: string;
  status: "online" | "warning" | "offline";
  printer: "ready" | "error";
  ping: number;
  todayOrders: number;
  lastSync: string;
}

export interface StudioSettings {
  brandName: string;
  whatsapp: string;
  telegram: string;
  email: string;
  wechat: string;
}

export interface ShowcaseProject {
  id: string;
  name: string;
  title: string;
  desc: string;
  category: string;
  image: string;
  tags: string[];
  nameColor: string;
  descColor: string;
}

export interface PromoAdItem {
  id: string;
  text: string;
  image: string;
}

const defaultFallbackAds: PromoAdItem[] = [
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

interface DashboardProps {
  lang: Lang;
  onSetLang: (l: Lang) => void;
  theme: string;
  onCycleTheme: () => void;
  mode: "dark" | "light";
  onToggleMode: () => void;
  onBackToSite: () => void;
  onLogout: () => void;
  onShowToast: (msg: string) => void;
  promoAds: PromoAdItem[];
  onUpdatePromoAds: (ads: PromoAdItem[]) => void;
  showcaseProjects: ShowcaseProject[];
  onUpdateShowcaseProjects: (projects: ShowcaseProject[]) => void;
  leads: LeadItem[];
  onUpdateLeads: (leads: LeadItem[]) => void;
  projects: ProjectItem[];
  onUpdateProjects: (projects: ProjectItem[]) => void;
  posNodes: PosNode[];
  onUpdatePosNodes: (nodes: PosNode[]) => void;
  settings: StudioSettings;
  onUpdateSettings: (settings: StudioSettings) => void;
}

const langLabel: Record<Lang, string> = { ug: "ئۇيغۇرچە", tr: "Türkçe", en: "English", ar: "العربية" };

export default function Dashboard({
  lang,
  onSetLang,
  theme,
  onCycleTheme,
  mode,
  onToggleMode,
  onBackToSite,
  onLogout,
  onShowToast,
  promoAds,
  onUpdatePromoAds,
  showcaseProjects,
  onUpdateShowcaseProjects,
  leads,
  onUpdateLeads,
  projects,
  onUpdateProjects,
  posNodes,
  onUpdatePosNodes,
  settings,
  onUpdateSettings,
}: DashboardProps) {
  const t = copy[lang];
  const [activeTab, setActiveTab] = useState<"overview" | "kanban" | "leads" | "cms" | "invoices" | "pos" | "settings">("overview");
  const [langOpen, setLangOpen] = useState(false);
  const [dashMenuOpen, setDashMenuOpen] = useState(false);
  const langBox = useRef<HTMLDivElement>(null);
  const dashNavBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!langBox.current?.contains(e.target as Node)) setLangOpen(false);
      if (!dashNavBox.current?.contains(e.target as Node)) setDashMenuOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  // Local state for editing promo ads in CMS
  const [editablePromoAds, setEditablePromoAds] = useState<PromoAdItem[]>(() =>
    promoAds && promoAds.length > 0 ? promoAds : defaultFallbackAds
  );

  useEffect(() => {
    if (promoAds && promoAds.length > 0) {
      setEditablePromoAds(promoAds);
    }
  }, [promoAds]);

  // Local state for editing showcase projects in CMS
  const [editableProjects, setEditableProjects] = useState<ShowcaseProject[]>(showcaseProjects);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    if (showcaseProjects && showcaseProjects.length > 0) {
      setEditableProjects(showcaseProjects);
    }
  }, [showcaseProjects]);

  // Controlled Settings Form State
  const [formBrandName, setFormBrandName] = useState(settings.brandName);
  const [formWhatsapp, setFormWhatsapp] = useState(settings.whatsapp);
  const [formTelegram, setFormTelegram] = useState(settings.telegram);
  const [formEmail, setFormEmail] = useState(settings.email);
  const [formWechat, setFormWechat] = useState(settings.wechat);

  useEffect(() => {
    setFormBrandName(settings.brandName);
    setFormWhatsapp(settings.whatsapp);
    setFormTelegram(settings.telegram);
    setFormEmail(settings.email);
    setFormWechat(settings.wechat);
  }, [settings]);

  // Invoice Builder State
  const [invClient, setInvClient] = useState("شەپەق لەغمەن سارىيى");
  const [invProject, setInvProject] = useState("كۆپ تىللىق QR POS ۋە ئاشپەز ئېكرانى قاچىلاش");
  const [invPrice, setInvPrice] = useState("8500");
  const [invDeposit, setInvDeposit] = useState("50");

  // New Kanban Project Form Modal
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjClient, setNewProjClient] = useState("");
  const [newProjBudget, setNewProjBudget] = useState("");

  const moveProjectStage = (id: string, nextStage: "new" | "design" | "dev" | "shipped") => {
    const updated = projects.map((p) =>
      p.id === id
        ? {
            ...p,
            stage: nextStage,
            progress: nextStage === "shipped" ? 100 : nextStage === "dev" ? 75 : nextStage === "design" ? 40 : 15,
          }
        : p
    );
    onUpdateProjects(updated);
    onShowToast(
      lang === "en"
        ? "Project stage updated and saved!"
        : lang === "tr"
        ? "Proje aşaması güncellendi ve kaydedildi!"
        : lang === "ar"
        ? "تم تحديث مرحلة المشروع وحفظها!"
        : "تۈر باسقۇچى يېڭىلاندى ۋە ساقلاندى!"
    );
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle) return;
    const item: ProjectItem = {
      id: "p" + Date.now().toString().slice(-4),
      title: newProjTitle,
      client: newProjClient || (lang === "tr" ? "Müşteri" : lang === "en" ? "Client" : "خېرىدار"),
      category: lang === "tr" ? "Teknoloji" : lang === "en" ? "Tech" : "پەن-تېخنىكا",
      budget: newProjBudget || "¥5,000",
      stage: "new",
      deadline: "2026-09-15",
      progress: 15,
    };
    onUpdateProjects([item, ...projects]);
    setShowAddProject(false);
    setNewProjTitle("");
    setNewProjClient("");
    setNewProjBudget("");
    onShowToast(
      lang === "en"
        ? "New project added to Kanban and saved!"
        : lang === "tr"
        ? "Yeni proje Kanban panosuna eklendi!"
        : lang === "ar"
        ? "تمت إضافة المشروع وحفظه!"
        : "يېڭى تۈر قوشۇلدى ۋە ساقلاندى!"
    );
  };

  // Image Upload handler for Ads
  const handleAdImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setEditablePromoAds((prev) =>
        prev.map((ad, i) => (i === index ? { ...ad, image: dataUrl } : ad))
      );
      onShowToast(lang === "tr" ? "Görsel yüklendi!" : "رەسىم مۇۋەپپەقىيەتلىك يۈكلەندى!");
    };
    reader.readAsDataURL(file);
  };

  const savePromoAds = () => {
    onUpdatePromoAds(editablePromoAds);
    onShowToast(
      lang === "en"
        ? "Ticker and Promo ads updated on public site!"
        : lang === "tr"
        ? "Kayan yazı ve reklam görselleri sitede güncellendi!"
        : lang === "ar"
        ? "تم تحديث الإعلانات وصورها في الموقع!"
        : "ئېلان تېكىستلىرى ۋە سىيرىلما رەسىملەر ئالدى بەتكە يېڭىلاندى! 💾"
    );
  };

  // Image Upload handler for Showcase Projects
  const handleProjectImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setEditableProjects((prev) =>
        prev.map((p, i) => (i === index ? { ...p, image: dataUrl } : p))
      );
      onShowToast(lang === "tr" ? "Proje görseli yüklendi!" : "ئەسەر رەسىمى مۇۋەپپەقىيەتلىك يۈكلەندى!");
    };
    reader.readAsDataURL(file);
  };

  const saveShowcaseProjects = () => {
    onUpdateShowcaseProjects(editableProjects);
    setEditingProjectIndex(null);
    onShowToast(
      lang === "en"
        ? "Showcase projects and images updated on public site!"
        : lang === "tr"
        ? "Öne çıkan projeler ve görseller sitede güncellendi!"
        : lang === "ar"
        ? "تم تحديث الأعمال وصورها في الموقع بنجاح!"
        : "تاللانما ئەسەرلەر ۋە رەسىملەر ئالدى بەتكە شۇ ھامان يېڭىلاندى! 💾"
    );
  };

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSettings: StudioSettings = {
      brandName: formBrandName,
      whatsapp: formWhatsapp,
      telegram: formTelegram,
      email: formEmail,
      wechat: formWechat,
    };
    onUpdateSettings(updatedSettings);
    onShowToast(
      lang === "tr"
        ? "Ayarlar başarıyla kaydedildi ve tüm sitede güncellendi!"
        : lang === "en"
        ? "Settings saved successfully and updated across the site!"
        : lang === "ar"
        ? "تم حفظ الإعدادات وتحديثها في كامل الموقع!"
        : "تەڭشەكلەر مۇۋەپپەقىيەتلىك ساقلاندى ۋە پۈتۈن بېكەتكە شۇ ھامان يېڭىلاندى! 💾✨"
    );
  };

  const pingAllNodes = () => {
    const updated = posNodes.map((n) => ({
      ...n,
      ping: Math.floor(Math.random() * 15) + 12,
      lastSync: lang === "tr" ? "Az önce sinyal alındı" : lang === "en" ? "Just synced" : "دەل ھازىر سىگنال قوبۇللاندى",
    }));
    onUpdatePosNodes(updated);
    onShowToast(
      lang === "en"
        ? "All POS nodes pinged (100% Online)"
        : lang === "tr"
        ? "Tüm POS cihazları çevrimiçi doğrulandı"
        : lang === "ar"
        ? "جميع أجهزة نقاط البيع متصلة بنجاح"
        : "بارلىق POS تۈگۈنلىرى تەكشۈرۈلدى (100% نورمال)"
    );
  };

  return (
    <div className="dash-container">
      {/* =========================================================================
          SINGLE UNIFIED HEADER WITH STRICT ROW LAYOUT (NEVER STACKED VERTICALLY)
         ========================================================================= */}
      <header className="dash-header">
        <div className="dash-header-in wrap">
          <div className="dash-brand-block">
            <h1 className="dash-title">{formBrandName || t.dash.title}</h1>
          </div>

          <div className="dash-header-controls">
            {/* 1. Language Dropdown (Globe Icon Only) */}
            <div className="lang-dd" ref={langBox}>
              <button
                className={"icon-btn dash-lang-globe-btn" + (langOpen ? " on" : "")}
                title={langLabel[lang]}
                aria-label="Select Language"
                onClick={() => setLangOpen((v) => !v)}
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
                      onSetLang(l);
                      setLangOpen(false);
                    }}
                  >
                    {langLabel[l]}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Eye Icon Button (Back to Public Site - No text, only eye icon) - on left of Language */}
            <button
              className="icon-btn dash-eye-btn"
              title={lang === "tr" ? "Siteye Dön" : lang === "en" ? "View Site" : lang === "ar" ? "الموقع" : "ئالدى بەتنى كۆرۈش"}
              aria-label="View Site"
              onClick={onBackToSite}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

            {/* 3. Theme Toggle */}
            <button
              className="icon-btn theme-btn"
              title={theme}
              onClick={onCycleTheme}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M12 4a8 8 0 0 0 0 16V4z" fill="currentColor" />
              </svg>
            </button>

            {/* 4. Dark / Light Mode Toggle */}
            <button
              className="icon-btn mode-btn"
              onClick={onToggleMode}
            >
              {mode === "dark" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 13.5A7 7 0 0 1 10 4a7 7 0 1 0 6.5 9.5z" />
                </svg>
              )}
            </button>

            {/* 5. Logout Button (Icon Only - Lock Icon) */}
            <button
              className="icon-btn dash-logout-icon-btn"
              title={lang === "tr" ? "Çıkış" : lang === "en" ? "Logout" : lang === "ar" ? "خروج" : "چىقىش"}
              aria-label="Logout"
              onClick={onLogout}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </button>

            {/* 6. Dashboard Tabs Navigation Dropdown (Icon Only - Glowing Hamburger Menu) - on left side of Logout button */}
            <div className="dash-nav-dd" ref={dashNavBox}>
              <button
                className={"icon-btn dash-menu-icon-btn" + (dashMenuOpen ? " open" : "")}
                title={t.dash.title}
                aria-label="Dashboard Menu"
                onClick={() => setDashMenuOpen((v) => !v)}
              >
                <span className="dash-menu-bar" />
                <span className="dash-menu-bar" />
                <span className="dash-menu-bar" />
              </button>

              <div className={"dash-nav-menu" + (dashMenuOpen ? " open" : "")}>
                <button
                  className={activeTab === "overview" ? "on" : ""}
                  onClick={() => { setActiveTab("overview"); setDashMenuOpen(false); }}
                >
                  <span className="tab-tx">{t.dash.navOverview}</span>
                </button>
                <button
                  className={activeTab === "kanban" ? "on" : ""}
                  onClick={() => { setActiveTab("kanban"); setDashMenuOpen(false); }}
                >
                  <span className="tab-tx">{t.dash.navKanban}</span>
                </button>
                <button
                  className={activeTab === "leads" ? "on" : ""}
                  onClick={() => { setActiveTab("leads"); setDashMenuOpen(false); }}
                >
                  <span className="tab-tx">{t.dash.navLeads}</span>
                  <span className="dash-pill-count">{leads.length}</span>
                </button>
                <button
                  className={activeTab === "cms" ? "on" : ""}
                  onClick={() => { setActiveTab("cms"); setDashMenuOpen(false); }}
                >
                  <span className="tab-tx">{t.dash.navCms}</span>
                </button>
                <button
                  className={activeTab === "invoices" ? "on" : ""}
                  onClick={() => { setActiveTab("invoices"); setDashMenuOpen(false); }}
                >
                  <span className="tab-tx">{t.dash.navInvoices}</span>
                </button>
                <button
                  className={activeTab === "pos" ? "on" : ""}
                  onClick={() => { setActiveTab("pos"); setDashMenuOpen(false); }}
                >
                  <span className="tab-tx">{t.dash.navPos}</span>
                  <span className="dash-pill-online">●</span>
                </button>
                <button
                  className={activeTab === "settings" ? "on" : ""}
                  onClick={() => { setActiveTab("settings"); setDashMenuOpen(false); }}
                >
                  <span className="tab-tx">{t.dash.navSettings}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="wrap dash-layout">
        {/* Sidebar Nav */}
        <aside className="dash-sidebar card">
          <nav className="dash-nav-list">
            <button
              className={"dash-nav-item " + (activeTab === "overview" ? "active" : "")}
              onClick={() => setActiveTab("overview")}
            >
              {t.dash.navOverview}
            </button>
            <button
              className={"dash-nav-item " + (activeTab === "kanban" ? "active" : "")}
              onClick={() => setActiveTab("kanban")}
            >
              {t.dash.navKanban}
            </button>
            <button
              className={"dash-nav-item " + (activeTab === "leads" ? "active" : "")}
              onClick={() => setActiveTab("leads")}
            >
              {t.dash.navLeads}
              <span className="dash-pill-count">{leads.length}</span>
            </button>
            <button
              className={"dash-nav-item " + (activeTab === "cms" ? "active" : "")}
              onClick={() => setActiveTab("cms")}
            >
              {t.dash.navCms}
            </button>
            <button
              className={"dash-nav-item " + (activeTab === "invoices" ? "active" : "")}
              onClick={() => setActiveTab("invoices")}
            >
              {t.dash.navInvoices}
            </button>
            <button
              className={"dash-nav-item " + (activeTab === "pos" ? "active" : "")}
              onClick={() => setActiveTab("pos")}
            >
              {t.dash.navPos}
              <span className="dash-pill-online">●</span>
            </button>
            <button
              className={"dash-nav-item " + (activeTab === "settings" ? "active" : "")}
              onClick={() => setActiveTab("settings")}
            >
              {t.dash.navSettings}
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="dash-main">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="dash-tab-pane">
              {/* KPI Cards */}
              <div className="dash-kpi-grid">
                <div className="card dash-kpi-card">
                  <div className="kpi-icon-row">
                    <span className="kpi-icon-pill">💰</span>
                    <span className="kpi-badge-positive">+18.4%</span>
                  </div>
                  <div className="kpi-value">¥186,500</div>
                  <div className="kpi-label">{t.dash.kpiRevenue}</div>
                  <div className="kpi-sub">{t.dash.kpiRevenueSub}</div>
                </div>

                <div className="card dash-kpi-card">
                  <div className="kpi-icon-row">
                    <span className="kpi-icon-pill">📦</span>
                    <span className="kpi-badge-neutral">{projects.length} {lang === "tr" ? "Aktif" : lang === "en" ? "Active" : "ئاكتىپ"}</span>
                  </div>
                  <div className="kpi-value">{projects.length} {lang === "tr" ? "Proje" : lang === "en" ? "Projects" : "تۈر"}</div>
                  <div className="kpi-label">{t.dash.kpiProjects}</div>
                  <div className="kpi-sub">{t.dash.kpiProjectsSub}</div>
                </div>

                <div className="card dash-kpi-card">
                  <div className="kpi-icon-row">
                    <span className="kpi-icon-pill">✉️</span>
                    <span className="kpi-badge-positive">+{leads.length}</span>
                  </div>
                  <div className="kpi-value">{leads.length} {lang === "tr" ? "Sipariş" : lang === "en" ? "Leads" : "زاكاز"}</div>
                  <div className="kpi-label">{t.dash.kpiLeads}</div>
                  <div className="kpi-sub">{t.dash.kpiLeadsSub}</div>
                </div>

                <div className="card dash-kpi-card">
                  <div className="kpi-icon-row">
                    <span className="kpi-icon-pill">🖨️</span>
                    <span className="kpi-badge-positive">🟢 100%</span>
                  </div>
                  <div className="kpi-value">{posNodes.length} {lang === "tr" ? "Cihaz" : lang === "en" ? "Nodes" : "ئۈسكۈنە"}</div>
                  <div className="kpi-label">{t.dash.kpiNodes}</div>
                  <div className="kpi-sub">{t.dash.kpiNodesSub}</div>
                </div>
              </div>

              {/* Chart & Analytics Row */}
              <div className="dash-analytics-grid">
                <div className="card dash-chart-card">
                  <h3>📈 {t.dash.monthlyGrowth}</h3>
                  <div className="chart-wrapper">
                    <div className="mock-bar-chart">
                      {[
                        { m: "1-ئاي", v: 45, rev: "¥18k" },
                        { m: "2-ئاي", v: 60, rev: "¥24k" },
                        { m: "3-ئاي", v: 55, rev: "¥22k" },
                        { m: "4-ئاي", v: 75, rev: "¥31k" },
                        { m: "5-ئاي", v: 90, rev: "¥38k" },
                        { m: "6-ئاي", v: 80, rev: "¥35k" },
                        { m: "7-ئاي", v: 95, rev: "¥42k" },
                        { m: "8-ئاي", v: 100, rev: "¥48k" },
                      ].map((bar, bi) => (
                        <div className="mock-bar-col" key={bi}>
                          <div className="mock-bar-fill" style={{ height: `${bar.v}%` }}>
                            <span className="bar-tooltip">{bar.rev}</span>
                          </div>
                          <span className="bar-label">{bar.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card dash-service-share-card">
                  <h3>🎯 {lang === "tr" ? "Hizmet Dağılımı" : lang === "en" ? "Service Distribution" : "تۈر تۈرلىرى نىسبىتى"}</h3>
                  <div className="share-list">
                    <div className="share-item">
                      <div className="share-head">
                        <span>{lang === "tr" ? "Restoran POS Sistemleri" : lang === "en" ? "Kitchen POS Systems" : "ئاشخانا POS سىستېمىسى"}</span>
                        <strong>38%</strong>
                      </div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: "38%", background: "#16a34a" }} /></div>
                    </div>
                    <div className="share-item">
                      <div className="share-head">
                        <span>{lang === "tr" ? "Web & E-Ticaret" : lang === "en" ? "Websites & E-Commerce" : "تور بېكەت ۋە ئېلېكترونلۇق سودا"}</span>
                        <strong>32%</strong>
                      </div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: "32%", background: "#0284c7" }} /></div>
                    </div>
                    <div className="share-item">
                      <div className="share-head">
                        <span>{lang === "tr" ? "Ofis Otomasyonu" : lang === "en" ? "Office Automation" : "ئىشخانا ئاپتوماتلاشتۇرۇش"}</span>
                        <strong>18%</strong>
                      </div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: "18%", background: "#7c3aed" }} /></div>
                    </div>
                    <div className="share-item">
                      <div className="share-head">
                        <span>{lang === "tr" ? "Marka Kimliği & Tasarım" : lang === "en" ? "Brand VI & Design" : "ماركا VI ۋە گرافىك لايىھە"}</span>
                        <strong>12%</strong>
                      </div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: "12%", background: "#d97706" }} /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Leads Feed */}
              <div className="card dash-recent-card">
                <div className="section-head-row">
                  <h3>💬 {t.dash.recentActivities}</h3>
                  <button className="btn ghost" onClick={() => setActiveTab("leads")}>
                    {lang === "tr" ? "Tümünü Gör ➔" : lang === "en" ? "View All ➔" : "بارلىق زاكازلارنى كۆرۈش ➔"}
                  </button>
                </div>
                <div className="dash-leads-list">
                  {leads.map((l) => (
                    <div className="lead-row" key={l.id}>
                      <div className="lead-avatar">👤</div>
                      <div className="lead-meta">
                        <strong>{l.name}</strong>
                        <span>{l.service} · {l.note}</span>
                      </div>
                      <div className="lead-status-chip">
                        <span className={"status-pill " + l.status}>
                          {l.status === "new"
                            ? lang === "tr" ? "Yeni" : lang === "en" ? "New" : "يېڭى تەلەپ"
                            : l.status === "contacted"
                            ? lang === "tr" ? "Görüşüldü" : lang === "en" ? "Contacted" : "ئالاقىلىشىلدى"
                            : lang === "tr" ? "Onaylandı" : lang === "en" ? "Approved" : "ماقۇللاندى"}
                        </span>
                      </div>
                      <div className="lead-time">{l.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KANBAN BOARD */}
          {activeTab === "kanban" && (
            <div className="dash-tab-pane">
              <div className="section-head-row">
                <div>
                  <h2>📋 {t.dash.navKanban}</h2>
                  <p className="subhead">
                    {lang === "tr"
                      ? "Projeleri aşamalar arasında kolayca sürükleyin ve yönetin"
                      : lang === "en"
                      ? "Track active projects across design, development and delivery"
                      : "تۈرلەرنىڭ لايىھەدىن تاپشۇرۇشقىچە بولغان ھەر بىر باسقۇچىنى دەل ۋاقتىدا يۆتكەڭ ۋە ساقلاڭ"}
                  </p>
                </div>
                <button className="btn" onClick={() => setShowAddProject(true)}>
                  + {lang === "tr" ? "Yeni Proje Ekle" : lang === "en" ? "Add Project" : "يېڭى تۈر قوشۇش"}
                </button>
              </div>

              <div className="kanban-board">
                {/* Column 1: New */}
                <div className="kanban-col">
                  <div className="kanban-col-header new-head">
                    <span>📥 {lang === "tr" ? "Yeni Talepler" : lang === "en" ? "New Inquiries" : "يېڭى زاكازلار"}</span>
                    <span className="col-count">{projects.filter((p) => p.stage === "new").length}</span>
                  </div>
                  <div className="kanban-cards-stack">
                    {projects
                      .filter((p) => p.stage === "new")
                      .map((p) => (
                        <div className="kanban-card" key={p.id}>
                          <div className="kanban-card-top">
                            <span className="kanban-cat-tag">{p.category}</span>
                            <span className="kanban-budget">{p.budget}</span>
                          </div>
                          <h4 className="kanban-card-title">{p.title}</h4>
                          <div className="kanban-client">{lang === "tr" ? "Müşteri: " : lang === "en" ? "Client: " : "خېرىدار: "}{p.client}</div>
                          <div className="kanban-card-actions">
                            <button
                              className="kanban-move-btn"
                              onClick={() => moveProjectStage(p.id, "design")}
                            >
                              {lang === "tr" ? "Tasarım Aşamasına ➔" : lang === "en" ? "Move to Design ➔" : "لايىھەگە يۆتكەش ➔"}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column 2: Design */}
                <div className="kanban-col">
                  <div className="kanban-col-header design-head">
                    <span>🎨 {lang === "tr" ? "Tasarım & UI/UX" : lang === "en" ? "Design & UI/UX" : "لايىھە & Figma"}</span>
                    <span className="col-count">{projects.filter((p) => p.stage === "design").length}</span>
                  </div>
                  <div className="kanban-cards-stack">
                    {projects
                      .filter((p) => p.stage === "design")
                      .map((p) => (
                        <div className="kanban-card" key={p.id}>
                          <div className="kanban-card-top">
                            <span className="kanban-cat-tag">{p.category}</span>
                            <span className="kanban-budget">{p.budget}</span>
                          </div>
                          <h4 className="kanban-card-title">{p.title}</h4>
                          <div className="kanban-client">{lang === "tr" ? "Müşteri: " : lang === "en" ? "Client: " : "خېرىدار: "}{p.client}</div>
                          <div className="kanban-progress">
                            <div className="progress-track">
                              <div className="progress-fill" style={{ width: `${p.progress}%`, background: "#8b5cf6" }} />
                            </div>
                            <span className="prog-text">{p.progress}%</span>
                          </div>
                          <div className="kanban-card-actions">
                            <button
                              className="kanban-move-btn"
                              onClick={() => moveProjectStage(p.id, "dev")}
                            >
                              {lang === "tr" ? "Kodlamaya ➔" : lang === "en" ? "Move to Dev ➔" : "كودلاشقا يۆتكەش ➔"}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column 3: Development */}
                <div className="kanban-col">
                  <div className="kanban-col-header dev-head">
                    <span>💻 {lang === "tr" ? "Geliştirme & Kodlama" : lang === "en" ? "Development" : "پىروگرامما كودلاش"}</span>
                    <span className="col-count">{projects.filter((p) => p.stage === "dev").length}</span>
                  </div>
                  <div className="kanban-cards-stack">
                    {projects
                      .filter((p) => p.stage === "dev")
                      .map((p) => (
                        <div className="kanban-card" key={p.id}>
                          <div className="kanban-card-top">
                            <span className="kanban-cat-tag">{p.category}</span>
                            <span className="kanban-budget">{p.budget}</span>
                          </div>
                          <h4 className="kanban-card-title">{p.title}</h4>
                          <div className="kanban-client">{lang === "tr" ? "Müşteri: " : lang === "en" ? "Client: " : "خېرىدار: "}{p.client}</div>
                          <div className="kanban-progress">
                            <div className="progress-track">
                              <div className="progress-fill" style={{ width: `${p.progress}%`, background: "#0284c7" }} />
                            </div>
                            <span className="prog-text">{p.progress}%</span>
                          </div>
                          <div className="kanban-card-actions">
                            <button
                              className="kanban-move-btn"
                              onClick={() => moveProjectStage(p.id, "shipped")}
                            >
                              {lang === "tr" ? "Teslimata ➔" : lang === "en" ? "Ship & Deliver ➔" : "تاپشۇرۇشقا يۆتكەش ➔"}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column 4: Shipped */}
                <div className="kanban-col">
                  <div className="kanban-col-header shipped-head">
                    <span>🚀 {lang === "tr" ? "Teslim Edildi" : lang === "en" ? "Shipped & Live" : "تاپشۇرۇلدى & كاپالەت"}</span>
                    <span className="col-count">{projects.filter((p) => p.stage === "shipped").length}</span>
                  </div>
                  <div className="kanban-cards-stack">
                    {projects
                      .filter((p) => p.stage === "shipped")
                      .map((p) => (
                        <div className="kanban-card shipped-card" key={p.id}>
                          <div className="kanban-card-top">
                            <span className="kanban-cat-tag">{p.category}</span>
                            <span className="shipped-badge">✓ {lang === "tr" ? "Tamamlandı" : lang === "en" ? "Completed" : "تاپشۇرۇلدى"}</span>
                          </div>
                          <h4 className="kanban-card-title">{p.title}</h4>
                          <div className="kanban-client">{lang === "tr" ? "Müşteri: " : lang === "en" ? "Client: " : "خېرىدار: "}{p.client}</div>
                          <div className="kanban-budget" style={{ marginTop: 8 }}>
                            {lang === "tr" ? "Bütçe: " : lang === "en" ? "Budget: " : "ھەققى: "}{p.budget}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEADS & INQUIRIES CRM */}
          {activeTab === "leads" && (
            <div className="dash-tab-pane">
              <div className="section-head-row">
                <div>
                  <h2>✉️ {t.dash.navLeads}</h2>
                  <p className="subhead">
                    {lang === "tr"
                      ? "Web sitesindeki akıllı hesaplayıcı ve iletişim formundan gelen gerçek zamanlı talepler"
                      : lang === "en"
                      ? "Realtime inquiries from website estimator and contact form"
                      : "ئالدى بەتتىكى ئەقلىي مۆلچەرلىگۈچ ۋە ئالاقە جەدۋىلىدىن چۈشكەن دەل ۋاقتىدىكى زاكازلار"}
                  </p>
                </div>
              </div>

              <div className="card table-card">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>{lang === "tr" ? "No" : lang === "en" ? "ID" : "نۇمۇرى"}</th>
                      <th>{lang === "tr" ? "Müşteri" : lang === "en" ? "Client" : "خېرىدار"}</th>
                      <th>{lang === "tr" ? "İletişim" : lang === "en" ? "Contact" : "ئالاقە"}</th>
                      <th>{lang === "tr" ? "Hizmet" : lang === "en" ? "Service" : "مۇلازىمەت"}</th>
                      <th>{lang === "tr" ? "Süre" : lang === "en" ? "Timeline" : "پۈتۈش"}</th>
                      <th>{lang === "tr" ? "Not / Talep" : lang === "en" ? "Requirement" : "تەلەپ مەزمۇنى"}</th>
                      <th>{lang === "tr" ? "Tarih" : lang === "en" ? "Date" : "ۋاقتى"}</th>
                      <th>{lang === "tr" ? "Durum" : lang === "en" ? "Status" : "ھالىتى"}</th>
                      <th>{lang === "tr" ? "İşlem" : lang === "en" ? "Action" : "مەشغۇلات"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id}>
                        <td><code>#{lead.id}</code></td>
                        <td><strong>{lead.name}</strong></td>
                        <td><small>{lead.contact}</small></td>
                        <td><span className="table-badge">{lead.service}</span></td>
                        <td>{lead.estDays}</td>
                        <td className="lead-note-cell">{lead.note}</td>
                        <td>{lead.date}</td>
                        <td>
                          <span className={"status-pill " + lead.status}>
                            {lead.status === "new"
                              ? lang === "tr" ? "Yeni" : lang === "en" ? "New" : "يېڭى"
                              : lead.status === "contacted"
                              ? lang === "tr" ? "Görüşüldü" : lang === "en" ? "Contacted" : "ئالاقىلىشىلدى"
                              : lang === "tr" ? "Onaylandı" : lang === "en" ? "Approved" : "كېلىشىلدى"}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <a
                              href={`https://wa.me/${formWhatsapp.replace(/[^0-9]/g, "") || "8613000000000"}?text=Hello%20${encodeURIComponent(lead.name)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="dash-action-btn wa-act"
                              title="WhatsApp"
                            >
                              <img src="media/icon-whatsapp.png" alt="WhatsApp" style={{ width: 18, height: 18, verticalAlign: "middle" }} />
                            </a>
                            <button
                              className="dash-action-btn"
                              title="Durumu güncelle"
                              onClick={() => {
                                const updated = leads.map((x) =>
                                  x.id === lead.id
                                    ? { ...x, status: x.status === "new" ? ("contacted" as const) : ("approved" as const) }
                                    : x
                                );
                                onUpdateLeads(updated);
                                onShowToast(lang === "tr" ? "Durum güncellendi!" : "ھالىتى يېڭىلاندى!");
                              }}
                            >
                              ✓
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: PORTFOLIO CMS — PROMO ADS & SHOWCASE PROJECTS WITH IMAGE UPLOAD */}
          {activeTab === "cms" && (
            <div className="dash-tab-pane">
              <div className="section-head-row">
                <div>
                  <h2>🎨 {t.dash.navCms}</h2>
                  <p className="subhead">
                    {lang === "tr"
                      ? "Öne çıkan projeleri ve kayan yazı reklamlarını görsel yükleyerek anında güncelleyin"
                      : "تاللانما ئەسەرلەر ۋە سىيرىلما ئېلانلارنى رەسىم يۈكلەپ شۇ ھامان ئالدى بەتكە يېڭىلاڭ"}
                  </p>
                </div>
              </div>

              <div className="dash-cms-grid">
                {/* 1. EDITABLE SHOWCASE PROJECTS */}
                <div className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <h3 style={{ margin: 0 }}>🖼️ {lang === "tr" ? "Öne Çıkan Projeler (Görsel ve Detay Düzenleme)" : "تاللانما ئەسەرلەر تىزىملىكى (تەھرىرلەش ۋە رەسىم يۈكلەش)"}</h3>
                  </div>

                  <div className="cms-items-list">
                    {editableProjects.map((item, idx) => (
                      <div className="cms-work-item-card" key={item.id}>
                        <div className="cms-work-item-head">
                          <img src={item.image} alt="" className="cms-thumb-large" />
                          <div className="cms-work-info">
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <strong className="work-name" style={{ fontSize: 16 }}>{item.name}</strong>
                              <span className="table-badge">{item.category}</span>
                            </div>
                            <div className="cms-work-title">{item.title}</div>
                            <div style={{ fontSize: 12, color: "var(--muted)" }}>{item.desc}</div>
                          </div>
                          <button
                            className="btn ghost"
                            onClick={() => setEditingProjectIndex(editingProjectIndex === idx ? null : idx)}
                          >
                            {editingProjectIndex === idx ? (lang === "tr" ? "Kapat" : "تاقاش") : (lang === "tr" ? "Düzenle ✏️" : "تەھرىرلەش ✏️")}
                          </button>
                        </div>

                        {/* Expandable Project Editor */}
                        {editingProjectIndex === idx && (
                          <div className="project-editor-box">
                            <div className="form">
                              <div className="grid g2">
                                <div>
                                  <label className="est-label">{lang === "tr" ? "Kısa İsim:" : "قىسقا ئىسمى (UKIJ Kufi Tar):"}</label>
                                  <input
                                    value={item.name}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEditableProjects((prev) =>
                                        prev.map((p, i) => (i === idx ? { ...p, name: val } : p))
                                      );
                                    }}
                                  />
                                </div>
                                <div>
                                  <label className="est-label">{lang === "tr" ? "Kategori:" : "كەسپىي تۈرى:"}</label>
                                  <input
                                    value={item.category}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEditableProjects((prev) =>
                                        prev.map((p, i) => (i === idx ? { ...p, category: val } : p))
                                      );
                                    }}
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="est-label">{lang === "tr" ? "Tam Başlık:" : "تولۇق نامى:"}</label>
                                <input
                                  value={item.title}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setEditableProjects((prev) =>
                                      prev.map((p, i) => (i === idx ? { ...p, title: val } : p))
                                    );
                                  }}
                                />
                              </div>

                              <div>
                                <label className="est-label">{lang === "tr" ? "Açıklama:" : "قىسقىچە چۈشەندۈرۈشى:"}</label>
                                <input
                                  value={item.desc}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setEditableProjects((prev) =>
                                      prev.map((p, i) => (i === idx ? { ...p, desc: val } : p))
                                    );
                                  }}
                                />
                              </div>

                              <div>
                                <label className="est-label">{lang === "tr" ? "Yeni Görsel Yükle:" : "يېڭى رەسىم يۈكلەش:"}</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleProjectImageUpload(idx, e)}
                                  className="dash-file-input"
                                />
                              </div>

                              <button className="btn" onClick={saveShowcaseProjects}>
                                💾 {lang === "tr" ? "Bu Projeyi Sitede Güncelle" : "بۇ ئەسەرنى ساقلاش ۋە ئالدى بەتكە يېڭىلاش"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. EDITABLE PROMO ADS WITH IMAGE UPLOAD */}
                <div className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <h3 style={{ margin: 0 }}>📢 {lang === "tr" ? "Kayan Yazı ve Reklam Görselleri" : "سىيرىلما لېنتا ئېلانلىرى ۋە رەسىم يۈكلەش"}</h3>
                  </div>

                  <div className="cms-ads-list">
                    {editablePromoAds.map((ad, ai) => (
                      <div className="cms-ad-card-box" key={ad.id || ai}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                          <span className="ad-num">#{ai + 1}</span>
                          <strong style={{ fontSize: 13 }}>{lang === "tr" ? `Reklam Kalemi ${ai + 1}` : `${ai + 1}-ئېلان كارتىسى`}</strong>
                        </div>

                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <img src={ad.image} alt="" className="ad-thumb-preview" />
                          <div style={{ flex: 1, display: "grid", gap: 6 }}>
                            <input
                              value={ad.text}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditablePromoAds((prev) =>
                                  prev.map((x, idx) => (idx === ai ? { ...x, text: val } : x))
                                );
                              }}
                              className="dash-input"
                              placeholder="ئېلان تېكىستى..."
                            />
                            <label className="ad-file-upload-btn">
                              📁 {lang === "tr" ? "Görsel Değiştir" : "رەسىم يۈكلەش"}
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => handleAdImageUpload(ai, e)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button className="btn" onClick={savePromoAds} style={{ marginTop: 8 }}>
                      💾 {lang === "tr" ? "Reklamları Kaydet ve Sitede Yayınla" : "ئېلانلارنى ساقلاش ۋە ئالدى بەتكە يېڭىلاش"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INVOICES & QUOTES */}
          {activeTab === "invoices" && (
            <div className="dash-tab-pane">
              <div className="section-head-row">
                <div>
                  <h2>🧾 {t.dash.navInvoices}</h2>
                  <p className="subhead">
                    {lang === "tr"
                      ? "Müşterileriniz için resmi fiyat teklifi ve fatura oluşturun"
                      : "خېرىدارلار ئۈچۈن رەسمىي، ئالىي دەرىجىلىك ھېسابات تالونى تەييارلاش"}
                  </p>
                </div>
              </div>

              <div className="dash-invoice-layout">
                {/* Form */}
                <div className="card invoice-form-card">
                  <h3>{lang === "tr" ? "Fatura Detayları" : "تالون تەپسىلاتلىرى"}</h3>
                  <div className="form" style={{ marginTop: 14 }}>
                    <div>
                      <label className="est-label">{lang === "tr" ? "Müşteri / Şirket:" : "خېرىدار / شىركەت نامى:"}</label>
                      <input
                        required
                        value={invClient}
                        onChange={(e) => setInvClient(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="est-label">{lang === "tr" ? "Proje Kapsamı:" : "تۈر ۋە مۇلازىمەت مەزمۇنى:"}</label>
                      <input
                        required
                        value={invProject}
                        onChange={(e) => setInvProject(e.target.value)}
                      />
                    </div>
                    <div className="grid g2">
                      <div>
                        <label className="est-label">{lang === "tr" ? "Toplam Tutar (¥):" : "ئومۇمىي سومما (¥):"}</label>
                        <input
                          type="number"
                          required
                          value={invPrice}
                          onChange={(e) => setInvPrice(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="est-label">{lang === "tr" ? "Ön Avans (%):" : "ئالدىن تۆلەش نىسبىتى (%):"}</label>
                        <input
                          type="number"
                          value={invDeposit}
                          onChange={(e) => setInvDeposit(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Invoice Preview Receipt */}
                <div className="card invoice-preview-card">
                  <div className="invoice-paper" id="printable-invoice">
                    <div className="inv-header">
                      <div>
                        <h2 style={{ fontFamily: "UKIJ Kufi Tar, sans-serif" }}>{formBrandName || t.brand}</h2>
                        <div style={{ fontSize: 13, color: "var(--muted)" }}>Shafaq Tech Hub · Official Quotation</div>
                      </div>
                      <div className="inv-num-box">
                        <strong>INVOICE</strong>
                        <span>#INV-2026-088</span>
                        <span>{lang === "tr" ? "Tarih: 2026-08-20" : "چېسلا: 2026-08-20"}</span>
                      </div>
                    </div>

                    <div className="inv-divider" />

                    <div className="inv-client-info">
                      <strong>{lang === "tr" ? "Sayın Müşteri: " : "ھۆرمەتلىك خېرىدار: "}{invClient}</strong>
                      <div>{lang === "tr" ? "Proje: " : "تۈر: "}{invProject}</div>
                    </div>

                    <table className="inv-table">
                      <thead>
                        <tr>
                          <th>{lang === "tr" ? "Hizmet Kalemi" : "تۈر مەزمۇنى"}</th>
                          <th>{lang === "tr" ? "Miktar" : "مىقدارى"}</th>
                          <th>{lang === "tr" ? "Fiyat" : "باھاسى"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{invProject}</td>
                          <td>1</td>
                          <td>¥{invPrice}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="inv-totals">
                      <div className="inv-total-row">
                        <span>{lang === "tr" ? "Toplam:" : "ئومۇمىي سومما:"}</span>
                        <strong>¥{invPrice}</strong>
                      </div>
                      <div className="inv-total-row">
                        <span>{lang === "tr" ? "Ön Avans:" : "ئالدىن تۆلەش:"} ({invDeposit}%):</span>
                        <strong>¥{Math.round((Number(invPrice) * Number(invDeposit)) / 100)}</strong>
                      </div>
                      <div className="inv-total-row final-row">
                        <span>{lang === "tr" ? "Kalan Bakiye:" : "ئاخىرقى قالدۇق:"}</span>
                        <strong>¥{Number(invPrice) - Math.round((Number(invPrice) * Number(invDeposit)) / 100)}</strong>
                      </div>
                    </div>

                    <div className="inv-footer-note">
                      * {lang === "tr" ? "Teknik destek ve bakım garantisi dahildir." : "تېخنىكىلىق كاپالەت ۋە دەسلەپكى ئاسراش مۇلازىمىتى ئۆز ئىچىگە ئېلىنغان."}
                    </div>
                  </div>

                  <div className="inv-actions">
                    <button className="btn" onClick={() => window.print()}>
                      🖨️ {lang === "tr" ? "Yazdır / PDF Olarak Kaydet" : "بېسىپ چىقىرىش / PDF چۈشۈرۈش"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: POS & TELEMETRY */}
          {activeTab === "pos" && (
            <div className="dash-tab-pane">
              <div className="section-head-row">
                <div>
                  <h2>🖨️ {t.dash.navPos}</h2>
                  <p className="subhead">
                    {lang === "tr"
                      ? "Restoranlara kurulu POS cihazlarının ve yazıcıların bağlantı durumunu gerçek zamanlı izleyin"
                      : "ئاشخانىلار ۋە كارخانىلارغا قاچىلانغان سىستېمىلارنىڭ تور ھالىتىنى دەل ۋاقتىدا تەكشۈرۈش"}
                  </p>
                </div>
                <button className="btn" onClick={pingAllNodes}>
                  ⚡ {lang === "tr" ? "Tümünü Kontrol Et (Ping All)" : "بارلىق ئۈسكۈنىلەرنى سىناش (Ping All)"}
                </button>
              </div>

              <div className="dash-nodes-grid">
                {posNodes.map((node) => (
                  <div className="card node-card" key={node.id}>
                    <div className="node-card-head">
                      <span className="node-status-badge">
                        <span className="live-dot">●</span> {lang === "tr" ? "Çevrimiçi" : "100% توردا"}
                      </span>
                      <span className="node-ping-badge">{node.ping} ms</span>
                    </div>
                    <h3 className="node-name">{node.name}</h3>
                    <div className="node-info-list">
                      <div className="node-info-row">
                        <span>📍 {lang === "tr" ? "Konum:" : "ئورنى:"}</span>
                        <strong>{node.location}</strong>
                      </div>
                      <div className="node-info-row">
                        <span>🌐 IP:</span>
                        <code>{node.ip}</code>
                      </div>
                      <div className="node-info-row">
                        <span>🖨️ {lang === "tr" ? "Yazıcı:" : "پىرىنتېر:"}</span>
                        <strong style={{ color: "#22c55e" }}>{lang === "tr" ? "Hazır (Ready)" : "تەييار (Ready)"}</strong>
                      </div>
                      <div className="node-info-row">
                        <span>📊 {lang === "tr" ? "Bugünkü Sipariş:" : "بۈگۈنكى زاكاز:"}</span>
                        <strong>{node.todayOrders}</strong>
                      </div>
                      <div className="node-info-row">
                        <span>🔄 {lang === "tr" ? "Senkron:" : "ئۇلىنىش:"}</span>
                        <span>{node.lastSync}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === "settings" && (
            <div className="dash-tab-pane">
              <div className="section-head-row">
                <div>
                  <h2>⚙️ {t.dash.navSettings}</h2>
                  <p className="subhead">
                    {lang === "tr"
                      ? "Stüdyo profili ve iletişim bilgilerini güncelleyin (Değişiklikler anında web sitesine yansır)"
                      : "ئىستۇدىيە ئۇچۇرلىرىنى ئۆزگەرتىپ ساقلاڭ (ئۆزگىرىشلەر شۇ ھامان ئالدى بەتكە يېڭىلىنىدۇ)"}
                  </p>
                </div>
              </div>

              <div className="grid g2">
                <div className="card">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <span style={{ fontSize: 22 }}>👤</span>
                    <h3 style={{ margin: 0 }}>{lang === "tr" ? "Stüdyo Bilgileri" : "ئىستۇدىيە ئۇچۇرلىرى"}</h3>
                  </div>

                  <form onSubmit={saveSettings} className="form">
                    <div>
                      <label className="est-label">{lang === "tr" ? "İsim / Başlık (UG / TR / EN):" : "ئىستۇدىيە نامى (UG / TR / EN):"}</label>
                      <input
                        required
                        value={formBrandName}
                        onChange={(e) => setFormBrandName(e.target.value)}
                        placeholder="شەپەق تېخنىكا سەھىپىسى"
                      />
                    </div>
                    <div>
                      <label className="est-label">WhatsApp:</label>
                      <input
                        required
                        value={formWhatsapp}
                        onChange={(e) => setFormWhatsapp(e.target.value)}
                        placeholder="+86 130 0000 0000"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="est-label">Telegram:</label>
                      <input
                        required
                        value={formTelegram}
                        onChange={(e) => setFormTelegram(e.target.value)}
                        placeholder="@shafaq_tech"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="est-label">Email:</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="contact@shafaqtech.com"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="est-label">WeChat ID:</label>
                      <input
                        value={formWechat}
                        onChange={(e) => setFormWechat(e.target.value)}
                        placeholder="ShafaqTechHub"
                        dir="ltr"
                      />
                    </div>

                    <button className="btn" type="submit" style={{ marginTop: 8 }}>
                      💾 {lang === "tr" ? "Ayarları Kaydet ve Sitede Yayınla" : "تەڭشەكلەرنى ساقلاش"}
                    </button>
                  </form>
                </div>

                <div className="card">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <span style={{ fontSize: 22 }}>🔒</span>
                    <h3 style={{ margin: 0 }}>{lang === "tr" ? "Güvenlik & Yedekleme" : "بىخەتەرلىك & سانلىق مەلۇمات"}</h3>
                  </div>

                  <div style={{ display: "grid", gap: 14 }}>
                    <div className="security-item">
                      <div>
                        <strong>{lang === "tr" ? "İki Aşamalı Doğrulama (2FA)" : "ئىككى باسقۇچلۇق دەلىللەش (2FA)"}</strong>
                        <p style={{ fontSize: 13, color: "var(--muted)" }}>{lang === "tr" ? "Hesap güvenliği aktif" : "ھېسابات بىخەتەرلىكى قوغدالغان"}</p>
                      </div>
                      <span className="kpi-badge-positive">{lang === "tr" ? "Aktif" : "ئاكتىپ"}</span>
                    </div>

                    <div className="security-item">
                      <div>
                        <strong>{lang === "tr" ? "Tam Veri Yedekleme (JSON)" : "سانلىق مەلۇماتلارنى تولۇق زاپاسلاش (Backup)"}</strong>
                        <p style={{ fontSize: 13, color: "var(--muted)" }}>{lang === "tr" ? "Tüm projeleri ve müşteri CRM verilerini indir" : "تۈرلەر، ئېلانلار ۋە CRM ئۇچۇرلىرىنى JSON قىلىپ چۈشۈرۈش"}</p>
                      </div>
                      <button
                        className="btn ghost"
                        type="button"
                        onClick={() => {
                          const backupData = {
                            settings: {
                              brandName: formBrandName,
                              whatsapp: formWhatsapp,
                              telegram: formTelegram,
                              email: formEmail,
                              wechat: formWechat,
                            },
                            promoAds: editablePromoAds,
                            showcaseProjects: editableProjects,
                            leads,
                            projects,
                            posNodes,
                          };
                          const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `shafaq-tech-backup-${new Date().toISOString().slice(0, 10)}.json`;
                          a.click();
                          onShowToast(lang === "tr" ? "Yedekleme JSON indirildi!" : "سانلىق مەلۇماتلار زاپاسلاندى!");
                        }}
                      >
                        {lang === "tr" ? "İndir 📥" : "چۈشۈرۈۋېلىش 📥"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Kanban Project Modal */}
      {showAddProject && (
        <div className="modal-backdrop" onClick={() => setShowAddProject(false)}>
          <div className="modal-card small-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowAddProject(false)}>
              ✕
            </button>
            <div className="modal-content">
              <h3 style={{ marginBottom: 14 }}>+ {lang === "tr" ? "Yeni Proje Ekle" : "يېڭى تۈر قوشۇش"}</h3>
              <form onSubmit={handleAddProject} className="form">
                <input
                  required
                  placeholder={lang === "tr" ? "Proje adı..." : "تۈر نامى..."}
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                />
                <input
                  required
                  placeholder={lang === "tr" ? "Müşteri veya şirket adı..." : "خېرىدار ياكى شىركەت نامى..."}
                  value={newProjClient}
                  onChange={(e) => setNewProjClient(e.target.value)}
                />
                <input
                  placeholder={lang === "tr" ? "Bütçe (örn: ¥8,000)" : "تۈر خامچوتى (مەسىلەن: ¥8,000)"}
                  value={newProjBudget}
                  onChange={(e) => setNewProjBudget(e.target.value)}
                />
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button className="btn" type="submit">
                    {lang === "tr" ? "Ekle" : "قوشۇش"}
                  </button>
                  <button
                    className="btn ghost"
                    type="button"
                    onClick={() => setShowAddProject(false)}
                  >
                    {lang === "tr" ? "İptal" : "بىكار قىلىش"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
