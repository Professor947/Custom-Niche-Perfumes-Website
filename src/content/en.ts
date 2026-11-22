/**
 * All user-facing copy (English).
 *
 * To add Urdu later: copy this file to `ur.ts`, translate the strings (keep the
 * keys and option `value`s identical), and switch the export in `index.ts`.
 * Components never hardcode text — they read from here.
 */
import { site } from "./site";

const brand = site.brandName;
const city = site.city;
const weeks = site.minLeadTimeWeeks;

export const en = {
  meta: {
    title: `${brand} — Bespoke perfume, created with you | ${city}, Pakistan`,
    description: `Create your own original perfume in ${city}. Custom perfume in Pakistan for your own perfume brand, wedding perfume favours and corporate perfume gifts — you choose the notes, bottle and packaging.`,
    keywords: [
      "custom perfume Pakistan",
      `bespoke perfume ${city}`,
      "wedding perfume favours",
      "corporate perfume gifts",
      "create your own perfume brand",
    ],
  },

  nav: {
    skipToContent: "Skip to content",
    links: [
      { href: "/#original", label: "Original" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#who-its-for", label: "Who it's for" },
      { href: "/#notes", label: "Notes" },
      { href: "/#faq", label: "FAQ" },
    ],
    cta: "Start your perfume",
    home: `${brand} home`,
  },

  whatsapp: {
    label: "Chat with us on WhatsApp",
    defaultMessage: `Hello ${brand}, I'd like to talk about creating a perfume.`,
  },

  hero: {
    eyebrow: `Perfume atelier · ${city}`,
    title: "Your perfume, created with you.",
    subtitle:
      "Choose the notes. Smell the drafts. Pick the bottle and the box. We compose an original fragrance around your story — one that has never existed before.",
    primaryCta: "Start your perfume",
    secondaryCta: "How it works",
  },

  original: {
    eyebrow: "Original, not a copy",
    title: "We compose. We don't reproduce.",
    intro:
      "Every fragrance we make is an original composition, built from your preferences and your story. We don't recreate existing perfumes, and we don't make clones, dupes or impressions. That is not a rule we follow reluctantly — it is the whole point of the work.",
    tableCaption: "How a bespoke composition differs from a replica",
    columnLabel: "",
    replicaHeading: "Replica / Clone / Impression",
    bespokeHeading: `Bespoke niche — ${brand}`,
    rows: [
      {
        label: "Starting point",
        replica: "An existing commercial scent",
        bespoke: "Your story, preferences and the notes you love",
      },
      {
        label: "Goal",
        replica: "Smell like something else",
        bespoke: "Smell like you",
      },
      {
        label: "Formula ownership",
        replica: "None, or shared with every other buyer",
        bespoke: "Developed for you, for your use",
      },
      {
        label: "Your involvement",
        replica: "None — you pick from a list",
        bespoke: "Notes, sample revisions, bottle and packaging",
      },
      {
        label: "Uniqueness",
        replica: "Mass-identical",
        bespoke: "One of one, or a small batch",
      },
      {
        label: "Brand potential",
        replica: "Can't be legitimately branded as your own",
        bespoke: "Can become your own perfume brand",
      },
    ],
    referenceNote:
      "If you share perfumes you've loved, we use them only to understand your taste — the notes, families and intensity you enjoy. Never as a formula to replicate.",
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "Five steps from idea to bottle.",
    leadTime: `Typical lead time: ${weeks}+ weeks from brief to delivery.`,
    steps: [
      {
        title: "Share your brief",
        body: "Tell us about yourself, the occasion and the scents you're drawn to. It takes about ten minutes.",
      },
      {
        title: "Consultation",
        body: "A relaxed call to talk through your brief, explore ideas and agree on a direction.",
      },
      {
        title: "Notes & development",
        body: "We compose first drafts and send you samples. You wear them, tell us what you feel, and we refine.",
      },
      {
        title: "Bottle & packaging",
        body: "Choose the bottle, the label or engraving, and the box it arrives in.",
      },
      {
        title: "Production & delivery",
        body: "We blend, fill and finish by hand, then deliver anywhere in Pakistan.",
      },
    ],
  },

  whoItsFor: {
    eyebrow: "Who it's for",
    title: "Made for a person, a moment, or a company.",
    cards: [
      {
        purpose: "individual",
        title: "Your own perfume brand",
        body: "For individuals launching a signature line. We develop an original scent with you that you can put your own name on.",
        cta: "Start a brand brief",
      },
      {
        purpose: "event",
        title: "Events",
        body: "Mehndi, baraat, walima, birthdays, anniversaries and proposals. A scent guests take home and remember the day by.",
        cta: "Start an event brief",
      },
      {
        purpose: "corporate",
        title: "Corporate",
        body: "Onboarding kits, company event gifts and client gifting. A fragrance that says something about who you are.",
        cta: "Start a corporate brief",
      },
    ],
  },

  notes: {
    eyebrow: "The notes",
    title: "How a perfume unfolds.",
    intro:
      "A perfume is built in layers that reveal themselves over time. You don't need to know any of this to start — but it helps to have the words.",
    pyramid: [
      {
        name: "Top notes",
        timing: "First 15 minutes",
        body: "The first impression. Bright, light, and quick to fade — often citrus, herbs or fresh spice.",
      },
      {
        name: "Heart notes",
        timing: "The next few hours",
        body: "The character of the perfume. Florals, spices and softer woods usually live here.",
      },
      {
        name: "Base notes",
        timing: "What lingers",
        body: "The depth that stays on skin and clothes. Oud, amber, musk, resins and woods.",
      },
    ],
    familiesTitle: "Fragrance families",
  },

  /** Families power both the home section and the form's note chips. */
  families: [
    { value: "citrus", name: "Citrus", body: "Bright and sparkling.", notes: ["Bergamot", "Lemon", "Orange blossom", "Grapefruit", "Mandarin"] },
    { value: "floral", name: "Floral", body: "Soft, romantic, full.", notes: ["Rose", "Jasmine", "Motia", "Tuberose", "Iris", "Gul-e-daudi"] },
    { value: "woody", name: "Woody", body: "Dry, warm, grounded.", notes: ["Sandalwood", "Cedar", "Vetiver", "Patchouli"] },
    { value: "oud", name: "Oud", body: "Deep, resinous, regal.", notes: ["Oud", "Smoked oud", "Rose oud"] },
    { value: "amber", name: "Amber", body: "Golden and enveloping.", notes: ["Amber", "Labdanum", "Benzoin", "Tonka"] },
    { value: "musk", name: "Musk", body: "Clean skin, soft warmth.", notes: ["White musk", "Skin musk", "Ambrette"] },
    { value: "spicy", name: "Spicy", body: "Warm or peppery heat.", notes: ["Saffron", "Cardamom", "Clove", "Pink pepper", "Cinnamon"] },
    { value: "gourmand", name: "Gourmand", body: "Edible and comforting.", notes: ["Vanilla", "Honey", "Coffee", "Caramel"] },
    { value: "aquatic", name: "Aquatic", body: "Fresh air and water.", notes: ["Sea salt", "Rain", "Marine accord"] },
    { value: "green", name: "Green", body: "Leaves, stems, crushed herbs.", notes: ["Fig leaf", "Galbanum", "Mint", "Basil", "Green tea"] },
    { value: "leather", name: "Leather", body: "Smooth or smoky suede.", notes: ["Suede", "Leather", "Birch tar"] },
    { value: "incense", name: "Incense", body: "Smoke, temple, quiet.", notes: ["Frankincense", "Myrrh", "Oudh bakhoor"] },
  ],

  bottles: {
    eyebrow: "Bottles & packaging",
    title: "The vessel is part of the story.",
    intro:
      "Once the scent is right, you choose how it's held and how it's given. These are placeholders — our real range will be shown here.",
    placeholderBadge: "Placeholder image",
    items: [
      { src: "/placeholders/bottle-classic.svg", title: "Bottle styles", body: "Classic, sculpted, heavy-base and travel designs." },
      { src: "/placeholders/bottle-sizes.svg", title: "Sizes", body: "From 10 ml discovery vials to 100 ml signature bottles." },
      { src: "/placeholders/engraving.svg", title: "Engraving & labels", body: "Your name, a date, or your brand's own label." },
      { src: "/placeholders/gift-box.svg", title: "Gift boxes", body: "Rigid boxes, fabric wraps and favour boxes for events." },
      { src: "/placeholders/cards.svg", title: "Personalised cards", body: "A note from you, printed and tucked inside." },
      { src: "/placeholders/sets.svg", title: "Sets & kits", body: "Corporate kits and wedding favour sets." },
    ],
  },

  faq: {
    eyebrow: "Questions",
    title: "Frequently asked.",
    items: [
      {
        q: "Do you make copies or dupes of existing perfumes?",
        a: "No. Every perfume we make is an original composition created with you. We don't make replicas, clones, dupes or impressions of any existing fragrance. Our work is to create something that is yours, not a version of someone else's.",
      },
      {
        q: "Can I bring a perfume I like as a reference?",
        a: "Yes, please do. It's one of the best ways to tell us what you enjoy. We use references to understand your taste — the families, notes and intensity you're drawn to — never as a formula to recreate.",
      },
      {
        q: "How long does it take?",
        a: `Typically ${weeks} weeks or more from brief to delivery. Development depends on how many sample rounds you'd like, and bottles and packaging can add time for larger orders. If you have a fixed date, tell us in the brief and we'll plan around it.`,
      },
      {
        q: "What's the minimum order?",
        a:
          site.minOrderQty > 0
            ? `Our minimum order is ${site.minOrderQty} bottles. For personal signature scents we're happy to talk through what's possible.`
            : "There's no fixed minimum. A single signature bottle is welcome, and so is an order for a few hundred wedding guests. Quantity shapes pricing and timeline, which we discuss in the consultation.",
      },
      {
        q: "Can I own the formula or sell it under my own brand?",
        a: "Yes. If you're building a brand, we develop the fragrance for you and agree the ownership and production terms in writing before work begins, so you can sell it under your own name with confidence.",
      },
      {
        q: "Do you deliver across Pakistan?",
        a: `Yes. We're based in ${city} and deliver nationwide through trusted couriers. For local clients, collection from the atelier is also possible.`,
      },
      {
        q: "How does pricing work?",
        a: "Every project is different, so we quote after the consultation, once we understand the brief, quantities and packaging. There are no surprises — you'll have a clear written quote before development begins.",
      },
    ],
  },

  finalCta: {
    title: "Let's make something that smells like you.",
    body: "Start with a short brief. We'll read it carefully and invite you to a consultation.",
    cta: "Start your perfume",
    whatsapp: "Or message us on WhatsApp",
  },

  footer: {
    tagline: "Original perfumes, composed with you.",
    contactHeading: "Contact",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    instagramLabel: "Instagram",
    locationLabel: "Atelier",
    location: `${city}, ${site.country}`,
    rights: `© ${new Date().getFullYear()} ${brand}. All perfumes are original compositions.`,
  },

  form: {
    pageTitle: "Start your perfume",
    pageIntro:
      "A few questions to understand you and your perfume. Your answers are saved on this device as you go, so you can come back any time.",
    progress: (current: number, total: number) => `Step ${current} of ${total}`,
    back: "Back",
    next: "Continue",
    submit: "Send my brief",
    submitting: "Sending…",
    optional: "optional",
    stepTitles: [
      "About you",
      "Purpose",
      "Notes",
      "Quantity & packaging",
      "Timeline",
      "Contact",
      "Review",
    ],
    errorSummary: "Please check the highlighted fields.",

    step1: {
      title: "Tell us about yourself",
      fullName: "Full name",
      about: "A little about yourself",
      aboutPlaceholder:
        "What do you do? What draws you to fragrance? Is there a scent memory that stays with you?",
      aboutHint: (n: number) => `${n} / 600 characters (minimum 20)`,
      city: "City",
      heardFrom: "How did you hear about us?",
      heardFromPlaceholder: "Choose one",
      heardFromOptions: [
        { value: "instagram", label: "Instagram" },
        { value: "facebook", label: "Facebook" },
        { value: "referral", label: "Referral" },
        { value: "google", label: "Google" },
        { value: "event", label: "At an event" },
        { value: "other", label: "Other" },
      ],
    },

    step2: {
      title: "What is the perfume for?",
      purposeLegend: "Purpose",
      purposes: [
        { value: "individual", label: "Individual — creating a perfume brand", hint: "A signature scent to launch under your own name." },
        { value: "event", label: "Event", hint: "Weddings, birthdays, anniversaries, proposals." },
        { value: "corporate", label: "Corporate", hint: "Onboarding, event gifts, client gifting." },
      ],
      brandName: "Working brand name",
      audience: "Who is it for?",
      audiencePlaceholder: "Describe the people you imagine wearing it.",
      launchPlan: "Launch plan",
      launchPlanOptions: [
        { value: "personal", label: "Personal use first" },
        { value: "small", label: "A small launch" },
        { value: "retail", label: "Retail or online store" },
      ],
      eventType: "Event type",
      eventTypeOptions: [
        { value: "wedding-mehndi", label: "Wedding — Mehndi" },
        { value: "wedding-baraat", label: "Wedding — Baraat" },
        { value: "wedding-walima", label: "Wedding — Walima" },
        { value: "wedding-full", label: "Wedding — full wedding" },
        { value: "birthday", label: "Birthday" },
        { value: "anniversary", label: "Anniversary" },
        { value: "proposal", label: "Proposal" },
        { value: "other", label: "Other" },
      ],
      eventTypeOther: "Tell us about the event",
      eventDate: "Event date",
      guestCount: "Approx. number of guests / recipients",
      companyName: "Company name",
      corporateUse: "What is it for?",
      corporateUseOptions: [
        { value: "onboarding", label: "Employee onboarding" },
        { value: "event-gift", label: "Company event gift" },
        { value: "client-gifting", label: "Client gifting" },
        { value: "other", label: "Other" },
      ],
      corporateUseOther: "Tell us more",
      recipientCount: "Number of recipients",
      selectPlaceholder: "Choose one",
    },

    step3: {
      title: "Your taste in scent",
      intro: "Choose one path or both. There are no wrong answers.",
      knowsNotesToggle: "I know the notes I like",
      referencesToggle: "Perfumes I've enjoyed",
      pathRequired: "Pick some notes or tell us about a perfume you've enjoyed.",
      familiesLegend: "Notes you're drawn to",
      specificNotes: "Any specific notes?",
      specificNotesPlaceholder: "e.g. Taif rose, smoky oud, fresh motia",
      dislikedNotes: "Notes you dislike",
      dislikedNotesPlaceholder: "e.g. very sweet vanilla, strong patchouli",
      referencesHelper: "We use these to understand your taste, not to recreate them.",
      referenceName: "Perfume name",
      referenceLiked: "What did you like about it?",
      referenceLikedPlaceholder: "e.g. the warm, smoky dry-down; how long it lasted",
      addReference: "Add another perfume",
      removeReference: "Remove",
      referenceLabel: (n: number) => `Perfume ${n}`,
      intensity: "Intensity",
      intensityOptions: [
        { value: "light", label: "Light", hint: "Close to the skin" },
        { value: "moderate", label: "Moderate", hint: "Noticed nearby" },
        { value: "strong", label: "Strong", hint: "Fills the room" },
      ],
      wearTimes: "When will it be worn?",
      wearTimeOptions: [
        { value: "daily", label: "Daily" },
        { value: "evening", label: "Evening" },
        { value: "special", label: "Special occasions" },
        { value: "summer", label: "Summer" },
        { value: "winter", label: "Winter" },
      ],
      avoid: "Ingredients you want us to avoid",
      avoidPlaceholder: "Allergies, sensitivities, or anything you'd rather not wear",
    },

    step4: {
      title: "Quantity & packaging",
      bottlesLegend: "Bottles",
      size: "Bottle size",
      sizeOptions: [
        { value: "10", label: "10 ml" },
        { value: "30", label: "30 ml" },
        { value: "50", label: "50 ml" },
        { value: "100", label: "100 ml" },
        { value: "custom", label: "Custom" },
      ],
      customSize: "Custom size",
      customSizePlaceholder: "e.g. 5 ml vial, 200 ml",
      quantity: "Quantity",
      addRow: "Add another size",
      removeRow: "Remove",
      rowLabel: (n: number) => `Size ${n}`,
      total: (n: number) => `Total: ${n} ${n === 1 ? "bottle" : "bottles"}`,
      minOrder: (min: number) =>
        `Our minimum order is ${min} bottles. If you need fewer, mention it in the consultation — we'll see what's possible.`,
      packagingLegend: "Packaging you're interested in",
      packagingOptions: [
        { value: "custom-bottle", label: "Custom bottle" },
        { value: "engraving", label: "Engraving / custom label" },
        { value: "gift-box", label: "Gift box" },
        { value: "card", label: "Personalised card" },
        { value: "not-sure", label: "Not sure yet" },
      ],
    },

    step5: {
      title: "Timeline",
      requiredBy: "When do you need it by?",
      prefilledHint: "We've filled this in from your event date — change it if you need the perfume earlier.",
      flexibility: "How flexible is this date?",
      flexibilityOptions: [
        { value: "fixed", label: "Fixed" },
        { value: "1-week", label: "± 1 week" },
        { value: "flexible", label: "Flexible" },
      ],
      rushWarning: (w: number) =>
        `This is sooner than our usual ${w}-week lead time. We'll still try — but a rushed timeline may limit sample rounds, bottle and packaging options.`,
    },

    step6: {
      title: "How can we reach you?",
      email: "Email",
      phone: "Phone / WhatsApp",
      phoneHint: "03XXXXXXXXX or +923XXXXXXXXX",
      contactMethod: "Preferred contact method",
      contactMethodOptions: [
        { value: "whatsapp", label: "WhatsApp" },
        { value: "call", label: "Call" },
        { value: "email", label: "Email" },
      ],
      consent: `I'm happy for ${brand} to contact me about this brief.`,
    },

    step7: {
      title: "Review your brief",
      intro: "Check everything looks right. You can edit any section.",
      edit: "Edit",
      empty: "—",
      sections: {
        about: "About you",
        purpose: "Purpose",
        notes: "Notes",
        quantity: "Quantity & packaging",
        timeline: "Timeline",
        contact: "Contact",
      },
      labels: {
        notes: "Notes chosen",
        references: "Perfumes enjoyed",
      },
      submitError:
        "We couldn't send your brief just now. Your answers are safe on this device — please try again, or message us on WhatsApp.",
      retry: "Try again",
    },

    errors: {
      required: "This is required.",
      fullName: "Please enter your full name.",
      aboutMin: "Please write at least 20 characters.",
      aboutMax: "Please keep it under 600 characters.",
      purpose: "Please choose what the perfume is for.",
      email: "Please enter a valid email address.",
      phone: "Enter a Pakistani mobile number: 03XXXXXXXXX or +923XXXXXXXXX.",
      consent: "Please confirm we may contact you.",
      quantity: "Enter a whole number of 1 or more.",
      number: "Enter a whole number.",
      date: "Please choose a date.",
      pastDate: "Please choose a date in the future.",
      atLeastOne: "Choose at least one.",
      referenceLiked: "Tell us what you liked about it.",
      referenceName: "Add the perfume's name, or remove this entry.",
      tooLong: "That's a little long — please shorten it.",
    },

    success: {
      title: (name: string) => `Thank you, ${name}.`,
      body: "Your brief is with us, and a copy is on its way to your inbox. The next step is a consultation — choose a time that suits you below.",
      calendlyFallback: "Open the booking page in a new tab",
      whatsapp: "Prefer WhatsApp? Message us",
      backHome: "Back to home",
      calendlyTitle: "Book your consultation",
    },
  },

  email: {
    ownerSubject: (purpose: string, name: string, date: string) =>
      `New brief — ${purpose} — ${name} — needed by ${date}`,
    clientSubject: `We've received your brief — ${brand}`,
    clientGreeting: (name: string) => `Dear ${name},`,
    clientBody: [
      "Thank you for sharing your brief with us. We'll read it carefully before we speak.",
      "If you haven't yet, please book your consultation using the link below. If you'd rather talk on WhatsApp, simply reply or message us.",
    ],
    clientBook: "Book your consultation",
    clientSignoff: `Warmly,\n${brand}`,
  },
};

export type Content = typeof en;
