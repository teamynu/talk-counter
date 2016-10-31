// talkCounter.jsで有効なスコープを即時関数で定義
(function () {
    //データを定義
    var datalist = [
        { name: "aaa" },
        { name: "bbb" },
        { name: "ccc" }
    ];
    //talkCounter.htmlの<ons-page ng-controller="TalkCounterController">のスコープの動作を記載
    app.controller('TalkCounterController', function ($scope) {
        $scope.name = datalist[0].name;
    });
}());


