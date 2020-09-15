/* post template */
// [0] -> user_name
// [1] -> post_id
// [2] -> post_full_date
// [3] -> post_date
// [4] -> post_title
// [5] -> post_content
// [6] -> like_count
// [7] -> post_liked
// [8] -> post_bookmarked

let postTemplate = [
    '<div class=" post">\
        <div class="post_content_header">\
            <div class="post_username">',

    '</div>\
            <div hidden class="post_id">',

    '</div>\
            <div class="post_date" title="',

    '">',

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

let postPropertyCount = 9;

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function injectPost(post, insertAtBottom) {
    post[2] = getFullDate(post[2]);
    post[3] = clampDate(post[3]);
    post[6] = clampCount(post[6]);
    post[7] = post[7] ? " icon_clicked" : "-o";  // post_liked
    post[8] = post[8] ? " icon_clicked" : "-o";  // post_bookmarked

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

/**
 * 
 * @param {Date} date 
 */
function clampDate(postDate) {
    let currDate = new Date();
    let dateDiff = Math.abs(currDate - postDate);

    if (Math.floor(dateDiff /= 1000) < 60) {
        // If seconds
        return Math.floor(dateDiff) + "s";
    } else if (Math.floor(dateDiff /= 60) < 60) {
        // If minutes
        return Math.floor(dateDiff) + "m";
    } else if (Math.floor(dateDiff /= 60) < 24) {
        // If hours
        return Math.floor(dateDiff) + "h";
    } else if (currDate.getFullYear() - postDate.getFullYear() > 0) {
        // If years
        return months[postDate.getMonth()] + " " + postDate.getDate() + ", " + postDate.getFullYear();
    } else {
        // If days or months
        return months[postDate.getMonth()] + " " + postDate.getDate();
    }
}

/**
 * 
 * @param {Date} postDate 
 */
function getFullDate(postDate) {
    let hour = postDate.getHours();
    let minute = postDate.getMinutes();

    return (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + (hour < 12 ? " AM " : " PM ") + months[postDate.getMonth()] + " " + postDate.getDate() + ", " + postDate.getFullYear();
}