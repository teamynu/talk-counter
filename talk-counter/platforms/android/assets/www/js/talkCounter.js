// talkCounter.jsで有効なスコープを即時関数で定義
(function () {
    //SelectPersonDialogContralloerはregisterWord.jsに記載したため省略

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
}());


