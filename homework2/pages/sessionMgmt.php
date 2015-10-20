<?php
    session_start();
    $type = $_SESSION['USERTYPE'];
    $errorMsg = "";
    if($type != 2) {
        $errorMsg = "NOPERMISSION";
    }
?>