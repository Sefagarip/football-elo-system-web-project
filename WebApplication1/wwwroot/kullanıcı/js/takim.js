document.addEventListener('DOMContentLoaded', function() {
    // Takım Elo Trend Grafiği
    const teamTrendCtx = document.getElementById('teamEloTrendChart').getContext('2d');
    const teamTrendChart = new Chart(teamTrendCtx, {
      type: 'line',
      data: {
        labels: [], // API'den alınacak tarih veya dönem etiketleri
        datasets: [{
          label: 'Takım Elo Puanı',
          data: [], // API'den çekilecek elo puan verileri
          borderColor: '#1a73e8',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  
    // Trend periyodu değişikliği dinleyicisi
    document.getElementById('team-trend-period').addEventListener('change', function(e) {
      updateTeamTrend(e.target.value);
    });
  });
  
  // Trend güncelleme fonksiyonu (API entegrasyonu burada yapılabilir)
  function updateTeamTrend(period) {
    // API'den veri çekme ve grafiği güncelleme işlemleri burada yapılacak
    console.log("Takım trend periyodu güncellendi: " + period);
  }
  