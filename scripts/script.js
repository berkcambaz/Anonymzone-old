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

function getPost(username) {
    addLoadingIcon();

    if (!username)
        username = "";

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            let responseLength = response.length;

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
                    response[i][6]
                ];
                injectPost(post, true);
                lastestPostId = parseInt(response[i][0]);
            }
            removeLoadingIcon();

            // If the page doesn't have enough content to fill, send another request
            if (document.body.scrollHeight === document.body.clientHeight && responseLength !== 0) {
                getPost();
            }
        }
    };
    ajax.open("GET", "../services/getpost.php?lastest_post_id=" + lastestPostId + "&post_type=" + postType + "&user_name=" + username, true);
    ajax.send();
}

function getProfile(username) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200 && this.responseText !== "") {
            let response;
            try {
                response = JSON.parse(this.responseText);
            } catch (e) {
                //  If no profile is found
                injectNoProfile(false);
                return;
            }
            let responseLength = response.length;
            for (let i = 0; i < responseLength; ++i) {
                let profileDate = new Date(response[i][1] * 1000);
                let profile = [
                    response[i][0],
                    profileDate
                ];
                injectProfile(profile, true);
                getPost(response[i][0]);
            }
        }
    };
    ajax.open("GET", "../services/getprofile.php?user_name=" + username, true);
    ajax.send();
}

function search() {
    // Get the search string
    let query = document.getElementById("search_bar").children[1].value;
    if (query === "") {   // If it's empty, don't search & clear the results
        document.getElementById("search_bar_results").innerHTML = "";
        return;
    }


    // Increase the query length
    ++searchQueueLength;


    if (searchQueueLength === 1) {
        addLoadingIcon();
    }

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // If this is not the lastest query, then don't output the result
            --searchQueueLength;
            if (searchQueueLength !== 0)
                return;

            // Handle if response is empty or not
            let response;
            try {
                response = JSON.parse(this.responseText);
            } catch (e) {
                // If response is empty, decrease query length, remove the loader & the results
                removeLoadingIcon();
                document.getElementById("search_bar_results").innerHTML = "";
                return;
            }

            let responseLength = response.length;
            document.getElementById("loader").remove();
            document.getElementById("search_bar_results").innerHTML = "";
            for (let i = 0; i < responseLength; ++i) {
                let result = [
                    response[i][0]
                ];
                injectResult(result, false);
            }
            removeLoadingIcon();
        }
    };
    ajax.open("GET", "../services/search.php?q=" + query, true);
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
    if (window.location.hash.substring(1) === page)
        location.reload();
    else
        window.location.hash = page;
}

window.addEventListener("scroll", () => {
    // If scrolled to bottom & there is no loader which means no request are currently being processed, request for new posts
    if (document.body.scrollHeight <= window.scrollY + document.body.clientHeight && !document.getElementById("loader")) {
        getPost();
    }
});

// Please, surround this variable inside a class
let lastestPostId = 0;
let postType = 0;
let loadingIcon = '<div class="loader_container" id="loader"><div class="loader"></div></div>';
let searchbarToggled = false;
let searchQueueLength = 0;

/**
 * 
 * @param {HTMLElement} elem 
 */
function showDropdown(elem) {
    elem.classList.toggle("profile_info_item-clicked");
    document.getElementById("logout").classList.toggle("profile_info_logout-visible");
}

function toggleSearchbar() {
    // If search bar is not toggled, toggle it
    if (!searchbarToggled) {
        searchbarToggled = true;

        window.addEventListener("click", searchbarClickListener);

        let searchbar = document.getElementById("search_bar");
        searchbar.classList.add("search_bar-selected");
        searchbar.children[0].classList.add("search_bar_icon-selected");
        searchbar.children[1].classList.add("search_bar_text-selected");

        // If there is pre-written text inside the searchbar, search it once clicked
        if (searchbar.children[1].value !== "")
            search();
    }
}

function searchbarClickListener(e) {
    let searchbar = document.getElementById("search_bar");

    // If user clicked somewhere else than the search bar, toggle the search bar
    if (!searchbar.contains(e.target)) {
        searchbar.classList.remove("search_bar-selected");
        searchbar.children[0].classList.remove("search_bar_icon-selected");
        searchbar.children[1].classList.remove("search_bar_text-selected");

        // Remove the results
        document.getElementById("search_bar_results").innerHTML = "";

        window.removeEventListener("click", searchbarClickListener);

        searchbarToggled = false;
    }
}

function addLoadingIcon(parentElem) {
    injectStr(loadingIcon, true, parentElem);
}

function removeLoadingIcon() {
    try {
        document.getElementById("loader").remove();
    } catch (e) {
        // Loader is already removed
    }
}

function findProfile(username) {
    changePage("profile/" + username);
}