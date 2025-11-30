export type Lang = "en" | "es";

type Messages = {
  title: string;
  subtitleLong: string;
  subtitleShort: string;
  discoverCtaLong: string;
  discoverCtaShort: string;
  insertCodeWarning: string;
  usedCodeWarning: string;
  codePlaceholder: string;
  codeNotFound: string;
  rulesTitle: string;
  rulesHeader: string;
  rulesList: string[];
  rulesUnderstand: string;
  confirmTitle: string;
  confirmBody: string;
  confirmCancel: string;
  confirmProceed: string;
  footer: string;
  resultTitle: string;
  giftIdeasTitle: string;
  copyLabel: string;
  copiedLabel: string;
  languageSetInfo: (lang: "en" | "es") => string;
  languageConfirmBody: (lang: "en" | "es") => string;
};

const en: Messages = {
  title: "SECRET SANTA",
  subtitleLong: "🎄 Insert here your secret code 🎄",
  subtitleShort: "🎄 Insert here your code 🎄",
  discoverCtaLong: "🎅 Discover your pair! 🎅",
  discoverCtaShort: "Discover your pair!",
  insertCodeWarning: "⚠️ Insert your secret code!",
  usedCodeWarning:
    "⚠️ this code has already been used. If this is a mistake, please contact banesita.",
  codeNotFound: "⚠️ code not found",
  codePlaceholder: "Your code...",
  rulesTitle: "🎉 Welcome to Secret Santa 2025! 🎉",
  rulesHeader: "Fairness rules",
  rulesList: [
    "Keep your pair strictly secret!",
    "The code is sent via email and can be used only once.",
    "Total gift value should be around $50 per person.",
    "If a single present costs less, combine multiple gifts to reach ~$50.",
    "The links are for reference, it doesn't mean it has to be exactly that."
  ],
  rulesUnderstand: "I understand",
  confirmTitle: "Attention!",
  confirmBody:
    "The code can be used only 1 time. Remember your pair! If you write it down, keep it somewhere safe from others!",
  confirmCancel: "Cancel",
  confirmProceed: "Proceed",
  footer: "⭐ Ho! Ho! Ho! Merry Christmas! ⭐",
  resultTitle: "Your pair is:",
  giftIdeasTitle: "Gift Ideas",
  copyLabel: "Copy",
  copiedLabel: "Copied!",
  languageSetInfo: (lang) =>
    lang === "es"
      ? "The site language will be set to Spanish."
      : "The site language will be set to English.",
  languageConfirmBody: (lang) =>
    lang === "es"
      ? "Are you sure? Site language will be set to Spanish."
      : "Are you sure? Site language will be set to English.",
};

const es: Messages = {
  title: "AMIGO SECRETO",
  subtitleLong: "🎄 Ingresa aquí tu código secreto 🎄",
  subtitleShort: "🎄 Ingresa tu código 🎄",
  discoverCtaLong: "🎅 ¡Descubre tu pareja! 🎅",
  discoverCtaShort: "Descubre tu pareja",
  insertCodeWarning: "⚠️ ¡Ingresa tu código secreto!",
  usedCodeWarning:
    "⚠️ este código ya ha sido usado. Si es un error, por favor contacta a banesita.",
  codeNotFound: "⚠️ código no encontrado",
  codePlaceholder: "Tu código...",
  rulesTitle: "🎉 ¡Bienvenido a Amigo Secreto 2025! 🎉",
  rulesHeader: "Reglas de equidad",
  rulesList: [
    "¡Mantén tu pareja estrictamente en secreto!",
    "El código se envía por correo y solo se puede usar una vez.",
    "El valor total del regalo debe ser alrededor de $50 por persona.",
    "Si un regalo cuesta menos, combina varios para llegar a ~$50.",
    "Los links son de riferimento, no quiere decir que tenga que ser eso mismo."
  ],
  rulesUnderstand: "Entiendo",
  confirmTitle: "¡Atención!",
  confirmBody:
    "El código solo se puede usar una vez. ¡Recuerda tu pareja! Si lo escribes, guárdalo en un lugar seguro.",
  confirmCancel: "Cancelar",
  confirmProceed: "Continuar",
  footer: "⭐ ¡Ho! ¡Ho! ¡Ho! ¡Feliz Navidad! ⭐",
  resultTitle: "Tu pareja es:",
  giftIdeasTitle: "Ideas de regalo",
  copyLabel: "Copiar",
  copiedLabel: "¡Copiado!",
  languageSetInfo: (lang) =>
    lang === "es"
      ? "El idioma del sitio se establecerá en Español."
      : "El idioma del sitio se establecerá en Inglés.",
  languageConfirmBody: (lang) =>
    lang === "es"
      ? "¿Estás seguro? El idioma del sitio será Español."
      : "¿Estás seguro? El idioma del sitio será Inglés.",
};

export function getMessages(lang: Lang): Messages {
  return lang === "es" ? es : en;
}
