"use strict";

/**
 * 
 * @param {HTMLElement} elem 
 */
function reactionLike(elem) {
    // TODO: Fix this piece of shit asap
    let post_id = elem.parentElement.parentElement.parentElement.getElementsByClassName("post_id")[0].innerHTML;

    let ajax = new XMLHttpRequest();
            }
        }
    };
    ajax.open("GET", "../services/postlike.php?post_id=" + post_id, true);
    ajax.send();

    if (elem.className === "icon icon-heart-o") {
        // TODO: Tidy up
        elem.className = "icon icon_clicked icon-heart";
        let likeCountElement = elem.parentElement.getElementsByClassName("reaction_count")[0];
        likeCountElement.innerHTML = parseInt(likeCountElement.innerHTML) + 1;
    }
    else {
        // TODO: Tidy up
        elem.className = "icon icon-heart-o";
        let likeCountElement = elem.parentElement.getElementsByClassName("reaction_count")[0];
        likeCountElement.innerHTML = parseInt(likeCountElement.innerHTML) - 1;
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
    ajax.onreadystatechange = (function (elem) {
        return function () {
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
        }
    })(elem);
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
    let postTitle = document.getElementById("post_title").value;
    let postContent = document.getElementById("post_content").value;

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = this.responseText.split("&");
            if (response.length === 2) {
                document.getElementById("error").innerHTML = response[1];
            } else if (response.length === 3) {
                let post = [
                    response[0],
                    response[1],
                    new Date(response[2]),
                    document.getElementById("post_title").value,
                    document.getElementById("post_content").value,
                    0,
                    false,  // Post is not liked when it comes out first
                    false   // Post is not bookmarked when it comes out first
                ];

                document.getElementById("post_title").value = "";
                document.getElementById("post_content").value = "";

                injectPost(post, false);
            }
        }
    };
    ajax.open("GET", "../services/post.php?post_title=" + postTitle + "&post_content=" + postContent, true);
    ajax.send();
}

function getPost() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = this.responseText.split("&");
            let responseLength = response.length - 1;   // Subtract 1, because last element is a garbage(undefined)
            for (let i = 0; i < responseLength; i += 8) {   // 8 -> number of properties of a post
                let post = [
                    response[i + 1],
                    response[i],
                    new Date(response[i + 2]),
                    response[i + 3],
                    response[i + 4],
                    response[i + 5],
                    response[i + 6],
                    response[i + 7]
                ];
                injectPost(post, true);
                lastestPostId = parseInt(response[i]);
            }
            // If the page doesn't have enough content to fill, send another request
            //if (window.scrollY === 0 && responseLength !== 0) {
            //    getPost();
            //}
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
document.addEventListener("DOMContentLoaded", () => { getPost(); }, false);

window.addEventListener("scroll", () => {
    // If scrolled to bottom, request for new posts
    if (document.body.scrollHeight === window.scrollY + document.body.clientHeight) {
        getPost();
    }
});

// Please, surround this variable inside a class
let lastestPostId;

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
