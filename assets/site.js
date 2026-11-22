(function(){
const D=window.HR, $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const now=new Date(), NOWI=now.getFullYear()*12+now.getMonth();
const idx=s=>{const[y,m]=s.split('-').map(Number);return y*12+m-1;};
const fmt=i=>MON[i%12]+' '+Math.floor(i/12);
const dur=r=>{const m=(r.end?idx(r.end):NOWI)-idx(r.start)+1,y=Math.floor(m/12),mo=m%12;return[y?y+(y>1?' yrs':' yr'):'',mo?mo+(mo>1?' mos':' mo'):''].filter(Boolean).join(' ');};
const range=r=>fmt(idx(r.start))+' to '+(r.end?fmt(idx(r.end)):'present');
const press=(list,i,attr='aria-pressed')=>list.forEach((b,j)=>b.setAttribute(attr,j===i));

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
const tr=$('#rail .track'),html=D.roles.map(card).join('');tr.innerHTML=html+html;
$$('.job',tr).slice(D.roles.length).forEach(b=>b.setAttribute('tabindex','-1'));
const modal=$('#modal'),mb=$('#mbody');let cur=0,lastFocus;
function openRole(i){cur=(i+D.roles.length)%D.roles.length;const r=D.roles[cur];
  mb.innerHTML=`<h3>${r.org}</h3><div class="r">${r.role}</div><div class="d">${r.where}. ${range(r)}, ${dur(r)}.</div>
  <ul>${r.points.map(p=>`<li>${p}</li>`).join('')}</ul><div class="tags">${r.tools.map(t=>`<span>${t}</span>`).join('')}</div>
  <div class="pn"><button data-s="-1">Previous role</button><button data-s="1">Next role</button></div>`;
  if(!modal.classList.contains('open')){lastFocus=document.activeElement;modal.classList.add('open');$('#rail').classList.add('paused');document.body.style.overflow='hidden';}
  $('.x',modal).focus();}
function close(){modal.classList.remove('open');$('#rail').classList.remove('paused');document.body.style.overflow='';lastFocus&&lastFocus.focus();}
tr.addEventListener('click',e=>{const b=e.target.closest('.job');if(b)openRole(D.roles.findIndex(r=>r.id===b.dataset.role));});
modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.x'))return close();const s=e.target.closest('[data-s]');if(s)openRole(cur+ +s.dataset.s);});
addEventListener('keydown',e=>{if(!modal.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')openRole(cur+1);if(e.key==='ArrowLeft')openRole(cur-1);});

/* how I work: tabs */
const tabs=$$('#modes button');
tabs.forEach(t=>t.onclick=()=>{press(tabs,tabs.indexOf(t),'aria-selected');$$('.pane').forEach(p=>p.classList.toggle('on',p.id==='p-'+t.dataset.p));});

/* outbound: temperature */
const tcols=['#dbe5de','#a9c2b4','#e6cf94','#c9a24a'],temp=$('#temp'),tR=$('#tempR'),tBox=$('#tempBox');
temp.innerHTML=D.warm.map((w,i)=>`<button style="background:${tcols[i]}" aria-pressed="false">${w.name}</button>`).join('');
const tB=$$('button',temp);
function setT(i){press(tB,i);tR.value=i;const w=D.warm[i];tBox.innerHTML=`<h4>${w.line}</h4><div class="tags">${w.sig.map(s=>`<span>${s}</span>`).join('')}</div><p style="margin-top:12px">${w.note}</p>`;}
tB.forEach((b,i)=>b.onclick=()=>setT(i));tR.oninput=()=>setT(+tR.value);setT(0);
/* outbound: sequence */
const seq=$('#seq');seq.innerHTML=D.seq.map((s,i)=>`<button aria-expanded="${i===0}"><span>${s.day}</span><b>${s.name}</b><em>${s.what}</em></button>`).join('');
const sB=$$('button',seq);sB.forEach((b,i)=>b.onclick=()=>press(sB,i,'aria-expanded'));

/* inbound: donut */
const r=80,C=2*Math.PI*r;let off=0,svg=`<svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="${r}" fill="none" stroke="#0e3b2e" stroke-width="22"/>`;
D.mix.forEach((m,i)=>{const len=C*m.pct/100;svg+=`<circle class="s" data-i="${i}" cx="100" cy="100" r="${r}" fill="none" stroke="${m.color}" stroke-width="22" stroke-dasharray="${len-3} ${C-len+3}" stroke-dashoffset="${-off}"/>`;off+=len;});
$('#donut').innerHTML=svg+`</svg><div class="mid"><b id="mp">40%</b><span id="ml">Demand signal</span></div>`;
const leg=$('#legend');leg.innerHTML=D.mix.map(m=>`<button aria-pressed="false"><i style="background:${m.color}"></i><div><b>${m.pct}% ${m.name}</b><span>${m.job}</span></div></button>`).join('');
const lB=$$('button',leg),segs=$$('#donut circle.s');
function setM(i){press(lB,i);segs.forEach((s,j)=>s.classList.toggle('on',j===i));const m=D.mix[i];$('#mp').textContent=m.pct+'%';$('#ml').textContent=m.name;$('#mixBox').innerHTML=`<h4>Example post</h4><p>${m.ex}</p>`;}
lB.forEach((b,i)=>b.onclick=()=>setM(i));segs.forEach((s,i)=>s.onclick=()=>setM(i));setM(0);
/* inbound: funnel */
const fcols=['#dbe5de','#a9c2b4','#6f9c86','#e6cf94','#c9a24a'],fun=$('#funnel');
fun.innerHTML=D.funnel.map((f,i)=>`<button aria-pressed="false" style="width:${100-i*13}%;background:${fcols[i]};color:#0e3b2e">${f.name}</button>`).join('');
const fB=$$('button',fun);function setF(i){press(fB,i);const f=D.funnel[i];$('#funBox').innerHTML=`<h4>${f.name}: ${f.what}</h4><p>${f.how}</p>`;}
fB.forEach((b,i)=>b.onclick=()=>setF(i));setF(0);

/* ads */
const ads=$('#ads');ads.innerHTML=D.ads.map((a,i)=>`<button aria-pressed="false"><small>Stage ${i+1}</small><b>${a.name}</b></button>`).join('');
const aB=$$('button',ads);
function setA(i){press(aB,i);const a=D.ads[i];$('#adgrid').innerHTML=[['Goal',a.goal],['Audience',a.aud],['Creative',a.cre],['Number to watch',a.kpi]].map(([k,v])=>`<div><small>${k}</small><p>${v}</p></div>`).join('');}
aB.forEach((b,i)=>b.onclick=()=>setA(i));setA(0);

/* scoring */
const sig=$('#sig');sig.innerHTML=D.signals.map((s,i)=>`<label><span>${s.label}<em>+${s.w}</em></span><input type="checkbox" data-w="${s.w}" ${i<2?'checked':''}></label>`).join('');
const gfg=$('#gfg'),GL=gfg.getTotalLength();gfg.style.strokeDasharray=GL;
function score(){const v=$$('input',sig).reduce((t,c)=>t+(c.checked?+c.dataset.w:0),0);
  $('#score').textContent=v;gfg.style.strokeDashoffset=GL*(1-v/100);
  const [t,d]=v>=70?['Start the sequence now','Strong fit with a reason to talk. The four-touch outreach starts automatically.']:v>=40?['Warm up first','Good fit, not ready yet. Engage with their posts for a week or two before any message.']:['Nurture with content','Not a fit right now. Add to the content audience and check again next month.'];
  $('#route').innerHTML=`<b>${t}</b><p>${d}</p>`;}
sig.addEventListener('change',score);score();

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

/* photo lightbox */
const lb=$('#lb'),lbi=$('img',lb);
$('#phBtn').onclick=()=>{lbi.src='assets/portrait.webp';lb.classList.add('open');document.body.style.overflow='hidden';$('.x',lb).focus();};
const lbClose=()=>{lb.classList.remove('open');document.body.style.overflow='';$('#phBtn').focus();};
lb.onclick=e=>{if(e.target!==lbi)lbClose();};
addEventListener('keydown',e=>{if(e.key==='Escape'&&lb.classList.contains('open'))lbClose();});

/* contact */
const toast=$('#toast');
$('#copyEmail').onclick=async()=>{try{await navigator.clipboard.writeText(D.email);}catch(_){location.href='mailto:'+D.email;return;}toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800);};
$('#yr').textContent=now.getFullYear();
})();
