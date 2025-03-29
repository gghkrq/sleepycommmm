
function openGame() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    startGame(); 
}

function closeGame() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    resetGame(); 
}


function startGame() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '<div id="target">Кликни меня!</div>';

    let score = 0;
    const target = document.getElementById('target');

    target.style.cssText = `
        width: 50px;
        height: 50px;
        background: ;
        position: absolute;
        cursor: pointer;
    `;

    target.addEventListener('click', () => {
        score++;
        target.style.left = Math.random() * 550 + 'px';
        target.style.top = Math.random() * 350 + 'px';
        target.textContent = `Счет: ${score}`;
    });
}

function resetGame() {
    document.getElementById('gameArea').innerHTML = '';
}

// Закрытие по клику вне окна
window.onclick = function(event) {
    if (event.target == document.getElementById('overlay')) {
        closeGame();
    }
}




