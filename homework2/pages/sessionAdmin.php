<?php
    session_start();
    $type = $_SESSION['USERTYPE'];
    $errorMsg = "";
    if($type."" != "1" ) {
        $errorMsg = "NOPERMISSION";
    }
?>