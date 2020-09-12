<?php

session_start();

$useragreement = $_GET["useragreement"];

if (isset($useragreement) && $useragreement == "true") {
    $username = $_GET["username"];
    if (empty($username)) {
        echo "can not be empty&";
    } else {
        $usernameLength = strlen($username);
        if ($usernameLength < 3 || $usernameLength > 16) {
            echo "should be between 3-16 characters&";
        } else {
            if (!preg_match("/^[a-z0-9]*$/", $username)) {
                echo "can only contain a-z or 0-9&";
            } else {
                require("database.php");
                $db = new Database();

                // Get user_id from the entered username
                $sql = "SELECT user_id FROM user WHERE user_name='" . $username . "'";
                $result = $db->query($sql);

                // If a user_id is found, it means the account was already created,
                // if not already created, create the account
                if ($result->num_rows === 0) {
                    $sql = "INSERT INTO user (user_name, created_at)
                    VALUES ('" . $username . "', UTC_TIMESTAMP())";
                    $db->query($sql);
                }

                $_SESSION["username"] = $username;
            }
        }
    }
} else {
    echo "&1";
}
