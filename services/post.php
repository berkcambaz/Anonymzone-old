<?php

session_start();

$post_title = $_GET["post_title"];
$post_content = $_GET["post_content"];

if (!empty($post_title)) {
    if (strlen($post_title) > 64) {
        // Error: Title can not have more than 64 characters.
        echo "&Title can not have more than 64 characters";
    } else {
        if (!empty($post_content)) {
            if (strlen($post_content) > 256) {
                // Error: Content can not have more than 256 characters.
                echo "&Your thoughts can not have more than 256 characters";
            } else {
                // If there are no errors
                require("database.php");
                $db = new Database();

                $sql = "SELECT user_id FROM user WHERE user_name='" . $_SESSION["username"] . "'";
                $result = $db->query($sql)->fetch_assoc();

                $sql = "INSERT INTO post (user_id, created_at, post_title, post_content)
                    VALUES ('" . $result["user_id"] . "', UNIX_TIMESTAMP()" . -90 . ", '" . $post_title . "', '" . $post_content . "')";
                $db->query($sql);

                $sql = "SELECT created_at, post_id FROM post WHERE post_id='" . $db->getConnection()->insert_id . "'";
                $result = $db->query($sql)->fetch_assoc();

                echo $_SESSION["username"] . "&" . $result["post_id"] . "&" . $result["created_at"] . "Z";
            }
        } else {
            // Error: Content can not be empty.
            echo "&Your thoughts can not be empty";
        }
    }
} else {
    // Error: Title can not be empty.
    echo "&Title can not be empty";
}
