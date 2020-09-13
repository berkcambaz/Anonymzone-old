<?php

session_start();
session_destroy();
$_SESSION = [];     // Needed to clear all variables that are set before

echo "../login.php";
