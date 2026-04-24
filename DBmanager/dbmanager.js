// ── dbmanager.js ──

// ── YARDIMCI: input/textarea değeri al ──
function v(id){ const el=document.getElementById(id); return el?el.value.trim()||'—':'—'; }

// ── DRAG ──
const win = document.getElementById('window');
const bar = document.getElementById('titlebar');
let drag=false, ox=0, oy=0;
bar.addEventListener('mousedown', e=>{ if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='BUTTON'||e.target.classList.contains('wc')) return; drag=true; ox=e.clientX-win.offsetLeft; oy=e.clientY-win.offsetTop; });
document.addEventListener('mousemove', e=>{ if(!drag)return; win.style.left=Math.max(-300,Math.min(window.innerWidth-200,e.clientX-ox))+'px'; win.style.top=Math.max(0,Math.min(window.innerHeight-40,e.clientY-oy))+'px'; });
document.addEventListener('mouseup', ()=>drag=false);

// ── MİNİMİZE (sarı) — sol alta küçül ──
let isMin=false, savedLeft='', savedTop='', savedWidth='', savedHeight='';
function toggleMin(){
  const mc=document.getElementById('mc');
  const sb=win.querySelector('.statusbar');
  if(!isMin){
    savedLeft=win.style.left||'40px'; savedTop=win.style.top||'20px';
    savedWidth=win.style.width||'1020px'; savedHeight=win.style.height||'96vh';
    mc.style.display='none'; if(sb) sb.style.display='none';
    win.style.transition='all 0.3s ease'; win.style.width='220px'; win.style.height='36px';
    win.style.left='10px'; win.style.top=(window.innerHeight-46)+'px'; win.style.borderRadius='8px';
    isMin=true;
  } else {
    mc.style.display=''; if(sb) sb.style.display='';
    win.style.transition='all 0.3s ease'; win.style.width=savedWidth; win.style.height=savedHeight;
    win.style.left=savedLeft; win.style.top=savedTop; isMin=false;
  }
}

// ── MAKSİMİZE (yeşil) ──
let isMax=false, prevStyle='';
function toggleMax(){
  if(!isMax){ prevStyle=win.style.cssText; win.style.cssText='position:absolute;top:0;left:0;width:100vw;height:100vh;border-radius:0;transition:all 0.3s ease;'; isMax=true; }
  else { win.style.cssText=prevStyle; isMax=false; }
}

// ── RESIZE EDITOR ──
const handle=document.getElementById('resize-handle');
const edPanel=document.getElementById('editor-panel');
let resizing=false, startY=0, startH=0;
handle.addEventListener('mousedown', e=>{ resizing=true; startY=e.clientY; startH=edPanel.offsetHeight; document.body.style.cursor='ns-resize'; e.preventDefault(); });
document.addEventListener('mousemove', e=>{ if(!resizing)return; edPanel.style.height=Math.max(80,Math.min(window.innerHeight*0.7,startH-(e.clientY-startY)))+'px'; });
document.addEventListener('mouseup', ()=>{ resizing=false; document.body.style.cursor=''; });

// ── LOG ──
function log(msg){ const ed=document.getElementById('out'); const t=new Date().toLocaleTimeString('tr-TR'); ed.value+=`[${t}]  ${msg}\n`; ed.scrollTop=ed.scrollHeight; }

// ── KAYDET ──
function kaydet(){ const c=document.getElementById('out').value; if(!c.trim()){log('Kaydet → Log boş');return;} const b=new Blob([c],{type:'text/plain'}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='log_'+new Date().toLocaleDateString('tr-TR').replace(/\./g,'-')+'.txt'; a.click(); log('Log dosyası kaydedildi.'); }

// ── INPUT KORUMA ──
document.querySelectorAll('input, textarea').forEach(el=>{
  el.addEventListener('mousedown', e=>e.stopPropagation());
  el.addEventListener('click', e=>{ e.stopPropagation(); el.focus(); });
});

// ── SCROLL HIZI ──
const scrollArea = document.querySelector('.scroll-area');
scrollArea.style.scrollBehavior = 'unset';
scrollArea.addEventListener('wheel', e => {
  e.preventDefault();
  e.stopPropagation();
  scrollArea.scrollTop += e.deltaY > 0 ? 1500 : -1500;
}, { passive: false });

log('DB Manager başlatıldı.');
