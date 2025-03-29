const LEVEL_IMAGES = {
    1: {
      active: 'pics/gamevan.png',
      completed: 'pics/gamevan3.png'
    },
    2: {
      active: 'pics/gamedwa2.png',
      completed: 'pics/gamedwa3.png',
      locked: 'pics/gamedwa.png'
    }
  };

const redImages = [
    'pics/smth.png',
    'pics/smth2.png',
    'pics/smth3.png'
];

const blueImages = [
    'pics/obl1.png',
    'pics/obl2.png',
    'pics/obl3.png'
];

const dangerImages = [
    'pics/danger.png',
]

let score = 0;
        let gameActive = false;
        let intervals = [];

        function getRandomImage(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        document.getElementById('startBtn').addEventListener('click', () => {
            document.getElementById('modal').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
            startGame();
        });

        function closeGame() {
            document.getElementById('modal').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
            resetGame();
        }

        function createRedSquare() {
            const square = document.createElement('div');
            square.className = 'red-square';
            square.style.backgroundImage = `url('${getRandomImage(redImages)}')`;
            square.style.left = `${Math.random() * (window.innerWidth * 0.8 - 60)}px`;
            square.style.top = `${Math.random() * (window.innerHeight * 0.7 - 60)}px`;

            square.addEventListener('click', () => {
                score++;
                document.getElementById('score').textContent = `Очищено: ${score}`;
                square.style.transform = 'scale(1.2)';
                setTimeout(() => square.remove(), 200);
                if(score >= 20) showWin();
            });

            document.getElementById('gameContainer').appendChild(square);
        }

        function createBlueSquare() {
            const square = document.createElement('div');
            square.className = 'blue-square';
            square.style.backgroundImage = `url('${getRandomImage(blueImages)}')`;
            square.style.top = `${Math.random() * (window.innerHeight * 0.7 - 60)}px`;
            document.getElementById('gameContainer').appendChild(square);
        }

        function createDanger() {
            if (!gameActive) return; 
            
            const danger = document.createElement('div');
            danger.className = 'danger';
            danger.style.backgroundImage = `url('${getRandomImage(dangerImages)}')`;
            danger.style.left = `${Math.random() * (window.innerWidth * 0.8 - 60)}px`;
            danger.style.top = `${Math.random() * (window.innerHeight * 0.7 - 60)}px`;
        
            const dangerTimeout = setTimeout(() => {
                danger.remove();
            }, 5000);
        
            danger.addEventListener('click', () => {
                score = Math.max(0, score - 2);
                document.getElementById('score').textContent = `Очищено: ${score}`;
                danger.style.transform = 'scale(1.2) rotate(45deg)';
                
                clearTimeout(dangerTimeout);
                setTimeout(() => danger.remove(), 200);
            });
        
            document.getElementById('gameContainer').appendChild(danger);
        }
    
        function showWin() {
            alert('Облачка были зачищены, хорошая работа!');
            closeGame();
        }

        function resetGame() {
            score = 0;
            gameActive = false;
            intervals.forEach(clearInterval);
            intervals = [];
            document.getElementById('gameContainer').innerHTML = '';
            document.getElementById('score').textContent = 'Очищено: 0';
        }

         function startGame() {
            resetGame();
            gameActive = true;
            intervals.push(setInterval(() => gameActive && createRedSquare(), 1500));
            intervals.push(setInterval(() => gameActive && createBlueSquare(), 1000));
            intervals.push(setInterval(() => gameActive && createDanger(), 7000)); // Появление каждые 7 секунд
        }
