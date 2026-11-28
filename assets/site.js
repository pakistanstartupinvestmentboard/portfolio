(function(){
const D=window.HR, $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const now=new Date(), NOWI=now.getFullYear()*12+now.getMonth();
const idx=s=>{const[y,m]=s.split('-').map(Number);return y*12+m-1;};
const fmt=i=>MON[i%12]+' '+Math.floor(i/12);
const dur=r=>{const m=(r.end?idx(r.end):NOWI)-idx(r.start)+1,y=Math.floor(m/12),mo=m%12;return[y?y+(y>1?' yrs':' yr'):'',mo?mo+(mo>1?' mos':' mo'):''].filter(Boolean).join(' ');};
const range=r=>fmt(idx(r.start))+' to '+(r.end?fmt(idx(r.end)):'present');
const press=(list,i,attr='aria-pressed')=>list.forEach((b,j)=>b.setAttribute(attr,j===i));

/* lead score: the visitor is the lead */
const SIG={seg:[10,'Told me who you are'],about:[8,'Read the brief'],experience:[8,'Looked at past campaigns'],role:[12,'Opened a role'],
  m0:[6,'Read: outbound'],m1:[6,'Read: inbound'],m2:[6,'Read: Meta ads'],m3:[6,'Read: lead scoring'],toolkit:[10,'Watched the stack'],achievements:[6,'Checked off-the-clock work'],contact:[10,'Reached the call to action']};
let LS=5;const got=new Set(),leadEl=$('#lead'),leadB=$('#leadB'),leadTip=$('#leadTip'),ring=$('#leadRing'),RC=2*Math.PI*16;ring.style.strokeDasharray=RC;
const stage=v=>v>=80?'Qualified':v>=55?'Warm':v>=30?'Warming up':'Cold';
function paintLead(){$('#leadV').textContent=LS;const st=stage(LS),sb=$('#leadS');if(sb.textContent!==st){sb.textContent=st;leadEl.classList.remove('pulse');void leadEl.offsetWidth;leadEl.classList.add('pulse');}
  ring.style.strokeDashoffset=RC*(1-LS/100);leadEl.dataset.st=st;
  $('#cScore').innerHTML=`Your lead score: <b>${LS}</b>. ${LS>=80?'Qualified. Let&rsquo;s talk.':LS>=55?'Warm enough. Let&rsquo;s talk.':'Still warming up, but you&rsquo;re welcome to skip ahead.'}`;}
function signal(k){if(got.has(k)||!SIG[k])return;got.add(k);LS=Math.min(100,LS+SIG[k][0]);
  const li=document.createElement('li');li.innerHTML=`<b>+${SIG[k][0]}</b> ${SIG[k][1]}`;$('#leadLog').prepend(li);paintLead();}
leadB.onclick=()=>{const o=leadTip.hidden;leadTip.hidden=!o;leadB.setAttribute('aria-expanded',o);};
addEventListener('scroll',()=>leadEl.classList.toggle('show',scrollY>innerHeight*.6),{passive:true});
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)signal(e.target.id);}),{threshold:.3});
['about','experience','achievements','contact'].forEach(id=>sio.observe(document.getElementById(id)));
new IntersectionObserver(es=>{leadEl.classList.toggle('away',es[0].isIntersecting);if(es[0].isIntersecting){leadTip.hidden=true;leadB.setAttribute('aria-expanded',false);}},{threshold:.25}).observe($('#contact'));
paintLead();

/* nav */
const nav=$('#nav'),burger=$('#burger');
const solid=()=>nav.classList.toggle('solid',scrollY>40&&!nav.classList.contains('open'));
addEventListener('scroll',solid,{passive:true});solid();
burger.onclick=()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o);solid();};
$$('#menu a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');burger.setAttribute('aria-expanded',false);solid();}));
const links=$$('#menu a');
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.hash==='#'+e.target.id));}),{rootMargin:'-45% 0px -50% 0px'});
links.forEach(l=>{const s=document.getElementById(l.hash.slice(1));if(s)spy.observe(s);});

/* experience rail + modal */
const card=r=>`<button class="job" data-role="${r.id}"><span class="org">${r.org}</span><span class="r">${r.role}</span><span class="d">${range(r)}, ${dur(r)}</span><p>${r.line}</p><span class="open">Read more</span></button>`;
const rail=$('#rail'),tr=$('#rail .track'),html=D.roles.map(card).join('');tr.innerHTML=html+html;
/* rail: auto-scroll, pause on hover, drag to browse */
let x=0,half=0,drag=null,hover=false,moved=0;const reduceM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const measure=()=>{half=tr.scrollWidth/2;};measure();addEventListener('resize',measure);
const wrapX=v=>{if(!half)return v;while(v<=-half)v+=half;while(v>0)v-=half;return v;};
let last=performance.now();
(function tick(t){const dt=Math.min(64,t-last);last=t;if(!drag&&!hover&&!rail.classList.contains('paused')&&!reduceM)x=wrapX(x-dt*0.045);tr.style.transform=`translate3d(${x}px,0,0)`;requestAnimationFrame(tick);})(last);
rail.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hover=true;});
rail.addEventListener('pointerleave',()=>{hover=false;});
rail.addEventListener('pointerdown',e=>{drag={sx:e.clientX,x0:x,id:e.pointerId};moved=0;});
addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.sx;moved=Math.max(moved,Math.abs(dx));if(moved>6){rail.classList.add('dragging');x=wrapX(drag.x0+dx);}});
addEventListener('pointerup',()=>{if(!drag)return;drag=null;setTimeout(()=>rail.classList.remove('dragging'),0);});
$$('.job',tr).slice(D.roles.length).forEach(b=>b.setAttribute('tabindex','-1'));
const modal=$('#modal'),mb=$('#mbody');let cur=0,lastFocus;
function openRole(i){signal('role');cur=(i+D.roles.length)%D.roles.length;const r=D.roles[cur];
  mb.innerHTML=`<h3>${r.org}</h3><div class="r">${r.role}</div><div class="d">${r.where}. ${range(r)}, ${dur(r)}.</div>
  <ul>${r.points.map(p=>`<li>${p}</li>`).join('')}</ul><div class="tags">${r.tools.map(t=>`<span>${t}</span>`).join('')}</div>
  <div class="pn"><button data-s="-1">Previous role</button><button data-s="1">Next role</button></div>`;
  if(!modal.classList.contains('open')){lastFocus=document.activeElement;modal.classList.add('open');rail.classList.add('paused');document.body.style.overflow='hidden';}
  $('.x',modal).focus();}
function close(){modal.classList.remove('open');rail.classList.remove('paused');document.body.style.overflow='';lastFocus&&lastFocus.focus();}
tr.addEventListener('click',e=>{if(moved>6)return;const b=e.target.closest('.job');if(b)openRole(D.roles.findIndex(r=>r.id===b.dataset.role));});
$$('.stat').forEach(s=>s.addEventListener('click',()=>openRole(D.roles.findIndex(r=>r.id===s.dataset.role))));
modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.x'))return close();const s=e.target.closest('[data-s]');if(s)openRole(cur+ +s.dataset.s);});
addEventListener('keydown',e=>{if(!modal.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')openRole(cur+1);if(e.key==='ArrowLeft')openRole(cur-1);});

/* how I work: pinned panels, one scroll gesture = one panel */
const how=$('#how'),pin=$('#pin'),pinIn=$('.pin-in'),panelsEl=$('.panels'),panels=$$('.mp'),stepB=$$('#steps button'),sbar=$('#sbar'),NP=panels.length;
let active=-1;const G={};
const pinned=()=>how.classList.contains('pinned');
const span=()=>pin.offsetHeight-innerHeight;
const pinTop=()=>pin.getBoundingClientRect().top+scrollY;
const stepY=i=>pinTop()+span()*i/(NP-1);
function activate(i){sbar.style.transform=`scaleX(${(i+1)/NP})`;if(i===active)return;active=i;panels.forEach((p,j)=>p.classList.toggle('on',j===i));stepB.forEach((b,j)=>b.classList.toggle('on',j===i));run(panels[i]);signal('m'+i);}
function run(p){p.classList.remove('run');void p.offsetWidth;p.classList.add('run');const f=G[p.id];f&&f();}
function pinScroll(){leadEl.classList.toggle('busy',pinned()&&innerWidth<=640&&inPin());if(!pinned())return;const pr=Math.min(1,Math.max(0,(scrollY-pinTop())/span()));activate(Math.round(pr*(NP-1)));}
/* fit: tighten text until the tallest panel fits the screen; if it never fits, stack instead */
function fits(){const cs=getComputedStyle(pinIn),avail=pinIn.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)-$('#steps').offsetHeight-14;return panelsEl.offsetHeight<=avail;}
function setMode(){const T=['tight1','tight2','tight3'];how.classList.remove(...T);how.classList.add('pinned');panels.forEach(p=>p.classList.add('on'));
  for(const t of T){if(fits())break;how.classList.add(t);}
  if(!fits()){how.classList.remove('pinned',...T);}
  else panels.forEach(p=>p.classList.remove('on'));
  active=-1;if(pinned())pinScroll();}
addEventListener('scroll',pinScroll,{passive:true});
let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(setMode,150);});
stepB.forEach((b,i)=>b.onclick=()=>scrollTo({top:stepY(i),behavior:'smooth'}));
/* inside the pin, a wheel or swipe moves exactly one panel; past either end, normal scrolling resumes */
const inPin=()=>{const t=pinTop();return scrollY>=t-6&&scrollY<=t+span()+6;};
let lock=false,quiet;
function go(dir){const t=active+dir;if(t<0||t>=NP)return false;lock=true;scrollTo({top:stepY(t),behavior:'instant'});activate(t);setTimeout(()=>{lock=false;},650);return true;}
addEventListener('wheel',e=>{if(!pinned()||!inPin()||Math.abs(e.deltaY)<4)return;const dir=e.deltaY>0?1:-1,t=active+dir;
  if(t<0||t>=NP)return;
  e.preventDefault();clearTimeout(quiet);quiet=setTimeout(()=>{lock=false;},220);if(!lock)go(dir);},{passive:false});
let ty0=null,stepped=false;
addEventListener('touchstart',e=>{ty0=e.touches[0].clientY;stepped=false;},{passive:true});
addEventListener('touchmove',e=>{if(ty0===null||!pinned()||!inPin())return;const dy=ty0-e.touches[0].clientY,dir=dy>0?1:-1,t=active+dir;
  if(t<0||t>=NP)return;e.preventDefault();if(!stepped&&Math.abs(dy)>36){stepped=true;go(dir);}},{passive:false});
addEventListener('touchend',()=>{ty0=null;if(pinned()&&inPin()&&!lock){const y=stepY(Math.max(0,active));if(Math.abs(scrollY-y)>2&&scrollY<pinTop()+span())scrollTo({top:y,behavior:'instant'});}},{passive:true});
addEventListener('keydown',e=>{if(!pinned()||!inPin()||e.target.closest('input,textarea'))return;const k={ArrowDown:1,PageDown:1,' ':1,ArrowUp:-1,PageUp:-1}[e.key];if(k&&go(k))e.preventDefault();});
/* stacked fallback: play each graphic as it scrolls into view */
const pio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!pinned()){pio.unobserve(e.target);run(e.target);signal('m'+e.target.dataset.i);}}),{threshold:.35});
panels.forEach(p=>pio.observe(p));

/* motion helpers: each graphic gets a token so replays cancel the old run */
const sleep=(ms,tk)=>new Promise((ok,no)=>setTimeout(()=>tk.dead?no(0):ok(),reduceM?0:ms));
async function typeIt(el,txt,tk,sp=17){if(reduceM){el.textContent=txt;return;}for(let i=1;i<=txt.length;i++){if(tk.dead)throw 0;el.textContent=txt.slice(0,i);await new Promise(r=>setTimeout(r,sp));}}
const tokens={};
function play(id,fn){if(tokens[id])tokens[id].dead=true;const tk=tokens[id]={dead:false};fn(tk).catch(()=>{});}
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* 1. outbound: generic message types, gets ignored, researched one types in with its sources */
(()=>{const o=D.out,g=$('#g-out');
  g.innerHTML=`<div class="msg"><div class="msg-h"><i class="av">DM</i><div><b>To: ${o.to}</b><span>${o.title}</span></div><span class="mode" id="oMode">Typical message</span></div>
  <p class="msg-b" id="oBody"></p><div class="stamp" id="oStamp">Ignored</div></div>
  <ol class="notes" id="oNotes">${o.parts.map((x,i)=>`<li data-k="${i}"><b>${x.k}</b><span>${x.src}</span></li>`).join('')}</ol>
  <div class="ometa"><span id="oMeta">Personalized: &mdash;</span><button class="replay" id="oReplay" aria-label="Replay the message">Replay</button></div>`;
  const body=$('#oBody',g),mode=$('#oMode',g),stamp=$('#oStamp',g),meta=$('#oMeta',g),lis=$$('#oNotes li',g);
  const add=cls=>{const sp=document.createElement('span');if(cls)sp.className=cls;body.insertBefore(sp,body.lastChild);return sp;};
  G['m-out']=()=>play('out',async tk=>{body.innerHTML='<i class="caret"></i>';body.classList.remove('gone');mode.textContent='Typical message';mode.classList.remove('good');stamp.classList.remove('on');lis.forEach(l=>l.classList.remove('on'));meta.textContent='Personalized: —';
    await sleep(500,tk);await typeIt(add('hl gen'),o.generic[0],tk);await typeIt(add(''),o.generic[1],tk);meta.textContent='Personalized: first line only';
    await sleep(500,tk);stamp.classList.add('on');await sleep(1400,tk);body.classList.add('gone');await sleep(450,tk);
    body.innerHTML='<i class="caret"></i>';body.classList.remove('gone');stamp.classList.remove('on');mode.textContent='Researched message';mode.classList.add('good');
    for(let i=0;i<o.parts.length;i++){lis[i].classList.add('on');await sleep(380,tk);await typeIt(add('hl k'+i),(i?' ':'')+o.parts[i].t,tk,15);meta.textContent=i<o.parts.length-1?`Personalized: ${i+1} of 4 sentences`:'Personalized: every sentence';}});
  $('#oReplay',g).onclick=G['m-out'];})();

/* 2. inbound: a few weeks of familiarity, ending in a specific question from her */
(()=>{const g=$('#g-in'),E=D.inbound;
  g.innerHTML=`<div class="fam"><div class="fh"><span>How well she knows you</span><b id="famL">Stranger</b></div><div class="fbar"><i id="famB"></i></div></div>
  <ol class="tl">${E.map(e=>`<li class="${e.side}"><span class="wk">${e.wk}</span><div class="ev"><small data-wk="${e.wk}">${e.who}</small>${e.t?`<p><span class="dots"><i></i><i></i><i></i></span><span class="tx">${e.t}</span></p>`:''}${e.tag?`<em>${e.tag}</em>`:''}</div></li>`).join('')}</ol>`;
  const lis=$$('.tl li',g),famB=$('#famB',g),famL=$('#famL',g),lab=v=>v>=100?'Asks you first':v>=60?'Trusted':v>=30?'Familiar':'Stranger';
  G['m-in']=()=>play('in',async tk=>{lis.forEach(l=>l.classList.remove('on','typing'));famB.style.width='4%';famL.textContent='Stranger';await sleep(400,tk);
    for(let i=0;i<E.length;i++){const l=lis[i];if(E[i].side==='them'){l.classList.add('on','typing');await sleep(850,tk);l.classList.remove('typing');}else l.classList.add('on');
      famB.style.width=E[i].fam+'%';famL.textContent=lab(E[i].fam);await sleep(900,tk);}});})();

/* 3. meta ads: one offer becomes six ads, results race, budget follows the winner */
(()=>{const A=D.ads,g=$('#g-ads'),win=A.cards.reduce((w,c,i)=>c.r>A.cards[w].r?i:w,0);
  g.innerHTML=`<div class="offer"><small>One offer</small><b>${A.offer}</b></div><div class="fan" aria-hidden="true"></div>
  <div class="ads6">${A.cards.map((c,i)=>`<div class="ad${i===win?' w':''}"><div class="adt"><span class="fmt">${c.fmt==='Video'?'&#9654;':'&#9634;'} ${c.fmt}</span><span class="ang">${c.ang}</span></div><p class="hook"></p><div class="res"><i style="--r:${c.r*100}%"></i></div></div>`).join('')}</div>
  <div class="budget"><div class="bh"><span>Budget</span><b id="adState">Waiting</b></div><div class="bbar">${A.cards.map((c,i)=>`<i class="${i===win?'w':''}"></i>`).join('')}</div></div>
  <p class="cap next" id="adNext">&#8635; Next round: new variants built on the winning hook.</p>`;
  const cards=$$('.ad',g),st=$('#adState',g);
  G['m-ads']=()=>play('ads',async tk=>{g.classList.remove('racing','done');cards.forEach(c=>{c.classList.remove('on');$('.hook',c).textContent='';});st.textContent='AI is writing variants';
    await sleep(300,tk);for(let i=0;i<cards.length;i++){cards[i].classList.add('on');await typeIt($('.hook',cards[i]),A.cards[i].hook,tk,11);}
    st.textContent='Testing: split evenly';await sleep(300,tk);g.classList.add('racing');await sleep(1900,tk);g.classList.add('done');st.textContent='Follows the winner';});})();

/* 4. lead scoring: tap the hidden signals; idle visitors get a demo */
(()=>{const S=D.scoring,g=$('#g-score');
  g.innerHTML=`<div class="scx"><div class="sco"><div class="co"><b>${S.co}</b><span>${S.meta}</span></div>
    <div class="gw"><svg class="gauge" viewBox="0 0 260 140" aria-hidden="true"><path class="bg" d="M20 130 A110 110 0 0 1 240 130"/><path class="fg" id="gFg" d="M20 130 A110 110 0 0 1 240 130"/></svg><div class="gnum" id="gNum">${S.base}</div><div class="gv" id="gV">Looks fine on paper</div></div></div>
    <div class="srcs"><p class="hint" id="sHint">Tap the glowing spots to find the signals.</p>${S.srcs.map((x,i)=>`<button class="src" data-i="${i}"><span class="sl">${x.l}</span><span class="st">${x.pre}<mark>${x.hot}</mark>${x.post}</span><span class="sig">+${x.w} ${x.sig}</span><span class="pd" aria-hidden="true"></span></button>`).join('')}</div></div>`;
  const fg=$('#gFg',g),L=fg.getTotalLength(),btn=$$('.src',g),num=$('#gNum',g),gv=$('#gV',g),hint=$('#sHint',g);fg.style.strokeDasharray=L;
  let v=S.base,auto,touched=false;
  const paint=()=>{num.textContent=v;fg.style.strokeDashoffset=L*(1-v/100);gv.textContent=v>=75?'Reach out now':v>=50?'Worth watching':'Looks fine on paper';g.classList.toggle('hot',v>=75);};
  const reveal=i=>{const b=btn[i];if(b.classList.contains('found'))return;b.classList.add('found');v+=S.srcs[i].w;paint();
    if(btn.every(x=>x.classList.contains('found')))hint.textContent='All three found. That’s the lead to call this week.';};
  btn.forEach((b,i)=>b.onclick=()=>{touched=true;clearTimeout(auto);reveal(i);});
  G['m-score']=()=>play('score',async tk=>{clearTimeout(auto);touched=false;v=S.base;btn.forEach(b=>b.classList.remove('found'));hint.textContent='Tap the glowing spots to find the signals.';paint();
    await sleep(3800,tk);for(let i=0;i<btn.length;i++){if(touched)return;reveal(i);await sleep(1000,tk);}});paint();})();
setMode();

/* toolkit: three engines, one hub */
const EIC={send:'<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/>',play:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'};
const engs=$('#engs'),wires=$$('#wires path'),hub=$('#hub'),edet=$('#edet');
engs.innerHTML=D.engines.map((e,i)=>`<button class="eng" data-i="${i}" aria-pressed="false"><span class="ei"><svg viewBox="0 0 24 24">${EIC[e.ic]}</svg></span><b>${e.name}</b><span>${e.line}</span></button>`).join('');
hub.innerHTML=`<small>The hub</small><b>${D.hub.name}</b><div class="hsteps">${D.hub.steps.map(x=>`<span>${x}</span>`).join('')}</div><div class="chips">${D.hub.tools.map(t=>`<span>${t}</span>`).join('')}</div>`;
const eB=$$('.eng',engs);let eAt=-1,eTimer,eUser=false;
function setE(i){eAt=i;press(eB,i);wires.forEach((w,j)=>w.classList.toggle('on',j===i));hub.classList.remove('pulse');void hub.offsetWidth;hub.classList.add('pulse');const e=D.engines[i];
  edet.innerHTML=`<h3>${e.name}</h3><div class="flow"><div><small>Goes in</small><p>${e.in}</p></div><i aria-hidden="true"></i><div><small>Runs on</small><p>${e.run}</p></div><i aria-hidden="true"></i><div><small>Comes out</small><p>${e.out}</p></div></div>
  <div class="chips">${e.tools.map(t=>`<span>${t}</span>`).join('')}</div>${e.proof?`<p class="proof">${e.proof}</p>`:''}<p class="hubline">Then into the hub: ${D.hub.line.charAt(0).toLowerCase()+D.hub.line.slice(1)}</p>`;}
eB.forEach((b,i)=>b.onclick=()=>{eUser=true;clearInterval(eTimer);setE(i);});
setE(0);
const tio=new IntersectionObserver(es=>{const on=es[0].isIntersecting;if(on)signal('toolkit');clearInterval(eTimer);if(on&&!eUser&&!reduceM)eTimer=setInterval(()=>setE((eAt+1)%D.engines.length),4200);},{threshold:.4});
tio.observe($('.sys'));

/* scroll progress */
const prog=$('#prog');const onP=()=>{const h=document.documentElement.scrollHeight-innerHeight;prog.style.transform=`scaleX(${h>0?scrollY/h:0})`;};addEventListener('scroll',onP,{passive:true});onP();

/* hero: lines converge on the pointer */
const band=$('.band'),ls=$('#lines'),NS='http://www.w3.org/2000/svg',N=17;let W=0,H=0,tx=0,ty=0,cx=0,cy=0,home=[0,0],paths=[];
function size(){const r=band.getBoundingClientRect();W=r.width;H=r.height;ls.setAttribute('viewBox',`0 0 ${W} ${H}`);home=[W-Math.max(40,W*.05),H*.46];if(!paths.length){
  for(let k=0;k<N;k++){const p=document.createElementNS(NS,'path');const mid=k===(N>>1);p.setAttribute('stroke',mid?'#c9a24a':'#2b6f59');p.setAttribute('stroke-width',mid?'1.6':'1');ls.appendChild(p);paths.push(p);}
  const d=document.createElementNS(NS,'circle');d.setAttribute('r','6');d.setAttribute('fill','#c9a24a');ls.appendChild(d);paths.dot=d;tx=cx=home[0];ty=cy=home[1];}
  else{tx=home[0];ty=home[1];}}
function draw(){const x0=W*(W<700?.3:.6);paths.forEach((p,k)=>{const y0=(k+.5)*H/N;p.setAttribute('d',`M${x0} ${y0} C ${x0+(cx-x0)*.45} ${y0}, ${x0+(cx-x0)*.55} ${cy}, ${cx} ${cy}`);});paths.dot.setAttribute('cx',cx);paths.dot.setAttribute('cy',cy);}
size();draw();addEventListener('resize',()=>{size();draw();});
if(!reduceM){band.addEventListener('pointermove',e=>{const r=band.getBoundingClientRect();const px=e.clientX-r.left,py=e.clientY-r.top;if(px>W*.6){tx=px;ty=py;}else{tx=home[0];ty=home[1];}});
  band.addEventListener('pointerleave',()=>{tx=home[0];ty=home[1];});
  (function ease(){cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;draw();requestAnimationFrame(ease);})();}

/* stats count up once */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,n=+el.dataset.n,pre=el.dataset.pre||'',suf=el.dataset.suf||'';if(reduceM)return;const t0=performance.now();
  (function f(t){const p=Math.min(1,(t-t0)/1100),v=Math.round(n*(1-Math.pow(1-p,3)));el.textContent=pre+v+suf;if(p<1)requestAnimationFrame(f);})(t0);}),{threshold:.6});
$$('[data-n]').forEach(el=>cio.observe(el));

/* segments: hiring vs growth */
const RES='assets/Huzaif_ur_Rehman_Resume.pdf',WA=n=>'https://wa.me/923248451679?text='+encodeURIComponent(n);
const SEG={
  hire:{note:'Got it. The page is now set up for hiring managers.',hero:`<a class="btn b-green" href="${RES}" target="_blank" rel="noopener">Download resume</a><a class="btn b-line" href="#contact">Contact me</a>`,
    intro:'Hiring for marketing, growth or go-to-market? I reply within a day, and WhatsApp is fastest.',
    foot:`<a class="btn b-brass" href="${RES}" target="_blank" rel="noopener">Download resume</a><a class="btn b-line" href="mailto:${D.email}?subject=${encodeURIComponent('A role for you')}">Send an email</a>`,
    wa:'Hi Huzaif, I came across your portfolio and would like to talk about a role.'},
  growth:{note:'Got it. The page is now set up for founders and teams.',hero:`<a class="btn b-green" href="#contact">Start a conversation</a><a class="btn b-line" href="#how">See how I work</a>`,
    intro:'Tell me what you sell and who buys it. I&rsquo;ll reply within a day with where I&rsquo;d start. WhatsApp is fastest.',
    foot:`<a class="btn b-brass" href="mailto:${D.email}?subject=${encodeURIComponent('Growth for my business')}">Email me your brief</a><a class="btn b-line" href="${RES}" target="_blank" rel="noopener">Download resume</a>`,
    wa:'Hi Huzaif, I saw your portfolio and want to talk about growth for my business.'}};
const segB=$$('.seg button');
function setSeg(k,user){const c=SEG[k];if(!c)return;press(segB,segB.findIndex(b=>b.dataset.seg===k));
  $('#heroAct').innerHTML=c.hero;$('#cIntro').innerHTML=c.intro;$('#cFoot').innerHTML=c.foot;$('#waLink').href=WA(c.wa);
  if(user){$('#segNote').textContent=c.note;signal('seg');}try{localStorage.setItem('hr-seg',k);}catch(_){}}
segB.forEach(b=>b.onclick=()=>setSeg(b.dataset.seg,true));
try{const k=localStorage.getItem('hr-seg');if(k)setSeg(k,false);}catch(_){}

/* contact */
const toast=$('#toast');
$('#copyEmail').onclick=async()=>{try{await navigator.clipboard.writeText(D.email);}catch(_){location.href='mailto:'+D.email;return;}toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800);};
$('#yr').textContent=now.getFullYear();
})();
