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
  const [editingAdIndex, setEditingAdIndex] = useState<number | null>(null);

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

  // Add New Showcase Project State
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProjName, setNewProjName] = useState("");
  const [newProjTitleCms, setNewProjTitleCms] = useState("");
  const [newProjCategory, setNewProjCategory] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjTags, setNewProjTags] = useState("");
  const [newProjImage, setNewProjImage] = useState("media/pos-v4.jpg");

  // Add New Promo Ad State
  const [showAddAdModal, setShowAddAdModal] = useState(false);
  const [newAdContent, setNewAdContent] = useState("");
  const [newAdImg, setNewAdImg] = useState("media/pos-v4.jpg");

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
  const [invPrice, setInvPrice] = useState("1200");
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
      budget: newProjBudget || "$1,200",
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

  // Add New Project Handlers
  const handleNewProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewProjImage(event.target?.result as string);
      onShowToast(lang === "tr" ? "Görsel seçildi!" : "رەسىم تاللاندى!");
    };
    reader.readAsDataURL(file);
  };

  const handleCreateShowcaseProject = (e: React.FormEvent) => {
    e.preventDefault();
    const item: ShowcaseProject = {
      id: "work-" + Date.now(),
      name: newProjName.trim() || (lang === "tr" ? "Proje" : "ئەسەر"),
      title: newProjTitleCms.trim() || (lang === "tr" ? "Yeni Tasarım Projesi" : "يېڭى لايىھە ۋە پىروگرامما تۈرى"),
      category: newProjCategory.trim() || (lang === "tr" ? "Teknoloji & Yazılım" : "تور ۋە يانفون تېخنىكىسى"),
      desc: newProjDesc.trim() || (lang === "tr" ? "Kapsamlı yazılım çözümü" : "كەسپىي پىروگرامما ۋە لايىھە ھەل قىلىش چارىسى"),
      tags: newProjTags.split(",").map((s) => s.trim()).filter(Boolean).length > 0
        ? newProjTags.split(",").map((s) => s.trim()).filter(Boolean)
        : ["React", "TypeScript", "UI/UX"],
      image: newProjImage || "media/pos-v4.jpg",
      nameColor: "#14532d",
      descColor: "#0369a1",
    };
    const updated = [item, ...editableProjects];
    setEditableProjects(updated);
    onUpdateShowcaseProjects(updated);
    setShowAddProjectModal(false);
    setNewProjName("");
    setNewProjTitleCms("");
    setNewProjCategory("");
    setNewProjDesc("");
    setNewProjTags("");
    setNewProjImage("media/pos-v4.jpg");
    onShowToast(lang === "tr" ? "Yeni proje eklendi ve sitede yayınlandı! " : "يېڭى ئەسەر قوشۇلدى ۋە ئالدى بەتكە يېڭىلاندى! 🎨✨");
  };

  const handleDeleteShowcaseProject = (id: string) => {
    if (!confirm(lang === "tr" ? "Bu projeyi silmek istediğinize emin misiniz?" : "بۇ ئەسەرنى ئۆچۈرۈشنى جەزملەشتۈرەمسىز؟")) return;
    const updated = editableProjects.filter((p) => p.id !== id);
    setEditableProjects(updated);
    onUpdateShowcaseProjects(updated);
    onShowToast(lang === "tr" ? "Proje silindi!" : "ئەسەر تىزىملىكتىن ئۆچۈرۈلدى! 🗑️");
  };

  // Add New Promo Ad Handlers
  const handleNewAdImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewAdImg(event.target?.result as string);
      onShowToast(lang === "tr" ? "Reklam görseli seçildi!" : "ئېلان رەسىمى تاللاندى!");
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePromoAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdContent.trim()) return;
    const item: PromoAdItem = {
      id: "ad-" + Date.now(),
      text: newAdContent.trim(),
      image: newAdImg || "media/pos-v4.jpg",
    };
    const updated = [...editablePromoAds, item];
    setEditablePromoAds(updated);
    onUpdatePromoAds(updated);
    setShowAddAdModal(false);
    setNewAdContent("");
    setNewAdImg("media/pos-v4.jpg");
    onShowToast(lang === "tr" ? "Yeni reklam eklendi ve sitede yayınlandı!" : "يېڭى ئېلان قوشۇلدى ۋە ئالدى بەتكە يېڭىلاندى! 📢✨");
  };

  const handleDeletePromoAd = (id: string) => {
    if (!confirm(lang === "tr" ? "Bu reklamı silmek istediğinize emin misiniz?" : "بۇ ئېلاننى ئۆچۈرۈشنى جەزملەشتۈرەمسىز؟")) return;
    const updated = editablePromoAds.filter((a) => a.id !== id);
    setEditablePromoAds(updated);
    onUpdatePromoAds(updated);
    onShowToast(lang === "tr" ? "Reklam silindi!" : "ئېلان تىزىملىكتىن ئۆچۈرۈلدى! 🗑️");
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
                  <div className="kpi-value">$28,500</div>
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
                        { m: "1-ئاي", v: 45, rev: "$2.8k" },
                        { m: "2-ئاي", v: 60, rev: "$3.6k" },
                        { m: "3-ئاي", v: 55, rev: "$3.2k" },
                        { m: "4-ئاي", v: 75, rev: "$4.5k" },
                        { m: "5-ئاي", v: 90, rev: "$5.8k" },
                        { m: "6-ئاي", v: 80, rev: "$5.2k" },
                        { m: "7-ئاي", v: 95, rev: "$6.4k" },
                        { m: "8-ئاي", v: 100, rev: "$7.0k" },
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
                            {lang === "tr" ? "Bütçe: " : lang === "en" ? "Budget: " : "خامچوت: "}{p.budget}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEADS & CRM */}
          {activeTab === "leads" && (
            <div className="dash-tab-pane">
              <div className="section-head-row">
                <div>
                  <h2>✉️ {t.dash.navLeads}</h2>
                  <p className="subhead">
                    {lang === "tr"
                      ? "Web sitesinden gelen doğrudan müşteri talepleri ve iletişim kayıtları"
                      : lang === "en"
                      ? "Incoming client inquiries, requests and contact notes"
                      : "تور بېكەت ئالدى قىسمىدىن تاپشۇرۇلغان خېرىدارلار زاكاز تىزىملىكى ۋە خاتىرىلىرى"}
                  </p>
                </div>
                <div className="badge positive">{leads.length} {lang === "tr" ? "Kayıt" : lang === "en" ? "Records" : "تال خاتىرە"}</div>
              </div>

              <div className="card leads-table-card">
                <div className="table-responsive">
                  <table className="leads-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>{lang === "tr" ? "Müşteri Adı" : lang === "en" ? "Client" : "خېرىدار ئىسمى"}</th>
                        <th>{lang === "tr" ? "İletişim" : lang === "en" ? "Contact" : "ئالاقە نومۇرى"}</th>
                        <th>{lang === "tr" ? "Talep Edilen Hizmet" : lang === "en" ? "Requested Service" : "تەلەپ قىلىنغان تۈر"}</th>
                        <th>{lang === "tr" ? "Tahmini Süre" : lang === "en" ? "Est. Time" : "مۆلچەر ۋاقىت"}</th>
                        <th>{lang === "tr" ? "Tarih" : lang === "en" ? "Date" : "چېسلا"}</th>
                        <th>{lang === "tr" ? "Durum" : lang === "en" ? "Status" : "ھالىتى"}</th>
                        <th>{lang === "tr" ? "İşlem" : lang === "en" ? "Action" : "مەشغۇلات"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((l) => (
                        <tr key={l.id}>
                          <td><code>{l.id}</code></td>
                          <td><strong>{l.name}</strong></td>
                          <td>
                            <a href={`tel:${l.contact.replace(/\s+/g, "")}`} className="contact-link">
                              {l.contact}
                            </a>
                          </td>
                          <td>{l.service}</td>
                          <td>{l.estDays}</td>
                          <td>{l.date}</td>
                          <td>
                            <span className={"status-pill " + l.status}>
                              {l.status === "new"
                                ? lang === "tr" ? "Yeni" : lang === "en" ? "New" : "يېڭى تەلەپ"
                                : l.status === "contacted"
                                ? lang === "tr" ? "Görüşüldü" : lang === "en" ? "Contacted" : "ئالاقىلىشىلدى"
                                : lang === "tr" ? "Onaylandı" : lang === "en" ? "Approved" : "ماقۇللاندى"}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions">
                              {l.status === "new" && (
                                <button
                                  className="btn-tiny"
                                  onClick={() => {
                                    const updated = leads.map((item) =>
                                      item.id === l.id ? { ...item, status: "contacted" as const } : item
                                    );
                                    onUpdateLeads(updated);
                                    onShowToast(lang === "tr" ? "Durum güncellendi!" : "ھالەت يېڭىلاندى!");
                                  }}
                                >
                                  {lang === "tr" ? "Görüşüldü Yap" : "ئالاقىلەشتىم"}
                                </button>
                              )}
                              {l.status === "contacted" && (
                                <button
                                  className="btn-tiny success"
                                  onClick={() => {
                                    const updated = leads.map((item) =>
                                      item.id === l.id ? { ...item, status: "approved" as const } : item
                                    );
                                    onUpdateLeads(updated);
                                    onShowToast(lang === "tr" ? "Müşteri onaylandı!" : "زاكاز ماقۇللاندى!");
                                  }}
                                >
                                  {lang === "tr" ? "Onayla" : "ماقۇللاش"}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CMS & CONTENT MANAGEMENT */}
          {activeTab === "cms" && (
            <div className="dash-tab-pane">
              <div className="section-head-row">
                <div>
                  <h2>🖼️ {t.dash.navCms}</h2>
                  <p className="subhead">
                    {lang === "tr"
                      ? "Ana sayfadaki kayan duyuruları, reklamları ve vitrin projelerini canlı düzenleyin"
                      : lang === "en"
                      ? "Manage ticker ads, showcase gallery and banners live on your website"
                      : "تور بەتتىكى ئېلانلار، تاللانما ئەسەرلەر ۋە رەسىملەرنى قولايلىق ئۆزگەرتىپ ئالدى بەتكە شۇ ھامان يېڭىلاڭ"}
                  </p>
                </div>
              </div>

              {/* 1. Ticker & Promo Ads Manager */}
              <div className="card cms-sec-card">
                <div className="section-head-row">
                  <div>
                    <h3>📢 {lang === "tr" ? "Kayan Yazı ve Canlı Kampanyalar" : lang === "en" ? "Ticker & Promo Banner Ads" : "ئۈستۈنكى ئېلانلار ۋە سىيرىلما تەشۋىقاتلار"}</h3>
                    <p className="subhead" style={{ margin: 0 }}>
                      {lang === "tr" ? "Sitede dönen kampanya duyurularını ve görsellerini düzenleyin" : "باش بەتنىڭ ئەڭ ئۈستىدىكى ئېلان تېكىستلىرى ۋە رەسىملىرىنى تۈزىتىڭ"}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn ghost" onClick={() => setShowAddAdModal(true)}>
                      + {lang === "tr" ? "Yeni Reklam Ekle" : lang === "en" ? "Add Promo Ad" : "يېڭى ئېلان قوشۇش"}
                    </button>
                    <button className="btn" onClick={savePromoAds}>
                      💾 {lang === "tr" ? "Reklamları Kaydet" : lang === "en" ? "Save Ads" : "ئېلانلارنى ساقلاش"}
                    </button>
                  </div>
                </div>

                <div className="cms-ads-grid">
                  {editablePromoAds.map((ad, i) => (
                    <div className="cms-ad-item card" key={ad.id || i}>
                      <div className="cms-ad-thumb-wrap">
                        <img
                          src={ad.image || "media/pos-v4.jpg"}
                          alt=""
                          className="cms-ad-thumb"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "media/pos-v4.jpg";
                          }}
                        />
                        <label className="cms-upload-overlay" title="رەسىم ئالماشتۇرۇش">
                          <span>📷 {lang === "tr" ? "Değiştir" : "رەسىم ئالماشتۇرۇش"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleAdImageUpload(i, e)}
                          />
                        </label>
                      </div>
                      <div className="cms-ad-body">
                        <div className="cms-ad-meta-top">
                          <span className="badge">#0{i + 1}</span>
                          <button
                            className="btn-tiny danger"
                            onClick={() => handleDeletePromoAd(ad.id || "")}
                            title="ئۆچۈرۈش"
                          >
                            ✕
                          </button>
                        </div>
                        <textarea
                          className="cms-ad-textarea"
                          rows={3}
                          value={ad.text}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditablePromoAds((prev) =>
                              prev.map((item, idx) => (idx === i ? { ...item, text: val } : item))
                            );
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Showcase Projects Manager */}
              <div className="card cms-sec-card" style={{ marginTop: "24px" }}>
                <div className="section-head-row">
                  <div>
                    <h3>🎨 {lang === "tr" ? "Öne Çıkan Vitrin Projeleri" : lang === "en" ? "Showcase Projects & Case Studies" : "باش بەتتىكى ئەسەرلەر كۆرگەزمىسى (Showcase)"}</h3>
                    <p className="subhead" style={{ margin: 0 }}>
                      {lang === "tr" ? "Müşterilerin inceleyip sipariş verebileceği projeleri ve fotoğraflarını yönetin" : "خېرىدارلار تاللاپ سۈرۈشتۈرىدىغان ئەسەرلەرنىڭ تېمىسى، تۈرى ۋە رەسىملىرىنى باشقۇرۇڭ"}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn ghost" onClick={() => setShowAddProjectModal(true)}>
                      + {lang === "tr" ? "Yeni Eser Ekle" : lang === "en" ? "Add Showcase Item" : "يېڭى ئەسەر قوشۇش"}
                    </button>
                    <button className="btn" onClick={saveShowcaseProjects}>
                      💾 {lang === "tr" ? "Projeleri Kaydet" : lang === "en" ? "Save Projects" : "ئەسەرلەرنى ساقلاش"}
                    </button>
                  </div>
                </div>

                <div className="cms-projects-grid">
                  {editableProjects.map((p, pi) => (
                    <div className="cms-proj-card card" key={p.id || pi}>
                      <div className="cms-proj-thumb-wrap">
                        <img
                          src={p.image || "media/pos-v4.jpg"}
                          alt=""
                          className="cms-proj-thumb"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "media/pos-v4.jpg";
                          }}
                        />
                        <label className="cms-upload-overlay" title="رەسىم يۈكلەش">
                          <span>📷 {lang === "tr" ? "Görsel Seç" : "رەسىم يۈكلەش"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleProjectImageUpload(pi, e)}
                          />
                        </label>
                      </div>
                      <div className="cms-proj-body">
                        <div className="cms-proj-actions-top">
                          <span className="badge">{p.category}</span>
                          <button
                            className="btn-tiny danger"
                            onClick={() => handleDeleteShowcaseProject(p.id)}
                            title="ئۆچۈرۈش"
                          >
                            ✕
                          </button>
                        </div>
                        <input
                          type="text"
                          className="cms-input"
                          placeholder="ئەسەر ماركىسى"
                          value={p.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditableProjects((prev) =>
                              prev.map((item, idx) => (idx === pi ? { ...item, name: val } : item))
                            );
                          }}
                        />
                        <input
                          type="text"
                          className="cms-input bold"
                          placeholder="ئەسەر تېمىسى"
                          value={p.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditableProjects((prev) =>
                              prev.map((item, idx) => (idx === pi ? { ...item, title: val } : item))
                            );
                          }}
                        />
                        <input
                          type="text"
                          className="cms-input"
                          placeholder="قىسقىچە چۈشەندۈرۈش"
                          value={p.desc}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditableProjects((prev) =>
                              prev.map((item, idx) => (idx === pi ? { ...item, desc: val } : item))
                            );
                          }}
                        />
                        <input
                          type="text"
                          className="cms-input tags"
                          placeholder="تېخنىكىلار (پەش بىلەن ئايرىڭ)"
                          value={p.tags.join(", ")}
                          onChange={(e) => {
                            const val = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                            setEditableProjects((prev) =>
                              prev.map((item, idx) => (idx === pi ? { ...item, tags: val } : item))
                            );
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INVOICES & PROPOSALS */}
          {activeTab === "invoices" && (
            <div className="dash-tab-pane">
              <div className="section-head-row">
                <div>
                  <h2>📄 {t.dash.navInvoices}</h2>
                  <p className="subhead">
                    {lang === "tr"
                      ? "Müşteriler için profesyonel fatura ve fiyat teklifi oluşturup yazdırın"
                      : lang === "en"
                      ? "Generate instant client invoices, proposals and receipt printouts"
                      : "خېرىدارلار ئۈچۈن كەسپىي ئۆلچەمدىكى باھا تەكلىپنامىسى، تالون ۋە ھۆججەتلەرنى ھازىرلاپ بېسىپ چىقىرىڭ"}
                  </p>
                </div>
                <button
                  className="btn"
                  onClick={() => {
                    window.print();
                  }}
                >
                  🖨️ {lang === "tr" ? "Faturayı Yazdır" : lang === "en" ? "Print Invoice" : "تالوننى چىقىرىش (Print)"}
                </button>
              </div>

              <div className="invoice-builder-layout">
                {/* Form to customize invoice */}
                <div className="card invoice-form-card">
                  <h3>⚙️ {lang === "tr" ? "Fatura Bilgileri" : lang === "en" ? "Invoice Configuration" : "تالون تەپسىلاتىنى تەھرىرلەش"}</h3>
                  <div className="form-group">
                    <label>{lang === "tr" ? "Müşteri / Kurum Adı:" : lang === "en" ? "Client Name:" : "خېرىدار / شىركەت نامى:"}</label>
                    <input
                      type="text"
                      value={invClient}
                      onChange={(e) => setInvClient(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>{lang === "tr" ? "Hizmet / Proje Tanımı:" : lang === "en" ? "Service Description:" : "تۈر / مۇلازىمەت مەزمۇنى:"}</label>
                    <input
                      type="text"
                      value={invProject}
                      onChange={(e) => setInvProject(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>{lang === "tr" ? "Toplam Tutar ($):" : lang === "en" ? "Total Price ($):" : "ئومۇمىي سومما ($):"}</label>
                    <input
                      type="number"
                      value={invPrice}
                      onChange={(e) => setInvPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>{lang === "tr" ? "Alınan Peşinat (%):" : lang === "en" ? "Deposit (%):" : "تاپشۇرۇلغان كاپالەت پۇلى (%):"}</label>
                    <input
                      type="number"
                      value={invDeposit}
                      onChange={(e) => setInvDeposit(e.target.value)}
                    />
                  </div>
                </div>

                {/* Printable Invoice Preview */}
                <div className="card printable-invoice-paper">
                  <div className="inv-header">
                    <div className="inv-brand-info">
                      <h2>{formBrandName || "شەپەق پەن-تېخنىكا مەركىزى"}</h2>
                      <p>SHAFAQ TECH HUB · DIGITAL INNOVATION STUDIO</p>
                      <p>Email: {formEmail} · Web: shafaqtech.com</p>
                    </div>
                    <div className="inv-meta">
                      <div className="inv-badge">INVOICE / TALON</div>
                      <p><strong>{lang === "tr" ? "No:" : "نومۇرى:"}</strong> INV-{Date.now().toString().slice(-6)}</p>
                      <p><strong>{lang === "tr" ? "Tarih:" : "چېسلا:"}</strong> {new Date().toISOString().slice(0, 10)}</p>
                    </div>
                  </div>

                  <div className="inv-client-box">
                    <span>{lang === "tr" ? "Sayın / Müşteri:" : lang === "en" ? "Billed To:" : "ھۆرمەتلىك خېرىدار:"}</span>
                    <h3>{invClient}</h3>
                  </div>

                  <table className="inv-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>{lang === "tr" ? "Hizmet Detayı" : lang === "en" ? "Description" : "تۈر ۋە مۇلازىمەت تەپسىلاتى"}</th>
                        <th>{lang === "tr" ? "Adet" : lang === "en" ? "Qty" : "سانى"}</th>
                        <th>{lang === "tr" ? "Birim Fiyat" : lang === "en" ? "Unit Price" : "بىرلىك باھا"}</th>
                        <th>{lang === "tr" ? "Toplam" : lang === "en" ? "Total" : "ئومۇمىي"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <strong>{invProject}</strong>
                          <p style={{ margin: "4px 0 0 0", fontSize: 13, color: "#64748b" }}>
                            {lang === "tr" ? "Tasarım, geliştirme, test ve 1 yıllık teknik destek dahil" : "لايىھە، كودلاش، سىناق ۋە 1 يىللىق تېخنىكىلىق كاپالەت ئۆز ئىچىگە ئېلىنىدۇ"}
                          </p>
                        </td>
                        <td>1</td>
                        <td>${invPrice}</td>
                        <td>${invPrice}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="inv-calc-row">
                    <div className="inv-notes">
                      <h4>{lang === "tr" ? "Banka ve İletişim Notları:" : "ئالاقە ۋە ھېسابات ئەسكەرتمىسى:"}</h4>
                      <p>WhatsApp / Tel: {formWhatsapp}</p>
                      <p>Telegram: {formTelegram}</p>
                    </div>
                    <div className="inv-summary">
                      <div className="sum-line">
                        <span>{lang === "tr" ? "Ara Toplam:" : "ئومۇمىي سومما:"}</span>
                        <strong>${invPrice}</strong>
                      </div>
                      <div className="sum-line">
                        <span>{lang === "tr" ? `Peşinat (%${invDeposit}):` : `ئالدىن تاپشۇرۇلغان پۇل (%${invDeposit}):`}</span>
                        <strong>${Math.round((Number(invPrice) * Number(invDeposit)) / 100)}</strong>
                      </div>
                      <div className="sum-line total">
                        <span>{lang === "tr" ? "Kalan Bakiye:" : "قالغان سومما:"}</span>
                        <strong>${Number(invPrice) - Math.round((Number(invPrice) * Number(invDeposit)) / 100)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CLOUD POS & HARDWARE NODES */}
          {activeTab === "pos" && (
            <div className="dash-tab-pane">
              <div className="section-head-row">
                <div>
                  <h2>🖨️ {t.dash.navPos}</h2>
                  <p className="subhead">
                    {lang === "tr"
                      ? "Restoran ve mağazalardaki POS terminallerini ve termal yazıcıları canlı izleyin"
                      : lang === "en"
                      ? "Realtime telemetry of connected restaurant POS devices, thermal printers and cashier hubs"
                      : "ئاشخانا ۋە دۇكانلاردىكى ئەقلىي كاسسىر، زاكاز ئېكرانى ۋە تېرمال پىرىنتېرلارنىڭ سىگنال ھالىتى"}
                  </p>
                </div>
                <button className="btn" onClick={pingAllNodes}>
                  ⚡ {lang === "tr" ? "Tüm Cihazlara Sinyal Gönder" : lang === "en" ? "Ping All Nodes" : "بارلىق ئۈسكۈنىلەرنى سىناش"}
                </button>
              </div>

              <div className="pos-nodes-grid">
                {posNodes.map((node) => (
                  <div className="card pos-node-card" key={node.id}>
                    <div className="node-card-top">
                      <div className="node-icon-box">🖨️</div>
                      <div className="node-status-pill online">
                        <span className="node-pulse" /> {lang === "tr" ? "Çevrimiçi" : lang === "en" ? "Online" : "ئۇلانغان (Online)"}
                      </div>
                    </div>
                    <h3 className="node-name">{node.name}</h3>
                    <div className="node-info-rows">
                      <div className="node-info-row">
                        <span>{lang === "tr" ? "Konum:" : lang === "en" ? "Location:" : "ئورنى:"}</span>
                        <strong>{node.location}</strong>
                      </div>
                      <div className="node-info-row">
                        <span>{lang === "tr" ? "IP Adresi:" : lang === "en" ? "IP Address:" : "تور ئادرېسى:"}</span>
                        <code>{node.ip}</code>
                      </div>
                      <div className="node-info-row">
                        <span>{lang === "tr" ? "Yazıcı Durumu:" : lang === "en" ? "Printer Status:" : "پىرىنتېر ھالىتى:"}</span>
                        <strong className="text-success">🟢 {node.printer === "ready" ? "تەييار" : "تەكشۈرۈلۈۋاتىدۇ"}</strong>
                      </div>
                      <div className="node-info-row">
                        <span>{lang === "tr" ? "Gecikme (Ping):" : lang === "en" ? "Ping:" : "سۈرئىتى (Ping):"}</span>
                        <strong>{node.ping}ms</strong>
                      </div>
                      <div className="node-info-row">
                        <span>{lang === "tr" ? "Bugünkü Sipariş:" : lang === "en" ? "Today's Orders:" : "بۈگۈنكى زاكاز:"}</span>
                        <strong>{node.todayOrders} {lang === "tr" ? "Fiş" : "دانە"}</strong>
                      </div>
                      <div className="node-info-row">
                        <span>{lang === "tr" ? "Son Senkronizasyon:" : lang === "en" ? "Last Sync:" : "ئەڭ ئاخىرقى سىگنال:"}</span>
                        <span>{node.lastSync}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: STUDIO SETTINGS */}
          {activeTab === "settings" && (
            <div className="dash-tab-pane">
              <div className="section-head-row">
                <div>
                  <h2>⚙️ {t.dash.navSettings}</h2>
                  <p className="subhead">
                    {lang === "tr"
                      ? "Stüdyo adı, WhatsApp ve Telegram iletişim kanallarını tek merkezden güncelleyin"
                      : lang === "en"
                      ? "Global studio brand identity, WhatsApp and Telegram channels"
                      : "شىركەت نامى، WhatsApp، Telegram قاتارلىق بارلىق ئۇچۇرلارنى بىرلا جايدىن تۈزىتىڭ"}
                  </p>
                </div>
              </div>

              <div className="card settings-form-card">
                <form onSubmit={saveSettings} className="est-form">
                  <div className="est-grid">
                    <div className="est-field">
                      <label className="est-label">{lang === "tr" ? "Stüdyo / Marka Adı:" : lang === "en" ? "Brand Name:" : "ستۇدىيە / شىركەت نامى:"}</label>
                      <input
                        type="text"
                        className="est-input"
                        placeholder="شەپەق پەن-تېخنىكا سۇپىسى"
                        value={formBrandName}
                        onChange={(e) => setFormBrandName(e.target.value)}
                      />
                    </div>

                    <div className="est-field">
                      <label className="est-label">WhatsApp:</label>
                      <input
                        type="text"
                        className="est-input"
                        value={formWhatsapp}
                        onChange={(e) => setFormWhatsapp(e.target.value)}
                      />
                    </div>

                    <div className="est-field">
                      <label className="est-label">Telegram:</label>
                      <input
                        type="text"
                        className="est-input"
                        value={formTelegram}
                        onChange={(e) => setFormTelegram(e.target.value)}
                      />
                    </div>

                    <div className="est-field">
                      <label className="est-label">Email:</label>
                      <input
                        type="email"
                        className="est-input"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: "24px" }}>
                    <button type="submit" className="btn">
                      💾 {lang === "tr" ? "Tüm Ayarları Kaydet" : lang === "en" ? "Save All Settings" : "بارلىق تەڭشەكلەرنى ساقلاش"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ADD NEW PROJECT MODAL */}
      {showAddProject && (
        <div className="modal-veil" onClick={() => setShowAddProject(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>+ {lang === "tr" ? "Yeni Proje Ekle" : lang === "en" ? "Add New Project" : "يېڭى تۈر قوشۇش"}</h3>
              <button className="modal-close" onClick={() => setShowAddProject(false)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddProject} className="est-form">
                <div className="est-field">
                  <label className="est-label">{lang === "tr" ? "Proje Başlığı:" : lang === "en" ? "Project Title:" : "تۈر نامى:"}</label>
                  <input
                    type="text"
                    className="est-input"
                    placeholder="مەسىلەن: ئاشخانا ئەقلىي POS زاكاز سىستېمىسى"
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="est-field">
                  <label className="est-label">{lang === "tr" ? "Müşteri Adı:" : lang === "en" ? "Client Name:" : "خېرىدار نامى:"}</label>
                  <input
                    type="text"
                    className="est-input"
                    placeholder="مەسىلەن: شەپەق لەغمەن سارىيى"
                    value={newProjClient}
                    onChange={(e) => setNewProjClient(e.target.value)}
                  />
                </div>
                <div className="est-field">
                  <label className="est-label">{lang === "tr" ? "Bütçe ($):" : lang === "en" ? "Budget ($):" : "خامچوت ($):"}</label>
                  <input
                    type="text"
                    className="est-input"
                    placeholder="تۈر خامچوتى (مەسىلەن: $1,200)"
                    value={newProjBudget}
                    onChange={(e) => setNewProjBudget(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: "16px" }}>
                  <button type="submit" className="btn">
                    + {lang === "tr" ? "Panoya Ekle" : lang === "en" ? "Add to Board" : "تاختىغا قوشۇش"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW SHOWCASE PROJECT MODAL */}
      {showAddProjectModal && (
        <div className="modal-veil" onClick={() => setShowAddProjectModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>+ {lang === "tr" ? "Yeni Vitrin Eseri Ekle" : "يېڭى ئەسەر كۆرگەزمىسى قوشۇش"}</h3>
              <button className="modal-close" onClick={() => setShowAddProjectModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateShowcaseProject} className="est-form">
                <div className="est-field">
                  <label className="est-label">ماركا / تۈرقىسقا نامى:</label>
                  <input
                    type="text"
                    className="est-input"
                    placeholder="مەسىلەن: رىستۇران"
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    required
                  />
                </div>
                <div className="est-field">
                  <label className="est-label">ئەسەر تولۇق تېمىسى:</label>
                  <input
                    type="text"
                    className="est-input"
                    placeholder="مەسىلەن: كۆپ تىللىق ئەقلىي ئاشخانا ۋە QR زاكاز سىستېمىسى"
                    value={newProjTitleCms}
                    onChange={(e) => setNewProjTitleCms(e.target.value)}
                    required
                  />
                </div>
                <div className="est-field">
                  <label className="est-label">تۈرى (Category):</label>
                  <input
                    type="text"
                    className="est-input"
                    placeholder="مەسىلەن: ئاشخانا ۋە مېھمانساراي تېخنىكىسى"
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="est-field">
                  <label className="est-label">تەپسىلىي چۈشەندۈرۈش:</label>
                  <input
                    type="text"
                    className="est-input"
                    placeholder="مەسىلەن: كۆپ تىللىق زاكاز ۋە ئاشپەز ئېكرانى"
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    required
                  />
                </div>
                <div className="est-field">
                  <label className="est-label">ئىشلىتىلگەن تېخنىكىلار (پەش بىلەن ئايرىڭ):</label>
                  <input
                    type="text"
                    className="est-input"
                    placeholder="React, TypeScript, QR Menu, Thermal Print"
                    value={newProjTags}
                    onChange={(e) => setNewProjTags(e.target.value)}
                  />
                </div>
                <div className="est-field">
                  <label className="est-label">ئەسەر رەسىمى يۈكلەش:</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="est-input"
                    onChange={handleNewProjectImageUpload}
                  />
                </div>
                <div style={{ marginTop: "16px" }}>
                  <button type="submit" className="btn">
                    + {lang === "tr" ? "Eseri Yayınla" : "ئەسەرنى ئېلان قىلىش ✨"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW PROMO AD MODAL */}
      {showAddAdModal && (
        <div className="modal-veil" onClick={() => setShowAddAdModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>+ {lang === "tr" ? "Yeni Reklam Ekle" : "يېڭى پائالىيەت ئېلانى قوشۇش"}</h3>
              <button className="modal-close" onClick={() => setShowAddAdModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreatePromoAd} className="est-form">
                <div className="est-field">
                  <label className="est-label">ئېلان تېكىستى:</label>
                  <textarea
                    rows={3}
                    className="est-input"
                    placeholder="مەسىلەن: يېڭى: كۆپ تىللىق ئاشخانا POS — بىر ھەپتە ئىچىدە ئورنىتىش"
                    value={newAdContent}
                    onChange={(e) => setNewAdContent(e.target.value)}
                    required
                  />
                </div>
                <div className="est-field">
                  <label className="est-label">ئېلان كۆرۈنمە رەسىمى:</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="est-input"
                    onChange={handleNewAdImageUpload}
                  />
                </div>
                <div style={{ marginTop: "16px" }}>
                  <button type="submit" className="btn">
                    + {lang === "tr" ? "Reklamı Yayınla" : "ئېلاننى ئېلان قىلىش 📢"}
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
