const querystring = require("querystring");
const https = require("https");
const http = require("http");
const fs = require("fs");

let currPath = ".";
let css = "";
let js = "";

readFolder(currPath);

function readFolder(path) {
    files = fs.readdirSync(path);
    files.forEach((file) => {
        //console.log(file);
        processFile(currPath, file);
        if (isFolder(file)) {
            currPath += "/" + file;
            readFolder(currPath);
        }
    });
    currPath = currPath.substr(0, currPath.lastIndexOf("/"));
}

function isFolder(file) {
    return file.indexOf(".") === -1;
}

function processFile(path, file) {
    if (file === "minify.js")
        return;

    let fileExtension = file.substring(file.indexOf("."));
    let extensionMatched = false;

    if (fileExtension === ".js") {
        extensionMatched = true;
        minifyJS(path, file);
    } else if (fileExtension === ".css") {
        extensionMatched = true;
        minifyCSS(path, file);
    }

    if (extensionMatched)
        console.log(file);
}

function minifyJS(path, file) {
    const query = querystring.stringify({
        input: fs.readFileSync(path + "/" + file, "utf-8")
    });

    const req = https.request(
        {
            method: 'POST',
            hostname: 'javascript-minifier.com',
            path: '/raw',
        },
        function (resp) {
            // if the statusCode isn't what we expect, get out of here
            if (resp.statusCode !== 200) {
                console.log('StatusCode=' + resp.statusCode);
                return;
            }

            //resp.pipe(process.stdout);
            resp.on("data", (chunk) => {
                fs.writeFileSync(path + "/" + file, chunk.toString(), "utf-8");
            });
        }
    );
    req.on('error', function (err) {
        throw err;
    });
    req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.setHeader('Content-Length', query.length);
    req.end(query, 'utf8');
}

function minifyCSS(path, file) {
    var query = querystring.stringify({
        input: fs.readFileSync(path + "/" + file, "utf-8")
    });

    var req = https.request(
        {
            method: 'POST',
            hostname: 'cssminifier.com',
            path: '/raw',
        },
        function (resp) {
            // if the statusCode isn't what we expect, get out of here
            if (resp.statusCode !== 200) {
                console.log('StatusCode=' + resp.statusCode);
                return;
            }

            //resp.pipe(process.stdout);
            resp.on("data", (chunk) => {
                fs.writeFileSync(path + "/" + file, chunk.toString(), "utf-8");
            });
        }
    );
    req.on('error', function (err) {
        throw err;
    });
    req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.setHeader('Content-Length', query.length);
    req.end(query, 'utf8');
}