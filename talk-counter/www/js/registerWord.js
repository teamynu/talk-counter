// registerWord.jsで有効なスコープを即時関数で定義
(function () {

    // ダイアログで人を選択するコントローラ
    app.controller('SelectPersonDialogContralloer', function ($scope) {
        // 人名がselectされた時の動作
        this.select = function (person) {
            // 親scopeに選んだ人を送信
            $scope.$emit('selectedPerson', person);
        };
    });

    // 登録画面で口ぐせ登録するコントローラ
    app.controller('RegisterWordController', function ($scope) {
        // 入力された情報を保持
        this.word = '';
        this.datahash = JSON.parse(localStorage.getItem('wordconterdata') || "{}");
        this.selectedPerson = '';
        this.wordlist = {};
        var $this = this;
        // 人が選択された時の動作
        $scope.$on('selectedPerson', function (event, arg) {
            var person = arg;
            console.log("person: " + person);
            $this.selectedPerson = person;
            $this.wordlist = $this.datahash[person].wordlist;
        });
        // 登録を押されたときの動作
        this.submit = function () {
            if (duplicated(this.wordlist, this.word)) {
                ons.notification.alert({
                    message: 'すでに登録されています'
                });
            } else {
                this.datahash[this.selectedPerson].wordlist[this.word] = { count: 0 };
                localStorage.setItem('wordconterdata', angular.toJson(this.datahash));
            };
        };
        // hashと追加要素の重複チェック
        function duplicated(hash, item) {
            for (var key in hash) {
                if (key == item) {
                    return true;
                };
            };
            return false;
        };
    });
}());