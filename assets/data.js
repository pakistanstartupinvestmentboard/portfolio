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

  warm: [
    { name:"Cold", line:"They've never heard of you.", sig:["No connection","Never seen your content"], note:"A message here reads as a pitch from a stranger. Most outreach starts here." },
    { name:"Familiar", line:"Your name has crossed their feed.", sig:["Saw your comments","Viewed your profile"], note:"Keep showing up with useful comments on their posts and on the people they follow." },
    { name:"Engaged", line:"They're reacting to you.", sig:["Liked a post","Replied to a comment","Accepted the connection"], note:"Watch for these signals. They tell you when to step in." },
    { name:"Warm", line:"They already know who you are.", sig:["Engages regularly","Shows a buying trigger"], note:"Send the first message now. It lands on a name they recognize." }
  ],
  seq: [
    { name:"Research-led opener", day:"Day 1", what:"A short message built on something specific they posted or did." },
    { name:"Value follow-up", day:"Day 4", what:"A useful idea or resource tied to their situation. Nothing asked for." },
    { name:"Pain point question", day:"Day 8", what:"One sharp question about the problem they're most likely facing." },
    { name:"Soft close", day:"Day 13", what:"A light invite to a short call that leaves the door open." }
  ],

  mix: [
    { name:"Demand signal", pct:40, color:"#c9a24a", job:"Names the problem", ex:"Most mortgage teams lose a full day per file to manual checks. Here's where it happens." },
    { name:"Authority", pct:35, color:"#e3e9e4", job:"Proves the expertise", ex:"The 3 questions to ask before automating any workflow, and why most teams skip the second." },
    { name:"Proof", pct:25, color:"#6f9c86", job:"Shows the result", ex:"What changed after a 20-person team moved approvals into the tools they already had." }
  ],
  funnel: [
    { name:"Visibility", what:"They see you for the first time.", how:"Research-led posts and comments where the buyers already spend time." },
    { name:"Recognition", what:"Your name starts to stick.", how:"Repeat appearances with a consistent point of view." },
    { name:"Trust", what:"They believe you can solve the problem.", how:"Authority and proof posts that show how you think." },
    { name:"Conversation", what:"They're open to talking.", how:"A warm, personal message about something they care about." },
    { name:"Booked call", what:"A qualified call on the calendar.", how:"Replies and scheduling handled, so the call is the only step left." }
  ],

  ads: [
    { name:"Reach", goal:"Get seen by the right people", aud:"Broad interest and lookalike audiences", cre:"Short videos that open on the problem in the first 3 seconds", kpi:"Cost per 1,000 views and 3-second view rate" },
    { name:"Engage", goal:"Build interest", aud:"People who watched or visited the profile", cre:"Stories, FAQs and answers to common doubts", kpi:"Click-through rate and cost per landing page view" },
    { name:"Convert", goal:"Turn interest into leads", aud:"Warm retargeting audiences only", cre:"One clear offer with an instant form or WhatsApp button", kpi:"Cost per lead and lead quality" },
    { name:"Improve", goal:"Find what works, every week", aud:"Whatever the data says is performing", cre:"AI-generated variants of the best hooks, 3 to 5 new ones tested each week", kpi:"Cost per lead trending down" }
  ],

  signals: [
    { label:"Job title matches the buyer", w:25 },
    { label:"Company size is in range", w:20 },
    { label:"Industry is on the focus list", w:15 },
    { label:"Recent trigger: new role, hiring or funding", w:20 },
    { label:"Has engaged with the content", w:20 }
  ],

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
