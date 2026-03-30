// ============================================================
// src/data/content.js — Single source of truth for Web4You
// ============================================================

// ── Brand ────────────────────────────────────────────────────
export const brand = {
  name: "Web4You",
  tagline: "בונים אתרים שמביאים לקוחות, לא רק נראים טובים",
  copyright: "© 2026 Web4You. כל הזכויות שמורות.",
};

// ── Contact ──────────────────────────────────────────────────
export const contact = {
  phone: "050-9237173",
  phoneHref: "tel:+972509237173",
  phone2: "054-3210990",
  phone2Href: "tel:+972543210990",
  email: "Web4you2026@gmail.com",
  emailHref: "mailto:Web4you2026@gmail.com",
  email2: "Web4you2026@gmail.com",
  email2Href: "mailto:Web4you2026@gmail.com",
  whatsapp: {
    number: "972509237173",
    defaultMessage: "היי, אני רוצה לבנות אתר שמביא לקוחות אשמח לפרטים נוספים!",
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
    { value: "10+", label: "אתרים שבנינו", color: "teal" },
    { value: "100%", label: "לקוחות מרוצים", color: "blue" },
    { value: "24/7", label: "תמיכה דיגיטלית", color: "teal" },
  ],
};

// ── Benefits ─────────────────────────────────────────────────
export const benefits = {
  sectionTitle: "למה אנחנו ?",
  sectionSubtitle:
    "אנחנו לא רק בונים אתרים יפים, אנחנו בונים כלים שמביאים לך עסקים",
  items: [
    {
      id: "price",
      icon: "DollarSign",
      color: "emerald",
      title: "מחיר",
      description: "איכות פרימיום בחצי מחיר מהשוק   בלי  הפתעות ובלי עלויות נסתרות",
    },
    {
      id: "speed",
      icon: "Zap",
      color: "orange",
      title: "מהירות בנייה",
      description: " מפתחים אתרים במהירות שיא  תוך 5 ימי עסקים בלבד",
    },
    {
      id: "custom",
      icon: "Paintbrush",
      color: "blue",
      title: "התאמה אישית",
      description: "כל אתר מעוצב בדיוק לפי הדרישות וזהות העסק שלך",
    },
    {
      id: "integration",
      icon: "Globe",
      color: "violet",
      title: "אינטגרציה מלאה",
      description: "וואטסאפ, טלפון, מיילים וטפסים  הכל בשביל להביא לקוחות ולידים",
    },

  ],
};

// ── Process ──────────────────────────────────────────────────
export const process = {
  sectionTitle: "תהליך העבודה",
  steps: [
    {
      number: 1,
      color: "blue",
      title: "השארת פרטים",
      description: "נבין לעומק את הצרכים של העסק שלך ונבנה תוכנית עבודה",
    },
    {
      number: 2,
      color: "grey",
      title: "בנייה ופיתוח",
      description: "אנחנו בונים לך אתר מקצועי ואיכותי תוך 5 ימי עסקים בלבד",
    },
    {
      number: 3,
      color: "rose",
      title: "פידבק ושינויים",
      description: "קבלת פידבק ותיקונים ממכם לשביעות רצון מלאה",
    },
    {
      number: 4,
      color: "amber",
      title: "עלייה לאוויר",
      description: "האתר שלכם חי ומוכן לעבודה ",
    },
  ],
};

// ── Portfolio ────────────────────────────────────────────────
export const portfolio = {
  sectionTitle: "עבודות שלנו",
  sectionSubtitle:
    " כל אחד מהם הוא סיפור הצלחה \n של עסק קטן שהפך לגדול ",
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
        "עיצוב יוקרתי ונקי לחברת אפיה מקצועית\n  עם דגש על חווית משתמש והגדלת המכירות.",
      image: "images/liel-edri-baking.png",
      url: "https://dolevatik.github.io/Liel-Edri-Baking/",
      tag: "קינוחי בוטיק",
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
        "קטלוג מוצרים מודרני של מטבח ביתי לצורך הגדלת המכירות ",
      image: "images/lital-kitchen.png",
      url: "https://dolevatik.github.io/LITAL-KITCHEN/",
      tag: "אוכל ביתי",
    },
    {
      id: "tomer-portfolio",
      title: "Tomer Portfolio",
      description:
        "פורטפוליו למפתח עם עיצוב חדשני וטכנלוגי\n לצורך הצגת פרויקטים אישיים והתבלטות בשוק העבודה",
      image: "images/tomerweb.jpeg",
      url: "https://tomernado.github.io/tomer-portfolio/",
      tag: "פורטפוליו",
    },
    {
      id: "or-levy",
      title: "Or Levy Finance",
      description:
        "אתר תדמית לאיש פיננסים עם עיצוב מודרני \n לצורך  הצגת שירותים והגדלת הלידים",
      image: "images/or-levy.png",
      url: "https://orlevy-finance.vercel.app/",
      tag: "פיננסים",
    },
    {
      id: "itay-izchaki",
      title: "איתי יצחקי - מנחה אירועים",
      description:
        "דף נחיתה למנחה אירועים עם עיצוב חדשני להצגת האירועים",
      image: "images/itay-izchaki.png",
      url: "https://tomernado.github.io/landing-page-Itay/",
      tag: "אירועים",
    },
    {
      id: "dl-baloons",
      title: "DL Baloons",
      description:
        "אתר מכירות בלונים יוקרתיים עם עיצוב נקי. \n יעיל בהגברת ההזמנות ויצירת קשר עם לקוחות",
      image: "images/dl-baloons.png",
      url: "https://dolevatik.github.io/DL-Baloons/",
      tag: "מכירות",
    },
    {
      id: "mentconnect",
      title: "MentConnect",
      description:
        "פלטפורמה מתקדמת לחיבור בין מנטורים בתעשייה\n ממשק ידידותי עם ניהול משתמשים ותקשורת יעילה",
      image: "images/mentconnect.png",
      url: "https://mentconnect.vercel.app/",
      tag: "פלטפורמה",
    },
    {
      id: "amit-hadbarot",
      title: "עמית הדברות",
      description:
        "דף נחיתה למדביר מקצועי עם עיצוב דינאמי \n לצורך הבאת לקוחות חדשים והצגת שירותים ",
      image: "images/amit-hadbarot.png",
      url: "https://tomernado.github.io/amit-hadbarot/",
      tag: "שירותים מקצועיים",
    },
  ],
};

// ── Contact Section ──────────────────────────────────────────
export const contactSection = {
  sectionTitle: "צור קשר",
  sectionSubtitle: "דברו עם הצוות שלנו ונחזור אליכם באותו היום !",
  channels: [
    {
      id: "contact-combined",
      icon: "MessageCircle",
      color: "teal",
      title: "ישירות אלינו",
      items: [
        { label: "", display: contact.phone, href: contact.whatsapp.href, external: true },
        { label: "", display: contact.phone2, href: `https://wa.me/972543210990?text=${encodeURIComponent(contact.whatsapp.defaultMessage)}`, external: true },
        { label: "", display: contact.email, href: contact.emailHref },
      ],
    },
  ],
};
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
