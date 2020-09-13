<?php

session_start();

$post_id = $_GET["post_id"];

if (preg_match("/^[0-9]*$/", $post_id)) {
    require("database.php");
    $db = new Database();

    // Get the user id from database
    $sql = "SELECT user_id FROM user WHERE user_name='" . $_SESSION["username"] . "'";
    $user_id = $db->query($sql)->fetch_array()[0];

    // Check if user has already liked the post
    $sql = "SELECT * FROM post_like WHERE post_id='" . $post_id . "' AND user_id='" . $user_id . "'";
    $result = $db->query($sql);

    if ($result->num_rows == 0) {  // User hasn't liked the post
        // Increase the like count by 1
        $sql = "UPDATE post SET like_count = like_count + 1 WHERE post_id='" . $post_id . "'";
        $result = $db->query($sql);

        $sql = "INSERT INTO post_like (post_id, user_id)
            VALUES ('$post_id', '$user_id')";
        $db->query($sql);

        if ($result == true) {
            // The post was found, and like count is increased
            //echo 1;
        } else {
            // The post wasn't found, and like count isn't increased
        }
    } else {
        // User has already liked the post
        // Increase the like count by 1
        $sql = "UPDATE post SET like_count = like_count - 1 WHERE post_id='" . $post_id . "'";
        $result = $db->query($sql);

        $sql = "DELETE FROM post_like WHERE post_id='" . $post_id . "' AND user_id='" . $user_id . "'";
        $db->query($sql);

        if ($result == true) {
            // The post was found, and like count is decreased
            echo 0;
        } else {
            // The post wasn't found, and like count isn't decreased
        }
    }
} else {
    // User was probably going to attack, but it was detected
}
