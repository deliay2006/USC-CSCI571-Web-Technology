<?php
    require 'sessionTime.php';
    require 'sessionCustomer.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
    
    $productId = $_POST['productId'];
    $quantity = $_POST['quantity'];

    if(empty($productId) || !is_numeric($productId)) {
        $errorMsg = "The product Id is invalid.";
    }

    if(empty($quantity) || $quantity<0 || $quantity>100) {
        $errorMsg = "The quantity has to larger than 0 and smaller than 100.";
    }

    if(strlen($errorMsg) > 0) {
        echo $errorMsg;
        return;
    }
    
    session_save_path("/home/scf-33/juncheny");
    session_start();
    if(!$_SESSION['CARTS']) {
        echo 'success';
    } else {
        for($i=0; $i<count($_SESSION['CARTS']); $i++) {
            $row = $_SESSION['CARTS'][$i];
            if($row['productId'] == $productId) {
                $_SESSION['CARTS'][$i]['quantity'] = $quantity;
            }
        }
    }

    echo 'success';
?>