import { createClient } from "@supabase/supabase-js";
import type { PromoAdItem, ShowcaseProject, LeadItem, StudioSettings } from "./components/Dashboard";

export const SUPABASE_URL = "https://ufkblidmcscbgardibkm.supabase.co";
export const SUPABASE_KEY = "sb_publishable_9LBjrGb7H2D4LKpN8s4gvQ_SknfuLEH";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 1. Promo Ads Cloud Sync
export async function getCloudPromoAds(): Promise<PromoAdItem[] | null> {
  try {
    const { data, error } = await supabase
      .from("promo_ads")
      .select("*")
      .order("order_idx", { ascending: true });
    if (error) throw error;
    if (data && data.length > 0) {
      return data.map((d: any) => ({
        id: String(d.id),
        text: d.text || "",
        image: d.image || "",
      }));
    }
  } catch (err) {
    console.warn("Supabase promo_ads read fallback:", err);
  }
  return null;
}

export async function syncCloudPromoAds(ads: PromoAdItem[]) {
  try {
    const rows = ads.map((ad, idx) => ({
      id: ad.id || `ad-${idx + 1}`,
      text: ad.text,
      image: ad.image,
      order_idx: idx,
      updated_at: new Date().toISOString(),
    }));

    await supabase.from("promo_ads").delete().neq("id", "none");
    const { error } = await supabase.from("promo_ads").insert(rows);
    if (error) console.warn("Supabase promo_ads insert error:", error);
  } catch (err) {
    console.warn("Supabase promo_ads sync error:", err);
  }
}

// 2. Showcase Projects Cloud Sync
export async function getCloudShowcaseProjects(): Promise<ShowcaseProject[] | null> {
  try {
    const { data, error } = await supabase
      .from("showcase_projects")
      .select("*")
      .order("order_idx", { ascending: true });
    if (error) throw error;
    if (data && data.length > 0) {
      return data.map((d: any) => ({
        id: String(d.id),
        name: d.name || "",
        title: d.title || "",
        desc: d.description || d.desc || "",
        category: d.category || "",
        image: d.image || "",
        tags: Array.isArray(d.tags) ? d.tags : typeof d.tags === "string" ? d.tags.split(",") : ["Tech"],
        nameColor: d.name_color || "#14532d",
        descColor: d.desc_color || "#0369a1",
      }));
    }
  } catch (err) {
    console.warn("Supabase showcase_projects read fallback:", err);
  }
  return null;
}

export async function syncCloudShowcaseProjects(projects: ShowcaseProject[]) {
  try {
    const rows = projects.map((p, idx) => ({
      id: p.id || `work-${idx + 1}`,
      name: p.name,
      title: p.title,
      description: p.desc,
      category: p.category,
      image: p.image,
      tags: p.tags,
      name_color: p.nameColor || "#14532d",
      desc_color: p.descColor || "#0369a1",
      order_idx: idx,
      updated_at: new Date().toISOString(),
    }));

    await supabase.from("showcase_projects").delete().neq("id", "none");
    const { error } = await supabase.from("showcase_projects").insert(rows);
    if (error) console.warn("Supabase showcase_projects insert error:", error);
  } catch (err) {
    console.warn("Supabase showcase_projects sync error:", err);
  }
}

// 3. Leads Inquiries Cloud Sync
export async function getCloudLeads(): Promise<LeadItem[] | null> {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    if (data && data.length > 0) {
      return data.map((d: any) => ({
        id: String(d.id),
        name: d.name || "",
        contact: d.contact || "",
        service: d.service || "",
        estDays: d.est_days || "",
        date: d.date || "",
        status: d.status || "new",
        note: d.note || "",
      }));
    }
  } catch (err) {
    console.warn("Supabase leads read fallback:", err);
  }
  return null;
}

export async function addCloudLead(lead: LeadItem) {
  try {
    const row = {
      id: lead.id,
      name: lead.name,
      contact: lead.contact,
      service: lead.service,
      est_days: lead.estDays,
      date: lead.date,
      status: lead.status,
      note: lead.note,
      created_at: new Date().toISOString(),
    };
    await supabase.from("leads").upsert(row);
  } catch (err) {
    console.warn("Supabase add lead error:", err);
  }
}

export async function syncCloudLeads(leads: LeadItem[]) {
  try {
    const rows = leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      contact: lead.contact,
      service: lead.service,
      est_days: lead.estDays,
      date: lead.date,
      status: lead.status,
      note: lead.note,
      created_at: new Date().toISOString(),
    }));
    await supabase.from("leads").upsert(rows);
  } catch (err) {
    console.warn("Supabase sync leads error:", err);
  }
}

// 4. Studio Settings Cloud Sync
export async function getCloudSettings(): Promise<StudioSettings | null> {
  try {
    const { data, error } = await supabase
      .from("studio_settings")
      .select("*")
      .eq("id", "main_settings")
      .single();
    if (error) throw error;
    if (data) {
      return {
        brandName: data.brand_name || "شەپەق تېخنىكا",
        whatsapp: data.whatsapp || "+90 552 690 99 99",
        telegram: data.telegram || "@shafaq_tech",
        email: data.email || "contact@shafaq.tech",
        wechat: data.wechat || "shafaq_tech",
      };
    }
  } catch (err) {
    console.warn("Supabase settings read fallback:", err);
  }
  return null;
}

export async function syncCloudSettings(settings: StudioSettings) {
  try {
    const row = {
      id: "main_settings",
      brand_name: settings.brandName,
      whatsapp: settings.whatsapp,
      telegram: settings.telegram,
      email: settings.email,
      wechat: settings.wechat,
      updated_at: new Date().toISOString(),
    };
    await supabase.from("studio_settings").upsert(row);
  } catch (err) {
    console.warn("Supabase sync settings error:", err);
  }
}

export interface CloudAdminCreds {
  username: string;
  passwordHash: string;
  token: string;
}

// 5. Admin Credentials Cloud Sync
export async function getCloudAdminCredentials(): Promise<CloudAdminCreds | null> {
  try {
    const { data, error } = await supabase
      .from("admin_credentials")
      .select("*")
      .eq("id", "main_admin")
      .single();
    if (error) throw error;
    if (data) {
      return {
        username: data.username || "admin",
        passwordHash: data.password_hash || "admin123",
        token: data.token || "default-token",
      };
    }
  } catch (err) {
    console.warn("Supabase admin_credentials read fallback:", err);
  }
  return null;
}

export async function syncCloudAdminCredentials(username: string, passwordHash: string): Promise<string | null> {
  try {
    const newToken = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const row = {
      id: "main_admin",
      username: username || "admin",
      password_hash: passwordHash,
      token: newToken,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("admin_credentials").upsert(row);
    if (error) throw error;
    return newToken;
  } catch (err) {
    console.warn("Supabase admin_credentials sync error:", err);
    return null;
  }
}

