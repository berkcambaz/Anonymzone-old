
"use strict";

class Router {
    constructor(routes) {
        if (!routes) {
            console.log("error: routes param is mandatory");
            return;
        }

        this.routes = routes;
        this.rootElem = document.getElementById("app");
        this.preventHashchangeEvent = false;
        this.init();
    }

    init() {
        (function (scope, routes) {
            window.addEventListener("hashchange", function (e) {
                if (!scope.preventHashchangeEvent)
                    scope.hasChanged(scope, routes);
                scope.preventHashchangeEvent = false;
            });
        })(this, this.routes);

        this.hasChanged(this, this.routes);
    }

    hasChanged(scope, routes) {
        if (window.location.hash.length > 0) {  // If user has a route
            let routeCount = routes.length;
            let currPage = window.location.hash.substr(1).split("/")[0];
            for (let i = 0; i < routeCount; ++i) {
                let route = routes[i];

                // Clear all possible selected routes before, since if user enters to a new
                // page with writing the new url, it can't remove active class from the old route
                document.getElementById(route.name).classList.remove("side_bar_item-active");
                if (route.isActiveRoute(currPage)) {
                    document.getElementById("page_header").innerHTML = route.name;
                    document.getElementById(route.name).classList.add("side_bar_item-active");
                    addLoadingIcon();
                    scope.goToRoute(route.file);
                }
            }
        } else {    // If user has no current route, redirect user to "home" page
            this.preventHashchangeEvent = true;       // Fixes requesting the home page twice when entered to website without #home hash
            window.location.hash = routes[0].name;  // Set current page to "home"
            document.getElementById(routes[0].name).classList.add("side_bar_item-active");
            scope.goToRoute(routes[0].file);
        }
    }

    goToRoute(file) {
        (function (scope) {
            let url = "views/" + file;
            let ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;

                    // Request posts when the home or bookmark page is fully loaded
                    switch (file) {
                        case "home.php":
                            lastestPostId = 0;
                            postType = 0;
                            getPost();
                            break;
                        case "bookmarks.php":
                            lastestPostId = 0;
                            postType = 1;
                            getPost();
                            break;
                        case "profile.php":
                            lastestPostId = 0;
                            postType = 2;
                            getProfile(window.location.hash.substring(1).split("/")[1]);
                            break;
                    }
                }
            };
            ajax.open("GET", url, true);
            ajax.send();
        })(this);
    }
}

