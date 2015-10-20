<?php
    session_start();
    $type = $_SESSION['USERTYPE'];
    $errorMsg = "";
    if($type != 3) {
        $errorMsg = "NOPERMISSION";
    }
?>