// 名前空間の定義
var IB = {};

//名前がすでに存在しているか判定する
if (typeof IB === "undefined") {
    var IB = {};
}

// プチプチカウンター変数
IB.bubbleCounter = 0;

IB.flikerController = function () {
    alert('Click FlikerController!!!');
};

IB.addCounter = function () {

    // 現在のカウンター数取得
    var tempCounter = IB.bubbleCounter;
    // +1する
    tempCounter += 1;
    IB.bubbleCounter = tempCounter;

    // 桁数に応じてDOMに表示する    
    var toStringCounter = tempCounter + "";　　// 文字列に変換
    for (var i = 0; i < toStringCounter.length; i++) {
        var number = toStringCounter.substr(-(i+1), 1);
        var counterPart = document.getElementById('ib-counterPartP' + (i + 1));
        counterPart.innerHTML = number;
    }

    // 一応DOMに表示する（あとで消す or 透明にする）
    var counter = document.getElementById('ib-counterDisplay');
    counter.innerHTML = tempCounter + " プチ";

};
