<?php

session_start();

$post_id = (int)$_GET["post_id"];

if (is_int($post_id)) {
    require("database.php");
    $db = new Database();

    // Get the user id from database
    //$sql = "SELECT user_id FROM user WHERE user_name='" . $_SESSION["username"] . "'";
    //$user_id = $db->query($sql)->fetch_array()[0];
    $sql = "SELECT user_id FROM user WHERE user_name=:user_name";
    $user_id = $db->query($sql, array(":user_name" => $_SESSION["username"]))->fetch()[0];

    // Check if user has already bookmarked the post
    //$sql = "SELECT * FROM post_bookmark WHERE post_id='" . $post_id . "' AND user_id='" . $user_id . "'";
    //$result = $db->query($sql);
    $sql = "SELECT * FROM post_bookmark WHERE post_id=:post_id AND user_id=:user_id";
    $result = $db->query($sql, array(":post_id" => $post_id, ":user_id" => $user_id));

    if ($result->rowCount() === 0) {  // User hasn't bookmarked the post
        // Bookmark the post
        //$sql = "INSERT INTO post_bookmark (post_id, user_id)
        //VALUES ('" . $post_id . "', '" . $user_id . "')";
        //$db->query($sql);
        $sql = "INSERT INTO post_bookmark (post_id, user_id)
        VALUES (:post_id, :user_id)";
        $db->query($sql, array(":post_id" => $post_id, ":user_id" => $user_id));
    } else {
        // Unmark the post
        //$sql = "DELETE FROM post_bookmark WHERE post_id='" . $post_id . "' AND user_id='" . $user_id . "'";
        //$db->query($sql);
        $sql = "DELETE FROM post_bookmark WHERE post_id=:post_id AND user_id=:user_id";
        $db->query($sql, array(":post_id" => $post_id, ":user_id" => $user_id));
    }
} else {
    // User was probably going to attack, but it was detected
}
