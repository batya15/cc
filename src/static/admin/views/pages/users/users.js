"use strict";

define(['controllers/pages', 'views/entity/page'], function (pageController, Page) {

    var namespace = 'users';

    return pageController.addPage({
        namespace: namespace,
        view: Page
    });
});

