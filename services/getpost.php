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
        for ($i = 0; $i < 6; ++$i) {
            echo $row[$i] . "&";
        }
    }
} else {
    // Query for the first time, so query maximum 5 posts if available
    $sql = "SELECT * FROM post ORDER BY post_id DESC LIMIT 5";
    $result = $db->query($sql);

    while ($row = $result->fetch_row()) {
        for ($i = 0; $i < 6; ++$i) {
            echo $row[$i] . "&";
        }
    }
}
