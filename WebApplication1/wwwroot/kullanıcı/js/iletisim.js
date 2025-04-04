document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links (header içindeki menü için)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  
    // Admin İletişim Formu İşlemleri
    const form = document.getElementById('adminContactForm');
    const formMessage = document.getElementById('formMessage');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
  
      // Form verilerini alalım
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
  
      // Basit form doğrulaması
      if (name === "" || email === "" || subject === "" || message === "") {
        formMessage.textContent = "Lütfen tüm alanları doldurun.";
        formMessage.style.color = "var(--danger-color)";
        return;
      }
  
      // Burada form verilerinin sunucuya gönderimi gerçekleştirilebilir.
      // Örneğin AJAX ile POST isteği gönderilebilir. Bu örnekte simülasyon yapıyoruz.
      formMessage.textContent = "Mesajınız başarıyla gönderildi!";
      formMessage.style.color = "var(--success-color)";
  
      // Formu temizleyelim
      form.reset();
    });
  
    // Feature kartları ve diğer hover efektleri (varsa)
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
      });
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  });
  