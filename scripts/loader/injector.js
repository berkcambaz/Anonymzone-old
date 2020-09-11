/* post template */
// [0] -> user_name
// [1] -> post_id
// [2] -> post_date
// [3] -> post_title
// [4] -> post_content
// [5] -> like_count
// [6] -> post_liked
// [7] -> post_bookmarked

let postTemplate = [
    '<div class=" post">\
        <div class="post_content_header">\
            <div class="post_username">',

    '</div>\
            <div hidden class="post_id">',

    '</div>\
            <div class="post_date">',

    '</div>\
        </div>\
        <div class="post_title wrap_text">',

    '</div>\
        <div class="post_content_footer">\
            <div class="post_content wrap_text">',

    '</div>\
            <div class=" reactions">\
                <span class="reaction_count">',

    '</span>\
                <span class="icon icon-heart',

    '" onclick="reactionLike(this)"></span>\
                <span class="icon icon-bookmark',

    '" onclick="reactionBookmark(this)"></span>\
            </div>\
        </div>\
    </div>'
];

let postPropertyCount = 8;

function injectPost(post, insertAtBottom) {
    post[5] = clampCount(post[5]);
    post[6] = post[6] ? "" : "-o";  // post_liked
    post[7] = post[7] ? "" : "-o";  // post_bookmarked

    let postText = "";
    for (let i = 0; i < postPropertyCount; ++i)
        postText += postTemplate[i] + post[i];
    postText += postTemplate[postPropertyCount];

    if (insertAtBottom) {
        // Insert the new post at the bottom of the post container
        document.getElementById("post_container").insertAdjacentHTML("beforeend", postText);
    } else {
        // Insert the new post at the top of the post container
        document.getElementById("post_container").insertAdjacentHTML("afterbegin", postText);
    }
}

/**
 * 
 * @param {number} count 
 */
function clampCount(count) {
    if (count > 999999) {
        return (count / 1000000).toString() + "m";
    } else if (count > 999) {
        return (count / 1000).toString() + "k";
    }
    return count;
}