<?php
    session_save_path("/home/scf-33/juncheny");
    session_start();
    unset($_SESSION['USERID']);
    unset($_SESSION['ACCESSTIME']);
    unset($_SESSION['USERTYPE']);
    unset($_SESSION['CUSTOMERID']);
    unset($_SESSION['CARTS']);
    // session_destroy();
    echo "success";
?>