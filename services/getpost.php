<?php

session_start();

require("database.php");
$db = new Database();

$lastest_post_id = (int)$_GET["lastest_post_id"];

if (!empty($lastest_post_id)) {
    // Query maximum 10 posts if available
    $sql = "SELECT * FROM post WHERE post_id<:lastest_post_id ORDER BY post_id DESC LIMIT 10";
    $stmt = $db->query($sql, array(":lastest_post_id" => $lastest_post_id));

    // Get the user id from database
    $sql = "SELECT user_id FROM user WHERE user_name=:username";
    $user_id = $db->query($sql, array(":username" => $_SESSION["username"]))->fetch()[0];

    $array = [];
    $length = 0;

    while ($row = $stmt->fetch()) {
        // Get the user_name of the poster from user_id
        $sql = "SELECT user_name FROM user WHERE user_id=:user_id";
        $user_name = $db->query($sql, array(":user_id" => $row[1]))->fetch()[0];

        // Get the post_like from user_id and post_id 
        $sql = "SELECT * FROM post_like WHERE post_id=:post_id AND user_id=:user_id";
        $like = $db->query($sql, array(":post_id" => $row[0], ":user_id" => $user_id));
        $post_liked = $like->rowCount() === 1;

        // Get the post_bookmarked from user_id and post_id
        $sql = "SELECT * FROM post_bookmark WHERE post_id=:post_id AND user_id=:user_id";
        $bookmark = $db->query($sql, array(":post_id" => $row[0], ":user_id" => $user_id));
        $post_bookmarked = $bookmark->rowCount() === 1;

        $array[$length++] = array($row[0], $user_name, $row[2], htmlspecialchars($row[3]), htmlspecialchars($row[4]), $row[5], $post_liked, $post_bookmarked);
    }
    echo json_encode($array);
} else {
    // Query for the first time, so query maximum 10 posts if available
    $sql = "SELECT * FROM post ORDER BY post_id DESC LIMIT 10";
    $stmt = $db->query($sql);

    // Get the user id from database
    $sql = "SELECT user_id FROM user WHERE user_name=:user_name";
    $user_id = $db->query($sql, array(":user_name" => $_SESSION["username"]))->fetch()[0];

    $array = [];
    $length = 0;

    while ($row = $stmt->fetch()) {
        // Get the user_name of the poster from user_id
        $sql = "SELECT user_name FROM user WHERE user_id=:user_id";
        $user_name = $db->query($sql, array(":user_id" => $row[1]))->fetch()[0];

        // Get the post_like from user_id and post_id 
        $sql = "SELECT * FROM post_like WHERE post_id=:post_id AND user_id=:user_id";
        $like = $db->query($sql, array(":post_id" => $row[0], ":user_id" => $user_id));
        $post_liked = $like->rowCount() === 1;

        // Get the post_bookmarked from user_id and post_id
        $sql = "SELECT * FROM post_bookmark WHERE post_id=:post_id AND user_id=:user_id";
        $bookmark    = $db->query($sql, array(":post_id" => $row[0], ":user_id" => $user_id));
        $post_bookmarked = $bookmark->rowCount() === 1;

        $array[$length++] = array($row[0], $user_name, $row[2], htmlspecialchars($row[3]), htmlspecialchars($row[4]), $row[5], $post_liked, $post_bookmarked);
    }
    echo json_encode($array);
}
