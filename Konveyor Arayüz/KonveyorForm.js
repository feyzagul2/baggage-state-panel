// KonveyorForm.js — Standalone (BaseForm bağımlılığı kaldırıldı)

class TKonveyorForm {
  constructor() {
    this.id     = 'konveyor';
    this.title  = 'Konveyor — Kontrol Paneli';
    this.icon   = '⚙';
    this.version = 'v1.0.0';

    this._build();
    this._initDrag();
    this._initResize();

    this.log('Konveyor Kontrol Paneli başlatıldı.');
  }

  // ════════════════════════════════════════
  //  PENCERE OLUŞTURMA
  // ════════════════════════════════════════
  _build() {
    // Ana pencere
    this.win = document.createElement('div');
    this.win.className = 'window';
    this.win.style.left   = '40px';
    this.win.style.top    = '20px';
    this.win.style.width  = '1100px';
    this.win.style.height = '96vh';

    // Titlebar
    const tb = document.createElement('div');
    tb.className = 'titlebar';

    const tl = document.createElement('div');
    tl.className = 'tl';

    const ticon = document.createElement('div');
    ticon.className = 'ticon';
    ticon.textContent = this.icon;

    const ttitle = document.createElement('span');
    ttitle.className = 'ttitle';
    ttitle.textContent = this.title;

    tl.appendChild(ticon);
    tl.appendChild(ttitle);

    const wcs = document.createElement('div');
    wcs.className = 'wcs';

    const wcX = document.createElement('button');
    wcX.className = 'wc wc-x';
    wcX.title = 'Kapat';
    wcX.onclick = () => this.win.remove();

    const wcN = document.createElement('button');
    wcN.className = 'wc wc-n';
    wcN.title = 'Küçült';

    const wcM = document.createElement('button');
    wcM.className = 'wc wc-m';
    wcM.title = 'Büyüt';

    wcs.appendChild(wcX);
    wcs.appendChild(wcN);
    wcs.appendChild(wcM);

    tb.appendChild(tl);
    tb.appendChild(wcs);

    // Sürüm bilgisi
    const ver = document.createElement('span');
    ver.className = 'si';
    ver.style.marginLeft = 'auto';
    ver.textContent = this.version;

    // Ana içerik
    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';

    // Scroll alanı
    this.scrollArea = document.createElement('div');
    this.scrollArea.className = 'scroll-area';

    // Editor panel
    this.editorPanel = document.createElement('div');
    this.editorPanel.className = 'editor-panel';

    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resize-handle';

    const editorHead = document.createElement('div');
    editorHead.className = 'editor-head';

    const edotEl = document.createElement('span');
    edotEl.className = 'etitle';
    edotEl.innerHTML = '<span style="width:6px;height:6px;border-radius:50%;background:#39d0d8;display:inline-block;box-shadow:0 0 6px #39d0d8"></span> ÇIKTI / LOG EKRANI';

    const eclrBtn = document.createElement('button');
    eclrBtn.className = 'eclr';
    eclrBtn.textContent = 'Temizle';
    eclrBtn.onclick = () => { this.outEl.value = ''; };

    editorHead.appendChild(edotEl);
    editorHead.appendChild(eclrBtn);

    this.outEl = document.createElement('textarea');
    this.outEl.className = 'out';
    this.outEl.readOnly = true;

    this.editorPanel.appendChild(resizeHandle);
    this.editorPanel.appendChild(editorHead);
    this.editorPanel.appendChild(this.outEl);

    // Status bar
    const statusBar = document.createElement('div');
    statusBar.className = 'statusbar';

    const si1 = document.createElement('span');
    si1.className = 'si';
    si1.innerHTML = '<span class="sdot"></span> Hazır';

    const si2 = document.createElement('span');
    si2.className = 'si';
    si2.textContent = '● Konveyör Kontrol';

    statusBar.appendChild(si1);
    statusBar.appendChild(si2);

    mainContent.appendChild(this.scrollArea);
    mainContent.appendChild(this.editorPanel);
    mainContent.appendChild(statusBar);

    this.win.appendChild(tb);
    this.win.appendChild(mainContent);

    document.body.appendChild(this.win);

    // İçeriği oluştur
    this.buildBody(this.scrollArea);

    // Resize handle
    this._initEditorResize(resizeHandle);
  }

  // ── Pencere sürükleme ───────────────────
  _initDrag() {
    const tb = this.win.querySelector('.titlebar');
    let dragging = false, ox = 0, oy = 0;

    tb.addEventListener('mousedown', e => {
      if (e.target.classList.contains('wc')) return;
      dragging = true;
      ox = e.clientX - this.win.offsetLeft;
      oy = e.clientY - this.win.offsetTop;
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      this.win.style.left = (e.clientX - ox) + 'px';
      this.win.style.top  = (e.clientY - oy) + 'px';
    });

    document.addEventListener('mouseup', () => {
      dragging = false;
      document.body.style.userSelect = '';
    });
  }

  // ── Pencere boyutlandırma ───────────────
  _initResize() {
    const handle = document.createElement('div');
    handle.style.cssText = 'position:absolute;right:0;bottom:0;width:14px;height:14px;cursor:se-resize;z-index:10;';
    this.win.style.position = 'absolute';
    this.win.appendChild(handle);

    let resizing = false, sx = 0, sy = 0, sw = 0, sh = 0;

    handle.addEventListener('mousedown', e => {
      resizing = true;
      sx = e.clientX; sy = e.clientY;
      sw = this.win.offsetWidth; sh = this.win.offsetHeight;
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!resizing) return;
      this.win.style.width  = Math.max(400, sw + e.clientX - sx) + 'px';
      this.win.style.height = Math.max(300, sh + e.clientY - sy) + 'px';
    });

    document.addEventListener('mouseup', () => { resizing = false; });
  }

  // ── Editor panel resize ─────────────────
  _initEditorResize(handle) {
    let resizing = false, startY = 0, startH = 0;

    handle.addEventListener('mousedown', e => {
      resizing = true;
      startY = e.clientY;
      startH = this.editorPanel.offsetHeight;
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!resizing) return;
      const newH = Math.max(80, startH - (e.clientY - startY));
      this.editorPanel.style.height = newH + 'px';
    });

    document.addEventListener('mouseup', () => { resizing = false; });
  }

  // ════════════════════════════════════════
  //  YARDIMCI DOM
  // ════════════════════════════════════════
  _makeCard(colorKey, dotColor, title) {
    const card = document.createElement('div');
    card.className = 'card c-' + colorKey;

    const head = document.createElement('div');
    head.className = 'card-head';

    const dot = document.createElement('span');
    dot.className = 'cdot cdot-' + dotColor;

    const cht = document.createElement('span');
    cht.className = 'chtitle chtitle-' + dotColor;
    cht.textContent = title.toUpperCase();

    head.appendChild(dot);
    head.appendChild(cht);

    const body = document.createElement('div');
    body.className = 'card-body';

    card.appendChild(head);
    card.appendChild(body);

    this.scrollArea.appendChild(card);
    return body;
  }

  _inlineRow(parent) {
    const row = document.createElement('div');
    row.className = 'sub inline-row';
    parent.appendChild(row);
    return row;
  }

  _lbl(parent, text) {
    const s = document.createElement('span');
    s.className = 'lbl';
    s.textContent = text;
    parent.appendChild(s);
    return s;
  }

  _input(parent, id, placeholder) {
    const inp = document.createElement('input');
    inp.className = 'vinp';
    inp.id = id;
    inp.placeholder = placeholder || '';
    parent.appendChild(inp);
    return inp;
  }

  _btn(parent, colorClass, label, onClick) {
    const btn = document.createElement('button');
    btn.className = 'cb ' + colorClass;
    btn.textContent = label;
    btn.addEventListener('click', onClick);
    parent.appendChild(btn);
    return btn;
  }

  _outVal(parent, text) {
    const s = document.createElement('span');
    s.className = 'out-val';
    s.textContent = text;
    parent.appendChild(s);
    return s;
  }

  log(msg) {
    const now = new Date();
    const t = now.toTimeString().slice(0, 8);
    this.outEl.value += '[' + t + ']  ' + msg + '\n';
    this.outEl.scrollTop = this.outEl.scrollHeight;
  }

  panelAc() {
    this.win.style.display = 'flex';
  }

  // ════════════════════════════════════════
  //  DOM İÇERİĞİ
  // ════════════════════════════════════════
  buildBody(scrollArea) {
    this._buildSorguTimeout(scrollArea);
    this._buildSeriport(scrollArea);
    this._buildMotor(scrollArea);
    this._buildOlcum(scrollArea);
    this._buildHata(scrollArea);
    this._buildStatus(scrollArea);
  }

  _buildSorguTimeout(scrollArea) {
    const body = this._makeCard('blue', 'blue', 'Sorgu & Timeout Ayarları');

    const rSorgu = this._inlineRow(body);
    this._lbl(rSorgu, 'SorguSuresiGir');
    this.inpSorgu = this._input(rSorgu, 'sorgu', 'ms');
    this.inpSorgu.type = 'number';
    this.inpSorgu.min  = '0';
    this._btn(rSorgu, 'b-blue', 'Gir',           () => this.cmdSorguSuresiGir());
    this._btn(rSorgu, 'b-cyan', 'SorguSuresiAl', () => this.cmdSorguSuresiAl());
    this.valSorgu = this._outVal(rSorgu, '—');

    const rTimeout = this._inlineRow(body);
    this._lbl(rTimeout, 'TimeoutSuresiGir');
    this.inpTimeout = this._input(rTimeout, 'timeout', 'ms');
    this.inpTimeout.type = 'number';
    this.inpTimeout.min  = '0';
    this._btn(rTimeout, 'b-blue', 'Gir',             () => this.cmdTimeoutSuresiGir());
    this._btn(rTimeout, 'b-cyan', 'TimeoutSuresiAl', () => this.cmdTimeoutSuresiAl());
    this.valTimeout = this._outVal(rTimeout, '—');
  }

  _buildSeriport(scrollArea) {
    const body = this._makeCard('cyan', 'cyan', 'Seriport');

    const rDurum = this._inlineRow(body);
    this._lbl(rDurum, 'SeriportDurum');
    this._btn(rDurum, 'b-green', 'Aç',    () => this.cmdSeriportAc());
    this._btn(rDurum, 'b-red',   'Kapat', () => this.cmdSeriportKapat());
    this.valSeriportDurum = this._outVal(rDurum, '—');

    const rBilgi = this._inlineRow(body);
    this._lbl(rBilgi, 'SeriportBilgi');
    this._btn(rBilgi, 'b-cyan', 'SeriportBilgi', () => this.cmdSeriportBilgi());
    this.valSeriportBilgi = this._outVal(rBilgi, '—');

    const rBilgiAl = this._inlineRow(body);
    this._lbl(rBilgiAl, 'BilgiAl');
    this._btn(rBilgiAl, 'b-cyan', 'BilgiAl', () => this.cmdBilgiAl());
    this.valBilgiAl = this._outVal(rBilgiAl, '');
  }

  _buildMotor(scrollArea) {
    const body = this._makeCard('green', 'green', 'Motor Kontrol');

    const rMotor = this._inlineRow(body);
    this._lbl(rMotor, 'Motor');
    this._btn(rMotor, 'b-green', 'MotorBaslat', () => this.cmdMotorBaslat());
    this._btn(rMotor, 'b-red',   'MotorDurdur', () => this.cmdMotorDurdur());

    const rBag = this._inlineRow(body);
    this._lbl(rBag, 'MotorBaglantiDurum');
    this._btn(rBag, 'b-cyan', 'MotorBaglantiDurum', () => this.cmdMotorBaglantiDurum());
    this.valMotorBag = this._outVal(rBag, '');
  }

  _buildOlcum(scrollArea) {
    const body = this._makeCard('orange', 'orange', 'Ölçüm Okuma');

    const rows = [
      { lbl: 'MotorAkimOku',    btn: 'MotorAkimOku',    cb: () => this.cmdMotorAkimOku(),    ref: 'valAkim'     },
      { lbl: 'MotorGerilimOku', btn: 'MotorGerilimOku', cb: () => this.cmdMotorGerilimOku(), ref: 'valGerilim'  },
      { lbl: 'DcBusGerilimOku', btn: 'DcBusGerilimOku', cb: () => this.cmdDcBusGerilimOku(), ref: 'valDcBus'    },
      { lbl: 'SicaklikOku',     btn: 'SicaklikOku',     cb: () => this.cmdSicaklikOku(),     ref: 'valSicaklik' },
      { lbl: 'EnkoderHizOku',   btn: 'EnkoderHizOku',   cb: () => this.cmdEnkoderHizOku(),   ref: 'valEnkoder'  },
    ];

    rows.forEach(r => {
      const row = this._inlineRow(body);
      this._lbl(row, r.lbl);
      this._btn(row, 'b-orange', r.btn, r.cb);
      this[r.ref] = this._outVal(row, '');
    });
  }

  _buildHata(scrollArea) {
    const body = this._makeCard('red', 'red', 'Hata Yönetimi');

    const rKod = this._inlineRow(body);
    this._lbl(rKod, 'HataKoduOku');
    this._btn(rKod, 'b-red', 'HataKoduOku', () => this.cmdHataKoduOku());
    this.valHataKodu = this._outVal(rKod, '');

    const rNeden = this._inlineRow(body);
    this._lbl(rNeden, 'HataNedeni');
    this._btn(rNeden, 'b-red', 'HataNedeni', () => this.cmdHataNedeni());
    this.valHataNeden = this._outVal(rNeden, '');

    const rReset = this._inlineRow(body);
    this._lbl(rReset, 'HataReset');
    this._btn(rReset, 'b-pink', 'HataReset', () => this.cmdHataReset());
  }

  _buildStatus(scrollArea) {
    const body = this._makeCard('purple', 'purple', 'Status');

    const rOku = this._inlineRow(body);
    this._lbl(rOku, 'StatusOku');
    this._btn(rOku, 'b-purple', 'StatusOku', () => this.cmdStatusOku());
    this.valStatusKod = this._outVal(rOku, '—');

    const rMesaj = this._inlineRow(body);
    this._lbl(rMesaj, 'StatusMesaj');
    this._btn(rMesaj, 'b-purple', 'StatusMesaj', () => this.cmdStatusMesaj());
    this.valStatusMesaj = this._outVal(rMesaj, '—');
  }

  // ════════════════════════════════════════
  //  YARDIMCI — async komut sarmalayıcı
  // ════════════════════════════════════════
  async _run(label, apiFn, outEl) {
    this.log(label + ' → isteniyor...');
    if (outEl) outEl.textContent = '...';
    try {
      const cevap = await apiFn();
      const deger = (cevap === null || cevap === undefined) ? '—'
                  : (typeof cevap === 'object' ? JSON.stringify(cevap) : String(cevap));
      if (outEl) outEl.textContent = deger;
      this.log(label + ' → ' + deger);
    } catch (e) {
      if (outEl) outEl.textContent = 'HATA';
      this.log(label + ' → HATA: ' + e.message);
    }
  }

  // ════════════════════════════════════════
  //  KOMUTLAR
  // ════════════════════════════════════════
  async cmdSorguSuresiGir() {
    const v = this.inpSorgu.value;
    if (!v) { this.log('SorguSuresiGir → değer girilmedi'); return; }
    await this._run('SorguSuresiGir(' + v + ')', () => Konveyor.SorguSuresiGir(parseInt(v)), null);
  }
  async cmdSorguSuresiAl() {
    await this._run('SorguSuresiAl', () => Konveyor.SorguSuresiAl(), this.valSorgu);
  }
  async cmdTimeoutSuresiGir() {
    const v = this.inpTimeout.value;
    if (!v) { this.log('TimeoutSuresiGir → değer girilmedi'); return; }
    await this._run('TimeoutSuresiGir(' + v + ')', () => Konveyor.TimeoutSuresiGir(parseInt(v)), null);
  }
  async cmdTimeoutSuresiAl() {
    await this._run('TimeoutSuresiAl', () => Konveyor.TimeoutSuresiAl(), this.valTimeout);
  }
  async cmdSeriportAc() {
    await this._run('SeriportDurum(true)', () => Konveyor.SeriportDurum(true), this.valSeriportDurum);
  }
  async cmdSeriportKapat() {
    await this._run('SeriportDurum(false)', () => Konveyor.SeriportDurum(false), this.valSeriportDurum);
  }
  async cmdSeriportBilgi() {
    await this._run('SeriportBilgi', () => Konveyor.SeriportBilgi(), this.valSeriportBilgi);
  }
  async cmdBilgiAl() {
    await this._run('BilgiAl', () => Konveyor.BilgiAl(), this.valBilgiAl);
  }
  async cmdMotorBaslat() {
    await this._run('MotorBaslat', () => Konveyor.MotorBaslat(), null);
  }
  async cmdMotorDurdur() {
    await this._run('MotorDurdur', () => Konveyor.MotorDurdur(), null);
  }
  async cmdMotorBaglantiDurum() {
    await this._run('MotorBaglantiDurum', () => Konveyor.MotorBaglantiDurum(), this.valMotorBag);
  }
  async cmdMotorAkimOku() {
    await this._run('MotorAkimOku', () => Konveyor.MotorAkimOku(), this.valAkim);
  }
  async cmdMotorGerilimOku() {
    await this._run('MotorGerilimOku', () => Konveyor.MotorGerilimOku(), this.valGerilim);
  }
  async cmdDcBusGerilimOku() {
    await this._run('DcBusGerilimOku', () => Konveyor.DcBusGerilimOku(), this.valDcBus);
  }
  async cmdSicaklikOku() {
    await this._run('SicaklikOku', () => Konveyor.SicaklikOku(), this.valSicaklik);
  }
  async cmdEnkoderHizOku() {
    await this._run('EnkoderHizOku', () => Konveyor.EnkoderHizOku(), this.valEnkoder);
  }
  async cmdHataKoduOku() {
    await this._run('HataKoduOku', () => Konveyor.HataKoduOku(), this.valHataKodu);
  }
  async cmdHataNedeni() {
    await this._run('HataNedeni', () => Konveyor.HataNedeni(), this.valHataNeden);
  }
  async cmdHataReset() {
    await this._run('HataReset', () => Konveyor.HataReset(), null);
  }
  async cmdStatusOku() {
    await this._run('StatusOku', () => Konveyor.StatusOku(), this.valStatusKod);
  }
  async cmdStatusMesaj() {
    await this._run('StatusMesaj', () => Konveyor.StatusMesaj(), this.valStatusMesaj);
  }
}

window.TKonveyorForm = TKonveyorForm;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    window.KonveyorForm = new TKonveyorForm();
    window.KonveyorForm.panelAc();
  });
} else {
  window.KonveyorForm = new TKonveyorForm();
  window.KonveyorForm.panelAc();
}
