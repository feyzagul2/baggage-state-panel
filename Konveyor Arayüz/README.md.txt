📦 Konveyör Module - Baggage State Panel

Modern ve modüler yapıda geliştirilen **Konveyör Module**, ana proje olan Baggage State Panel yapısının alt modüllerinden biri olarak hazırlanmıştır.

Bu modül; konveyör sisteminin motor kontrolü, seriport yönetimi, ölçüm okuma, hata yönetimi ve durum takibini daha düzenli ve hızlı şekilde yönetmek amacıyla geliştirilmiştir.

🚀 Proje Hakkında

Baggage State Panel, bagaj sistemlerinde kullanılan farklı bileşenleri tek panel üzerinden yönetmek amacıyla tasarlanmış modüler bir yapıdır.

Bu repoda yer alan çalışma ise sistemin alt modüllerinden biri olan **Konveyör** ekranıdır.

Konveyör modülü sayesinde:

- Sorgu ve timeout süreleri ayarlanabilir
- Seriport bağlantısı açılıp kapatılabilir
- Motor başlatma ve durdurma işlemleri yapılabilir
- Anlık ölçüm değerleri okunabilir
- Hata durumları yönetilebilir
- Sistem durumu anlık takip edilebilir

🧩 Ana Sistem İçerisindeki Yeri

Bu modül aşağıdaki yapı içerisinde yer almaktadır:

- ⚙️ KontrolKartı
- 🔋 UPS
- 🗄️ DbManager
- 📦 Konveyör ✅
- 📝 Logger

**Bu projede geliştirilen bölüm: Konveyör**

📦 Konveyör Modülü Özellikleri

Windows tarzı sürüklenebilir ve taşınabilir pencere yapısında geliştirilmiştir.

⏱️ Sorgu & Timeout Ayarları
- Sorgu süresi girme ve alma
- Timeout süresi girme ve alma
- ms cinsinden hassas zamanlama kontrolü

🔌 Seriport
- Seriport bağlantısını açma / kapatma
- Seriport bilgisi görüntüleme
- Anlık bilgi alma

⚙️ Motor Kontrol
- Motor başlatma
- Motor durdurma
- Motor bağlantı durumu görüntüleme

 📊 Ölçüm Okuma
- Motor akım okuma
- Motor gerilim okuma
- DC Bus gerilim okuma
- Sıcaklık okuma
- Enkoder hız okuma

⚠️ Hata Yönetimi
- Hata kodu okuma
- Hata nedeni görüntüleme
- Hata reset işlemi

📡 Statüs
- Status okuma
- Status mesajı görüntüleme

✨ Özellikler

- 🪟 Windows formatında hareket ettirilebilir form
- 🎯 Sürüklenebilir pencere sistemi
- 🧾 Çıktı / Log ekranı
- ⚡ Hızlı erişim butonları
- 🎨 Tarafımdan tasarlanan özel arayüz
- 📋 Düzenli ve sade kullanım yapısı
- 🛠️ Modüler geliştirilebilir sistem


💻 Kullanılan Teknolojiler

- HTML5
- CSS3
- JavaScript

🎯 Proje Amacı

Bu çalışma, staj sürecinde gerçek bir sistem ihtiyacından doğmuş ve sıfırdan tasarlanarak hayata geçirilmiştir. daha düzenli, hızlı erişilebilir ve profesyonel yönetim ekranı geliştirmek amacıyla hazırlanmıştır.

Bagaj sistemleri; hız, hassasiyet ve kesintisiz çalışma gerektiren kritik altyapılardır.
Bu projedeki her modül, o altyapının tam kalbinde yer alır.

Konveyör Kontrol Paneli; motor yönetiminden seriport iletişimine, anlık ölçüm okumadan hata müdahalesine kadar tüm kritik işlemleri *tek bir profesyonel arayüzde* toplar.

Dağınık, erişimi zor ve hata yapmaya açık sistemlerin yerini; **hızlı, güvenilir ve tam kontrol sağlayan** bir yapı alır.

📂 Dosya Yapısı

konveyor-module/
│── index.html
│── style.css
│── script.js
│── README.md
```

🔮 Gelecek Güncellemeler

- Gerçek zamanlı motor durum takibi
- Otomatik hata bildirimi
- Ölçüm geçmişi grafikleri
- Tema desteği
- Raporlama ekranı


👨‍💻 Developer

**Feyza Gül**