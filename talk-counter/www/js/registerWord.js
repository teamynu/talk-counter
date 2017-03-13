// registerWord.jsで有効なスコープを即時関数で定義
(function () {
    //$scopeではなくController asの形式を採用
    app.controller('RegisterWordController', function () {
        // 入力された情報を保持
        this.word = '';
        this.person = getAllLocalStorageKey();
        this.selectedPerson = '';
        this.allwords = [];
        // 人名がselectされた時の動作
        this.reload = function (val) {
            this.allwords = JSON.parse(localStorage.getItem(this.selectedPerson)||"[]");
        }
        // 登録を押されたときの動作
        this.submit = function () {
            if (duplicated(this.allwords, this.word)) {
                ons.notification.alert({
                    message: 'すでに登録されています'
                });
            } else {
                this.allwords.push(this.word);
                localStorage.setItem(this.selectedPerson, angular.toJson(this.allwords));
            }
        }
        // ローカルストレージのすべてのkeyを取得
        function getAllLocalStorageKey() {
            var ret = [];
            for (var i=0; i < localStorage.length; i++) {
                ret.push(localStorage.key(i));
            }
            return ret;
        }
        // 配列と追加要素の重複チェック
        function duplicated(array, item) {
            for (var i = 0; i<array.length; i++) {
                if (array[i] == item) {
                    return true;
                }
            }
            return false;
        }
    });
}());