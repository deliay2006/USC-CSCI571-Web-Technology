<?php	
    require 'sessionTime.php';
    require 'sessionCustomer.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    session_save_path("/home/scf-33/juncheny");
    session_start();
    if(!$_SESSION['CARTS'] || count($_SESSION['CARTS']) < 1) {
        echo '';
        return;
    }
    
    echo json_encode($_SESSION['CARTS']);
?>