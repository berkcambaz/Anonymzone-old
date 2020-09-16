"use strict";

/**
 * 
 * @param {HTMLElement} elem 
 */
function reactionLike(elem) {
    // TODO: Fix this piece of shit asap
    let post_id = elem.parentElement.parentElement.parentElement.getElementsByClassName("post_id")[0].innerHTML;

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // TODO: Handle like counts from server with a modern way.
            // To return the correct like amount, server has to send like 
            // count back after increasing or decreasing it by 1
            if (this.responseText === "1") {
                // Unliked -> liked
            } else if (this.responseText === "0") {
                // Liked -> unliked
            }
        }
    };
    ajax.open("GET", "../services/postlike.php?post_id=" + post_id, true);
    ajax.send();

    if (elem.className === "icon icon-heart-o") {
        // TODO: Tidy up
        elem.className = "icon icon_clicked icon-heart";
        let likeCountElement = elem.parentElement.getElementsByClassName("reaction_count")[0];
        likeCountElement.innerHTML = clampCount(parseInt(likeCountElement.innerHTML) + 1);
    }
    else {
        // TODO: Tidy up
        elem.className = "icon icon-heart-o";
        let likeCountElement = elem.parentElement.getElementsByClassName("reaction_count")[0];
        likeCountElement.innerHTML = clampCount(parseInt(likeCountElement.innerHTML) - 1);
    }
}

/**
 * 
 * @param {HTMLElement} elem 
 */
function reactionBookmark(elem) {
    // TODO: Fix this piece of shit asap
    let post_id = elem.parentElement.parentElement.parentElement.getElementsByClassName("post_id")[0].innerHTML;

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // TODO: Handle like counts from server with a modern way.
            // To return the correct like amount, server has to send like 
            // count back after increasing or decreasing it by 1
            if (this.responseText === "1") {
                // Unliked -> liked
            } else if (this.responseText === "0") {
                // Liked -> unliked
            }
        }
    };
    ajax.open("GET", "../services/postbookmark.php?post_id=" + post_id, true);
    ajax.send();

    if (elem.className === "icon icon-bookmark-o") {
        // TODO: Tidy up
        elem.className = "icon icon_clicked icon-bookmark";
    }
    else {
        // TODO: Tidy up
        elem.className = "icon icon-bookmark-o";
    }
}

function post() {
    document.getElementById("post_button").attributes.getNamedItem("onclick").value = "";
    let postTitle = document.getElementById("post_title").value;
    let postContent = document.getElementById("post_content").value;

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = (function (postTitle, postContent) {
        return function () {
            if (this.readyState === 4 && this.status === 200) {
                let response;
                try {
                    response = JSON.parse(this.responseText);
                } catch (e) {
                    response = this.responseText;
                    document.getElementById("error").innerHTML = response;
                    document.getElementById("post_button").attributes.getNamedItem("onclick").value = "post()";
                    return;
                }

                document.getElementById("post_title").value = "";
                document.getElementById("post_content").value = "";

                let postDate = new Date(response[2] * 1000);
                let post = [
                    response[0],
                    response[1],
                    postDate,
                    postDate,
                    postTitle,
                    postContent,
                    0,
                    false,  // Post is not liked when it comes out first
                    false   // Post is not bookmarked when it comes out first
                ];
                injectPost(post, false);
                document.getElementById("post_button").attributes.getNamedItem("onclick").value = "post()";
            }
        }
    }(postTitle, postContent));
    ajax.open("GET", "../services/post.php?post_title=" + postTitle + "&post_content=" + postContent, true);
    ajax.send();
}

function getPost() {
    injectStr(loadingIcon, true);

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200 && this.responseText !== "") {
            let response = JSON.parse(this.responseText);
            let responseLength = response.length;
            document.getElementById("loader").remove();
            for (let i = 0; i < responseLength; ++i) {
                let postDate = new Date(response[i][2] * 1000);
                let post = [
                    response[i][1],
                    response[i][0],
                    postDate,
                    postDate,
                    response[i][3],
                    response[i][4],
                    response[i][5],
                    response[i][6],
                    response[i][7]
                ];
                injectPost(post, true);
                lastestPostId = parseInt(response[i][0]);
            }

            // If the page doesn't have enough content to fill, send another request
            if (document.body.scrollHeight !== document.body.clientHeight && responseLength !== 0) {
                getPost();
            }
        }
    };
    ajax.open("GET", "../services/getpost.php?lastest_post_id=" + (lastestPostId ? lastestPostId : 0), true);
    ajax.send();
}

function logout() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            window.location = this.responseText;
        }
    };
    ajax.open("GET", "../services/logout.php", true);
    ajax.send();
}

/**
 * 
 * @param {string} page 
 */
function changePage(page) {
    window.location.hash = page;
}

// Request posts when the page is fully loaded
//document.addEventListener("DOMContentLoaded", () => { getPost(); }, false);

window.addEventListener("scroll", () => {
    // If scrolled to bottom, request for new posts
    if (document.body.scrollHeight === window.scrollY + document.body.clientHeight) {
        getPost();
    }
});

// Please, surround this variable inside a class
let lastestPostId;
let loadingIcon = '<div class="loader_container" id="loader"><div class="loader"></div></div>';

/**
 * 
 * @param {HTMLElement} elem 
 */
function showDropdown(elem) {
    elem.classList.toggle("profile_info_item-clicked");
    document.getElementById("logout").classList.toggle("profile_info_logout-visible");
}

/*
function applyPasteRestrict() {
    let elems = document.querySelectorAll("[contenteditable]");
    let elemCount = elems.length;
    for (let i = 0; i < elemCount; ++i) {
        elems[i].addEventListener("paste", function (event) {
            event.preventDefault();
            document.execCommand("inserttext", false, event.clipboardData.getData("text/plain"));
        });
    }
}
*/

/* Example on how to cache some information */
/*
document.addEventListener("DOMContentLoaded", cachePage, false);
function cachePage() {
    localStorage.setItem("page", document.documentElement.innerHTML);
    console.log(localStorage.getItem("page"));
}
*/