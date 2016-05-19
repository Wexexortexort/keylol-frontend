﻿(function () {
    class NavController {
        constructor ($scope, $window, $state) {
            const $$window = $($window);
            const scrollCallback = () => {
                const newHasShadow = $$window.scrollTop() > 0;
                if (this.hasShadow !== newHasShadow) {
                    $scope.$apply(() => {
                        this.hasShadow = newHasShadow;
                    });
                }
            };
            $$window.scroll(scrollCallback);

            const cancelListenRoute = $scope.$on('$destroy', () => {
                $$window.unbind('scroll', scrollCallback);
                cancelListenRoute();
            });

            const currentStateName = $state.current.name;
            if (currentStateName.substr(0, 8) === 'entrance') {
                this.inEntrance = true;
                this.tabArray = [
                    { state:'entrance.discovery',name:'广场' },
                    { state:'entrance.points',name:'据点' },
                    { state:'entrance.timeline',name:'轨道' },
                ];
                $scope.$watch(() => {
                    return $state.current.name;
                }, () => {
                    const subState = $state.current.name.substr(9);
                    switch (subState) {
                        case 'discovery' :
                            this.currentPage = 0;
                            break;
                        case 'points' :
                            this.currentPage = 1;
                            break;
                        case 'timeline' :
                            this.currentPage = 2;
                            break;
                    }
                });
            } else if (currentStateName.substr(0, 17) === 'aggregation.point') {
                this.inPoint = true;
                this.tabArray = [{ name:'扉页' },{ name:'情报' },{ name:'轨道' },{ name:'编辑', 'float':'right' }];
                const subState = currentStateName.substr(18);
                switch (subState) {
                    case 'frontpage' :
                        this.currentPage = 0;
                        break;
                }
            }
        }
    }

    keylolApp.component('nav', {
        templateUrl: 'src/sections/nav.html',
        controller: NavController,
        controllerAs: 'nav',
        bindings: {
            theme: '<',
        },
    });
}());
