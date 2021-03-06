﻿(function () {
    class SpotlightUsersController {
        constructor (window) {
            $.extend(this, {
                window,
                steamFriendCardsPart1: [],
                steamFriendCardsPart2: [],
                sameFriendCards: [],
                type: {
                    mainTitle: '玩家',
                    subTitle: '与游戏好友一起在其乐融融',
                    type: 'user',
                },
            });
            if (this.cards) {
                for (let i = 0;i < this.cards.length;i++) {
                    if (i < 3) {
                        this.steamFriendCardsPart1.push(this.cards[i]);
                    } else if (i < 6) {
                        this.steamFriendCardsPart2.push(this.cards[i]);
                    } else if (i < 8) {
                        this.sameFriendCards.push(this.cards[i]);
                    } else if (i % 2 === 0) {
                        this.steamFriendCardsPart1.push(this.cards[i]);
                    } else {
                        this.steamFriendCardsPart2.push(this.cards[i]);
                    }
                }
            }
        }

        inviteFriend (event) {
            this.window.show({
                event,
                templateUrl: 'src/windows/friend-invitation.html',
                controller: 'FriendInvitationController',
                controllerAs: 'friendInvitation',
            });
        }
    }

    keylolApp.component('spotlightUsers', {
        templateUrl: 'src/sections/spotlight-users.html',
        controller: SpotlightUsersController,
        controllerAs: 'spotlightUsers',
        bindings: {
            cards: '<',
        },
    });
}());
