// ============================================================
// src/data/content.js — Single source of truth for Web4You
// ============================================================

// ── Brand ────────────────────────────────────────────────────
export const brand = {
  name: "Web4You",
  tagline: "בונים אתרים שמביאים לקוחות, לא רק נראים טובים",
  copyright: "© 2024 Web4You. כל הזכויות שמורות.",
};

// ── Contact ──────────────────────────────────────────────────
export const contact = {
  phone: "050-9237173",
  phoneHref: "tel:+972509237173",
  phone2: "054-3210990",
  phone2Href: "tel:+972543210990",
  email: "dolev5454@gmail.com",
  emailHref: "mailto:dolev5454@gmail.com",
  email2: "tomernado1233@gmail.com",
  email2Href: "mailto:tomernado1233@gmail.com",
  whatsapp: {
    number: "972509237173",
    defaultMessage: "היי, אני רוצה לבנות אתר שמביא לקוחות!",
    get href() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.defaultMessage)}`;
    },
  },
};

// ── Navigation ───────────────────────────────────────────────
export const navLinks = [
  { label: "יתרונות", href: "#benefits" },
  { label: "תהליך", href: "#process" },
  { label: "עבודות שלנו", href: "#portfolio" },
  { label: "יש שאלות?", href: "#contact" },
  {
    label: "השאר פרטים",
    href: "#contact-form",
    highlight: true,
    external: false,
  },
];

// ── Hero ─────────────────────────────────────────────────────
export const hero = {
  headline: "אנחנו בונים לך אתר שמביא לקוחות",
  headlineAccent: "– לא רק נראה טוב",
  subheadline: "פתרונות עיצוב ופיתוח מקצועיים שממירים מבקרים ללידים אמיתיים",
  ctaPrimary: {
    label: "בוא נתחיל",
    href: "#contact-form",
    external: false,
  },
  ctaSecondary: {
    label: "שלח הודעת וואטסאפ",
    href: contact.whatsapp.href,
    external: true,
  },
  stats: [
    { value: "50+", label: "אתרים שבנינו", color: "teal" },
    { value: "100%", label: "הנחנו למביא תוצאות", color: "blue" },
    { value: "24/7", label: "תמיכה דיגיטלית", color: "teal" },
  ],
};

// ── Benefits ─────────────────────────────────────────────────
export const benefits = {
  sectionTitle: "למה לבחור בנו?",
  sectionSubtitle:
    "אנחנו לא רק בונים אתרים יפים, אנחנו בונים כלים שמביאים לך עסקים",
  items: [
    {
      id: "speed",
      icon: "Zap",
      color: "teal",
      title: "מהירות בנייה",
      description: "אנחנו מפתחים אתרים מהירים שלא מחכים לשום דבר",
    },
    {
      id: "custom",
      icon: "Paintbrush",
      color: "blue",
      title: "התאמה אישית",
      description: "כל אתר מעוצב בדיוק לפי דרישותיך וזהות העסק שלך",
    },
    {
      id: "integration",
      icon: "Globe",
      color: "teal",
      title: "אינטגרציה מלאה",
      description: "וואטסאפ, טלפון, מיילים וטפסים - הכל בשביל להביא לקוחות",
    },
    {
      id: "conversion",
      icon: "BarChart3",
      color: "blue",
      title: "עיצוב שממיר",
      description: "עיצוב מבוסס נתונים שנוכחות אותו למקסימום ההמרות",
    },
  ],
};

// ── Process ──────────────────────────────────────────────────
export const process = {
  sectionTitle: "תהליך העבודה - פשוט וברור",
  steps: [
    {
      number: 1,
      color: "teal",
      title: "טופס אפיון",
      description: "אתה ממלא טופס פשוט ואנחנו מבינים בדיוק מה צריך",
    },
    {
      number: 2,
      color: "blue",
      title: "עיצוב ראשוני",
      description: "אנחנו יוצרים עיצוב ראשוני שתוכל לראות ולתת פידבק",
    },
    {
      number: 3,
      color: "teal",
      title: "בנייה ופיתוח",
      description: "אנחנו בונים את האתר בטכנולוגיות הטובות ביותר",
    },
    {
      number: 4,
      color: "blue",
      title: "עלייה לאוויר",
      description: "האתר שלך חי ועובד בעולם עם תיעוד מלא",
    },
  ],
};

// ── Portfolio ────────────────────────────────────────────────
export const portfolio = {
  sectionTitle: "עבודות שלנו",
  sectionSubtitle:
    "הנה כמה מהפרויקטים שבנינו. כל אחד מהם הוא סיפור הצלחה של עסק שגדל",
  cta: {
    placeholder: "וגם הפרויקט שלך יכול להיות כאן",
    label: "בואו נתחיל ←",
    href: "#contact-form",
    external: false,
  },
  items: [

    {
      id: "liel-edri-baking",
      title: "Liel Edri Baking",
      description:
        "עיצוב יוקרתי נקי לחברת אפיה מקצועית עם דגש על חווית משתמש והגדלת המכירות.",
      image: "images/liel-edri-baking.png",
      url: "https://dolevatik.github.io/Liel-Edri-Baking/",
      tag: "קייטרינג ואפיה",
    },
    {
      id: "after-taste",
      title: "After Taste | שף פרטי",
      description:
        "אתר תדמית לשף פרטי להצגת תפריטים ואירועים ",
      image: "images/after-taste.png",
      url: "https://tomernado.github.io/after-taste/",
      tag: "שף פרטי",
    },
    {
      id: "lital-kitchen",
      title: "LITAL KITCHEN",
      description:
        "קטלוג מוצרים מודרני למטבח ביתי עם עיצוב מנומק. חוויה קנייה חלקה המשפרת את חווית המשתמש והגדלת המכירות.",
      image: "images/lital-kitchen.png",
      url: "https://dolevatik.github.io/LITAL-KITCHEN/",
      tag: "מסחר אלקטרוני",
    },
    {
      id: "tomer-portfolio",
      title: "Tomer Portfolio",
      description:
        "תיקיית עבודות של מפתח עם טכנולוגיות עדכניות. משדרת מקצועיות וניסיון דרך אתרים יוקרתיים ומתקדמים.",
      image: "images/tomerweb.jpeg",
      url: "https://tomernado.github.io/tomer-portfolio/",
      tag: "פורטפוליו",
    },
    {
      id: "or-levy",
      title: "Or Levy Finance",
      description:
        "פתרון ניהול כספים מקצועי וממוכן. ממשק אינטואיטיבי עם דיזיין מודרני ומעטפת עסק בטוחה.",
      image: "images/or-levy.png",
      url: "https://orlevy-finance.vercel.app/",
      tag: "פיננסים",
    },
    {
      id: "itay-izchaki",
      title: "איתי יצחקי - מנחה אירועים",
      description:
        "הנחיית אירועים מקצועית, ייחודית ומרגשת שהופכת כל אירוע לחוויה בלתי נשכחת עם אנרגיות גבוהות והתאמה לקהל.",
      image: "images/itay-izchaki.png",
      url: "https://tomernado.github.io/landing-page-Itay/",
      tag: "אירועים",
    },
    {
      id: "dl-baloons",
      title: "DL Baloons",
      description:
        "אתר מכירות בלונים יוקרתיים עם עיצוב מודרני. מאוד יעיל בהגברת ההזמנות ויצירת קשר עם לקוחות.",
      image: "images/dl-baloons.png",
      url: "https://dolevatik.github.io/DL-Baloons/",
      tag: "מכירות",
    },
    {
      id: "mentconnect",
      title: "MentConnect",
      description:
        "פלטפורמה מתקדמת לחיבור בין מנטורים ומחפשים עצה. ממשק ידידותי ופונקציונליות חזקה לתקשורת יעילה.",
      image: "images/mentconnect.png",
      url: "https://mentconnect.vercel.app/",
      tag: "פלטפורמה",
    },
    {
      id: "amit-hadbarot",
      title: "עמית הדברות",
      description:
        "שירותי הדברה מקצועיים לתיקנים, מכרסמים, פרעושים ונמלים עם 15 שנות ניסיון והיתר מהמשרד להגנת הסביבה.",
      image: "images/amit-hadbarot.png",
      url: "https://tomernado.github.io/amit-hadbarot/",
      tag: "שירותים מקצועיים",
    },
  ],
};

// ── Contact Section ──────────────────────────────────────────
export const contactSection = {
  sectionTitle: "צור קשר",
  sectionSubtitle: "בואו נדבר ישירות - לא בטופס, בוואטסאפ, בטלפון או במיל",
  channels: [
    {
      id: "whatsapp",
      icon: "MessageCircle",
      color: "teal",
      title: "וואטסאפ",
      description: "תשובה מהירה (בדרך כלל בדקות)",
      items: [
        { label: "תומר", display: contact.phone2, href: `https://wa.me/972543210990?text=${encodeURIComponent(contact.whatsapp.defaultMessage)}`, external: true },
        { label: "דולב", display: contact.phone,  href: contact.whatsapp.href, external: true },
      ],
    },
    {
      id: "email",
      icon: "Mail",
      color: "blue",
      title: "דוא״ל",
      description: "לפרטים מפורטים יותר",
      items: [
        { label: "תומר", display: contact.email2, href: contact.email2Href },
        { label: "דולב", display: contact.email,  href: contact.emailHref },
      ],
    },
  ],
};

// ── Footer ───────────────────────────────────────────────────
export const footer = {
  tagline: brand.tagline,
  copyright: brand.copyright,
  builtWith: "בנוי עם ❤️ ו React + Tailwind CSS",
  quickLinks: [
    { label: "יתרונות", href: "#benefits" },
    { label: "עבודות", href: "#portfolio" },
    { label: "אפיון", href: "characterization.html", external: true },
  ],
  contactLinks: [
    { label: contact.phone, href: contact.phoneHref },
    { label: contact.phone2, href: contact.phone2Href },
    { label: contact.email, href: contact.emailHref },
    { label: contact.email2, href: contact.email2Href },
    { label: "Tomer Portfolio", href: "https://tomernado.github.io/tomer-portfolio/", external: true },
  ],
};
