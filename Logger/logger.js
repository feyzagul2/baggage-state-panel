class TLoggerForm {
  constructor() {
    this.win = document.getElementById('window');
    this.bar = document.getElementById('titlebar');
    if (!this.win || !this.bar) {
      console.error('TLoggerForm: Gerekli DOM elementleri bulunamadı.');
      return;
    }
    this.ox = 0;
    this.oy = 0;
    this.isMin = false;
    this.savedLeft = '';
    this.savedTop = '';
    this.savedWidth = '';
    this.savedHeight = '';
    this.isMax = false;   
    this.prevStyle = '';
    this.loglar = [];
    this.resizing = false;
    this.startY = 0;       
    this.startH = 0;
    this.drag = false;

    this.mc = document.getElementById('mc');
    this.edPanel = document.getElementById('editor-panel');

    // ── SCROLL HIZI ──
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.style.scrollBehavior = 'unset';
      scrollArea.addEventListener('wheel', e => {
        e.preventDefault();
        e.stopPropagation();
        scrollArea.scrollTop += e.deltaY > 0 ? 2000 : -2000;
      }, { passive: false });
    }

    this.log('Logger başlatıldı.');

    // ── SÜRÜKLEME ──
    this.bar.addEventListener('mousedown', e => {
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT'].includes(e.target.tagName) ||
        e.target.classList.contains('wc')) return;
      this.drag = true;
      const rect = this.win.getBoundingClientRect();
      this.ox = e.clientX - rect.left;
      this.oy = e.clientY - rect.top;
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (this.drag) {
        this.win.style.left = Math.max(-300, Math.min(window.innerWidth - 200, e.clientX - this.ox)) + 'px';
        this.win.style.top  = Math.max(0, Math.min(window.innerHeight - 40, e.clientY - this.oy)) + 'px';
      }
      if (this.resizing) {
        // Çubuk aşağıdan yukarı doğru editor'ı büyütür
        const newH = Math.max(80, Math.min(window.innerHeight * 0.7, this.startH + (this.startY - e.clientY)));
        this.edPanel.style.height = newH + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      this.drag = false;
      this.resizing = false;
      document.body.style.cursor = '';
    });

    const handle = document.getElementById('resize-handle');
    if (handle && this.edPanel) {
      handle.addEventListener('mousedown', e => {
        this.resizing = true;
        this.startY = e.clientY;
        this.startH = this.edPanel.offsetHeight;
        document.body.style.cursor = 'ns-resize';
        e.preventDefault();
        e.stopPropagation();
      });
    }

    // ── INPUT KORUMA ──
    
    document.querySelectorAll('input,textarea,select').forEach(el => {
      el.addEventListener('click', e => { e.stopPropagation(); el.focus(); });
    });
  }

  toggleMin=function() {
    const sb = this.win.querySelector('.statusbar');
    if (!this.isMin) {
      this.savedLeft   = this.win.style.left   || '40px';
      this.savedTop    = this.win.style.top    || '20px';
      this.savedWidth  = this.win.style.width  || '1020px';
      this.savedHeight = this.win.style.height || '96vh';
      
      if (this.mc) this.mc.style.display = 'none';
      if (sb) sb.style.display = 'none';
      this.win.style.transition = 'all 0.3s ease';
      this.win.style.width  = '220px';
      this.win.style.height = '36px';
      this.win.style.left   = '10px';
      this.win.style.top    = (window.innerHeight - 46) + 'px';
      this.isMin = true;
    } else {
      if (this.mc) this.mc.style.display = '';
      if (sb) sb.style.display = '';
      this.win.style.transition = 'all 0.3s ease';
      this.win.style.width  = this.savedWidth;
      this.win.style.height = this.savedHeight;
      this.win.style.left   = this.savedLeft;
      this.win.style.top    = this.savedTop;
      this.isMin = false;
    }
  }

  toggleMax=function() {
    if (!this.isMax) {
      this.prevStyle = this.win.style.cssText;
      this.win.style.cssText = 'position:absolute;top:0;left:0;width:100vw;height:100vh;border-radius:0;transition:all 0.3s ease;';
      this.isMax = true;
    } else {
      this.win.style.cssText = this.prevStyle;
      this.isMax = false;
    }
  }

  v=function(id) {
    const el = document.getElementById(id);
    if (!el) { console.warn(`TLoggerForm.v: '${id}' bulunamadı`); return '—'; }
    return el.value.trim() || '—';
  }

  log=function(msg) {
    const ed = document.getElementById('out');
    const t  = new Date().toLocaleTimeString('tr-TR');
    if (ed) {
      ed.value += `[${t}]  ${msg}\n`;
      ed.scrollTop = ed.scrollHeight;
    }
  }

  kaydet=function() {
    const c = document.getElementById('out').value;
    if (!c.trim()) {
      this.log('Kaydet → boş'); 
      return;
    }
    const b = new Blob([c], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = 'log_' + new Date().toLocaleDateString('tr-TR').replace(/\./g, '-') + '.txt';
    a.click();
    this.log('Kaydedildi.');
  }

  badge=function(tip) {
    const safe = String(tip).replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
    if (tip === 'INFO')    return '<span class="badge-info">INFO</span>';
    if (tip === 'WARN')    return '<span class="badge-warn">WARN</span>';
    if (tip === 'ERROR')   return '<span class="badge-err">ERROR</span>';
    if (tip === 'SUCCESS') return '<span class="badge-ok">SUCCESS</span>';
    return `<span class="badge-info">${safe}</span>`;
  }

  tabloGuncelle=function() {
    const tbody = document.getElementById('log-tbody');
    if (!tbody) return;

    if (!this.loglar.length) {
      tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;color:#484f58;padding:20px">Henüz log yok</td></tr>';
      document.getElementById('log-count').textContent = '0 kayıt';
      return;
    }

    tbody.innerHTML = this.loglar.slice().reverse().map((l, i) =>
      `<tr>
        <td style="color:#484f58">${this.loglar.length - i}</td>
        <td>${l.zaman}</td>
        <td>${this.badge(l.logTipi)}</td>
        <td title="${l.bilgi}">${l.bilgi.length > 25 ? l.bilgi.substring(0, 25) + '…' : l.bilgi}</td>
        <td>${l.program}</td>
        <td>${l.userAdi}</td>
        <td>${l.methodAdi}</td>
        <td>${l.ip_isteyen}</td>
        <td>${l.ip_istenen}</td>
        <td style="text-align:center">${l.oncelik}</td>
        <td style="text-align:center">${l.timeout}</td>
      </tr>`
    ).join('');

    document.getElementById('log-count').textContent = this.loglar.length + ' kayıt';
  }

  logYaz=function() {
    const k = {
      zaman:       new Date().toLocaleTimeString('tr-TR'),
      bilgi:       this.v('lw-bilgi'),
      program:     this.v('lw-program'),
      userAdi:     this.v('lw-useradi'),
      methodAdi:   this.v('lw-method'),
      param:       this.v('lw-param'),
      returnCevap: this.v('lw-return'),
      logTipi:     document.getElementById('lw-logtipi').value,
      ip_istenen:  this.v('lw-ipistenen'),
      ip_isteyen:  this.v('lw-ipisteyen'),
      oncelik:     this.v('lw-oncelik'),
      timeout:     this.v('lw-timeout'),
    };
    this.loglar.push(k);
    this.tabloGuncelle();
    this.log(`Log yazıldı → [${k.logTipi}] ${k.bilgi} | ${k.program} | ${k.methodAdi}`);
  }

  logGetir=function() {
    this.tabloGuncelle(); 
    this.log('Yenilendi → ' + this.loglar.length + ' kayıt'); 
  }

  logListTemizle=function() {
    this.loglar = [];
    this.tabloGuncelle();
    this.log('Liste temizlendi');
  }

  formTemizle() {
    ['lw-bilgi', 'lw-program', 'lw-useradi', 'lw-method', 'lw-param',
      'lw-return', 'lw-ipistenen', 'lw-ipisteyen', 'lw-oncelik',
      'lw-timeout'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('lw-logtipi').value = 'INFO';
    this.log('Form temizlendi');
  }
  
}

