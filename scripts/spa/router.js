
"use strict";

class Router {
    constructor(routes) {
        if (!routes) {
            console.log("error: routes param is mandatory");
            return;
        }

        this.routes = routes;
        this.rootElem = document.getElementById("app");
        this.init();
    }

    init() {
        (function (scope, routes) {
            window.addEventListener("hashchange", function (e) {
                scope.hasChanged(scope, routes);
            });
        })(this, this.routes);

        this.hasChanged(this, this.routes);
    }

    hasChanged(scope, routes) {
        if (window.location.hash.length > 0) {  // If user has a route
            let routeCount = routes.length;
            for (let i = 0; i < routeCount; ++i) {
                let route = routes[i];
                let currPage = window.location.hash.substr(1);

                // Clear all possible selected routes before, since if user enters to a new
                // page with writing the new url, it can't remove active class from the old route
                document.getElementById(route.name).classList.remove("side_bar_item-active");
                if (route.isActiveRoute(currPage)) {
                    document.getElementById("page_header").innerHTML = route.name;
                    document.getElementById(route.name).classList.add("side_bar_item-active");
                    scope.goToRoute(route.file);
                }
            }
        } else {    // If user has no current route, redirect user to "home" page
            window.location.hash = routes[0].name;  // Set current page to "home"
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
                }
            };
            ajax.open("GET", url, true);
            ajax.send();
        })(this);
    }
}

