// Kullanıcı Artış Grafiği
const userGrowthChart = new Chart(
    document.getElementById('userGrowthChart'),
    {
        type: 'line',
        data: {
            labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
            datasets: [{
                label: 'Yeni Kullanıcılar',
                data: [65, 78, 90, 120, 145, 172],
                fill: false,
                borderColor: '#1a73e8',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    }
);

// En Yüksek Elo Puanları Grafiği
const topEloChart = new Chart(
    document.getElementById('topEloChart'),
    {
        type: 'bar',
        data: {
            labels: ['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Trabzonspor', 'Başakşehir'],
            datasets: [{
                label: 'Elo Puanı',
                data: [1850, 1830, 1810, 1790, 1770],
                backgroundColor: [
                    '#1a73e8',
                    '#34a853',
                    '#fbbc05',
                    '#ea4335',
                    '#9c27b0'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    }
);

// Mobil menü toggle fonksiyonu
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.top-bar').prepend(menuToggle);

    menuToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });
}); 