document.addEventListener('DOMContentLoaded', function() {
  // Giriş seçenekleri arasında geçiş
  const optionBtns = document.querySelectorAll('.option-btn');
  const loginPanels = document.querySelectorAll('.login-panel');
  
  optionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Aktif butonu değiştir
      optionBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // İlgili paneli göster
      const targetPanel = this.getAttribute('data-target');
      loginPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === targetPanel) {
          panel.classList.add('active');
        }
      });
    });
  });
  
  // Şifre göster/gizle fonksiyonu
  const togglePasswordBtn = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // İkon değişimi
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  }
  
  // Giriş formu gönderimi
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form verilerini al
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;
      
      // Form doğrulama
      if (!email || !password) {
        showMessage('Lütfen tüm alanları doldurun.', 'error');
        return;
      }
      
      // Email formatı doğrulama
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage('Lütfen geçerli bir email adresi girin.', 'error');
        return;
      }
      
      // Şifre minimum uzunluk kontrolü
      if (password.length < 6) {
        showMessage('Şifre en az 6 karakter olmalıdır.', 'error');
        return;
      }
      
      // Normalde burada bir API isteği olurdu, şimdilik simüle ediyoruz
      simulateLogin(email, password, remember);
    });
  }
  
  // Sosyal medya butonları
  const socialBtns = document.querySelectorAll('.social-btn');
  
  socialBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const provider = this.classList.contains('google') ? 'Google' : 
                       this.classList.contains('facebook') ? 'Facebook' : 'Twitter';
      
      // Sosyal medya girişi simülasyonu
      simulateSocialLogin(provider);
    });
  });
  
  // Mesaj gösterme fonksiyonu
  function showMessage(message, type) {
    loginMessage.textContent = message;
    loginMessage.className = 'form-message';
    
    if (type === 'error') {
      loginMessage.classList.add('error-message');
    } else if (type === 'success') {
      loginMessage.classList.add('success-message');
    }
    
    // Otomatik mesaj temizleme
    setTimeout(() => {
      loginMessage.textContent = '';
      loginMessage.className = 'form-message';
    }, 5000);
  }
  
  // Giriş simülasyonu
  function simulateLogin(email, password, remember) {
    // Yükleniyor efekti
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Giriş Yapılıyor...';
    submitBtn.disabled = true;
    
    // API isteği simülasyonu
    setTimeout(() => {
      // Demo kullanıcı bilgileri
      if (email === 'demo@example.com' && password === 'password123') {
        showMessage('Giriş başarılı! Yönlendiriliyorsunuz...', 'success');
        
        // Hatırla seçeneği kontrolü
        if (remember) {
          localStorage.setItem('rememberedUser', email);
        } else {
          localStorage.removeItem('rememberedUser');
        }
        
        // Ana sayfaya yönlendirme
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      } else {
        showMessage('Hatalı email veya şifre. Lütfen tekrar deneyin.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    }, 1500);
  }
  
  // Sosyal medya girişi simülasyonu
  function simulateSocialLogin(provider) {
    showMessage(`${provider} ile giriş yapılıyor...`, 'success');
    
    // API isteği simülasyonu
    setTimeout(() => {
      showMessage(`${provider} kimlik doğrulama başarılı! Yönlendiriliyorsunuz...`, 'success');
      
      // Ana sayfaya yönlendirme
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }, 2000);
  }
  
  // Hatırlanan kullanıcıyı form alanlarına doldur
  const rememberedUser = localStorage.getItem('rememberedUser');
  if (rememberedUser && document.getElementById('email')) {
    document.getElementById('email').value = rememberedUser;
    document.getElementById('remember').checked = true;
  }
});
