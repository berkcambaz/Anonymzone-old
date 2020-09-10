<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "anonymzone";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn)
    die("Connection failed: " . mysqli_connect_error());

/*
$sql = "INSERT INTO user (user_name, created_at)
    VALUES ('test_user', UTC_TIMESTAMP())";
*/

$sql = "SELECT user_id, user_name, created_at FROM user WHERE user_id = 1";
$result = mysqli_query($conn, $sql);

if ($result) {
    $result = $result->fetch_assoc();
    //echo $result["user_id"] . $result["user_name"] . gmdate("Y-m-d H:i:s", $result["created_at"]->time());
    //echo "New record created successfully.";
} else
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);

mysqli_close($conn);

echo "<script>let date = new Date('" . $result["created_at"] . "Z" . "');
    alert(date);
</script>";
