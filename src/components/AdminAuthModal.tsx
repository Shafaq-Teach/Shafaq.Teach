import { useState } from "react";
import { copy, type Lang } from "../i18n";

export interface AdminCredentials {
  username: string;
  passwordHash: string;
}

interface AdminAuthModalProps {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onShowToast: (msg: string) => void;
  credentials: AdminCredentials;
  onUpdateCredentials: (creds: AdminCredentials) => void;
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

  // Login form state
  const [inputUser, setInputUser] = useState(credentials.username || "admin");
  const [inputPass, setInputPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Change Password form state
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = inputUser.trim();
    const cleanPass = inputPass.trim();

    // STRICT CHECK: ONLY match the real active credentials
    if (cleanUser === credentials.username && cleanPass === credentials.passwordHash) {
      localStorage.setItem("shafaq_admin_auth", "true");
      onShowToast(`✨ ${t.auth.loginSuccess}`);
      onSuccess();
    } else {
      onShowToast(`⚠️ ${t.auth.loginError}`);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOld = oldPass.trim();
    const cleanNew = newPass.trim();
    const cleanConfirm = confirmPass.trim();

    // STRICT CHECK against real active password
    if (cleanOld !== credentials.passwordHash) {
      onShowToast(`⚠️ ${t.auth.wrongOldPass}`);
      return;
    }
    if (cleanNew !== cleanConfirm) {
      onShowToast(`⚠️ ${t.auth.mismatchError}`);
      return;
    }
    if (!cleanNew) return;

    const updated: AdminCredentials = {
      username: credentials.username || "admin",
      passwordHash: cleanNew,
    };
    onUpdateCredentials(updated);
    setInputPass(cleanNew);
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
    setViewMode("login");
    onShowToast(`✅ ${t.auth.changeSuccess}`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="auth-modal-content">
          {/* =========================================================================
              VIEW 1: CLEAN USERNAME & PASSWORD LOGIN
             ========================================================================= */}
          {viewMode === "login" && (
            <>
              <div className="auth-head text-center">
                <div className="auth-lock-icon">🔐</div>
                <h2 className="auth-title">{t.auth.loginTitle}</h2>
              </div>

              <form onSubmit={handleLoginSubmit} className="auth-form" style={{ marginTop: 12 }}>
                <div className="auth-field">
                  <label className="auth-label">{t.auth.userLabel}</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      required
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
                      {showPass ? "🙈 يوشۇرۇش" : "👁️ كۆرسىتىش"}
                    </button>
                  </div>
                  <div className="auth-input-wrapper">
                    <span className="input-icon">🔒</span>
                    <input
                      type={showPass ? "text" : "password"}
                      required
                      value={inputPass}
                      onChange={(e) => setInputPass(e.target.value)}
                      placeholder={t.auth.passPlaceholder}
                      dir="ltr"
                      className="auth-input-styled"
                    />
                  </div>
                </div>

                <button className="btn auth-submit-btn-luxury" type="submit" style={{ marginTop: 8 }}>
                  {t.auth.loginBtn}
                </button>

                <div className="auth-footer-bar">
                  <span className="default-cred-tag">
                    💡 {lang === "tr" ? "Mevcut:" : "نۆۋەتتىكى:"} {credentials.username}
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

          {/* =========================================================================
              VIEW 2: CHANGE PASSWORD FORM
             ========================================================================= */}
          {viewMode === "change" && (
            <>
              <div className="auth-head text-center">
                <div className="auth-lock-icon" style={{ background: "rgba(2, 132, 199, 0.15)" }}>🔑</div>
                <h2 className="auth-title">{t.auth.changePassTitle}</h2>
              </div>

              <form onSubmit={handleChangePassword} className="auth-form" style={{ marginTop: 12 }}>
                <div className="auth-field">
                  <label className="auth-label">{t.auth.oldPassLabel}</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon">🔒</span>
                    <input
                      type="password"
                      required
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
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="••••••••"
                      dir="ltr"
                      className="auth-input-styled"
                    />
                  </div>
                </div>

                <button className="btn auth-submit-btn-luxury" type="submit" style={{ marginTop: 8 }}>
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
