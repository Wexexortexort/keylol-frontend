﻿(function() {
    "use strict";

    var app = angular.module("KeylolApp", [
        // Angular modules 
        //"ngAnimate",
        "ngRoute",

        // Custom modules

        // 3rd Party Modules
        "jcs.angular-http-batch",
        "angularModalService",
        "angularMoment",
        "ngStorage"
    ]);
    app.config([
        "$routeProvider", "$locationProvider", "utilsProvider", "pageTitleProvider", "$localStorageProvider", "httpBatchConfigProvider",
        function($routeProvider, $locationProvider, utilsProvider, pageTitleProvider, $localStorageProvider, httpBatchConfigProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.when("/", {
                templateUrl: "components/pages/home.html",
                controller: "HomeController"
            }).when("/article", {
                templateUrl: "components/pages/article.html",
                controller: "ArticleController"
            }).when("/point", {
                templateUrl: "components/pages/point.html",
                controller: "PointController"
            }).otherwise({
                templateUrl: "components/pages/not-found.html",
                controller: "NotFoundController"
            });

            pageTitleProvider.setLoadingTitle("载入中 - 其乐");

            utilsProvider.config({
                geetestId: "0c002064ef8f602ced7bccec08b8e10b"
            });

            $localStorageProvider.setKeyPrefix("keylol-");

            httpBatchConfigProvider.setAllowedBatchEndpoint("api/", "api/batch", {
                batchRequestCollectionDelay: 10
            });
        }
    ]);
    app.constant("amTimeAgoConfig", {
        fullDateThreshold: 1,
        fullDateFormat: "YYYY-MM-DD hh:mm",
        titleFormat: "YYYY-MM-DD hh:mm:ss"
    });

    window.keylolApp = app;
})();