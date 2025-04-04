document.addEventListener('DOMContentLoaded', function() {
  // Kayıt seçenekleri arasında geçiş
  const optionBtns = document.querySelectorAll('.option-btn');
  const registerPanels = document.querySelectorAll('.register-panel');
  
  optionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Aktif butonu değiştir
      optionBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // İlgili paneli göster
      const targetPanel = this.getAttribute('data-target');
      registerPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === targetPanel) {
          panel.classList.add('active');
        }
      });
    });
  });
  
  // Şifre göster/gizle fonksiyonu
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const passwordField = this.parentElement.querySelector('input');
      const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordField.setAttribute('type', type);
      
      // İkon değişimi
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  });
  
  // Şifre gücü kontrolü
  const passwordInput = document.getElementById('password');
  const strengthMeter = document.querySelector('.strength-meter');
  const strengthBar = document.querySelector('.strength-bar');
  const strengthText = document.querySelector('.strength-text');
  
  if (passwordInput && strengthMeter) {
    passwordInput.addEventListener('input', function() {
      const password = this.value;
      const strength = checkPasswordStrength(password);
      
      // Önceki sınıfları temizle
      strengthMeter.classList.remove('weak', 'medium', 'strong', 'very-strong');
      
      if (password.length === 0) {
        strengthBar.style.width = '0';
        strengthText.textContent = 'Şifre Gücü';
      } else {
        // Şifre gücüne göre çubuğu ve metni güncelle
        if (strength === 1) {
          strengthMeter.classList.add('weak');
          strengthText.textContent = 'Zayıf';
        } else if (strength === 2) {
          strengthMeter.classList.add('medium');
          strengthText.textContent = 'Orta';
        } else if (strength === 3) {
          strengthMeter.classList.add('strong');
          strengthText.textContent = 'Güçlü';
        } else if (strength === 4) {
          strengthMeter.classList.add('very-strong');
          strengthText.textContent = 'Çok Güçlü';
        }
      }
    });
  }
  
  // Kayıt formu gönderimi
  const registerForm = document.getElementById('registerForm');
  const registerMessage = document.getElementById('registerMessage');
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form verilerini al
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const birthDate = document.getElementById('birthDate').value;
      const terms = document.getElementById('terms').checked;
      const newsletter = document.getElementById('newsletter').checked;
      
      // Form doğrulama
      if (!firstName || !lastName || !email || !password || !confirmPassword || !birthDate) {
        showMessage('Lütfen tüm zorunlu alanları doldurun.', 'error');
        return;
      }
      
      // Email formatı doğrulama
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage('Lütfen geçerli bir email adresi girin.', 'error');
        return;
      }
      
      // Şifre uzunluğu kontrolü
      if (password.length < 8) {
        showMessage('Şifre en az 8 karakter olmalıdır.', 'error');
        return;
      }
      
      // Şifre gücü kontrolü
      const passwordStrength = checkPasswordStrength(password);
      if (passwordStrength < 2) {
        showMessage('Lütfen daha güçlü bir şifre belirleyin. Büyük harf, küçük harf, rakam ve özel karakter içermelidir.', 'error');
        return;
      }
      
      // Şifre eşleşme kontrolü
      if (password !== confirmPassword) {
        showMessage('Girdiğiniz şifreler eşleşmiyor.', 'error');
        return;
      }
      
      // Yaş kontrolü (en az 13 yaş)
      const today = new Date();
      const birthDateObj = new Date(birthDate);
      const age = today.getFullYear() - birthDateObj.getFullYear();
      const monthDiff = today.getMonth() - birthDateObj.getMonth();
      
      if (age < 13 || (age === 13 && monthDiff < 0)) {
        showMessage('Kayıt olmak için en az 13 yaşında olmalısınız.', 'error');
        return;
      }
      
      // Kullanım şartları kontrolü
      if (!terms) {
        showMessage('Kayıt olmak için kullanım koşullarını ve gizlilik politikasını kabul etmelisiniz.', 'error');
        return;
      }
      
      // Normalde burada bir API isteği olurdu, şimdilik simüle ediyoruz
      simulateRegistration(firstName, lastName, email, password, birthDate, newsletter);
    });
  }
  
  // Sosyal medya butonları
  const socialBtns = document.querySelectorAll('.social-btn');
  
  socialBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const provider = this.classList.contains('google') ? 'Google' : 
                       this.classList.contains('facebook') ? 'Facebook' : 'Twitter';
      
      // Sosyal medya kayıt simülasyonu
      simulateSocialRegistration(provider);
    });
  });
  
  // Mesaj gösterme fonksiyonu
  function showMessage(message, type) {
    registerMessage.textContent = message;
    registerMessage.className = 'form-message';
    
    if (type === 'error') {
      registerMessage.classList.add('error-message');
    } else if (type === 'success') {
      registerMessage.classList.add('success-message');
    }
    
    // Otomatik mesaj temizleme
    setTimeout(() => {
      registerMessage.textContent = '';
      registerMessage.className = 'form-message';
    }, 5000);
  }
  
  // Şifre gücü kontrolü
  function checkPasswordStrength(password) {
    let strength = 0;
    
    // Boş şifre
    if (password.length === 0) {
      return strength;
    }
    
    // Şifre uzunluğu
    if (password.length >= 8) {
      strength += 1;
    }
    
    // Büyük harf kontrolü
    if (/[A-Z]/.test(password)) {
      strength += 1;
    }
    
    // Küçük harf kontrolü
    if (/[a-z]/.test(password)) {
      strength += 1;
    }
  }
});