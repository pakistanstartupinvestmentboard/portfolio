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
        "Rebuilt the Upwork profile and proposal documentation. The proposal win rate went from about 8% to 19% over two months.",
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
        "Inbound: three posts a week built on the content mix in How I work, so prospects recognize her name before the first message.",
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
        "Planned and ran Meta ad campaigns using the ads funnel in How I work.",
        "Used AI tools to produce and test ad creatives, and to refine the funnel from first view to lead."
      ],
      tools:["Meta Ads","Content","AI tools"] }
  ],

  // How I work graphics (illustrative example lead: Dana Miller, Lakeview Mortgage)
  out: {
    to:"Dana Miller", title:"Operations Director, Lakeview Mortgage",
    parts:[
      { k:"Observed", src:"Careers page: third processor role posted since spring", t:"Dana, I noticed Lakeview is hiring two more loan processors, the third posting since spring." },
      { k:"Evidence", src:"Her LinkedIn post on closings slipping past 30 days", t:"Your post on closings slipping past 30 days points the same way." },
      { k:"Pain", src:"What the problem costs her, in her terms", t:"Every extra day on a file is a day a borrower can walk to a faster lender." },
      { k:"Ask", src:"Small, specific, easy to say yes to", t:"Worth 15 minutes to see where your document checks stall?" }
    ]
  },
  feed: [
    { ic:"c", who:"You commented on Dana's post", t:"\u201cThe 30-day slip usually starts at document checks, not underwriting. Time each handoff for a week and it shows.\u201d" },
    { ic:"l", who:"Engagement", t:"Dana and 2 others liked your comment" },
    { ic:"v", who:"Profile", t:"Dana Miller viewed your profile" },
    { ic:"m", who:"New message from Dana", t:"\u201cYour comment on document checks was spot on. Open to a quick call?\u201d", tag:"She reached out first" }
  ],
  rail: ["Find the right people","Add value in public","They notice","They reach out"],
  matrix: { rows:["Students","Parents","Professionals"], cols:["Benefit","Purpose","Pain"], win:[[0,1],[1,2],[2,0]] },
  score: {
    profile:[["Industry: mortgage",14],["Size: 80 people",12],["Title: Ops Director",12]],
    a:{ name:"Company A", pain:[["Hiring 2 more processors",16],["Posted about slow closings",16],["Paper forms on their site",12]], verdict:"Reach out now" },
    b:{ name:"Company B", pain:[["No relevant hiring",0],["No posts about delays",0],["Self-serve online portal",0]], verdict:"Nurture with content" }
  },

  stack: [
    { name:"Find", tools:["Apollo","Sales Navigator","Scraping"], does:"Build lists of the right companies and people.",
      add:[["Name","Dana Miller"],["Title","Operations Director"],["Company","Lakeview Mortgage"]] },
    { name:"Enrich", tools:["Apollo"], does:"Fill in contact details and the signals that matter.",
      add:[["Email","Verified"],["Team size","85"],["Signal","Hiring 2 loan officers"]] },
    { name:"Organize", tools:["Salesforce","GoHighLevel"], does:"Keep every lead, stage and follow-up in one place.",
      add:[["Stage","New lead"],["Score","80 of 100"]] },
    { name:"Automate", tools:["n8n"], does:"Move data between tools and trigger follow-ups without manual work.",
      add:[["Sequence","Started automatically"],["CRM","Updated on every reply"]] },
    { name:"Reach", tools:["LinkedIn","Cold email","Meta Ads"], does:"Start conversations where buyers already are.",
      add:[["Day 1","Comment on her post"],["Day 4","Connection and DM"],["Day 8","Email follow-up"]] },
    { name:"Get found", tools:["SEO","GEO"], does:"Show up when buyers search Google or ask an AI assistant.",
      add:[["Search","Finds the article on mortgage automation"],["Result","Replies and books a call"]] }
  ]
};
