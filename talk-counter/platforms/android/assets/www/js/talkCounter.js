// talkCounter.jsで有効なスコープを即時関数で定義
(function () {
    // データシェアサービス
    app.factory('dialogService', function () {
        var dialogs = {};
        return {
            show: function (dlg) {
                if (!dialogs[dlg]) {
                    ons.createDialog(dlg).then(function (dialog) {
                        dialogs[dlg] = dialog;
                        dialog.show();
                    });
                } else {
                    dialogs[dlg].show();
                };
            },
            hide: function (dlg) {
                dialogs[dlg].hide();
            }
        }
    });

    //　ダイアログコントローラー
    app.controller('DialogController', function (dialogService) {
        this.show = function (dlg) {
            dialogService.show(dlg);
        }
        this.hide = function (dlg) {
            dialogService.hide(dlg);
        }
    });

    // ダイアログで人を選択するコントローラ
    app.controller('SelectPersonDialogController', function ($rootScope, dialogService) {
        this.datahash = JSON.parse(localStorage.getItem('wordconterdata') || "{}");
        // 人名がselectされた時の動作
        this.select = function (person) {
            // すべてのscopeに選んだ人を送信
            $rootScope.$broadcast('selectedPerson', person);
        };
    });

    //talkCounter.htmlの<ons-page ng-controller="TalkCounterController">のスコープの動作を記載
    //$scopeではなくController asの形式を採用
    app.controller('TalkCounterController', function ($scope) {
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
        // 口ぐせがタップされた時の動作
        this.addcount = function (word) {
            var incount = this.datahash[this.selectedPerson].wordlist[word].count;
            this.datahash[this.selectedPerson].wordlist[word].count = incount + 1;
            localStorage.setItem('wordconterdata', angular.toJson(this.datahash));
        }
    });

    // registerHuman
    //$scopeではなくController asの形式を採用
    app.controller('RegisterPersonController', function () {
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

    // registerWord
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

    // showRecord
    //$scopeではなくController asの形式を採用
    app.controller('ShowRecordController', function ($scope) {
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
    });
}());


