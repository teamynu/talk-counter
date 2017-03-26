// registerHuman.jsで有効なスコープを即時関数で定義
(function () {
    //$scopeではなくController asの形式を採用
    app.controller('RegisterHumanController', function () {
        // 入力された情報を保持
        this.registname = '';
        this.datahash = JSON.parse(localStorage.getItem('wordconterdata') || "{}");
        // 登録を押されたときの関数
        this.submit = function () {
            if (duplicated(this.datahash, this.registname)) {
                ons.notification.alert({
                    message: 'すでに登録されています'
                });
            } else {
                this.datahash[this.registname] = {
                    wordlist: {
                    }
                };
                localStorage.setItem('wordconterdata', angular.toJson(this.datahash));
            };
        };
        // hashと追加要素の重複チェック
        function duplicated(hash, item) {
            for (var key in hash) {
                if (key == item) {
                    return true;
                }
            }
            return false;
        }
    });
}());