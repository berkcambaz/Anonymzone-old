"use strict";

class Route {
    constructor(name, file) {
        if (!name || !file) {
            console.log("error: name and file params are mandatories");
            return;
        }

        this.name = name;
        this.file = file;
    }

    isActiveRoute(hashedPath) {
        return hashedPath === this.name;
    }
}