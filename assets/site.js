(function(){
window.HRready=true;
const D=window.HR, $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const now=new Date(), NOWI=now.getFullYear()*12+now.getMonth();
const idx=s=>{ const [y,m]=s.split('-').map(Number); return y*12+m-1; };
const fmt=i=>MON[i%12]+' '+Math.floor(i/12);
function months(r){ if(!r.start) return null; return (r.end?idx(r.end):NOWI)-idx(r.start)+1; }
function dur(r){ const m=months(r); if(m==null) return 'Ongoing'; const y=Math.floor(m/12), mo=m%12;
  return [y?y+(y>1?' yrs':' yr'):'', mo?mo+(mo>1?' mos':' mo'):''].filter(Boolean).join(' '); }
function range(r){ if(!r.start) return 'Ongoing'; return fmt(idx(r.start))+' – '+(r.end?fmt(idx(r.end)):'Present'); }
const initials=s=>s.replace(/[^A-Za-z ]/g,'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
const byId=id=>D.roles.find(r=>r.id===id);

/* nav */
const nav=$('#nav'), burger=$('#burger');
const solid=()=>nav.classList.toggle('solid',scrollY>40&&!nav.classList.contains('open'));
addEventListener('scroll',solid,{passive:true}); solid();
burger.onclick=()=>{ nav.classList.toggle('open'); solid(); };
$$('#menu a').forEach(a=>a.addEventListener('click',()=>{ nav.classList.remove('open'); solid(); }));
const links=$$('#menu a');
const spy=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)); }),{rootMargin:'-45% 0px -50% 0px'});
links.forEach(l=>{ const s=document.getElementById(l.getAttribute('href').slice(1)); if(s) spy.observe(s); });

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),{threshold:.12,rootMargin:'0px 0px -30px 0px'});
$$('.rv').forEach(n=>io.observe(n));

/* method */
const ms=$('#msteps'), md=$('#mdetail');
D.steps.forEach((s,i)=>{ const b=document.createElement('button'); b.innerHTML=`<small>0${i+1}</small><b>${s.k}</b>`; b.onclick=()=>step(i); ms.appendChild(b); });
function step(i){ $$('button',ms).forEach((b,j)=>b.classList.toggle('on',j===i)); const s=D.steps[i], r=byId(s.role);
  md.innerHTML=`<span class="fade">${s.ex}</span><a href="#" data-open="${s.role}">${r.org} &rarr;</a>`; }
step(0);

/* roles marquee */
function card(r){ return `<button class="role" data-open="${r.id}"><div class="top"><div class="logo">${initials(r.org)}</div><span class="dur">${dur(r)}</span></div><div><h4>${r.org}</h4><div class="r">${r.role}</div></div><p>${r.line}</p><span class="more">View details &rarr;</span></button>`; }
const tr=$('#mq .track'); const html=D.roles.map(card).join(''); tr.innerHTML=html+html;

/* gantt */
const dated=D.roles.filter(r=>r.start);
const gmin=Math.min(...dated.map(r=>idx(r.start))), gmax=NOWI+1, span=gmax-gmin;
$('#grows').innerHTML=dated.map(r=>{ const a=idx(r.start), b=(r.end?idx(r.end):NOWI)+1;
  return `<div class="grow" data-open="${r.id}" data-id="${r.id}"><div class="nm">${r.org}</div><div class="lane"><div class="bar" style="left:${(a-gmin)/span*100}%;width:${(b-a)/span*100}%">${dur(r)}</div></div></div>`; }).join('');
const ticks=6; $('#gaxis').innerHTML=Array.from({length:ticks+1},(_,k)=>`<span>${fmt(Math.round(gmin+span*k/ticks))}</span>`).join('');

/* toolkit */
const tk=$('#tk'), out=$('#tkout');
tk.innerHTML=D.tools.map(g=>`<div class="col rv"><h4>${g.g}</h4><div class="chips">${g.items.map(([t,rs])=>`<button class="chip" data-roles="${rs.join(',')}">${t}</button>`).join('')}</div></div>`).join('');
$$('.col',tk).forEach(c=>io.observe(c));
$$('.chip',tk).forEach(c=>c.onclick=()=>{
  const on=!c.classList.contains('on'); $$('.chip',tk).forEach(x=>x.classList.remove('on'));
  const ids=c.dataset.roles.split(',');
  $$('.grow').forEach(g=>{ g.classList.toggle('hl',on&&ids.includes(g.dataset.id)); g.classList.toggle('dim',on&&!ids.includes(g.dataset.id)); });
  $('#ach-ldf').classList.toggle('hl',on&&ids.includes('ldf'));
  if(!on){ out.innerHTML='Pick a tool above.'; return; }
  c.classList.add('on');
  const names=ids.map(id=>id==='ldf'?`<span class="rl" data-scroll="ach-ldf">Lahore Design Festival</span>`:`<span class="rl" data-open="${id}">${byId(id).org}</span>`).join('');
  out.innerHTML=`<span class="fade"><b>${c.textContent}</b> &middot; used at: ${names}</span>`;
});

/* projects */
$$('.pc').forEach(p=>p.addEventListener('click',e=>{ if(e.target.closest('a')) return; p.classList.toggle('open'); }));

/* modal */
const modal=$('#modal'), mb=$('#mbody'); let cur=-1;
function openRole(id){ cur=D.roles.findIndex(r=>r.id===id); if(cur<0) return; const r=D.roles[cur];
  mb.innerHTML=`<div class="mh"><div class="logo">${initials(r.org)}</div><div><h3>${r.org}</h3><div class="r">${r.role}</div></div></div>
  <div class="meta"><span>${range(r)}</span>${r.start?`<span>${dur(r)}</span>`:''}<span>${r.kind}</span><span>${r.loc}</span></div>
  <ul>${r.points.map(p=>`<li>${p}</li>`).join('')}</ul>
  <div class="tools">${r.tools.map(t=>`<span>${t}</span>`).join('')}</div>
  ${r.link?`<a class="btn btn-acc" style="margin-top:18px" href="${r.link}" target="_blank" rel="noopener">Visit ${r.link.replace('https://','')} &#8599;</a>`:''}
  <div class="nav2"><button data-step="-1">&larr; Previous</button><button data-step="1">Next &rarr;</button></div>`;
  modal.classList.add('open'); $('#mq').classList.add('paused'); document.body.style.overflow='hidden'; }
function close(){ modal.classList.remove('open'); $('#mq').classList.remove('paused'); document.body.style.overflow=''; }
modal.addEventListener('click',e=>{ if(e.target===modal||e.target.closest('.x')) return close();
  const s=e.target.closest('[data-step]'); if(s){ const n=(cur+ +s.dataset.step+D.roles.length)%D.roles.length; openRole(D.roles[n].id); } });
addEventListener('keydown',e=>{ if(!modal.classList.contains('open')) return; if(e.key==='Escape') close();
  if(e.key==='ArrowRight'||e.key==='ArrowLeft') openRole(D.roles[(cur+(e.key==='ArrowRight'?1:-1)+D.roles.length)%D.roles.length].id); });
document.addEventListener('click',e=>{
  const o=e.target.closest('[data-open]'); if(o&&!modal.contains(o)){ e.preventDefault(); openRole(o.dataset.open); return; }
  const sc=e.target.closest('[data-scroll]'); if(sc){ e.preventDefault(); const t=document.getElementById(sc.dataset.scroll); t.scrollIntoView({behavior:'smooth',block:'center'}); t.classList.add('hl'); setTimeout(()=>t.classList.remove('hl'),2200); }
});

/* copy email */
const toast=$('#toast');
$('#copyEmail').onclick=async()=>{ try{ await navigator.clipboard.writeText(D.email); toast.textContent='Email copied'; }catch(_){ location.href='mailto:'+D.email; return; }
  toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),1800); };
$('#yr').textContent=now.getFullYear();
})();
