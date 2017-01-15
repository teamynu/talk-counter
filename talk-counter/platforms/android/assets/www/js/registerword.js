// registerWord.jsで有効なスコープを即時関数で定義
(function () {
    //$scopeではなくController asの形式を採用
    app.controller('RegisterWordController', function () {
        // 入力された名前を保持
        this.registword = '';
        // 登録を押されたときの関数
        this.submit = function () {
            var allword = JSON.parse(localStorage.getItem('words'));
            var array = [allword];
            array.unshift(this.registword);
            localStorage.setItem('words', angular.toJson(array));
        };
    });
}());