<?php
    require 'sessionTime.php';
    require 'sessionCustomer.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    session_save_path("/home/scf-33/juncheny");
    session_start();
    if(!$_SESSION['CARTS']) {
        echo 'success';
    } else {
        unset($_SESSION['CARTS']);
    }

    echo 'success';
?>