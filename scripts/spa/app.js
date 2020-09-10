"use strict";

(function () {
    function init() {
        let router = new Router([
            new Route("home", "home.php"),
            new Route("explore", "explore.php"),
            new Route("notifications", "notifications.php"),
            new Route("bookmarks", "bookmarks.php"),
            new Route("profile", "profile.php")
        ]);
    }
    init();
}());