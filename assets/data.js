// All editable content for the portfolio. Dates are "YYYY-MM"; end:null means present.
window.HR = {
  email: "huzaifurrehman123@gmail.com",
  phone: "+92 324 8451679",
  whatsapp: "https://wa.me/923248451679?text=" + encodeURIComponent("Hi Huzaif, I came across your portfolio and would like to talk."),
  linkedin: "https://www.linkedin.com/in/huzaif-ur-rehman-633692287",

  roles: [
    { id:"independent", org:"Independent", role:"Demand Generation Consultant", kind:"Own practice", loc:"Lahore · clients in US, UK, Canada, Pakistan", start:null, end:null,
      line:"Demand generation for consultants and founders, run as one system.",
      points:[
        "Built a demand generation system where content, engagement, outreach and inbox run together, so buyers know a client before the first message.",
        "Run 10 client accounts across the US, UK, Canada and Pakistan, booking 3+ to 15+ meetings a month per account.",
        "12% reply rate and 1.5% meeting rate aggregated across accounts, against 10% and 1% industry averages.",
        "Designed five frameworks: the Authority Funnel, the Art of the Message, Warm Before Outreach, the Content Mix and Cold Outreach and Email Automation.",
        "Built the practice's website, including SEO and AI-search (GEO) setup."
      ],
      tools:["LinkedIn","Sales Navigator","Cold email","n8n","SEO","GEO"] },

    { id:"coral", org:"Coral Reef", role:"Operations Consultant", kind:"Research consultancy", loc:"Lahore", start:"2026-01", end:null,
      line:"Lead sourcing, bids and operations for a research consultancy.",
      points:[
        "Overhauled the Upwork profile and proposal documentation, lifting the win rate from about 8% to 19% within two months.",
        "Scraped and qualified leads for international research projects, and wrote proposals for bids.",
        "Audited documentation workflows across 4 departments, found record-retention gaps and restructured two core processes.",
        "Produced compliance frameworks, filing templates and proposal documentation for finance, healthcare and public-sector clients.",
        "Managed the firm's social profiles."
      ],
      tools:["Upwork","Lead scraping","Proposals","Social media"] },

    { id:"asaan", org:"Asaan AI", role:"Go-To-Market Associate", kind:"AI startup", loc:"Milwaukee, WI · remote", start:"2026-01", end:"2026-03",
      line:"GTM across legal, healthcare, edtech and fintech, automated end to end.",
      points:[
        "Defined buyer profiles, outreach sequences and niche-specific messaging for 4 verticals: legal, healthcare, edtech and fintech.",
        "Built outreach records and document templates in GoHighLevel and n8n.",
        "Automated data entry, CRM updates and follow-up sequences, removing manual record-keeping in regulated-industry client files.",
        "Managed SEO and GEO (visibility in AI search), and evaluated products against each vertical's needs."
      ],
      tools:["n8n","GoHighLevel","SEO","GEO","ICP design"] },

    { id:"powerhouse", org:"Powerhouse", role:"Business Development Associate", kind:"B2B sales", loc:"United States · remote", start:"2024-06", end:"2025-12",
      line:"Turned raw prospect data into a qualified, automated sales pipeline.",
      points:[
        "Sourced, scraped and enriched B2B leads with Apollo and Salesforce, turning raw prospect data into sales-ready opportunities.",
        "Identified ICPs and built qualification and segmentation workflows that improved lead quality and conversion efficiency by about 30%.",
        "Automated large parts of sourcing and CRM upkeep, and managed the pipeline for a multi-member sales team.",
        "Tracked follow-ups across the team, contributing to faster deal cycles and higher closing rates."
      ],
      tools:["Apollo","Salesforce","Lead enrichment","ICP design","CRM"] },

    { id:"yota", org:"Elevation AI Solutions", role:"LinkedIn Growth & Outreach", kind:"Client · AI consultant", loc:"United States", start:"2026-07", end:null,
      line:"Runs an AI consultant's LinkedIn presence, inbound and outbound.",
      points:[
        "Write, design and publish her posts, and comment and message prospects on her behalf.",
        "Run both inbound (content) and outbound (connection and DM sequences) on LinkedIn, US market only.",
        "Source ICPs with Sales Navigator across wealth management, mortgage, real estate and accounting firms.",
        "Automated email outreach for prospects who don't post on LinkedIn, and manage the assistant who handles daily outreach."
      ],
      tools:["LinkedIn","Sales Navigator","Cold email","Content design"] },

    { id:"maped", org:"MAPED_PK", role:"Social Media & Meta Ads", kind:"Client · education consultancy", loc:"Pakistan", start:"2025-07", end:"2025-12",
      line:"Content, social and paid ads for an education consultancy.",
      points:[
        "Created content and managed the firm's social profiles.",
        "Planned and ran Meta ad campaigns.",
        "Used AI to refine creatives and optimize the ad funnel."
      ],
      tools:["Meta Ads","Content","Social media","AI tools"] },

    { id:"tabir", org:"Tabir Academy", role:"Course Coordinator", kind:"Test prep", loc:"Lahore", start:"2024-08", end:"2024-11",
      line:"Used student data to sharpen SAT and LCAT preparation.",
      points:[
        "Collected and analyzed performance data from 100+ students to find learning gaps.",
        "Designed test-prep content aligned with exam standards and worked with educators to improve engagement."
      ],
      tools:["Data analysis","Content design"] }
  ],

  steps: [
    { k:"Spot the gap", ex:"At Coral Reef, an audit of 4 departments surfaced record-retention gaps, and two core processes were rebuilt.", role:"coral" },
    { k:"Define the buyer", ex:"At Asaan AI, I wrote buyer profiles and messaging for four very different verticals: legal, healthcare, edtech and fintech.", role:"asaan" },
    { k:"Build the system", ex:"At Powerhouse, structured qualification and segmentation lifted lead quality and conversion efficiency by about 30%.", role:"powerhouse" },
    { k:"Automate it", ex:"With n8n and GoHighLevel, data entry, CRM updates and follow-ups stopped being anyone's manual job.", role:"asaan" }
  ],

  tools: [
    { g:"Pipeline & data", items:[["Apollo",["powerhouse"]],["Salesforce",["powerhouse"]],["Lead scraping",["powerhouse","coral"]],["Lead enrichment",["powerhouse"]],["ICP design",["powerhouse","asaan","independent","yota"]],["CRM",["powerhouse","asaan"]]] },
    { g:"Automation", items:[["n8n",["asaan","independent"]],["GoHighLevel",["asaan"]],["Cold email",["independent","yota"]],["AI tools",["maped","independent"]]] },
    { g:"Marketing", items:[["LinkedIn",["independent","yota"]],["Sales Navigator",["yota","independent"]],["Meta Ads",["maped"]],["SEO",["asaan","independent"]],["GEO",["asaan","independent"]],["Content",["maped","yota","coral"]]] },
    { g:"Deals & docs", items:[["Proposals",["coral"]],["Upwork",["coral"]],["Sponsorships",["ldf"]],["Data analysis",["tabir"]]] }
  ]
};
