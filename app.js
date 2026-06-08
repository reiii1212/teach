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

// ヘッダーのプルダウンから選択されたページへ遷移する
// ヘッダーのプルダウンから選択されたページへ遷移する
function navigateTo(url) {
    if (!url) return;
    try {
        localStorage.setItem('lastExample', url);
    } catch (e) {
        // ignore
    }
    window.location.href = url;
}

// ページ読み込み時に前回選択を復元する（自動遷移はしない）
document.addEventListener('DOMContentLoaded', function() {
    const sel = document.getElementById('examples-select');
    if (!sel) return;
    try {
        const last = localStorage.getItem('lastExample');
        if (last) sel.value = last;
    } catch (e) {
        // ignore
    }
});

// -----------------------------
// 類題タブ機能
// -----------------------------
(function(){
    function getRelatedKey(pageId){ return 'related:' + pageId; }

    const DEFAULTS = {
        'prob_ex1': [
            {title: '例題1 ステップ2', url: 'prob_ex1_step2.html', difficulty: '初級'},
            {title: '例題1 ステップ3', url: 'prob_ex1_step3.html', difficulty: '中級'}
        ],
        'prob_ex2': [
            {title: '例題2 ステップ2', url: 'prob_ex2_step2.html', difficulty: '初級'},
            {title: '例題2 ステップ3', url: 'prob_ex2_step3.html', difficulty: '中級'}
        ],
        'prob_ex3': [
            {title: '例題3 ステップ2', url: 'prob_ex3_step2.html', difficulty: '初級'},
            {title: '例題3 ステップ3', url: 'prob_ex3_step3.html', difficulty: '中級'}
        ]
    };

    function loadRelated(pageId){
        try{
            const raw = localStorage.getItem(getRelatedKey(pageId));
            if(raw) return JSON.parse(raw);
        }catch(e){}
        return DEFAULTS[pageId] ? JSON.parse(JSON.stringify(DEFAULTS[pageId])) : [];
    }

    function saveRelated(pageId, arr){
        try{ localStorage.setItem(getRelatedKey(pageId), JSON.stringify(arr)); }catch(e){}
    }

    function renderRelated(pageId, containerId){
        const container = document.getElementById(containerId);
        if(!container) return;
        const list = loadRelated(pageId);
        const html = [];
        html.push('<div class="related-tabs">');
        html.push('<div class="related-list" role="tablist">');
        list.forEach((it, idx)=>{
            html.push(`
                <div class="related-item" data-idx="${idx}">
                    <a href="${it.url}" class="related-link">${it.title}</a>
                    <span class="difficulty-badge">${it.difficulty}</span>
                    <select class="difficulty-select" data-idx="${idx}" aria-label="難易度変更">
                        <option value="初級" ${it.difficulty==='初級'?'selected':''}>初級</option>
                        <option value="中級" ${it.difficulty==='中級'?'selected':''}>中級</option>
                        <option value="上級" ${it.difficulty==='上級'?'selected':''}>上級</option>
                    </select>
                    <button class="remove-related" data-idx="${idx}" title="削除">✖</button>
                </div>
            `);
        });
        html.push('</div>');

        // 追加フォーム
        html.push(`
            <form class="add-related" onsubmit="return false;">
                <input type="text" name="title" placeholder="類題タイトル" required />
                <input type="text" name="url" placeholder="URL（同ディレクトリ内）" required />
                <select name="difficulty">
                    <option value="初級">初級</option>
                    <option value="中級">中級</option>
                    <option value="上級">上級</option>
                </select>
                <button type="button" class="btn-add">追加</button>
            </form>
        `);

        html.push('</div>');
        container.innerHTML = html.join('\n');

        // イベント接続
        container.querySelectorAll('.difficulty-select').forEach(sel=>{
            sel.addEventListener('change', function(e){
                const idx = Number(this.dataset.idx);
                const arr = loadRelated(pageId);
                arr[idx].difficulty = this.value;
                saveRelated(pageId, arr);
                renderRelated(pageId, containerId);
            });
        });

        container.querySelectorAll('.remove-related').forEach(btn=>{
            btn.addEventListener('click', function(){
                const idx = Number(this.dataset.idx);
                const arr = loadRelated(pageId);
                arr.splice(idx,1);
                saveRelated(pageId, arr);
                renderRelated(pageId, containerId);
            });
        });

        const addBtn = container.querySelector('.btn-add');
        if(addBtn){
            addBtn.addEventListener('click', function(){
                const form = this.closest('form');
                const title = form.title.value.trim();
                const url = form.url.value.trim();
                const difficulty = form.difficulty.value;
                if(!title||!url) return;
                const arr = loadRelated(pageId);
                arr.push({title, url, difficulty});
                saveRelated(pageId, arr);
                form.reset();
                renderRelated(pageId, containerId);
            });
        }
    }

    // 公開関数
    window.renderRelatedTabs = renderRelated;
})();
