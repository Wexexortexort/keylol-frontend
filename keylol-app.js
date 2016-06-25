﻿(function () {
    const app = angular.module('KeylolApp', [
        // Angular modules
        //'ngAnimate',
        'ngAnimate',

        // Custom modules

        // 3rd Party Modules
        'angularMoment',
        'ngStorage',
        'ngFileUpload',
        'ab-base64',
        'angulartics',
        'angulartics.google.analytics',
        'ui.router',
    ]);
    app.config(($stateProvider, $locationProvider, utilsProvider, pageHeadProvider, $localStorageProvider,
                $httpProvider, $compileProvider, $analyticsProvider, $anchorScrollProvider, $urlRouterProvider) => {
        $locationProvider.html5Mode(true);
        
        $urlRouterProvider.otherwise('/not-found');
        $stateProvider
            .state('entrance', {
                url: '/',
                templateUrl: 'src/pages/entrance.html',
                controller ($location, pageLoad) {
                    if ($location.path() === '/') {
                        pageLoad('entrance');
                    }
                },
                onExit (stateTree) {
                    delete stateTree.entrance;
                },
                data: { virtual: true },
            })
                .state('entrance.discovery', {
                    url: 'discovery',
                    templateUrl: 'src/pages/discovery.html',
                    controller: 'DiscoveryController',
                    onExit (stateTree) {
                        delete stateTree.entrance.discovery;
                    },
                })
                .state('entrance.points', {
                    url: 'points',
                    onEnter (pageLoad) {
                        pageLoad('entrance.points');
                    },
                    onExit (stateTree) {
                        delete stateTree.entrance.points;
                    },
                    templateUrl: 'src/pages/points.html',
                    controller: 'PointsController',
                })
                .state('entrance.timeline', {
                    url: 'timeline',
                    templateUrl: 'src/pages/page-timeline.html',
                    controller: 'PageTimelineController',
                    onExit (stateTree) {
                        delete stateTree.timeline;
                    },
                })
            .state('post-office',{
                url: '/post-office',
                templateUrl: 'src/pages/post-office.html',
                controller: 'PostOfficeController',
                onEnter (union, $state, $stateParams) {
                    if (!union.$localStorage.Authorization) {
                        $state.go('entrance', $stateParams);
                    }
                },
                onExit (stateTree) {
                    delete stateTree.postOffice;
                },
                data: { virtual: true },
            })
                .state('post-office.unread',{
                    url: '/unread',
                    templateUrl: 'src/pages/unread.html',
                    controller: 'UnreadController',
                    onExit (stateTree) {
                        delete stateTree.postOffice.unread;
                    },
                })
                .state('post-office.social-activity',{
                    url: '/social-activity',
                    templateUrl: 'src/pages/social-activity.html',
                    controller: 'SocialActivityController',
                    onExit (stateTree) {
                        delete stateTree.postOffice.socialActivity;
                    },
                    data: { virtual: true },
                })
                    .state('post-office.social-activity.reply',{
                        url: '/reply',
                        templateUrl: 'src/pages/social-activity-reply.html',
                        controller: 'SocialActivityReplyController',
                        onExit (stateTree) {
                            delete stateTree.postOffice.socialActivity.comment;
                        },
                    })
                    .state('post-office.social-activity.approve',{
                        url: '/approve',
                        templateUrl: 'src/pages/social-activity-approve.html',
                        controller: 'SocialActivityApproveController',
                        onExit (stateTree) {
                            delete stateTree.postOffice.socialActivity.like;
                        },
                    })
                    .state('post-office.social-activity.follower',{
                        url: '/follower',
                        templateUrl: 'src/pages/social-activity-follower.html',
                        controller: 'SocialActivityFollowerController',
                        onExit (stateTree) {
                            delete stateTree.postOffice.socialActivity.subscriber;
                        },
                    })
                .state('post-office.missive',{
                    url: '/missive',
                    templateUrl: 'src/pages/missives.html',
                    controller: 'MissivesController',
                    onExit (stateTree) {
                        delete stateTree.postOffice.missive;
                    },
                })
            .state('coupon',{
                url: '/coupon',
                templateUrl: 'src/pages/coupon.html',
                controller: 'CouponController',
                onEnter (union, $state, $stateParams) {
                    if (!union.$localStorage.Authorization) {
                        $state.go('entrance', $stateParams);
                    }
                },
                onExit (stateTree) {
                    delete stateTree.coupon;
                },
                data: { virtual: true },
            })
                .state('coupon.detail',{
                    url: '/detail',
                    templateUrl: 'src/pages/coupon-detail.html',
                    controller: 'CouponDetailController',
                    onExit (stateTree) {
                        delete stateTree.coupon.detail;
                    },
                })
                // .state('coupon.store',{
                //     url: '/store',
                //     templateUrl: 'src/pages/coupon-store.html',
                //     controller: 'CouponStoreController',
                // })
                .state('coupon.ranking',{
                    url: '/ranking',
                    templateUrl: 'src/pages/coupon-ranking.html',
                    controller: 'CouponRankingController',
                    onExit (stateTree) {
                        delete stateTree.coupon.ranking;
                    },
                })
            .state('aggregation', {
                'abstract': true,
                template: '<div ui-view></div>',
                onExit (stateTree) {
                    delete stateTree.aggregation;
                },
            })
                .state('aggregation.point', {
                    url: '/point/:point_id_code',
                    templateUrl: 'src/pages/point.html',
                    controller: 'PointController',
                    onExit (stateTree) {
                        delete stateTree.aggregation.point;
                    },
                    data: { virtual: true },
                })
                    .state('aggregation.point.frontpage', {
                        url: '/frontpage',
                        templateUrl: 'src/pages/frontpage.html',
                        controller: 'FrontpageController',
                        onExit (stateTree) {
                            delete stateTree.aggregation.point.frontpage;
                        },
                    })
                    .state('aggregation.point.intel', {
                        url: '/intel',
                        templateUrl: 'src/pages/intel.html',
                        controller: 'IntelController',
                        onExit (stateTree) {
                            delete stateTree.aggregation.point.intel;
                        },
                    })
                    .state('aggregation.point.product', {
                        url: '/product',
                        templateUrl: 'src/pages/product.html',
                        controller: 'ProductController',
                        onExit (stateTree) {
                            delete stateTree.aggregation.point.product;
                        },
                    })
                    .state('aggregation.point.timeline', {
                        url: '/timeline',
                        templateUrl: 'src/pages/page-timeline.html',
                        controller: 'PageTimelineController',
                        onExit (stateTree) {
                            delete stateTree.aggregation.point.timeline;
                        },
                    })
                    .state('aggregation.point.edit', {
                        url: '/edit',
                        templateUrl: 'src/pages/point-edit.html',
                        controller: 'PointEditController',
                        onExit (stateTree) {
                            delete stateTree.aggregation.point.edit;
                        },
                        data: { virtual: true },
                    })
                        .state('aggregation.point.edit.info', {
                            url: '/info',
                            templateUrl: 'src/pages/edit-info.html',
                            controller: 'EditInfoController',
                            onExit (stateTree) {
                                delete stateTree.aggregation.point.edit.info;
                            },
                        })
                        .state('aggregation.point.edit.style', {
                            url: '/style',
                            templateUrl: 'src/pages/edit-style.html',
                            controller: 'EditStyleController',
                            onExit (stateTree) {
                                delete stateTree.aggregation.point.edit.style;
                            },
                        })
                        // .state('aggregation.point.edit.log', {
                        //     url: '/log',
                        //     templateUrl: 'src/pages/edit-log.html',
                        //     controller: 'EditLogController',
                        //     onExit (stateTree) {
                        //         delete stateTree.aggregation.point.edit.log;
                        //     },
                        // })
            .state('aggregation.user', {
                url: '/user/:user_id_code',
                templateUrl: 'src/pages/user.html',
                controller: 'UserController',
                onExit (stateTree) {
                    delete stateTree.aggregation.user;
                },
                data: { virtual: true },
            })
                .state('aggregation.user.dossier', {
                    url: '/dossier',
                    templateUrl: 'src/pages/dossier.html',
                    controller: 'DossierController',
                    onExit (stateTree) {
                        delete stateTree.aggregation.user.dossier;
                    },
                })
                .state('aggregation.user.peopleDefault', {
                    url: '/people',
                    template: '<div></div>',
                    controller ($state) {
                        $state.go('^.people', {}, { location: false });
                    },
                    data: { virtual: true },
                })
                .state('aggregation.user.people', {
                    url: '/people/:route',
                    templateUrl: 'src/pages/people.html',
                    controller: 'PeopleController',
                    onExit (stateTree) {
                        delete stateTree.aggregation.user.people;
                    },
                })
                .state('aggregation.user.timeline', {
                    url: '/timeline',
                    templateUrl: 'src/pages/page-timeline.html',
                    controller: 'PageTimelineController',
                    onExit (stateTree) {
                        delete stateTree.aggregation.user.timeline;
                    },
                })
                .state('aggregation.user.edit', {
                    url: '/edit',
                    templateUrl: 'src/pages/user-edit.html',
                    controller: 'UserEditController',
                    onEnter (union, $state, $stateParams) {
                        if (!union.$localStorage.Authorization) {
                            $state.go('aggregation.user', $stateParams);
                        }
                    },
                    onExit (stateTree) {
                        delete stateTree.aggregation.user.edit;
                    },
                    data: { virtual: true },
                })
                    .state('aggregation.user.edit.info', {
                        url: '/info',
                        templateUrl: 'src/pages/user-edit-info.html',
                        controller: 'UserEditInfoController',
                    })
                    .state('aggregation.user.edit.preference', {
                        url: '/preference',
                        templateUrl: 'src/pages/user-edit-preference.html',
                        controller: 'UserEditPreferenceController',
                    })
            .state('content', {
                'abstract': true,
                template: '<div ui-view></div>',
                onExit (stateTree) {
                    delete stateTree.content;
                },
            })
                .state('content.article', {
                    url: '/article/:author_id_code/:sid_for_author',
                    templateUrl: 'src/pages/article.html',
                    controller: 'ArticleController',
                    onExit (stateTree) {
                        delete stateTree.content.article;
                    },
                })
                .state('content.activity', {
                    url: '/activity/:author_id_code/:sid_for_author',
                    templateUrl: 'src/pages/activity.html',
                    controller: 'ActivityController',
                    onExit (stateTree) {
                        delete stateTree.content.activity;
                    },
                })
            .state('not-found', {
                url: '/not-found',
                templateUrl: 'src/pages/not-found.html',
                controller: 'NotFoundController',
            });

        pageHeadProvider.setLoadingHead({
            title: '其乐 - 甄选并传递游戏的价值',
        });

        utilsProvider.config({
            geetestId: 'accdaf35b04e4ad5bf4980c7d30edf87',
        });

        $localStorageProvider.setKeyPrefix('keylol-');

        $httpProvider.defaults.withCredentials = true;

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|steam):/);

        window._czc = [];
        _czc.push(['_setAutoPageview', false]);

        $analyticsProvider.registerPageTrack(path => {
            _czc.push(['_trackPageview', path]);
        });

        $analyticsProvider.registerEventTrack((action, prop) => {
            _czc.push([
                '_trackEvent',
                prop.category || '未分类',
                action,
                prop.label,
                prop.value,
                prop.nodeid,
            ]);
        });

        $analyticsProvider.registerEventTrack((action, prop) => {
            _czc.push([
                '_trackEvent',
                prop.category || '未分类',
                action,
                prop.label,
                prop.value,
                prop.nodeid,
            ]);
        });

        $analyticsProvider.registerSetUsername(username => {
            _czc.push(['_setCustomVar', '登录用户', username, 1]);
        });

        $analyticsProvider.trackExceptions(true);
        $analyticsProvider.virtualPageviews(false);
    });
    app.run(($analytics, $rootScope, $location) => {
        $rootScope.$on('$stateChangeSuccess', (event, current) => {
            if (current.data.hasOwnProperty('virtual')) return;
            const url = $analytics.settings.pageTracking.basePath + $location.url();
            $analytics.pageTrack(url, $location);
        });
    });
    app.run(['amMoment', amMoment => {
        amMoment.changeLocale('zh-cn');
    }]);
    app.constant('amTimeAgoConfig', {
        fullDateThreshold: 1,
        fullDateFormat: 'YYYY-MM-DD HH:mm',
        titleFormat: 'YYYY-MM-DD HH:mm:ss [GMT]Z',
    });
    app.constant('angularMomentConfig', {
        timezone: 'Asia/Shanghai',
    });

    window.keylolApp = app;
}());
