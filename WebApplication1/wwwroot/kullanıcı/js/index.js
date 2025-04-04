document.addEventListener('DOMContentLoaded', function() {
    // Arama kutusu işlevselliği
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
  
    searchButton.addEventListener('click', function() {
      performSearch(searchBox.value);
    });
  
    searchBox.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch(searchBox.value);
      }
    });
  
    // İstatistik kartları için hover animasyonu
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  
    // Hızlı erişim kartları için hover animasyonu
    const quickLinks = document.querySelectorAll('.quick-link-card');
    quickLinks.forEach(link => {
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
      });
      link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  
    // Maç kartları için hover efekti
    const matchCards = document.querySelectorAll('.match-card');
    matchCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    });
  });
  
  // Arama fonksiyonu
  function performSearch(query) {
    if (query.trim() === '') {
      alert('Lütfen bir arama terimi girin');
      return;
    }
    
    // Burada API'ye istek atılacak (örnek simülasyon)
    console.log('Arama yapılıyor:', query);
  }
  