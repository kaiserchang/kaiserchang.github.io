// 檢查是否支援螢幕方向 API
if (screen.orientation && screen.orientation.lock) {
    // 嘗試鎖定螢幕方向為橫向
    screen.orientation.lock('landscape')
        .then(function() {
            console.log('螢幕已鎖定為橫向模式');
        })
        .catch(function(error) {
            console.error('無法鎖定螢幕方向：', error);
        });
} else {
    console.warn('此設備或瀏覽器不支援螢幕方向鎖定');
}

// 監聽方向變化事件
window.addEventListener('orientationchange', function() {
    if (window.orientation === 90 || window.orientation === -90) {
        console.log('設備現在處於橫向模式');
    } else {
        console.log('設備現在處於縱向模式');
        alert('請將設備旋轉至橫向以獲得最佳體驗');
    }
});

// 頁面加載時檢查方向
document.addEventListener('DOMContentLoaded', function() {
    if (window.orientation === 0 || window.orientation === 180) {
        alert('請將設備旋轉至橫向以獲得最佳體驗');
    }
});