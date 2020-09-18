<?php

$q = $_GET["q"];

// If search string is not empty
if (!empty($q)) {
    require("database.php");
    $db = new Database();

    $array = [];
    $length = 0;

    $sql = "SELECT user_name FROM user WHERE user_name LIKE :user_name ORDER BY user_name DESC LIMIT 10";
    $result = $db->query($sql, array(":user_name" => "%" . $q . "%"));

    while ($row = $result->fetch()) {
        $array[$length++] = array($row[0]);
    }
    echo json_encode($array);
}
