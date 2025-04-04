document.addEventListener('DOMContentLoaded', function() {
    // DOM elementlerini seç
    const player1Photo = document.getElementById('player1-photo');
    const player2Photo = document.getElementById('player2-photo');
    const player1Elo = document.getElementById('player1-elo');
    const player2Elo = document.getElementById('player2-elo');
    const player1Team = document.getElementById('player1-team');
    const player2Team = document.getElementById('player2-team');

    // İstatistik elementleri
    const player1Stats = {
        goals: document.getElementById('player1-goals'),
        assists: document.getElementById('player1-assists'),
        matches: document.getElementById('player1-matches'),
        position: document.getElementById('player1-position')
    };

    const player2Stats = {
        goals: document.getElementById('player2-goals'),
        assists: document.getElementById('player2-assists'),
        matches: document.getElementById('player2-matches'),
        position: document.getElementById('player2-position')
    };

    // Örnek oyuncu verileri (gerçek uygulamada API'den gelecek)
    const players = [
        { 
            id: 1, 
            name: "Oyuncu 1", 
            elo: 1500, 
            team: "Takım A",
            stats: {
                goals: 15,
                assists: 10,
                matches: 25,
                position: "Forvet"
            }
        },
        { 
            id: 2, 
            name: "Oyuncu 2", 
            elo: 1600, 
            team: "Takım B",
            stats: {
                goals: 8,
                assists: 15,
                matches: 22,
                position: "Orta Saha"
            }
        },
        { 
            id: 3, 
            name: "Oyuncu 3", 
            elo: 1450, 
            team: "Takım C",
            stats: {
                goals: 5,
                assists: 8,
                matches: 20,
                position: "Defans"
            }
        }
    ];

    // Oyuncu bilgilerini güncelle
    function updatePlayerInfo(playerId, eloElement, teamElement, statsObj) {
        const player = players.find(p => p.id === parseInt(playerId));
        if (player) {
            eloElement.textContent = player.elo;
            teamElement.textContent = player.team;
            
            // İstatistikleri güncelle
            statsObj.goals.textContent = player.stats.goals;
            statsObj.assists.textContent = player.stats.assists;
            statsObj.matches.textContent = player.stats.matches;
            statsObj.position.textContent = player.stats.position;
        } else {
            eloElement.textContent = '-';
            teamElement.textContent = '-';
            
            // İstatistikleri sıfırla
            Object.values(statsObj).forEach(element => {
                element.textContent = '-';
            });
        }
    }

    // Oyuncu kartlarına tıklama efekti
    document.querySelectorAll('.player-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.player-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});