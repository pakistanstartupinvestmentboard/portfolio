#!/usr/bin/env python3
"""Build index.html from src/index.html + assets/data.js.

- Fills contact links, icons, structured data and the site URL.
- Uses assets/photo.webp and assets/cover.webp when present.
- Pre-renders the experience cards so crawlers and AI tools can read them.
Run: python3 tools/build.py
"""
import json, subprocess, pathlib, html, re, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = "https://huzaifurrehman.vercel.app/"   # change when a custom domain is added
V = str(int(time.time()))[-6:]
e = html.escape

D = json.loads(subprocess.check_output(["node", "-e",
    "global.window={};global.encodeURIComponent=encodeURIComponent;require(process.argv[1]);console.log(JSON.stringify(window.HR))",
    str(ROOT / "assets/data.js")]))

WA_PATH = (ROOT / "tools/wa_path.txt").read_text().strip()
LI_PATH = "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
icon = lambda p: f'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="{p}"/></svg>'

photo = (ROOT / "assets/photo.webp").exists()
cover = (ROOT / "assets/cover.webp").exists()
avatar = '<img src="assets/photo.webp" width="168" height="168" alt="Huzaif ur Rehman">' if photo else "HR"
mini = '<span class="mini"><img src="assets/photo.webp" width="34" height="34" alt=""></span>' if photo else '<span class="mini">HR</span>'
cov = ('<img class="bg" src="assets/cover.webp" alt="" fetchpriority="high">' if cover else '') + '<div class="grid"></div><div class="pulse"></div>'

def initials(s):
    w = re.sub(r"[^A-Za-z ]", "", s).split()
    return "".join(x[0] for x in w[:2]).upper()

def card(r):
    return (f'<button class="role" data-open="{r["id"]}"><div class="top"><div class="logo">{initials(r["org"])}</div></div>'
            f'<div><h4>{e(r["org"])}</h4><div class="r">{e(r["role"])}</div></div><p>{e(r["line"])}</p>'
            f'<span class="more">View details &rarr;</span></button>')

ld = {"@context": "https://schema.org", "@graph": [
  {"@type": "Person", "@id": URL + "#me", "name": "Huzaif ur Rehman", "url": URL,
   "jobTitle": "Marketing and go-to-market operator; demand generation consultant",
   "description": "Marketing, GTM and AI automation: lead generation, ICP design, outreach systems and automation with Apollo, Salesforce, n8n and LinkedIn.",
   "email": "mailto:" + D["email"], "telephone": D["phone"].replace(" ", ""),
   "address": {"@type": "PostalAddress", "addressLocality": "Lahore", "addressCountry": "PK"},
   "alumniOf": [{"@type": "CollegeOrUniversity", "name": "Lahore University of Management Sciences (LUMS)"},
                {"@type": "CollegeOrUniversity", "name": "Government College University, Lahore"}],
   "knowsAbout": ["Go-to-market strategy", "Demand generation", "Lead generation", "ICP definition", "Marketing automation",
                  "n8n", "Salesforce", "Apollo", "GoHighLevel", "Meta Ads", "SEO", "Generative engine optimization", "LinkedIn outreach"],
   "sameAs": [D["linkedin"]],
   **({"image": URL + "assets/photo.webp"} if photo else {})},
  {"@type": "ProfilePage", "@id": URL + "#page", "url": URL, "name": "Huzaif ur Rehman | Marketing, GTM and AI automation",
   "mainEntity": {"@id": URL + "#me"}}]}

s = (ROOT / "src/index.html").read_text()
rep = {"{{URL}}": URL, "{{V}}": V, "{{LD}}": '<script type="application/ld+json">' + json.dumps(ld, separators=(",", ":")) + "</script>",
       "{{MINI}}": mini, "{{AVATAR}}": avatar, "{{COVER}}": cov, "{{WA}}": e(D["whatsapp"]), "{{LI}}": D["linkedin"],
       "{{PHONE}}": D["phone"], "{{EMAIL}}": D["email"], "{{WAICON}}": icon(WA_PATH), "{{LIICON}}": icon(LI_PATH)}
for k, v in rep.items(): s = s.replace(k, v)
s = re.sub(r"<!--gen:roles-->.*?<!--/gen:roles-->", lambda m: "<!--gen:roles-->" + "".join(card(r) for r in D["roles"]) + "<!--/gen:roles-->", s, flags=re.S)
assert "{{" not in s, re.findall(r"\{\{\w+\}\}", s)
(ROOT / "index.html").write_text(s)
print("built index.html  photo:", photo, " cover:", cover)
