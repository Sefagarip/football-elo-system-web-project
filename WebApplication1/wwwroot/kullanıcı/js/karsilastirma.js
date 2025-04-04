document.addEventListener('DOMContentLoaded', function() {
    // Değişkenler
    const typeButtons = document.querySelectorAll('.type-btn');
    const searchInputs = [document.getElementById('search1'), document.getElementById('search2')];
    const searchResults = [document.getElementById('results1'), document.getElementById('results2')];
    const selectedItems = [document.getElementById('selected1'), document.getElementById('selected2')];
    let currentType = 'team'; // Varsayılan: Takım karşılaştırması
    let selectedEntities = [null, null];
  
    // Karşılaştırma türü değişikliği
    typeButtons.forEach(button => {
      button.addEventListener('click', function() {
        typeButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        currentType = this.dataset.type;
        resetSelections();
        updatePlaceholders();
      });
    });
  
    // Arama işlemleri
    searchInputs.forEach((input, index) => {
      input.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length >= 2) {
          showSearchResults(index, query);
        } else {
          hideSearchResults(index);
        }
      });
  
      // Arama sonuçları dışında tıklandığında sonuçları gizle
      document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !searchResults[index].contains(e.target)) {
          hideSearchResults(index);
        }
      });
    });
  
    // Arama sonuçlarını göster
    function showSearchResults(index, query) {
      const results = searchEntities(query);
      searchResults[index].innerHTML = '';
      
      results.forEach(entity => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
          <img src="${entity.image}" alt="${entity.name}">
          <span>${entity.name}</span>
        `;
        resultItem.addEventListener('click', () => selectEntity(index, entity));
        searchResults[index].appendChild(resultItem);
      });
      searchResults[index].classList.add('active');
    }
  
    // Arama sonuçlarını gizle
    function hideSearchResults(index) {
      searchResults[index].classList.remove('active');
    }
  
    // Varlık seçimi
    function selectEntity(index, entity) {
      selectedEntities[index] = entity;
      selectedItems[index].innerHTML = `
        <div class="selected-content">
          <img src="${entity.image}" alt="${entity.name}" style="width: 50px; height: 50px; border-radius: 50%;">
          <h4>${entity.name}</h4>
          <p>Elo: ${entity.elo}</p>
        </div>
      `;
      selectedItems[index].classList.add('active');
      hideSearchResults(index);
      searchInputs[index].value = '';
  
      // Her iki seçim yapıldıysa karşılaştırmayı göster
      if (selectedEntities[0] && selectedEntities[1]) {
        updateComparison();
      }
    }
  
    // Seçimleri sıfırla
    function resetSelections() {
      selectedEntities = [null, null];
      selectedItems.forEach(item => {
        item.innerHTML = '<div class="placeholder">Henüz seçim yapılmadı</div>';
        item.classList.remove('active');
      });
      searchInputs.forEach(input => input.value = '');
      hideChart();
    }
  
    // Placeholder güncellemesi
    function updatePlaceholders() {
      const placeholder = currentType === 'team' ? 'Takım ara...' : 'Oyuncu ara...';
      searchInputs.forEach(input => input.placeholder = placeholder);
    }
  
    // Karşılaştırma grafiğini güncelle
    function updateComparison() {
      const ctx = document.getElementById('comparisonChart').getContext('2d');
      const period = document.getElementById('comparison-period').value;
      
      // Örnek veri - gerçek uygulamada API'den alınacak
      const data = {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
        datasets: [
          {
            label: selectedEntities[0].name,
            data: generateRandomData(6),
            borderColor: '#1a73e8',
            tension: 0.4,
            fill: false
          },
          {
            label: selectedEntities[1].name,
            data: generateRandomData(6),
            borderColor: '#34a853',
            tension: 0.4,
            fill: false
          }
        ]
      };
  
      if (window.comparisonChart) {
        window.comparisonChart.destroy();
      }
  
      window.comparisonChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 1800,
              max: 2200
            }
          }
        }
      });
  
      updateStats();
    }
  
    // İstatistikleri güncelle (örnek)
    function updateStats() {
      const statsGrid = document.getElementById('statsGrid');
      const stats = generateComparisonStats();
      
      statsGrid.innerHTML = stats.map(stat => `
        <div class="stat-item">
          <span class="stat-label">${stat.label}</span>
          <div class="stat-values">
            <span class="stat-value">${stat.value1}</span>
            <span class="stat-value">${stat.value2}</span>
          </div>
        </div>
      `).join('');
    }
  
    // Grafiği gizle
    function hideChart() {
      const statsGrid = document.getElementById('statsGrid');
      statsGrid.innerHTML = '';
      if (window.comparisonChart) {
        window.comparisonChart.destroy();
      }
    }
  
    // Örnek veri oluşturma fonksiyonları
    function searchEntities(query) {
      // Örnek veri - gerçek uygulamada API'den alınacak
      const entities = currentType === 'team' ? [
        { id: 1, name: 'Manchester City', image: '../images/teams/manchester-city.png', elo: 2150 },
        { id: 2, name: 'Real Madrid', image: '../images/teams/real-madrid.png', elo: 2130 },
        { id: 3, name: 'Bayern Münih', image: '../images/teams/bayern.png', elo: 2110 }
      ] : [
        { id: 1, name: 'Erling Haaland', image: '../images/players/haaland.png', elo: 2150 },
        { id: 2, name: 'Kylian Mbappé', image: '../images/players/mbappe.png', elo: 2130 },
        { id: 3, name: 'Jude Bellingham', image: '../images/players/bellingham.png', elo: 2110 }
      ];
      return entities.filter(entity => entity.name.toLowerCase().includes(query.toLowerCase()));
    }
  
    function generateRandomData(count) {
      return Array.from({ length: count }, () => Math.floor(Math.random() * (2200 - 1800) + 1800));
    }
  
    function generateComparisonStats() {
      if (currentType === 'team') {
        return [
          { label: 'Toplam Maç', value1: '38', value2: '36' },
          { label: 'Galibiyet', value1: '28', value2: '25' },
          { label: 'Beraberlik', value1: '6', value2: '7' },
          { label: 'Mağlubiyet', value1: '4', value2: '4' },
          { label: 'Attığı Gol', value1: '85', value2: '70' },
          { label: 'Yediği Gol', value1: '25', value2: '30' }
        ];
      } else {
        return [
          { label: 'Maç Sayısı', value1: '35', value2: '32' },
          { label: 'Gol', value1: '28', value2: '25' },
          { label: 'Asist', value1: '8', value2: '12' },
          { label: 'Dakika', value1: '3150', value2: '2880' },
          { label: 'Sarı Kart', value1: '4', value2: '6' },
          { label: 'Kırmızı Kart', value1: '0', value2: '1' }
        ];
      }
    }
  
    // Periyot değişikliği dinleyicisi
    document.getElementById('comparison-period').addEventListener('change', function() {
      if (selectedEntities[0] && selectedEntities[1]) {
        updateComparison();
      }
    });
  });
  