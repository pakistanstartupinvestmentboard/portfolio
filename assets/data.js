// All editable content for the portfolio. Dates are "YYYY-MM"; end:null means present.
window.HR = {
  email: "huzaifurrehman123@gmail.com",
  phone: "+92 324 8451679",
  whatsapp: "https://wa.me/923248451679?text=" + encodeURIComponent("Hi Huzaif, I came across your portfolio and would like to talk."),
  linkedin: "https://www.linkedin.com/in/huzaif-ur-rehman-633692287",

  roles: [
    { id:"coral", org:"Coral Reef", role:"Operations Consultant", where:"Lahore", start:"2026-01", end:null,
      line:"Lead sourcing, proposals and process work for a research consultancy.",
      points:[
        "Rebuilt the Upwork profile and proposal documentation. The proposal win rate went from about 8% to 16% over two months.",
        "Source and qualify leads for international research projects, and draft bid proposals and RFP responses.",
        "Audited documentation workflows across 4 departments, found record-retention gaps and restructured two core processes.",
        "Manage the firm's social profiles."
      ],
      tools:["Upwork","Lead sourcing","Proposals"] },

    { id:"yota", org:"Elevation AI Solutions", role:"LinkedIn Growth & Outreach", where:"Remote, for a client in Lakeland, US", start:"2026-07", end:null,
      line:"Inbound and outbound LinkedIn for Yota James, an AI consultant.",
      points:[
        "Run Yota James's LinkedIn end to end: I write and design her posts, comment in her niche and message prospects on her behalf.",
        "Outbound: source ICPs with Sales Navigator across wealth management, mortgage, real estate and accounting firms, warm them up, then reach out. This books 10+ qualified meetings a month.",
        "Inbound: three posts a week plus daily comments in her niche, so prospects recognize her name before the first message.",
        "Set up automated email outreach for prospects who aren't active on LinkedIn, and manage the assistant who handles daily sourcing and DMs."
      ],
      tools:["Sales Navigator","LinkedIn","Cold email","Content"] },

    { id:"asaan", org:"Asaan AI", role:"Go-To-Market Associate", where:"Milwaukee, WI (remote)", start:"2026-01", end:"2026-03",
      line:"Go-to-market for four regulated verticals, with the busywork automated.",
      points:[
        "Defined buyer profiles, outreach sequences and messaging for 4 verticals: legal, healthcare, edtech and fintech.",
        "Automated data entry, CRM updates and follow-up sequences in GoHighLevel and n8n, cutting manual record-keeping.",
        "Managed SEO and GEO (visibility in AI search), and evaluated product fit for each vertical."
      ],
      tools:["n8n","GoHighLevel","SEO","GEO"] },

    { id:"powerhouse", org:"Powerhouse", role:"Business Development Associate", where:"US-based (remote)", start:"2024-06", end:"2025-12",
      line:"Turned raw prospect data into a qualified sales pipeline.",
      points:[
        "Sourced and enriched B2B leads with Apollo and Salesforce, turning raw prospect data into sales-ready opportunities.",
        "Built ICP-based qualification and segmentation workflows that improved lead quality and conversion efficiency by about 30%.",
        "Managed the CRM pipeline and follow-ups for a multi-member sales team."
      ],
      tools:["Apollo","Salesforce","CRM"] },

    { id:"maped", org:"MAPED_PK", role:"Social Media & Meta Ads", where:"Lahore (freelance)", start:"2025-07", end:"2025-12",
      line:"Content, social profiles and Meta ads for an education consultancy.",
      points:[
        "Created content and managed the consultancy's social profiles.",
        "Planned and ran Meta ad campaigns, from first view to lead.",
        "Used AI tools to produce and test ad creatives, and to refine the funnel from first view to lead."
      ],
      tools:["Meta Ads","Content","AI tools"] }
  ],

  // How I work graphics. Example prospect (illustrative): Dana Miller, Lakeview Mortgage
  out: {
    to:"Dana Miller", title:"Operations Director, Lakeview Mortgage",
    generic:["Hi Dana, loved your recent post!"," We help mortgage companies grow with AI-powered solutions. Open to a quick call this week?"],
    parts:[
      { k:"Observed", src:"Careers page: third processor role posted since spring", t:"Dana, Lakeview is hiring two more loan processors, the third posting since spring." },
      { k:"Evidence", src:"Her LinkedIn post on closings slipping past 30 days", t:"Your post on closings slipping past 30 days points the same way." },
      { k:"Pain", src:"What the problem costs her, in her terms", t:"Every extra day on a file is a day a borrower can walk to a faster lender." },
      { k:"Ask", src:"Small, specific, easy to say yes to", t:"Worth 15 minutes to see where your document checks stall?" }
    ]
  },
  inbound: [
    { wk:"Week 1", side:"you", who:"You comment on her post", t:"“Most 30-day slips start at document checks, not underwriting. Worth timing each handoff for a week.”", fam:18 },
    { wk:"Week 1", side:"them", who:"She replies to your comment", t:"“We’ve never timed handoffs. Which one usually stalls?”", fam:36 },
    { wk:"Week 2", side:"sys", who:"She accepts your connection request", fam:52 },
    { wk:"Week 3", side:"sys", who:"She reads your post on document checks and views your profile", fam:72 },
    { wk:"Week 4", side:"them", who:"She messages first", t:"“Saw your post on document checks. Our closings keep slipping past 30 days and I think that’s where. How would you start measuring it?”", fam:100, tag:"A specific question, not a pitch" }
  ],
  ads: {
    offer:"Free 20-minute process audit",
    cards:[
      { ang:"Benefit", fmt:"Video",  hook:"Close files in days, not weeks.", r:.46 },
      { ang:"Purpose", fmt:"Video",  hook:"Built for teams that hate busywork.", r:.58 },
      { ang:"Pain",    fmt:"Video",  hook:"Still chasing documents by email?", r:1 },
      { ang:"Benefit", fmt:"Static", hook:"Get two weeks back every quarter.", r:.34 },
      { ang:"Purpose", fmt:"Static", hook:"Your team should sell, not sort paperwork.", r:.52 },
      { ang:"Pain",    fmt:"Static", hook:"Every slow file is a lost borrower.", r:.71 }
    ]
  },
  scoring: {
    co:"Lakeview Mortgage", meta:"Mortgage lender · 80 people · Ops Director", base:38,
    srcs:[
      { l:"Careers page", pre:"Loan Processor · ", hot:"2 openings", post:" · posted 3 days ago", w:16, sig:"Hiring to keep up with volume" },
      { l:"LinkedIn post", pre:"“Closings keep ", hot:"slipping past 30 days", post:". Proud of the team for pushing through.”", w:16, sig:"Says the problem out loud" },
      { l:"Website", pre:"Application form: download the PDF, ", hot:"print, sign and email it back", post:".", w:12, sig:"Manual process at the front door" }
    ]
  },

  // Toolkit: three engines feeding one hub
  engines: [
    { name:"Outbound", line:"Reach the right people first", ic:"send",
      in:"A list of buyers who fit, with the signals behind each one", run:"Researched messages on LinkedIn and email, timed and tracked automatically", out:"Replies and booked calls",
      tools:["Sales Navigator","Apollo","LinkedIn","Cold email"] },
    { name:"Paid", line:"Test fast, spend on what works", ic:"play",
      in:"One offer and a batch of AI-made variants", run:"Angles and formats tested on Meta; the budget moves to the winners every week", out:"Leads through an instant form or a WhatsApp chat",
      tools:["Meta Ads","AI creative tools","Instant forms","WhatsApp"] },
    { name:"Get found", line:"Be the answer they search for", ic:"globe",
      in:"The questions buyers already ask", run:"Pages that rank on Google, plus structured data and answer-style content that AI assistants can read and cite", out:"Buyers who arrive already looking",
      tools:["SEO","GEO","Structured data","llms.txt"], proof:"This site runs it too: structured data and an llms.txt file tell search engines and AI assistants exactly who it’s about." }
  ],
  hub: { name:"CRM + automation", steps:["Logged","Scored","Routed","Followed up"], tools:["Salesforce","GoHighLevel","n8n"],
    line:"Every lead lands in one place, gets scored, and the follow-ups run on their own." }
};
