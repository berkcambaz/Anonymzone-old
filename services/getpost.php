<?php

session_start();

require("database.php");
$db = new Database();

if (isset($_SESSION["lastest_post_id"])) {
    // Query 
} else {
    // Query for the first time, so query maximum 5 posts if available
    $sql = "SELECT * FROM (
        SELECT * FROM post ORDER BY post_id DESC LIMIT 5
        ) sub 
        ORDER BY post_id ASC";
    $result = $db->query($sql);

    while ($row = $result->fetch_row()) {
        for ($i = 0; $i < 6; ++$i) {
            echo $row[$i] . "&";
        }
    }
}
