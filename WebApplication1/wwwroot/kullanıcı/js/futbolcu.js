document.addEventListener('DOMContentLoaded', function() {
    // Futbolcu Elo Trend Grafiği
    const playerTrendCtx = document.getElementById('playerEloTrendChart').getContext('2d');
    const playerTrendChart = new Chart(playerTrendCtx, {
      type: 'line',
      data: {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
        datasets: [{
          label: 'Erling Haaland',
          data: [2100, 2120, 2115, 2140, 2145, 2150],
          borderColor: '#1a73e8',
          tension: 0.4,
          fill: false
        },
        {
          label: 'Kylian Mbappé',
          data: [2090, 2100, 2110, 2125, 2128, 2130],
          borderColor: '#34a853',
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Futbolcu Elo Puanı Değişimi'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 2000,
            max: 2200
          }
        }
      }
    });
  
    // Trend periyodu değişikliği dinleyicisi
    document.getElementById('player-trend-period').addEventListener('change', function(e) {
      updatePlayerTrend(e.target.value);
    });
  
    // Ülke menüsü açılıp kapanma animasyonu
    const countryLinks = document.querySelectorAll('.country-link');
    countryLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const leagueList = this.nextElementSibling;
        if (leagueList) {
          leagueList.style.display = leagueList.style.display === 'none' ? 'block' : 'none';
          const icon = this.querySelector('.fa-chevron-right');
          icon.style.transform = leagueList.style.display === 'none' ? 'rotate(0deg)' : 'rotate(90deg)';
        }
      });
    });
  });
  
  // Trend güncelleme fonksiyonu (API entegrasyonu burada yapılabilir)
  function updatePlayerTrend(period) {
    console.log('Seçilen periyot:', period);
  }
  