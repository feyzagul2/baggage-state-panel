📝 Logger Module - Baggage State Panel

Modern ve modüler yapıda geliştirilen **Logger Module**, ana proje olan Baggage State Panel yapısının alt modüllerinden biri olarak hazırlanmıştır.

Bu modül; sistem loglarını yazma, listeleme, filtreleme ve JSON formatında görüntüleme işlemlerini daha düzenli ve hızlı şekilde yönetmek amacıyla geliştirilmiştir.

🚀 Proje Hakkında

Baggage State Panel, bagaj sistemlerinde kullanılan farklı bileşenleri tek panel üzerinden yönetmek amacıyla tasarlanmış modüler bir yapıdır.

Bu repoda yer alan çalışma ise sistemin alt modüllerinden biri olan **Logger** ekranıdır.

Logger modülü sayesinde:

- Sisteme log kaydı yazılabilir
- Geçmiş loglar listelenebilir ve filtrelenebilir
- JSON formatında log görüntülenebilir
- Kullanıcı adı, method, IP ve program bazlı arama yapılabilir
- Operasyon süreçleri kayıt altına alınır

🧩 Ana Sistem İçerisindeki Yeri

Bu modül aşağıdaki yapı içerisinde yer almaktadır:

- ⚙️ KontrolKartı
- 🔋 UPS
- 🗄️ DbManager
- 📦 Konveyör
- 📝 Logger ✅

**Bu projede geliştirilen bölüm: Logger**

📝 Logger Modülü Özellikleri

Windows tarzı sürüklenebilir ve taşınabilir pencere yapısında geliştirilmiştir.

📋 Log Yaz
- Sisteme yeni log kaydı ekleme
- Kullanıcı adı, method, IP ve program bilgisi ile kayıt
- Hızlı log yazma butonları

🗂️ JSON
- Log verilerini JSON formatında görüntüleme
- Yapılandırılmış veri çıktısı
- Okunabilir format desteği

🔍 Log Getir
- Geçmiş loglara erişim
- İçerik bazlı arama yapabilme
- Filtreleme ile hızlı erişim

📃 Log Listele
- Tüm log kayıtları tek ekranda listelenir
- Her log kaydında şu bilgiler görüntülenir:
  - Kullanıcı adı
  - Method adı
  - İstenen IP
  - Alınan IP
  - Program
  - Bilgi
  - Return cevabı
  - Log tipi
  - Timeout süresi
  - Öncelik seviyesi

 ✨ Özellikler

- 🪟 Windows formatında hareket ettirilebilir form
- 🎯 Sürüklenebilir pencere sistemi
- 🧾 Çıktı / Log editörü
- ⚡ Hızlı erişim butonları
- 🎨 Tarafımdan tasarlanan özel arayüz
- 📋 Düzenli ve sade kullanım yapısı
- 🛠️ Modüler geliştirilebilir sistem

💻 Kullanılan Teknolojiler

- HTML5
- CSS3
- JavaScript

🎯 Proje Amacı

Bu çalışma, staj sürecinde bagaj sistemlerinde kullanılabilecek daha düzenli, hızlı erişilebilir ve profesyonel yönetim ekranı geliştirmek amacıyla hazırlanmıştır.

📂 Dosya Yapısı

logger-module/
│── index.html
│── style.css
│── script.js
│── README.md

🔮 Gelecek Güncellemeler

- Gerçek zamanlı log takibi
- Log export (CSV / PDF) desteği
- Otomatik log temizleme
- Tema desteği
- Gelişmiş filtreleme seçenekleri

👨‍💻 Developer

**Feyza Gül**