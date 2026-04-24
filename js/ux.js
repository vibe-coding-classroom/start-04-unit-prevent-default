/**
 * Vibe Controller UX Logic
 * 任務：透過 JS 攔截預設行為，讓網頁操作更像原生 App
 */

const knob = document.getElementById('joystick-knob');
const lastAction = document.getElementById('last-action');
const lockStatus = document.getElementById('lock-status');

// 1. 遙控器模擬邏輯 (基礎操作)
const buttons = document.querySelectorAll('.ctrl-btn');
buttons.forEach(btn => {
    btn.addEventListener('touchstart', (e) => {
        // TODO: 這裡是否需要攔截預設行為？
        lastAction.innerText = `按下按鈕 ${btn.innerText}`;
        btn.style.boxShadow = '0 0 15px var(--accent-color)';
    });

    btn.addEventListener('touchend', (e) => {
        btn.style.boxShadow = 'none';
    });
});

// 2. 搖桿滑動邏輯 (核心挑戰)
// 提示：現代瀏覽器預設 touch 事件為 passive: true，
// 若要使用 preventDefault() 攔截捲動，必須正確配置監聽器。

knob.addEventListener('touchstart', (e) => {
    lastAction.innerText = '開始操控搖桿';
    knob.style.cursor = 'grabbing';
});

// TODO: 任務 1 - 實作 touchmove 攔截
// 目標：當手指在搖桿上移動時，頁面不應該發生捲動或橡皮筋回彈
knob.addEventListener('touchmove', (e) => {
    // 學員實作區
    // preventDefault()...
    
    // 以下為模擬移動效果 (僅供視覺參考)
    const touch = e.touches[0];
    lastAction.innerText = `搖桿移動中 (${Math.round(touch.clientX)}, ${Math.round(touch.clientY)})`;
}, { passive: true }); // FIXME: 這裡的 passive 設定會導致 preventDefault 失效嗎？


knob.addEventListener('touchend', (e) => {
    lastAction.innerText = '停止操控搖桿';
    knob.style.cursor = 'grab';
});

// 3. 全局攔截測試 (壓力測試)
// TODO: 任務 2 - 攔截長按選單與雙擊縮放
// 提示：除了 CSS，JS 也可以攔截 contextmenu 事件

window.addEventListener('contextmenu', (e) => {
    // 學員實作區
    // lastAction.innerText = '已攔截系統選單';
});

console.log("Vibe Controller UX Engine Ready.");
