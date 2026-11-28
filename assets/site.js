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
function fits(){const cs=getComputedStyle(pinIn),avail=pinIn.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)-$('#steps').offsetHeight-30;return panelsEl.offsetHeight<=avail;}
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

/* graphic: outbound annotated message */
(()=>{const o=D.out;$('#g-out').innerHTML=`<div class="msg"><div class="msg-h"><i class="av">DM</i><div><b>To: ${o.to}</b><span>${o.title}</span></div></div>
  <p class="msg-b">${o.parts.map((x,i)=>`<span class="hl" data-k="${i}" style="--d:${.3+i*.55}s">${x.t}</span>`).join(' ')}</p></div>
  <ol class="notes">${o.parts.map((x,i)=>`<li data-k="${i}" style="--d:${.45+i*.55}s"><b>${x.k}</b><span>${x.src}</span></li>`).join('')}</ol>
  <div class="cov"><div><span>Typical message</span><i class="on"></i><i></i><i></i><i></i><em>first line only</em></div><div class="me"><span>Mine</span><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><em>every sentence</em></div></div>`;
  const g=$('#g-out');$$('.notes li',g).forEach(li=>{const k=li.dataset.k,h=$(`.hl[data-k="${k}"]`,g);li.onmouseenter=()=>h.classList.add('hot');li.onmouseleave=()=>h.classList.remove('hot');});})();

/* graphic: inbound feed */
(()=>{const IC={c:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',l:'<path d="M7 11v9H4v-9h3zm0 0 4-7c1.5 0 2.5 1 2.2 2.6L12.6 10H19a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7"/>',v:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',m:'<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/>'};
  $('#g-in').innerHTML=`<div class="rail4">${D.rail.map((r,i)=>`<div style="--d:${[0,.3,1.1,2.7][i]}s"><i></i><span>${r}</span></div>`).join('')}</div>
  <div class="feed">${D.feed.map((f,i)=>`<div class="fi${f.tag?' dm':''}" style="--d:${.3+i*.8}s"><span class="ic"><svg viewBox="0 0 24 24">${IC[f.ic]}</svg></span><div><small>${f.who}</small><p>${f.t}</p>${f.tag?`<em>${f.tag}</em>`:''}</div></div>`).join('')}</div>`;})();

/* graphic: ads test matrix */
(()=>{const m=D.matrix,g=$('#g-ads'),isW=(r,c)=>m.win.some(w=>w[0]===r&&w[1]===c);
  g.innerHTML=`<div class="mx"><span></span>${m.cols.map(c=>`<span class="h">${c}</span>`).join('')}
  ${m.rows.map((r,ri)=>`<span class="rl">${r}</span>${m.cols.map((c,ci)=>`<div class="cell${isW(ri,ci)?' w':''}" style="--d:${(ri*3+ci)*.07}s"><b>3 variants</b></div>`).join('')}`).join('')}</div>
  <div class="budget"><div class="bh"><span>Budget</span><b id="bstate">Split evenly while testing</b></div><div class="bbar">${m.rows.flatMap((r,ri)=>m.cols.map((c,ci)=>`<i class="${isW(ri,ci)?'w':''}"></i>`)).join('')}</div></div>
  <p class="cap">Example test: 3 angles &times; 3 audiences, 3 AI variants each. 27 ads, one week.</p>`;
  let t=[];G['m-ads']=()=>{t.forEach(clearTimeout);g.classList.remove('done');$$('.cell b',g).forEach(b=>b.textContent='3 variants');$('#bstate').textContent='Split evenly while testing';
    t=[setTimeout(()=>{g.classList.add('done');$$('.cell',g).forEach(c=>$('b',c).textContent=c.classList.contains('w')?'Winner':'Cut');$('#bstate').textContent='Follows the winners';},reduceM?0:2200)];};})();

/* graphic: lead scoring, same profile different pain */
(()=>{const S=D.score,sum=a=>a.reduce((t,x)=>t+x[1],0),base=sum(S.profile);
  const card=(c,cls)=>{const tot=base+sum(c.pain);return `<div class="scard ${cls}"><h4>${c.name}</h4><div class="pf"><span>Profile fit</span><b>+${base}</b></div><div class="grp prof"><small>Profile fit</small><ul>${S.profile.map(([l,w])=>`<li><span>${l}</span><b>+${w}</b></li>`).join('')}</ul></div>
    <div class="grp"><small>Pain signals</small><ul>${c.pain.map(([l,w])=>`<li class="${w?'':'off'}"><span>${l}</span><b>+${w}</b></li>`).join('')}</ul></div>
    <div class="total"><span>Score</span><b data-t="${tot}">0</b></div><div class="sbar2"><i style="--w:${tot}%"></i></div><div class="verdict">${c.verdict}</div></div>`;};
  const g=$('#g-score');g.innerHTML=`<p class="cap top">Same profile. Different pain.</p><div class="sc">${card(S.a,'hot')}${card(S.b,'')}</div>`;
  G['m-score']=()=>$$('.total b',g).forEach(b=>{const n=+b.dataset.t;if(reduceM){b.textContent=n;return;}const t0=performance.now();(function f(t){const q=Math.min(1,(t-t0)/1200);b.textContent=Math.round(n*(1-Math.pow(1-q,3)));if(q<1)requestAnimationFrame(f);})(t0);});})();
setMode();

/* toolkit */
const ICO={Find:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',Enrich:'<path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="m3 13 9 5 9-5"/>',Organize:'<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',Automate:'<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',Reach:'<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/>','Get found':'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'};
const nodes=$('#nodes');nodes.innerHTML=D.stack.map(s=>`<button aria-pressed="false"><span class="n"><svg viewBox="0 0 24 24">${ICO[s.name]}</svg></span><b>${s.name}</b></button>`).join('');
const nB=$$('button',nodes),info=$('#tkinfo'),rec=$('#rec'),line=$('#sline'),dot=$('#sdot');let at=-1,timer;
function setS(i,anim){at=i;nB.forEach((b,j)=>{b.setAttribute('aria-pressed',j===i);b.classList.toggle('done',j<i);});
  const s=D.stack[i];info.innerHTML=`<h3>${s.name}</h3><p>${s.does}</p><div class="chips">${s.tools.map(t=>`<span>${t}</span>`).join('')}</div><div class="ctl"><button class="btn b-green" id="play">${i<D.stack.length-1?'Play':'Play again'}</button><button class="btn b-line" id="reset">Reset</button></div>`;
  const rows=D.stack.slice(0,i+1).flatMap((x,k)=>x.add.map(a=>[a,k===i]));
  rec.innerHTML=`<dl>${rows.map(([[k,v],n])=>`<dt${n&&anim?' class="new"':''}>${k}</dt><dd${n&&anim?' class="new"':''}>${v}</dd>`).join('')}</dl>`;
  $('#rstep').textContent=`Step ${i+1} of ${D.stack.length}`;
  const b=nB[i].querySelector('.n').getBoundingClientRect(),w=$('.stack').getBoundingClientRect();
  dot.style.left=(b.left+b.width/2-w.left)+'px';line.style.width=(i/(D.stack.length-1)*100)+'%';
  $('#play').onclick=play;$('#reset').onclick=reset;}
function reset(){clearInterval(timer);at=-1;nB.forEach(b=>{b.setAttribute('aria-pressed',false);b.classList.remove('done');});
  info.innerHTML=`<h3>Six stages, one lead</h3><p>Follow an example lead from a search result to a booked call, and see which tool does each job.</p><div class="ctl"><button class="btn b-green" id="play">Play</button></div>`;
  rec.innerHTML='<p class="empty">The record fills in as the lead moves through each stage.</p>';$('#rstep').textContent='Not started';
  line.style.width='0';const b=nB[0].querySelector('.n').getBoundingClientRect(),w=$('.stack').getBoundingClientRect();dot.style.left=(b.left+b.width/2-w.left)+'px';
  $('#play').onclick=play;}
function play(){clearInterval(timer);let i=at>=D.stack.length-1?-1:at;timer=setInterval(()=>{i++;setS(i,true);if(i>=D.stack.length-1)clearInterval(timer);},1300);if(i===-1){i=0;setS(0,true);}}
nB.forEach((b,i)=>b.onclick=()=>{clearInterval(timer);setS(i,true);});
reset();addEventListener('resize',()=>at<0?reset():setS(at,false));
const tio=new IntersectionObserver(es=>{if(es[0].isIntersecting){tio.disconnect();signal('toolkit');if(at<0)play();}},{threshold:.45});tio.observe($('.stack'));

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
