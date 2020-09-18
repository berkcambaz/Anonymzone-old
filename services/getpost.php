<?php

session_start();

require("database.php");
$db = new Database();

$lastest_post_id = (int)$_GET["lastest_post_id"];
$post_type = (int)$_GET["post_type"];
$user_name = $_GET["user_name"];

$array = [];
$length = 0;

if ($lastest_post_id == 0) {    // Query for the first time
    switch ($post_type) {
        case 0: // Post query of the home page
            // Get the user id from database
            $sql = "SELECT user_id FROM user WHERE user_name=:user_name";
            $user_id = $db->query($sql, array(":user_name" => $_SESSION["username"]))->fetch()[0];

            // Get first 10 posts if available
            $sql = "SELECT * FROM post ORDER BY post_id DESC LIMIT 10";
            $stmt = $db->query($sql);

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

                $array[$length++] = array($row[0], $user_name, $row[2], htmlspecialchars($row[3]), $row[4], $post_liked, $post_bookmarked);
            }
            break;
        case 1: // Post query of the bookmarks page
            // Get the user_id from database
            $sql = "SELECT user_id FROM user WHERE user_name=:user_name";
            $user_id = $db->query($sql, array(":user_name" => $_SESSION["username"]))->fetch()[0];

            // Get the first 10 bookmarked post using user_id
            $sql = "SELECT post_id FROM post_bookmark WHERE user_id=:user_id ORDER BY post_id DESC LIMIT 10";
            $stmt = $db->query($sql, array(":user_id" => $user_id));

            while (is_array($post_id = $stmt->fetch())) {
                $post_id = $post_id[0]; // Set post_id array to only post_id

                // Get the user_name of the poster from user_id
                $sql = "SELECT user_name FROM user WHERE user_id=:user_id";
                $user_name = $db->query($sql, array(":user_id" => $user_id))->fetch()[0];

                // Get the post from the post_id
                $sql = "SELECT * FROM post WHERE post_id=:post_id";
                $row = $db->query($sql, array(":post_id" => $post_id))->fetch();

                // Get the post_like from user_id and post_id
                $sql = "SELECT * FROM post_like WHERE post_id=:post_id AND user_id=:user_id";
                $like = $db->query($sql, array(":post_id" => $row[0], ":user_id" => $user_id));
                $post_liked = $like->rowCount() === 1;

                // Replace post_bookmarked as true since only bookmarked posts are shown
                $array[$length++] = array($row[0], $user_name, $row[2], htmlspecialchars($row[3]), $row[4], $post_liked, true);
            }
            break;
        case 2: // Post query of the profile page
            // Get the user_id from database
            $sql = "SELECT user_id FROM user WHERE user_name=:user_name";
            $user_id = $db->query($sql, array(":user_name" => $user_name))->fetch()[0];

            $sql = "SELECT * FROM post WHERE user_id=:user_id ORDER BY post_id DESC LIMIT 10";
            $stmt = $db->query($sql, array(":user_id" => $user_id));

            while ($row = $stmt->fetch()) {
                // Get the post_like from user_id and post_id
                $sql = "SELECT * FROM post_like WHERE post_id=:post_id AND user_id=:user_id";
                $like = $db->query($sql, array(":post_id" => $row[0], ":user_id" => $user_id));
                $post_liked = $like->rowCount() === 1;

                // Get the post_bookmarked from user_id and post_id
                $sql = "SELECT * FROM post_bookmark WHERE post_id=:post_id AND user_id=:user_id";
                $bookmark = $db->query($sql, array(":post_id" => $row[0], ":user_id" => $user_id));
                $post_bookmarked = $bookmark->rowCount() === 1;

                $array[$length++] = array($row[0], $user_name, $row[2], htmlspecialchars($row[3]), $row[4], $post_liked, $post_bookmarked);
            }
            break;
    }
    echo json_encode($array);
} else {
    switch ($post_type) {
        case 0: // Post query of the home page
            // Query maximum 10 posts if available
            $sql = "SELECT * FROM post WHERE post_id<:lastest_post_id ORDER BY post_id DESC LIMIT 10";
            $stmt = $db->query($sql, array(":lastest_post_id" => $lastest_post_id));

            // Get the user id from database
            $sql = "SELECT user_id FROM user WHERE user_name=:username";
            $user_id = $db->query($sql, array(":username" => $_SESSION["username"]))->fetch()[0];

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

                $array[$length++] = array($row[0], $user_name, $row[2], htmlspecialchars($row[3]), $row[4], $post_liked, $post_bookmarked);
            }
            break;
        case 1: // Post query of the bookmarks page
            // Get the user_id from database
            $sql = "SELECT user_id FROM user WHERE user_name=:user_name";
            $user_id = $db->query($sql, array(":user_name" => $_SESSION["username"]))->fetch()[0];

            // Get maximum 10 bookmarked if available post using user_id
            $sql = "SELECT post_id FROM post_bookmark WHERE user_id=:user_id AND post_id<:lastest_post_id ORDER BY post_id DESC LIMIT 10";
            $stmt = $db->query($sql, array(":user_id" => $user_id, ":lastest_post_id" => $lastest_post_id));

            while (is_array($post_id = $stmt->fetch())) {
                $post_id = $post_id[0]; // Set post_id array to only post_id

                // Get the user_name of the poster from user_id
                $sql = "SELECT user_name FROM user WHERE user_id=:user_id";
                $user_name = $db->query($sql, array(":user_id" => $user_id))->fetch()[0];

                // Get the post from the post_id
                $sql = "SELECT * FROM post WHERE post_id=:post_id";
                $row = $db->query($sql, array(":post_id" => $post_id))->fetch();

                // Get the post_like from user_id and post_id
                $sql = "SELECT * FROM post_like WHERE post_id=:post_id AND user_id=:user_id";
                $like = $db->query($sql, array(":post_id" => $row[0], ":user_id" => $user_id));
                $post_liked = $like->rowCount() === 1;

                // Replace post_bookmarked as true since only bookmarked posts are shown
                $array[$length++] = array($row[0], $user_name, $row[2], htmlspecialchars($row[3]), $row[4], $post_liked, true);
            }
            break;
        case 2: // Post query of the profile page
            // Get the user_id from database
            $sql = "SELECT user_id FROM user WHERE user_name=:user_name";
            $user_id = $db->query($sql, array(":user_name" => $user_name))->fetch()[0];

            $sql = "SELECT * FROM post WHERE user_id=:user_id AND post_id<:post_id ORDER BY post_id DESC LIMIT 10";
            $stmt = $db->query($sql, array(":user_id" => $user_id));

            while ($row = $stmt->fetch()) {
                // Get the post_like from user_id and post_id
                $sql = "SELECT * FROM post_like WHERE post_id=:post_id AND user_id=:user_id";
                $like = $db->query($sql, array(":post_id" => $row[0], ":user_id" => $user_id));
                $post_liked = $like->rowCount() === 1;

                // Get the post_bookmarked from user_id and post_id
                $sql = "SELECT * FROM post_bookmark WHERE post_id=:post_id AND user_id=:user_id";
                $bookmark = $db->query($sql, array(":post_id" => $row[0], ":user_id" => $user_id));
                $post_bookmarked = $bookmark->rowCount() === 1;

                $array[$length++] = array($row[0], $user_name, $row[2], htmlspecialchars($row[3]), $row[4], $post_liked, $post_bookmarked);
            }
            break;
    }
    echo json_encode($array);
}
