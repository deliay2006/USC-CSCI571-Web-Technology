<?php
    require 'sessionTime.php';
    require 'sessionCustomer.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
    
    $productId = $_POST['productId'];
    if(empty($productId) || !is_numeric($productId)) {
        $errorMsg = "The product Id is invalid.";
    }

    if(strlen($errorMsg) > 0) {
        echo $errorMsg;
        return;
    }
    
    session_save_path("/home/scf-33/juncheny");
    session_start();
    $row = array("productId"=>$productId, "price"=>$price, "quantity"=>$quantity, "productName"=>$name, "productDesc"=>$desc);
    if(!$_SESSION['CARTS']) {
        echo "success";
        // $result = array();
        // $result[0] = "success";
        // echo json_encode($result);
    } else {
        for($i=0; $i<count($_SESSION['CARTS']); $i++) {
            $row = $_SESSION['CARTS'][$i];
            if($row['productId'] == $productId) {
                unset($_SESSION['CARTS'][$i]);
            }
        }
        echo "success";
        // $result = array();
        // $result[0] = "success";
        // $result[1] = $row;
        // echo json_encode($result);
    }
?>