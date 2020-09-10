<?php

session_start();

// Check if user has logged in, if not, send user to login page
if (empty($_SESSION["username"])) {
    ob_start();
    header("Location: login.php");
    ob_end_flush();
    exit();
}

//session_destroy();

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

    <link rel="stylesheet" href="styles/main.css" type="text/css">
    <link rel="stylesheet" href="styles/icon.css" type="text/css">
</head>

<body>

    <div class="side_bar side_bar_left">
        <ul class="side_bar_item_list">
            <li class="side_bar_item" id="home" onclick="changePage('home')">
                <span class="side_bar_item_container">
                    <span class="icon-home"></span>
                    <span class="side_bar_item_text">Home</span>
                </span>
            </li>
            <li class="side_bar_item" id="explore" onclick="changePage('explore')">
                <span class="side_bar_item_container">
                    <span class="icon-compass"></span>
                    <span class="side_bar_item_text">Explore</span>
                </span>
            </li>
            <li class="side_bar_item" id="notifications" onclick="changePage('notifications')">
                <span class="side_bar_item_container">
                    <span class="icon-bell"></span>
                    <span class="side_bar_item_text">Notifications</span>
                </span>
            </li>
            <li class="side_bar_item" id="bookmarks" onclick="changePage('bookmarks')">
                <span class="side_bar_item_container">
                    <span class="icon-bookmark"></span>
                    <span class="side_bar_item_text">Bookmarks</span>
                </span>
            </li>
            <li class="side_bar_item" id="profile" onclick="changePage('profile')">
                <span class="side_bar_item_container">
                    <span class="icon-user"></span>
                    <span class="side_bar_item_text">Profile</span>
                </span>
            </li>
            <li class="side_bar_item">
                <span class="side_bar_item_container">
                    <span class="icon-pencil-square"></span>
                    <span class="side_bar_item_text">Create a post</span>
                </span>
            </li>
        </ul>
    </div>

    <div class="main_content">
        <div class="page_header" id="page_header">Home</div>
        <div id="app">
            <!-- Content goes here by the javascript SPA -->
        </div>
    </div>

    <div class="side_bar side_bar_right">
        <div class="profile_info_box">
            <ul class="profile_info">
                <li class="profile_info_text"><?php echo $_SESSION["username"]; ?></li>
                <!--<li class="profile_info_text">@user_id</li>-->
            </ul>

            <ul class="trending_posts">
                <h3>Trending posts</h3>
                <li class="trending_post">post-1</li>
                <li class="trending_post">post-2</li>
                <li class="trending_post">post-3</li>
            </ul>

            <ul class="side_bar_bottom">
                <li class="side_bar_bottom_element">
                    Terms
                </li>
                <li class="side_bar_bottom_element">
                    Privacy Policy
                </li>
            </ul>
        </div>
    </div>

    <!-- Load scripts -->
    <script src="scripts/script.js" type="text/javascript"></script>
    <script src="scripts/util.js" type="text/javascript"></script>
    <script src="scripts/loader/injector.js" type="text/javascript"></script>
    <script src="scripts/spa/route.js" type="text/javascript"></script>
    <script src="scripts/spa/router.js" type="text/javascript"></script>
    <script src="scripts/spa/app.js" type="text/javascript"></script>
    <!-- Load scripts -->
</body>

</html>