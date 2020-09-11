<?php

session_start();

require("database.php");
$db = new Database();

$lastest_post_id = $_GET["lastest_post_id"];

if (!empty($lastest_post_id)) {
    // Query 
    $sql = "SELECT * FROM post WHERE post_id <'" . $lastest_post_id . "' limit 1";
    $result = $db->query($sql);
    if ($row = $result->fetch_row()) {
        // Get the user_name from user_id
        $sql = "SELECT user_name FROM user WHERE user_id='" . $row[1] . "'";
        $user = $db->query($sql)->fetch_assoc();

        // TODO: Get the post_like from user_id and post_id 

        echo $row[0] . "&" . $user["user_name"]  . "&" . $row[2] . "&" . $row[3] . "&" . $row[4] . "&" . $row[5] . "&";
    }
} else {
    // Query for the first time, so query maximum 5 posts if available
    $sql = "SELECT * FROM post ORDER BY post_id DESC LIMIT 5";
    $result = $db->query($sql);

    while ($row = $result->fetch_row()) {
        // Get the user_name from user_id
        $sql = "SELECT user_name FROM user WHERE user_id='" . $row[1] . "'";
        $user = $db->query($sql)->fetch_assoc();

        // TODO: Get the post_like from user_id and post_id 
        $sql = "SELECT * FROM post_like WHERE post_id='" . $row[0] . "' AND user_id='" . $row[1] . "'";
        $like = $db->query($sql);
        $post_liked = $like->num_rows === 1;

        echo $row[0] . "&" . $user["user_name"] . "&" . $row[2] . "&" . $row[3] . "&" . $row[4] . "&" . $row[5] . "&" . $post_liked . "&";
    }
}
