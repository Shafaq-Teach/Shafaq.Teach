import { useState, useRef, useEffect } from "react";
import { type Lang } from "../i18n";
import { askShafaqAi, type AiResponse } from "../data/aiKnowledgeBase";

interface AiAssistantModalProps {
  lang: Lang;
  whatsappNumber: string;
  onOpenEstimator: () => void;
  onOpenContact: () => void;
  onOpenWork: () => void;
}

interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  suggestedAction?: "contact" | "estimator" | "work" | "whatsapp";
  time: string;
}

const quickPrompts: Record<Lang, string[]> = {
  ug: [
    "⏱️ تۈر پۈتۈش ۋاقتى قانچىلىك؟",
    "💰 تۈر باھاسى قانداق ھېسابلىنىدۇ؟",
    "🍽️ ئاشخانا POS سىستېمىسى نېمىلەرنى قىلالايدۇ؟",
    "🛡️ تېخنىكىلىق كاپالەت ۋە قوللاش بارمۇ؟",
    "🌍 چەتئەل ياكى باشقا شەھەردىن ھەمكارلاشساق بولامدۇ؟",
  ],
  tr: [
    "⏱️ Proje teslim süresi ne kadar?",
    "💰 Fiyatlandırma ve ödeme nasıl?",
    "🍽️ Restoran POS sistemi neleri kapsar?",
    "🛡️ Teknik destek ve garanti var mı?",
    "🌍 Uzaktan veya yurtdışından çalışabilir miyiz?",
  ],
  en: [
    "⏱️ How long does a project typically take?",
    "💰 How is pricing and payment structured?",
    "🍽️ What features are included in Kitchen POS?",
    "🛡️ Do you provide warranty and support?",
    "🌍 Can we collaborate remotely from abroad?",
  ],
  ar: [
    "⏱️ كم يستغرق تسليم المشروع عادةً؟",
    "💰 كيف يتم تحديد الأسعار وخطة الدفع؟",
    "🍽️ ما هي ميزات نظام نقاط بيع المطاعم؟",
    "🛡️ هل يتوفر دعم فني وضمان بعد التسليم؟",
    "🌍 هل يمكننا التعاون عن بُعد من دولة أخرى؟",
  ],
};

const aiLabels: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    online: string;
    welcome: string;
    btnEstimator: string;
    btnContact: string;
    btnWork: string;
    btnWhatsapp: string;
    floatingBadge: string;
  }
> = {
  ug: {
    title: "شەپەق AI ئەقلىي مەسلىھەتچى",
    subtitle: "تۈر، باھا، ۋاقىت ۋە سىستېمىلار ھەققىدە سوراڭ",
    placeholder: "سوئالىڭىزنى بۇ يەرگە يېزىڭ (مەسىلەن: تۈر باھاسى قانچىلىك)...",
    send: "ئەۋەتىش",
    online: "نەق مەيداندا ئاكتىپ",
    welcome:
      "ياخشىمۇسىز! مەن **شەپەق تېخنىكا سۈنئىي ئىدراك مەسلىھەتچىسى** 🤖. تور بېكەت، يانفون ئەپ، ئاشخانا POS سىستېمىسى، ئىشخانا ئاپتوماتلاشتۇرۇش ۋە تۈر باھالىرى ھەققىدىكى ھەرقانداق سوئالىڭىزغا دەل ۋاقتىدا جاۋاب بېرەلەيمەن!",
    btnEstimator: "📊 ئەقلىي باھا ھېسابلىغۇچ",
    btnContact: "✉️ تۈر باشلاش",
    btnWork: "🖼️ ئەسەرلەرنى كۆرۈش",
    btnWhatsapp: "💬 WhatsApp تا سۆزلىشىش",
    floatingBadge: "AI مەسلىھەتچى",
  },
  tr: {
    title: "Şafak AI Akıllı Danışman",
    subtitle: "Proje, fiyat, teslim süresi ve sistemler hakkında sorun",
    placeholder: "Sorunuzu yazın (örn: Restoran POS sistemi kaç günde biter?)...",
    send: "Gönder",
    online: "Çevrimiçi",
    welcome:
      "Merhaba! Ben **Şafak Teknoloji Yapay Zeka Danışmanı** 🤖. Web siteleri, mobil uygulamalar, restoran POS sistemleri, ofis otomasyonu ve teslimat süreleri hakkında tüm sorularınıza anında yanıt verebilirim!",
    btnEstimator: "📊 Akıllı Hesaplayıcı",
    btnContact: "✉️ Proje Başlat",
    btnWork: "🖼️ Projeleri Gör",
    btnWhatsapp: "💬 WhatsApp ile Yazış",
    floatingBadge: "AI Danışman",
  },
  en: {
    title: "Shafaq AI Smart Assistant",
    subtitle: "Ask about projects, pricing, timeline, and systems",
    placeholder: "Type your question here (e.g. How much is website + POS?)...",
    send: "Send",
    online: "Online",
    welcome:
      "Hello! I am the **Shafaq Tech AI Assistant** 🤖. Ask me anything regarding project turnaround, pricing, kitchen POS systems, websites, apps, and support guarantees!",
    btnEstimator: "📊 Project Estimator",
    btnContact: "✉️ Start a Project",
    btnWork: "🖼️ View Works",
    btnWhatsapp: "💬 Chat on WhatsApp",
    floatingBadge: "AI Assistant",
  },
  ar: {
    title: "مستشار شفق الذكي (AI)",
    subtitle: "اسأل عن المشاريع، الأسعار، مدد التسليم والأنظمة",
    placeholder: "اكتب سؤالك هنا (مثال: كم يستغرق نظام المطاعم؟)...",
    send: "إرسال",
    online: "متصل الآن",
    welcome:
      "مرحباً بك! أنا **المستشار الذكي لمنصة شفق للتقنية** 🤖. يسعدني الإجابة الفورية على جميع استفساراتك المتعلقة بالأسعار، مدد التنفيذ، أنظمة نقاط بيع المطاعم، المواقع والتطبيقات!",
    btnEstimator: "📊 حاسبة المشاريع",
    btnContact: "✉️ بدء مشروع",
    btnWork: "🖼️ استعراض الأعمال",
    btnWhatsapp: "💬 تواصل عبر واتساب",
    floatingBadge: "المستشار الذكي",
  },
};

export default function AiAssistantModal({
  lang,
  whatsappNumber,
  onOpenEstimator,
  onOpenContact,
  onOpenWork,
}: AiAssistantModalProps) {
  const lbl = aiLabels[lang] || aiLabels.ug;
  const prompts = quickPrompts[lang] || quickPrompts.ug;

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "m-welcome",
      sender: "ai",
      text: lbl.welcome,
      suggestedAction: "estimator",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Sync welcome message if language changes
  useEffect(() => {
    setMessages([
      {
        id: "m-welcome-" + lang,
        sender: "ai",
        text: lbl.welcome,
        suggestedAction: "estimator",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, [lang]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // AI Processing
    setTimeout(() => {
      const resp: AiResponse = askShafaqAi(query, lang);
      const aiMsg: ChatMessage = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: resp.text,
        suggestedAction: resp.suggestedAction,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action?: "contact" | "estimator" | "work" | "whatsapp") => {
    if (!action) return;
    if (action === "whatsapp") {
      const cleanNum = (whatsappNumber || "8613000000000").replace(/[^0-9]/g, "");
      window.open(`https://wa.me/${cleanNum}?text=Hello%20Shafaq%20Tech`, "_blank");
    } else if (action === "estimator") {
      setIsOpen(false);
      onOpenEstimator();
    } else if (action === "contact") {
      setIsOpen(false);
      onOpenContact();
    } else if (action === "work") {
      setIsOpen(false);
      onOpenWork();
    }
  };

  return (
    <>
      {/* =========================================================================
          FLOATING AI ROBOT LAUNCHER BUTTON
         ========================================================================= */}
      <button
        type="button"
        className="floating-ai-launcher"
        onClick={() => setIsOpen(!isOpen)}
        title={lbl.title}
      >
        <span className="ai-launcher-pulse" />
        <span className="ai-launcher-icon">🤖</span>
        <span className="ai-launcher-badge">{lbl.floatingBadge}</span>
      </button>

      {/* =========================================================================
          INTERACTIVE AI CHAT WINDOW
         ========================================================================= */}
      {isOpen && (
        <div className="ai-chat-window-backdrop" onClick={() => setIsOpen(false)}>
          <div
            className="ai-chat-card"
            onClick={(e) => e.stopPropagation()}
            dir={lang === "en" || lang === "tr" ? "ltr" : "rtl"}
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-header-info">
                <div className="ai-avatar-badge">
                  <span>🤖</span>
                  <span className="ai-live-dot" />
                </div>
                <div>
                  <h3 className="ai-header-title">{lbl.title}</h3>
                  <div className="ai-header-status">
                    <span className="live-status-pill">● {lbl.online}</span>
                    <span>· Shafaq AI Core</span>
                  </div>
                </div>
              </div>

              <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="ai-prompts-bar">
              {prompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="ai-prompt-chip"
                  onClick={() => handleSendMessage(p)}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat Body Messages */}
            <div className="ai-chat-body">
              {messages.map((m) => (
                <div key={m.id} className={"ai-msg-row " + m.sender}>
                  {m.sender === "ai" && <div className="ai-bubble-avatar">🤖</div>}
                  <div className="ai-bubble-content">
                    <div className="ai-bubble-text" style={{ whiteSpace: "pre-line" }}>
                      {m.text}
                    </div>

                    {/* Action Suggestion Buttons */}
                    {m.suggestedAction && m.sender === "ai" && (
                      <div className="ai-action-pills">
                        {m.suggestedAction === "estimator" && (
                          <button
                            type="button"
                            className="ai-action-btn"
                            onClick={() => handleActionClick("estimator")}
                          >
                            {lbl.btnEstimator} ➔
                          </button>
                        )}
                        {m.suggestedAction === "work" && (
                          <button
                            type="button"
                            className="ai-action-btn"
                            onClick={() => handleActionClick("work")}
                          >
                            {lbl.btnWork} ➔
                          </button>
                        )}
                        {m.suggestedAction === "contact" && (
                          <button
                            type="button"
                            className="ai-action-btn"
                            onClick={() => handleActionClick("contact")}
                          >
                            {lbl.btnContact} ➔
                          </button>
                        )}
                        <button
                          type="button"
                          className="ai-action-btn wa-action"
                          onClick={() => handleActionClick("whatsapp")}
                        >
                          {lbl.btnWhatsapp}
                        </button>
                      </div>
                    )}

                    <span className="ai-msg-time">{m.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="ai-msg-row ai">
                  <div className="ai-bubble-avatar">🤖</div>
                  <div className="ai-typing-indicator">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="ai-chat-input-bar"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={lbl.placeholder}
                className="ai-chat-input"
              />
              <button
                type="submit"
                className="btn ai-chat-send-btn"
                disabled={!inputText.trim()}
              >
                {lbl.send} ➔
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
