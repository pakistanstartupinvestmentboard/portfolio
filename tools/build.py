#!/usr/bin/env python3
"""Build index.html from src/index.html + assets/data.js.
Fills contact links, icons, structured data and the hero line art, and
pre-renders the experience cards so crawlers and AI tools can read them.
Run: python3 tools/build.py
"""
import json, subprocess, pathlib, html, re, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = "https://huzaifurrehman.vercel.app/"
V = str(int(time.time()))[-6:]
e = html.escape
D = json.loads(subprocess.check_output(["node", "-e",
    "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.HR))", str(ROOT / "assets/data.js")]))

WA_PATH = (ROOT / "tools/wa_path.txt").read_text().strip()
LI_PATH = "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
icon = lambda p: f'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="{p}"/></svg>'

# hero line art: lines that start spread out and converge on one point
paths = []
for k in range(15):
    y0 = 10 + k * 40
    gold = k == 7
    paths.append(f'<path d="M0 {y0} C 260 {y0}, 300 300, 560 300" stroke="{"#c9a24a" if gold else "#2b6f59"}" stroke-width="{1.6 if gold else 1}" fill="none"/>')
lines = ('<svg class="lines" viewBox="0 0 600 600" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">' + "".join(paths)
         + '<circle cx="560" cy="300" r="7" fill="#c9a24a"/></svg>')

MON = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()
def fmt(s):
    y, m = map(int, s.split("-")); return f"{MON[m-1]} {y}"
def card(r):
    rng = fmt(r["start"]) + " to " + (fmt(r["end"]) if r["end"] else "present")
    return (f'<button class="job" data-role="{r["id"]}"><span class="org">{e(r["org"])}</span><span class="r">{e(r["role"])}</span>'
            f'<span class="d">{rng}</span><p>{e(r["line"])}</p><span class="open">Read more</span></button>')

ld = {"@context": "https://schema.org", "@graph": [
  {"@type": "Person", "@id": URL + "#me", "name": "Huzaif ur Rehman", "url": URL, "image": URL + "assets/photo.webp",
   "jobTitle": "Marketing and go-to-market",
   "description": "Marketing, go-to-market and AI automation: outbound and inbound LinkedIn, Meta ads, lead scoring and pipeline automation.",
   "email": "mailto:" + D["email"], "telephone": D["phone"].replace(" ", ""),
   "address": {"@type": "PostalAddress", "addressLocality": "Lahore", "addressCountry": "PK"},
   "alumniOf": [{"@type": "CollegeOrUniversity", "name": "Lahore University of Management Sciences (LUMS)"},
                {"@type": "CollegeOrUniversity", "name": "Government College University, Lahore"}],
   "knowsAbout": ["Go-to-market strategy", "Demand generation", "Lead generation", "Lead scoring", "ICP definition", "Marketing automation",
                  "n8n", "Salesforce", "Apollo", "GoHighLevel", "LinkedIn Sales Navigator", "Meta Ads", "SEO", "Generative engine optimization"],
   "sameAs": [D["linkedin"]]},
  {"@type": "ProfilePage", "@id": URL + "#page", "url": URL, "name": "Huzaif ur Rehman | Marketing, go-to-market and AI automation",
   "mainEntity": {"@id": URL + "#me"}}]}

s = (ROOT / "src/index.html").read_text()
rep = {"{{URL}}": URL, "{{V}}": V, "{{LD}}": '<script type="application/ld+json">' + json.dumps(ld, separators=(",", ":")) + "</script>",
       "{{LINES}}": lines, "{{WA}}": e(D["whatsapp"]), "{{LI}}": D["linkedin"], "{{PHONE}}": D["phone"], "{{EMAIL}}": D["email"],
       "{{WAICON}}": icon(WA_PATH), "{{LIICON}}": icon(LI_PATH)}
for k, v in rep.items():
    s = s.replace(k, v)
s = re.sub(r"<!--gen:roles-->.*?<!--/gen:roles-->", lambda m: "<!--gen:roles-->" + "".join(card(r) for r in D["roles"]) + "<!--/gen:roles-->", s, flags=re.S)
assert "{{" not in s, re.findall(r"\{\{\w+\}\}", s)
(ROOT / "index.html").write_text(s)
print("built index.html")
