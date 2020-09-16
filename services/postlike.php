<?php

session_start();

$post_id = $_GET["post_id"];

if (preg_match("/^[0-9]*$/", $post_id)) {
    require("database.php");
    $db = new Database();

    // Get the user id from database
    $sql = "SELECT user_id FROM user WHERE user_name=:user_name";
    $user_id = $db->query($sql, array(":user_name" => $_SESSION["username"]))->fetch()[0];

    // Check if user has already liked the post
    $sql = "SELECT * FROM post_like WHERE post_id=:post_id AND user_id=:user_id";
    $result = $db->query($sql, array(":post_id" => $post_id, ":user_id" => $user_id));

    if ($result->rowCount() == 0) {  // User hasn't liked the post
        $likeIncreased;

        // Increase the like count by 1
        $sql = "UPDATE post SET like_count=like_count+1 WHERE post_id=:post_id";
        $likeIncreased[0] = $db->query($sql, array(":post_id" => $post_id));

        $sql = "INSERT INTO post_like (post_id, user_id)
        VALUES (:post_id, :user_id)";
        $likeIncreased[1] = $db->query($sql, array(":post_id" => $post_id, ":user_id" => $user_id));

        if ($likeIncreased[0] && $likeIncreased[1]) {
            // The post was found, and like count is increased
            //echo 1;
        } else {
            // The post wasn't found, and like count isn't increased
        }
    } else {
        $likeDecreased;

        // User has already liked the post, decrease the like count by 1
        $sql = "UPDATE post SET like_count=like_count-1 WHERE post_id=:post_id";
        $likeDecreased[0] = $db->query($sql, array(":post_id" => $post_id));

        $sql = "DELETE FROM post_like WHERE post_id=:post_id AND user_id=:user_id";
        $likeDecreased[1] = $db->query($sql, array(":post_id" => $post_id, ":user_id" => $user_id));

        if ($likeDecreased[0] && $likeDecreased[1]) {
            // The post was found, and like count is decreased
            //echo 0;
        } else {
            // The post wasn't found, and like count isn't decreased
        }
    }
} else {
    // User was probably going to attack, but it was detected
}
