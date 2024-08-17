let score = 100;
const scoreDisplay = document.getElementById('score');
let enemySpeed = 3; // 초기 적 속도
let spawnInterval = 2000; // 적 생성 주기
let gameStarted = false; // 게임 시작 여부를 체크하는 변수

function spawnEnemy() {
    if (gameStarted == false) return; // 게임이 시작되지 않았다면 적을 생성하지 않음

    const enemyCount = Math.floor(Math.random() * 5) + 1; // 1부터 5까지 랜덤한 적 수
    for (let i = 0; i < enemyCount; i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.style.top = Math.random() * (370) + 'px'; // 랜덤 높이
        enemy.style.right = '0px'; // 초기 위치를 오른쪽으로 설정

        document.getElementById('game-area').appendChild(enemy);

        // 적이 왼쪽으로 이동
        const interval = setInterval(() => {
            const enemyRight = parseInt(window.getComputedStyle(enemy).getPropertyValue('right'));
            if (enemyRight > 710) { // 타워에 닿을 때 (710으로 변경)
                score -= 10;
                scoreDisplay.innerText = '점수: ' + score;
                checkGameOver();
                clearInterval(interval);
                enemy.remove();
            } else {
                enemy.style.right = enemyRight + enemySpeed + 'px'; // 적이 왼쪽으로 이동
            }
        }, 20);

        // 적 클릭 시 제거 및 점수 증가
        enemy.addEventListener('click', () => {
            clearInterval(interval);
            enemy.style.transform = 'scale(1.5)'; // 클릭 시 애니메이션 효과
            score += 10; // 적을 죽였을 때 점수 증가
            scoreDisplay.innerText = '점수: ' + score; // 점수 업데이트
            checkVictory(); // 승리 체크
            setTimeout(() => {
                enemy.remove();
            }, 200);
        });
    }
}

// 승리 체크 함수
function checkVictory() {
    if (score >= 600) {
        endGame(true); // 승리 시 게임 종료
    }
}

// 적 생성 주기 설정
setInterval(spawnEnemy, spawnInterval);

// 적의 속도를 점차 증가시키기 위한 설정
setInterval(() => {
    if (!gameStarted) return; // 게임이 시작되지 않았다면 속도 증가하지 않음
    enemySpeed += 0.1; // 속도를 조금씩 증가
    if (spawnInterval > 1000) { // 생성 주기도 조금씩 줄이기
        spawnInterval -= 50;
    }
}, 5000); // 5초마다 속도 증가

// 게임 오버 체크 함수
function checkGameOver() {
    if (score <= 0) {
        endGame(false); // 게임 오버 시 게임 종료
    }
}

// 게임 종료 함수
function endGame(victory) {
    gameStarted = false; // 게임 상태를 종료로 설정
    document.getElementById('game-area').style.display = 'none';
    if (victory) {
        document.getElementById('victory-screen').style.display = 'block'; // 승리 화면 표시
    } else {
        document.getElementById('game-over').style.display = 'block'; // 게임 오버 화면 표시
    }
}

// 게임 시작 버튼 클릭 시 게임 시작
document.getElementById('start-btn').addEventListener('click', () => {
    score = 100; // 점수 초기화
    scoreDisplay.innerText = '점수: ' + score; // 점수 표시 업데이트
    enemySpeed = 3; // 초기 적 속도로 재설정
    spawnInterval = 2000; // 초기 적 생성 주기로 재설정
    gameStarted = true; // 게임 시작 상태로 설정

    document.getElementById('start-screen').style.display = 'none'; // 시작 화면 숨기기
    document.getElementById('game-area').style.display = 'block'; // 게임 영역 표시
});

// 다시 하기 버튼 클릭 시 게임 재시작
document.querySelectorAll('#restart-btn').forEach(button => {
    button.addEventListener('click', () => {
        // 게임 상태 초기화
        score = 100;
        scoreDisplay.innerText = '점수: ' + score;
        enemySpeed = 3; // 초기 적 속도로 재설정
        spawnInterval = 2000;

        // 게임 영역 및 화면 조정
        document.getElementById('game-area').style.display = 'block';
        document.getElementById('game-over').style.display = 'none'; // 게임 오버 화면 숨기기
        document.getElementById('victory-screen').style.display = 'none'; // 승리 화면 숨기기
        document.getElementById('start-screen').style.display = 'none'; // 시작 화면 숨기기

        // 기존의 적 제거
        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => enemy.remove());
    });
});
