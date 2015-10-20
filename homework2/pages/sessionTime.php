<?php
    session_start();
    $sessionTime = $_SESSION['ACCESSTIME'];
    $t = time();
    $errorMsg = "";
    if($t - $sessionTime > 1200) {
        $errorMsg = "TIMEOUT";
    }
?>