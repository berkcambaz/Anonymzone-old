<?php

$user_name = $_GET["user_name"];

if (!empty($user_name)) {
    require("database.php");
    $db = new Database();

    $sql = "SELECT user_name, created_at FROM user WHERE user_name=:user_name";
    $result = $db->query($sql, array(":user_name" => $user_name))->fetch();

    echo json_encode(array(array($result[0], $result[1])));
}
