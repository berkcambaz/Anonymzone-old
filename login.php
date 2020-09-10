<?php

session_start();

// Check if user is already logged in, if so, send user to index page
if (!empty($_SESSION["username"])) {
    ob_start();
    header("Location: ./");
    ob_end_flush();
    exit();
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    <meta name="description" content="a place to share your ideas without thinking twice">
    <meta name="keywords" content="share, idea, no rules">
    <meta name="author" content="Berk Cambaz">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anonymzone</title>

    <link rel="stylesheet" href="styles/login.css" type="text/css">
    <link rel="stylesheet" href="styles/icon.css" type="text/css">
</head>

<body>

    <!-- LOAD SCRIPT HERE -->
    <script src="scripts/login.js" type="text/javascript"></script>
    <script src="scripts/util.js" type="text/javascript"></script>
    <!-- LOAD SCRIPT HERE -->

    <div class="login_panel">
        <div class="login_panel_container">
            <div class="login_panel_header">Anonymzone</div>
            <div class="login_panel_option">Username</div>
            <div class="login_panel_error error"></div>
            <!--<input type="text" class="login_panel_input" id="username" spellcheck="false" autocomplete="false" placeholder="I want to be disguised as...">-->
            <textarea class="login_panel_input" id="username" oninput="sizeTextareaDynamic(this)" style="height: 19px;" spellcheck="false" autocomplete="false" placeholder="I want to be disguised as..."></textarea>

            <div class="login_panel_option">
                <input type="checkbox" class="checkbox" id="useragreement">
                <label for="useragreement" class="error">I am responsible for what I will see</label>
            </div>

            <div class="login_panel_button" onclick="login()">Enter to anonymzone</div>
        </div>
    </div>

</body>

</html>