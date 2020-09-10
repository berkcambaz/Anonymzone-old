"use strict";

/**
 * 
 * @param {HTMLElement} elem 
 */
function reactionLike(elem) {
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
    // TODO: Send request to server
    if (elem.className === "icon icon-bookmark-o")
        elem.className = "icon icon_clicked icon-bookmark";
    else
        elem.className = "icon icon-bookmark-o";
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
                    false,
                    false
                ];

                document.getElementById("post_title").value = "";
                document.getElementById("post_content").value = "";

                injectPost(post);
            }
        }
    };
    ajax.open("GET", "../services/post.php?post_title=" + postTitle + "&post_content=" + postContent, true);
    ajax.send();
}

/**
 * 
 * @param {string} page 
 */
function changePage(page) {
    window.location.hash = page;
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
