define(['controller/controllers','jquery'
    ],function(controllers,$){
    console.log("indexController start...");
    controllers.controller("indexController", ['$rootScope','$scope','$routeParams',
        function($rootScope,$scope,$routeParams){
            document.title = $scope.title="云工作";
            var words = {
                cn:{"level":"等级","exit":"退出","login":"登录",help:"帮助"},
                uk:{"level":"داھسدا","exit":"يۇڭيڭ","login":"تيۇۇڭ",help:"ڭسېري"}
            }
            $scope.language = words.cn;
            $scope.onSelectWord = function(language){
                $scope.language = words[language];
            }
        }
    ]);
})