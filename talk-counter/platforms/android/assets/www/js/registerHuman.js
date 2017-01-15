﻿// registerHuman.jsで有効なスコープを即時関数で定義
(function () {
    //$scopeではなくController asの形式を採用
    app.controller('RegisterHumanController', function () {
        // 入力された名前を保持
        this.registname = '';
        // 登録を押されたときの関数
        this.submit = function () {
            var allhuman = JSON.parse(localStorage.getItem('humans'));
            var array = [allhuman];
            array.unshift(this.registname);
            localStorage.setItem('humans', angular.toJson(array));
        };
    });
}());