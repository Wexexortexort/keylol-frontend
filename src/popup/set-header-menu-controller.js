﻿(function () {
    class SetHeaderMenuController {
        constructor (close) {
            this.menu = {
                items: [
                    {
                        type: 'item',
                        text: '上传',
                        clickAction () {
                            close('upload');
                        },
                    },
                    {
                        type: 'horizon',
                    },
                    {
                        type: 'item',
                        text: '调用文章首幅图片',
                        disabled: true,
                        clickAction () {
                            close('ArticleFirstImage');
                        },
                    },
                    {
                        type: 'item',
                        text: '调用投稿据点封面',
                        disabled: true,
                        clickAction () {
                            close('pointHeaderImage');
                        },
                    },
                ],
            };
        }
    }

    keylolApp.controller('SetHeaderMenuController', SetHeaderMenuController);
}());
