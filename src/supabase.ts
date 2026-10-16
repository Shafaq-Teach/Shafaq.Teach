import { createClient } from "@supabase/supabase-js";
import type { PromoAdItem, ShowcaseProject, LeadItem, StudioSettings } from "./components/Dashboard";

const envUrl = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_SUPABASE_URL;
const envKey = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_SUPABASE_ANON_KEY;

export const SUPABASE_URL = envUrl || "https://ufkblidmcscbgardibkm.supabase.co";
export const SUPABASE_KEY = envKey || "sb_publishable_9LBjrGb7H2D4LKpN8s4gvQ_SknfuLEH";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Default SHA-256 digest (never expose plaintext default password in code or storage)
export const DEFAULT_ADMIN_HASH = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

export function isSha256Hex(val: string): boolean {
  return /^[a-f0-9]{64}$/i.test(val);
}

// Pure-JS SHA-256 fallback for environments where crypto.subtle is unavailable
function sha256Fallback(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let result = "";
  const words: number[] = [];
  const utf8 = unescape(encodeURIComponent(ascii));
  const asciiBitLength = utf8.length * 8;
  let hash: number[] = [];
  const k: number[] = [];
  let primeCounter = 0;
  const isComposite: Record<number, number> = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  let str = utf8 + "\x80";
  while ((str.length % 64) - 56) str += "\x00";
  for (let i = 0; i < str.length; i++) {
    const j = str.charCodeAt(i);
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;
  for (let j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0);
    hash = hash.slice(0, 8);
    for (let i = 0; i < 64; i++) {
      const w15 = w[i - 15];
      const w2 = w[i - 2];
      const a = hash[0];
      const e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (let i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? "0" : "") + b.toString(16);
    }
  }
  return result;
}

export async function hashPassword(plain: string): Promise<string> {
  const clean = plain.trim();
  if (isSha256Hex(clean)) return clean.toLowerCase();
  try {
    if (typeof crypto !== "undefined" && crypto.subtle) {
      const data = new TextEncoder().encode(clean);
      const buf = await crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
  } catch {
    // fallback to pure-JS SHA-256
  }
  return sha256Fallback(clean);
}

export function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function verifyPassword(inputPlain: string, storedHashOrPlain: string): Promise<boolean> {
  const cleanInput = inputPlain.trim();
  const cleanStored = (storedHashOrPlain || DEFAULT_ADMIN_HASH).trim();
  if (!cleanInput || !cleanStored) return false;

  const inputHash = await hashPassword(cleanInput);
  if (isSha256Hex(cleanStored)) {
    return timingSafeEqualStr(inputHash, cleanStored.toLowerCase());
  }
  // Backward compatibility if legacy cloud row still holds unhashed string
  const storedHash = await hashPassword(cleanStored);
  return timingSafeEqualStr(inputHash, storedHash);
}

export function generateSecureToken(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return `${Date.now()}-${crypto.randomUUID()}`;
    }
    if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
      const arr = new Uint8Array(16);
      crypto.getRandomValues(arr);
      const hex = Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
      return `${Date.now()}-${hex}`;
    }
  } catch {
    // ignore
  }
  return `${Date.now()}-${sha256Fallback(String(Date.now()) + String(Math.random())).slice(0, 24)}`;
}

export function sanitizeText(val: unknown, maxLen = 500): string {
  if (typeof val !== "string") return "";
  return val.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, maxLen);
}

export function sanitizeImageUrl(url: unknown, fallback = "media/pos-v4.jpg"): string {
  if (typeof url !== "string") return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;
  if (/^data:image\/(jpeg|jpg|png|webp|gif);base64,[A-Za-z0-9+/=\s]+$/i.test(trimmed)) {
    return trimmed;
  }
  if (/^(https?:\/\/|\/|\.?\/?media\/|\.?\/?assets\/)/i.test(trimmed) && !/javascript:|data:|vbscript:/i.test(trimmed)) {
    return trimmed;
  }
  return fallback;
}

// 1. Promo Ads Cloud Sync (Safe Upsert + Targeted Cleanup)
export async function getCloudPromoAds(): Promise<PromoAdItem[] | null> {
  try {
    const { data, error } = await supabase
      .from("promo_ads")
      .select("*")
      .order("order_idx", { ascending: true });
    if (error) throw error;
    if (data && data.length > 0) {
      return data.map((d: Record<string, unknown>) => ({
        id: sanitizeText(String(d.id ?? ""), 80),
        text: sanitizeText(d.text, 300),
        image: sanitizeImageUrl(d.image, "media/pos-v4.jpg"),
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
      id: sanitizeText(ad.id || `ad-${idx + 1}`, 80),
      text: sanitizeText(ad.text, 300),
      image: sanitizeImageUrl(ad.image, "media/pos-v4.jpg"),
      order_idx: idx,
      updated_at: new Date().toISOString(),
    }));

    if (rows.length > 0) {
      const { error: upsertErr } = await supabase.from("promo_ads").upsert(rows, { onConflict: "id" });
      if (upsertErr) {
        console.warn("Supabase promo_ads upsert error:", upsertErr);
        return;
      }
      // Only remove stale rows AFTER upsert has succeeded
      const keepIds = new Set(rows.map((r) => r.id));
      const { data: existing } = await supabase.from("promo_ads").select("id");
      if (existing) {
        const staleIds = existing
          .map((r: { id: unknown }) => String(r.id))
          .filter((id) => !keepIds.has(id));
        if (staleIds.length > 0) {
          await supabase.from("promo_ads").delete().in("id", staleIds);
        }
      }
    } else {
      await supabase.from("promo_ads").delete().neq("id", "none");
    }
  } catch (err) {
    console.warn("Supabase promo_ads sync error:", err);
  }
}

// 2. Showcase Projects Cloud Sync (Safe Upsert + Targeted Cleanup)
export async function getCloudShowcaseProjects(): Promise<ShowcaseProject[] | null> {
  try {
    const { data, error } = await supabase
      .from("showcase_projects")
      .select("*")
      .order("order_idx", { ascending: true });
    if (error) throw error;
    if (data && data.length > 0) {
      return data.map((d: Record<string, unknown>) => ({
        id: sanitizeText(String(d.id ?? ""), 80),
        name: sanitizeText(d.name, 100),
        title: sanitizeText(d.title, 250),
        desc: sanitizeText(d.description || d.desc, 600),
        category: sanitizeText(d.category, 150),
        image: sanitizeImageUrl(d.image, "media/pos-v4.jpg"),
        tags: Array.isArray(d.tags)
          ? d.tags.map((t) => sanitizeText(t, 50)).filter(Boolean)
          : typeof d.tags === "string"
          ? d.tags.split(",").map((t) => sanitizeText(t, 50)).filter(Boolean)
          : ["Tech"],
        nameColor: sanitizeText(d.name_color, 30) || "#14532d",
        descColor: sanitizeText(d.desc_color, 30) || "#0369a1",
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
      id: sanitizeText(p.id || `work-${idx + 1}`, 80),
      name: sanitizeText(p.name, 100),
      title: sanitizeText(p.title, 250),
      description: sanitizeText(p.desc, 600),
      category: sanitizeText(p.category, 150),
      image: sanitizeImageUrl(p.image, "media/pos-v4.jpg"),
      tags: Array.isArray(p.tags) ? p.tags.map((t) => sanitizeText(t, 50)).filter(Boolean) : ["Tech"],
      name_color: sanitizeText(p.nameColor, 30) || "#14532d",
      desc_color: sanitizeText(p.descColor, 30) || "#0369a1",
      order_idx: idx,
      updated_at: new Date().toISOString(),
    }));

    if (rows.length > 0) {
      const { error: upsertErr } = await supabase.from("showcase_projects").upsert(rows, { onConflict: "id" });
      if (upsertErr) {
        console.warn("Supabase showcase_projects upsert error:", upsertErr);
        return;
      }
      // Only remove deleted project rows AFTER upsert succeeds
      const keepIds = new Set(rows.map((r) => r.id));
      const { data: existing } = await supabase.from("showcase_projects").select("id");
      if (existing) {
        const staleIds = existing
          .map((r: { id: unknown }) => String(r.id))
          .filter((id) => !keepIds.has(id));
        if (staleIds.length > 0) {
          await supabase.from("showcase_projects").delete().in("id", staleIds);
        }
      }
    } else {
      await supabase.from("showcase_projects").delete().neq("id", "none");
    }
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
      return data.map((d: Record<string, unknown>) => ({
        id: sanitizeText(String(d.id ?? ""), 60),
        name: sanitizeText(d.name, 120),
        contact: sanitizeText(d.contact, 150),
        service: sanitizeText(d.service, 150),
        estDays: sanitizeText(d.est_days, 60),
        date: sanitizeText(d.date, 30),
        status: (d.status === "contacted" || d.status === "approved" ? d.status : "new") as LeadItem["status"],
        note: sanitizeText(d.note, 1500),
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
      id: sanitizeText(lead.id, 60),
      name: sanitizeText(lead.name, 120),
      contact: sanitizeText(lead.contact, 150),
      service: sanitizeText(lead.service, 150),
      est_days: sanitizeText(lead.estDays, 60),
      date: sanitizeText(lead.date, 30),
      status: lead.status,
      note: sanitizeText(lead.note, 1500),
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
      id: sanitizeText(lead.id, 60),
      name: sanitizeText(lead.name, 120),
      contact: sanitizeText(lead.contact, 150),
      service: sanitizeText(lead.service, 150),
      est_days: sanitizeText(lead.estDays, 60),
      date: sanitizeText(lead.date, 30),
      status: lead.status,
      note: sanitizeText(lead.note, 1500),
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
        brandName: sanitizeText(data.brand_name, 120) || "شەپەق تېخنىكا",
        whatsapp: sanitizeText(data.whatsapp, 60) || "+90 552 690 99 99",
        telegram: sanitizeText(data.telegram, 80) || "@shafaq_tech",
        email: sanitizeText(data.email, 120) || "contact@shafaq.tech",
        wechat: sanitizeText(data.wechat, 80) || "shafaq_tech",
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
      brand_name: sanitizeText(settings.brandName, 120),
      whatsapp: sanitizeText(settings.whatsapp, 60),
      telegram: sanitizeText(settings.telegram, 80),
      email: sanitizeText(settings.email, 120),
      wechat: sanitizeText(settings.wechat, 80),
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

// 5. Admin Credentials Cloud Sync (SHA-256 Hashed + Secure CSPRNG Token)
export async function getCloudAdminCredentials(): Promise<CloudAdminCreds | null> {
  try {
    const { data, error } = await supabase
      .from("admin_credentials")
      .select("*")
      .eq("id", "main_admin")
      .single();
    if (error) throw error;
    if (data) {
      const rawHash = String(data.password_hash || DEFAULT_ADMIN_HASH);
      const normalizedHash = isSha256Hex(rawHash) ? rawHash.toLowerCase() : await hashPassword(rawHash);
      return {
        username: sanitizeText(data.username, 60) || "admin",
        passwordHash: normalizedHash,
        token: sanitizeText(data.token, 120) || "",
      };
    }
  } catch (err) {
    console.warn("Supabase admin_credentials read fallback:", err);
  }
  return null;
}

export async function syncCloudAdminCredentials(username: string, passwordPlainOrHash: string): Promise<string | null> {
  try {
    const newToken = generateSecureToken();
    const hashed = await hashPassword(passwordPlainOrHash);
    const row = {
      id: "main_admin",
      username: sanitizeText(username, 60) || "admin",
      password_hash: hashed,
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
