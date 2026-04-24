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
  const mc = document.getElementById('mc');
  const sb = win.querySelector('.statusbar');
  if(!isMin){
    savedLeft  = win.style.left   || '60px';
    savedTop   = win.style.top    || '20px';
    savedWidth = win.style.width  || '960px';
    savedHeight= win.style.height || '96vh';
    mc.style.display='none';
    if(sb) sb.style.display='none';
    win.style.transition='all 0.3s ease';
    win.style.width='220px';
    win.style.height='36px';
    win.style.left='10px';
    win.style.top=(window.innerHeight-46)+'px';
    win.style.borderRadius='8px';
    isMin=true;
  } else {
    mc.style.display='';
    if(sb) sb.style.display='';
    win.style.transition='all 0.3s ease';
    win.style.width=savedWidth;
    win.style.height=savedHeight;
    win.style.left=savedLeft;
    win.style.top=savedTop;
    isMin=false;
  }
}

// ── MAKSİMİZE (yeşil) ──
let isMax=false, prevStyle='';
function toggleMax(){
  if(!isMax){
    prevStyle = win.style.cssText;
    win.style.cssText='position:absolute;top:0;left:0;width:100vw;height:100vh;border-radius:0;transition:all 0.3s ease;';
    isMax=true;
  } else {
    win.style.cssText = prevStyle;
    isMax=false;
  }
}

// ── RESIZE EDITOR ──
const handle  = document.getElementById('resize-handle');
const edPanel = document.getElementById('editor-panel');
let resizing=false, startY=0, startH=0;
handle.addEventListener('mousedown', e=>{ resizing=true; startY=e.clientY; startH=edPanel.offsetHeight; document.body.style.cursor='ns-resize'; e.preventDefault(); });
document.addEventListener('mousemove', e=>{ if(!resizing)return; edPanel.style.height=Math.max(80,Math.min(window.innerHeight*0.7,startH-(e.clientY-startY)))+'px'; });
document.addEventListener('mouseup', ()=>{ resizing=false; document.body.style.cursor=''; });

// ── LOG ──
function log(msg){ const ed=document.getElementById('out'); const t=new Date().toLocaleTimeString('tr-TR'); ed.value+=`[${t}]  ${msg}\n`; ed.scrollTop=ed.scrollHeight; }

// ── TOGGLE HELPERS ──
function setOn(b,l)    { b.className='cb s-on';  b.innerHTML=l+' <span class="badge bg">ON</span>';    }
function setOff(b,l)   { b.className='cb s-off'; b.innerHTML=l+' <span class="badge br">OFF</span>';   }
function setTrue(b,l)  { b.className='cb s-on';  b.innerHTML=l+' <span class="badge bg">TRUE</span>';  }
function setFalse(b,l) { b.className='cb s-off'; b.innerHTML=l+' <span class="badge br">FALSE</span>'; }

// ── XRAY POWER ──
let xrpN=0;
function toggleXRayPower(btn){
  xrpN++;
  if(xrpN%2===1){
    setOn(btn,'XRayPower');
    log('XRayPower → ON');
    if(typeof KontrolKarti !== 'undefined') KontrolKarti.Islemyap_Xraypower(true);
  } else {
    setOff(btn,'XRayPower');
    log('XRayPower → OFF');
    if(typeof KontrolKarti !== 'undefined') KontrolKarti.Islemyap_Xraypower(false);
  }
}

// ── INTERLOCK ──
const ilCounts={1:0,2:0};
function toggleInterlock(btn,num){
  ilCounts[num]++;
  if(ilCounts[num]%2===1){
    btn.className='cb s-on';
    btn.innerHTML=`XRayInterlock ${num} <span class="badge bg">TRUE</span>`;
    log(`XRayInterlock ${num} → TRUE`);
    if(typeof KontrolKarti !== 'undefined') KontrolKarti.IslemYap_XRayInterlock(true);
  } else {
    btn.className='cb s-off';
    btn.innerHTML=`XRayInterlock ${num} <span class="badge br">FALSE</span>`;
    log(`XRayInterlock ${num} → FALSE`);
    if(typeof KontrolKarti !== 'undefined') KontrolKarti.IslemYap_XRayInterlock(false);
  }
}

// ── SORGU SÜRESİ ──
function sorguAl(){ const v=Math.floor(Math.random()*400+100); log('SorguSuresiAl → '+v+' ms'); }
function sorguGir(){ const v=document.getElementById('sorgu-gir').value.trim(); if(!v){log('Sorgu Süresi Gir → Değer boş');return;} log('SorguSuresiGir → '+v+' ms ayarlandı'); document.getElementById('sorgu-gir').value=''; }

// ── TIMEOUT ──
function toAl(){ const v=Math.floor(Math.random()*8000+2000); log('TimeoutSuresiAl → '+v+' ms'); }
function toGir(){ const v=document.getElementById('timeout-gir').value.trim(); if(!v){log('Timeout Süresi Gir → Değer boş');return;} log('TimeoutSuresiGir → '+v+' ms ayarlandı'); document.getElementById('timeout-gir').value=''; }

// ── BİLGİ AL ──
function bilgiAl(){
  const json={
    "sistem"   : "X-Ray Controller",
    "durum"    : "AKTİF",
    "ip"       : "192.168.1.100",
    "port"     : 8080,
    "xrayPower": xrpN%2===1 ? "ON" : "OFF",
    "interlock": { "1": ilCounts[1]%2===1?"TRUE":"FALSE", "2": ilCounts[2]%2===1?"TRUE":"FALSE" },
    "motorPower": mN%2===1 ? "ON" : "OFF",
    "buzzer"   : bN%2===1 ? "TRUE" : "FALSE",
    "flashor"  : fN%2===1 ? "ON" : "OFF",
    "timestamp": new Date().toLocaleString('tr-TR')
  };
  log('Bilgi Al → JSON:\n'+JSON.stringify(json,null,2));
}

// ── BUZZER ──
let bN=0;
function toggleBuzzer(b){
  bN++;
  if(bN%2===1){
    setTrue(b,'Buzzer'); log('Buzzer → TRUE');
    if(typeof KontrolKarti !== 'undefined') KontrolKarti.IslemYap_Buzzer(true);
  } else {
    setFalse(b,'Buzzer'); log('Buzzer → FALSE');
    if(typeof KontrolKarti !== 'undefined') KontrolKarti.IslemYap_Buzzer(false);
  }
}

// ── FLASHOR ──
let fN=0;
function toggleFlashor(b){
  fN++;
  if(fN%2===1){
    setOn(b,'Flashor'); log('Flashor → ON');
    if(typeof KontrolKarti !== 'undefined') KontrolKarti.IslemYap_Flashor(true);
  } else {
    setOff(b,'Flashor'); log('Flashor → OFF');
    if(typeof KontrolKarti !== 'undefined') KontrolKarti.IslemYap_Flashor(false);
  }
}

// ── MOTOR POWER ──
let mN=0;
function toggleMotor(b){
  mN++;
  if(mN%2===1){
    setOn(b,'MotorPower'); log('MotorPower → ON');
    if(typeof KontrolKarti !== 'undefined') KontrolKarti.IslemYap_MotorPower(true);
  } else {
    setOff(b,'MotorPower'); log('MotorPower → OFF');
    if(typeof KontrolKarti !== 'undefined') KontrolKarti.IslemYap_MotorPower(false);
  }
}

// ── KAYDET ──
function kaydet(){ const content=document.getElementById('out').value; if(!content.trim()){log('Kaydet → Log boş');return;} const blob=new Blob([content],{type:'text/plain'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='log_'+new Date().toLocaleDateString('tr-TR').replace(/\./g,'-')+'.txt'; a.click(); log('Log dosyası kaydedildi.'); }

// ── INPUT KORUMA ──
document.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('mousedown', e => e.stopPropagation());
  el.addEventListener('click', e => { e.stopPropagation(); el.focus(); });
});

log('Bağlantı kuruldu → 192.168.1.100:8080');
