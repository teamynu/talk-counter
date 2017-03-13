// registerHuman.jsで有効なスコープを即時関数で定義
(function () {
    //$scopeではなくController asの形式を採用
    app.controller('RegisterHumanController', function () {
        // 入力された情報を保持
        this.registname = '';
        this.person = getAllLocalStorageKey();
        // 登録を押されたときの関数
        this.submit = function () {
            if (duplicated(this.person, this.registname)) {
                ons.notification.alert({
                    message: 'すでに登録されています'
                });
            } else {
                this.person.push(this.registname);
                localStorage.setItem(this.registname,[]);
            }
        }
        // ローカルストレージのすべてのkeyを取得
        function getAllLocalStorageKey() {
            var ret = [];
            for (var i = 0; i < localStorage.length; i++) {
                ret.push(localStorage.key(i));
            }
            return ret;
        }
        // 配列と追加要素の重複チェック
        function duplicated(array, item) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] == item) {
                    return true;
                }
            }
            return false;
        }
    });
}());