/**
 * 分数形式の採点ロジック
 */
function checkFractionAnswer(correctNum, correctDen) {
    const numInput = document.getElementById('num-input').value.trim();
    const denInput = document.getElementById('den-input').value.trim();
    const feedback = document.getElementById('feedback');
    const nextAction = document.getElementById('next-action');
    const nextLinkContainer = document.getElementById('next-link-container');

    if (!numInput || !denInput) {
        alert("分子と分母の両方を入力してね！");
        return;
    }

    if (numInput === String(correctNum) && denInput === String(correctDen)) {
        feedback.innerHTML = "<span style='color: #e74c3c; font-size: 1.5rem;'>💮 正解！</span>";
        if (nextAction) nextAction.style.display = "block";
        if (nextLinkContainer) nextLinkContainer.style.display = "block";
    } else {
        feedback.innerHTML = "<span style='color: #3498db;'>残念、もう一度計算してみよう！</span>";
    }
}

/**
 * 例題1：サイコロの和
 */
function startDiceAnimationSimple() {
    const d1 = document.getElementById('dice1');
    const d2 = document.getElementById('dice2');
    const sumText = document.getElementById('dice-sum');
    const info = document.getElementById('animation-info');
    info.innerText = "サイコロを振っています...";
    let count = 0;
    const interval = setInterval(() => {
        const v1 = Math.floor(Math.random() * 6) + 1;
        const v2 = Math.floor(Math.random() * 6) + 1;
        d1.innerText = v1; d2.innerText = v2;
        count++;
        if (count > 10) {
            clearInterval(interval);
            const sum = v1 + v2;
            sumText.innerText = `和: ${sum}`;
            info.innerHTML = sum === 7 ? "和が7になりました！ <span style='color:red'>成功！</span>" : `今回の和は ${sum} でした。`;
        }
    }, 100);
}

/**
 * 例題2：少なくとも1個は1
 */
function startDiceAnimationEx2() {
    const d1 = document.getElementById('dice1');
    const d2 = document.getElementById('dice2');
    const info = document.getElementById('animation-info');
    info.innerText = "サイコロを振っています...";
    let count = 0;
    const interval = setInterval(() => {
        const v1 = Math.floor(Math.random() * 6) + 1;
        const v2 = Math.floor(Math.random() * 6) + 1;
        d1.innerText = v1; d2.innerText = v2;
        count++;
        if (count > 10) {
            clearInterval(interval);
            if (v1 === 1 || v2 === 1) {
                info.innerHTML = "1が出ました！ <span style='color:red'>成功！</span>";
            } else {
                info.innerText = "1は出ませんでした。";
            }
        }
    }, 100);
}

/**
 * 例題3：玉の取り出し
 */
function drawBalls() {
    const res = document.getElementById('draw-result');
    res.innerText = "取り出しています...";
    setTimeout(() => {
        const balls = ["赤", "赤", "赤", "白", "白"];
        const picked = [];
        const tempBalls = [...balls];
        for(let i=0; i<2; i++) {
            const idx = Math.floor(Math.random() * tempBalls.length);
            picked.push(tempBalls.splice(idx, 1)[0]);
        }
        res.innerText = `結果: 【${picked[0]}】 と 【${picked[1]}】`;
        if (picked[0] === "赤" && picked[1] === "赤") {
            res.innerHTML += " <span style='color:red'>2個とも赤！</span>";
        }
    }, 500);
}
