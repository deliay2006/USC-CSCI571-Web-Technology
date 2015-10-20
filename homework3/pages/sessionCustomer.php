<?php
    session_save_path("/home/scf-33/juncheny");
    session_start();
    $type = $_SESSION['USERTYPE'];
    $errorMsg = "";
    if($type."" != "4" ) {
        $errorMsg = "NOPERMISSION";
    }
?>