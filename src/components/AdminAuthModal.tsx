import { useState } from "react";
import { copy, type Lang } from "../i18n";
import { hashPassword, verifyPassword, generateSecureToken } from "../supabase";

export interface AdminCredentials {
  username: string;
  passwordHash: string;
  token?: string;
}

interface AdminAuthModalProps {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (sessionToken: string) => void;
  onShowToast: (msg: string) => void;
  credentials: AdminCredentials;
  onUpdateCredentials: (creds: AdminCredentials) => void | Promise<void>;
}

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60_000;

function getLockoutState(): { attempts: number; lockedUntil: number } {
  try {
    const raw = sessionStorage.getItem("shafaq_auth_lockout");
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        attempts: Number(parsed.attempts) || 0,
        lockedUntil: Number(parsed.lockedUntil) || 0,
      };
    }
  } catch {
    // ignore
  }
  return { attempts: 0, lockedUntil: 0 };
}

function setLockoutState(attempts: number, lockedUntil: number) {
  try {
    sessionStorage.setItem("shafaq_auth_lockout", JSON.stringify({ attempts, lockedUntil }));
  } catch {
    // ignore
  }
}

export default function AdminAuthModal({
  lang,
  isOpen,
  onClose,
  onSuccess,
  onShowToast,
  credentials,
  onUpdateCredentials,
}: AdminAuthModalProps) {
  const t = copy[lang];
  const [viewMode, setViewMode] = useState<"login" | "change">("login");

  // Login form state (do not pre-fill sensitive credentials)
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Change Password form state
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  if (!isOpen) return null;

  const showHideLabel = showPass
    ? lang === "tr"
      ? "🙈 Gizle"
      : lang === "en"
      ? "🙈 Hide"
      : lang === "ar"
      ? "🙈 إخفاء"
      : "🙈 يوشۇرۇش"
    : lang === "tr"
    ? "👁️ Göster"
    : lang === "en"
    ? "👁️ Show"
    : lang === "ar"
    ? "👁️ إظهار"
    : "👁️ كۆرسىتىش";

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const lock = getLockoutState();
    const now = Date.now();
    if (lock.lockedUntil > now) {
      const waitSec = Math.ceil((lock.lockedUntil - now) / 1000);
      const lockMsg =
        lang === "tr"
          ? `⚠️ Çok fazla hatalı deneme! Lütfen ${waitSec} saniye bekleyin.`
          : lang === "en"
          ? `⚠️ Too many failed attempts! Please wait ${waitSec}s.`
          : lang === "ar"
          ? `⚠️ محاولات خاطئة كثيرة! يرجى الانتظار ${waitSec} ثانية.`
          : `⚠️ كۆپ قېتىم خاتا كىرگۈزۈلدى! ${waitSec} سېكۇنت ساقلاپ قايتا سىناڭ.`;
      onShowToast(lockMsg);
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanUser = inputUser.trim();
      const cleanPass = inputPass.trim();
      const isValidPass = await verifyPassword(cleanPass, credentials.passwordHash);

      if (cleanUser === credentials.username && isValidPass) {
        setLockoutState(0, 0);
        const activeToken = credentials.token || generateSecureToken();
        setInputPass("");
        onShowToast(`✨ ${t.auth.loginSuccess}`);
        onSuccess(activeToken);
      } else {
        const nextAttempts = lock.attempts + 1;
        const nextLockUntil = nextAttempts >= MAX_LOGIN_ATTEMPTS ? now + LOCKOUT_DURATION_MS : 0;
        setLockoutState(nextAttempts, nextLockUntil);
        onShowToast(`⚠️ ${t.auth.loginError}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const cleanOld = oldPass.trim();
    const cleanNew = newPass.trim();
    const cleanConfirm = confirmPass.trim();

    if (cleanNew.length < 6) {
      const minLenMsg =
        lang === "tr"
          ? "⚠️ Yeni şifre en az 6 karakter olmalıdır!"
          : lang === "en"
          ? "⚠️ New password must be at least 6 characters!"
          : lang === "ar"
          ? "⚠️ يجب أن تتكون كلمة المرور الجديدة من 6 أحرف على الأقل!"
          : "⚠️ يېڭى مەخپىي نومۇر كەم دېگەندە 6 ھەرپ-بەلگىدىن تەركىب تېپىشى كېرەك!";
      onShowToast(minLenMsg);
      return;
    }

    if (cleanNew !== cleanConfirm) {
      onShowToast(`⚠️ ${t.auth.mismatchError}`);
      return;
    }

    setIsSubmitting(true);
    try {
      const isOldValid = await verifyPassword(cleanOld, credentials.passwordHash);
      if (!isOldValid) {
        onShowToast(`⚠️ ${t.auth.wrongOldPass}`);
        return;
      }

      const newHash = await hashPassword(cleanNew);
      const updated: AdminCredentials = {
        username: credentials.username || "admin",
        passwordHash: newHash,
      };
      await onUpdateCredentials(updated);
      setInputPass("");
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
      setViewMode("login");
      onShowToast(`✅ ${t.auth.changeSuccess}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="auth-modal-content">
          {viewMode === "login" && (
            <>
              <div className="auth-head text-center">
                <div className="auth-lock-icon">🔐</div>
                <h2 className="auth-title">{t.auth.loginTitle}</h2>
              </div>

              <form onSubmit={handleLoginSubmit} className="auth-form" style={{ marginTop: 12 }} autoComplete="off">
                <div className="auth-field">
                  <label className="auth-label">{t.auth.userLabel}</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      required
                      maxLength={60}
                      autoComplete="username"
                      value={inputUser}
                      onChange={(e) => setInputUser(e.target.value)}
                      placeholder={t.auth.userPlaceholder}
                      dir="ltr"
                      className="auth-input-styled"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label className="auth-label">{t.auth.passLabel}</label>
                    <button
                      type="button"
                      className="pass-toggle-clean"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showHideLabel}
                    </button>
                  </div>
                  <div className="auth-input-wrapper">
                    <span className="input-icon">🔒</span>
                    <input
                      type={showPass ? "text" : "password"}
                      required
                      maxLength={128}
                      autoComplete="current-password"
                      value={inputPass}
                      onChange={(e) => setInputPass(e.target.value)}
                      placeholder={t.auth.passPlaceholder}
                      dir="ltr"
                      className="auth-input-styled"
                    />
                  </div>
                </div>

                <button
                  className="btn auth-submit-btn-luxury"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginTop: 8 }}
                >
                  {t.auth.loginBtn}
                </button>

                <div className="auth-footer-bar">
                  <span className="default-cred-tag">
                    🛡️ {t.auth.defaultHint}
                  </span>
                  <button
                    type="button"
                    className="auth-change-link-clean"
                    onClick={() => setViewMode("change")}
                  >
                    🔑 {t.auth.changePassTitle}
                  </button>
                </div>
              </form>
            </>
          )}

          {viewMode === "change" && (
            <>
              <div className="auth-head text-center">
                <div className="auth-lock-icon" style={{ background: "rgba(2, 132, 199, 0.15)" }}>🔑</div>
                <h2 className="auth-title">{t.auth.changePassTitle}</h2>
              </div>

              <form onSubmit={handleChangePassword} className="auth-form" style={{ marginTop: 12 }} autoComplete="off">
                <div className="auth-field">
                  <label className="auth-label">{t.auth.oldPassLabel}</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon">🔒</span>
                    <input
                      type="password"
                      required
                      maxLength={128}
                      autoComplete="current-password"
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      placeholder="••••••••"
                      dir="ltr"
                      className="auth-input-styled"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">{t.auth.newPassLabel}</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon">🔑</span>
                    <input
                      type="password"
                      required
                      minLength={6}
                      maxLength={128}
                      autoComplete="new-password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="••••••••"
                      dir="ltr"
                      className="auth-input-styled"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">{t.auth.confirmPassLabel}</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon">✓</span>
                    <input
                      type="password"
                      required
                      minLength={6}
                      maxLength={128}
                      autoComplete="new-password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="••••••••"
                      dir="ltr"
                      className="auth-input-styled"
                    />
                  </div>
                </div>

                <button
                  className="btn auth-submit-btn-luxury"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginTop: 8 }}
                >
                  {t.auth.changePassBtn}
                </button>

                <div className="text-center" style={{ marginTop: 12 }}>
                  <button
                    type="button"
                    className="auth-back-link"
                    onClick={() => setViewMode("login")}
                  >
                    {t.auth.backToLogin}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
