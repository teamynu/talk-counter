// talkCounter.jsで有効なスコープを即時関数で定義
(function () {
    // ダイアログサービス
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

    // データサービス
    app.factory('talkCounterData', function () {
        var _data = angular.fromJson(localStorage.getItem('talkconterdata') || "{}");
        var _selectedPerson = '';
        // hashと追加要素の重複チェック
        function _duplicated(hash, item) {
            for (var key in hash) {
                if (key == item) {return true;}
            }
            return false;
        }
        return {
            addPerson: function (person) {
                if (_data) {
                    if (_duplicated(_data, person)) {
                        ons.notification.alert({
                            message: 'すでに登録されています'
                        });
                    } else {
                        _data[person] = {};
                        localStorage.setItem('talkconterdata', angular.toJson(_data));
                    }
                } else {
                    console.log('invalid value : '+_data);
                }
            },
            addWord: function (word) {
                if (_data[_selectedPerson]) {
                    if (_duplicated(_data[_selectedPerson], word)) {
                        ons.notification.alert({
                            message: 'すでに登録されています'
                        });
                    } else {
                        _data[_selectedPerson][word] = { count: 0 };
                        localStorage.setItem('talkconterdata', angular.toJson(_data));
                    }
                } else {
                    console.log('invalid value : _data[' + _selectedPerson + ']');
                }
            },
            addCount: function (word) {
                if (_data[_selectedPerson][word]) {
                    _data[_selectedPerson][word].count += 1;
                    localStorage.setItem('talkconterdata', angular.toJson(_data));
                } else {
                    console.log('invalid value : _data[' + _selectedPerson + '][' + word + ']');
                }
            },
            getPersonList:function(){
                return _data;
            },
            getWordList: function () {
                if (_selectedPerson) {
                    return _data[_selectedPerson];
                } else {
                    console.log('null : _selectedPerson');
                    return {};
                }
            },
            setSelectedPerson: function (person) {
                _selectedPerson = person;
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
    app.controller('SelectPersonDialogController', function ($rootScope, talkCounterData) {
        this.personList = talkCounterData.getPersonList();
        // 人名がselectされた時の動作
        this.select = function (person) {
            talkCounterData.setSelectedPerson(person);
            // すべてのscopeに選んだ人を送信
            $rootScope.$broadcast('selectedPerson', person);
        };
    });

    //talkCounter.htmlの<ons-page ng-controller="TalkCounterController">のスコープの動作を記載
    //$scopeではなくController asの形式を採用
    app.controller('TalkCounterController', function ($scope, talkCounterData) {
        this.wordList = talkCounterData.getWordList();
        var $this = this;
        // 人が選択された時の動作
        $scope.$on('selectedPerson', function (event, arg) {
            $this.wordList = talkCounterData.getWordList();
        });
        // 口ぐせがタップされた時の動作
        this.addcount = function (word) {
            talkCounterData.addCount(word);
        }
    });

    // registerHuman
    //$scopeではなくController asの形式を採用
    app.controller('RegisterPersonController', function (talkCounterData) {
        // 入力された情報を保持
        this.registname = '';
        this.personList = talkCounterData.getPersonList();
        // 登録を押されたときの関数
        this.submit = function () {
            talkCounterData.addPerson(this.registname);
        };
    });

    // registerWord
    // 登録画面で口ぐせ登録するコントローラ
    app.controller('RegisterWordController', function ($scope, talkCounterData) {
        // 入力された情報を保持
        this.word = '';
        this.wordList = talkCounterData.getWordList();
        var $this = this;
        // 人が選択された時の動作
        $scope.$on('selectedPerson', function (event, arg) {
            $this.wordList = talkCounterData.getWordList();
        });
        // 登録を押されたときの動作
        this.submit = function () {
            talkCounterData.addWord(this.word);
            this.wordList = talkCounterData.getWordList();
        };
    });

    // showRecord
    //$scopeではなくController asの形式を採用
    app.controller('ShowRecordController', function ($scope, talkCounterData) {
        this.wordList = talkCounterData.getWordList();
        var $this = this;
        // 人が選択された時の動作
        $scope.$on('selectedPerson', function (event, arg) {
            $this.wordList = talkCounterData.getWordList();
        });
    });
}());


