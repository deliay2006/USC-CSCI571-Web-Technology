<?php
    require 'sessionTime.php';
    require 'sessionSales.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $pn = $_POST['productName'];
    $desc = $_POST['desc'];
    $price = $_POST['price'];
    $category = $_POST['categorySelect'];
    $productId = $_POST['productId'];

    $errorMsg = "";
    if(strlen($pn) == 0) {
        $errorMsg = "Product name cannot be empty.";
    }

    if($category < 1) {
        $errorMsg = "Category cannot be empty.";
    }

    if(!empty($price) && (!is_numeric($price)||$price<0||$price>100000000)) {
        $errorMsg = "Invalid price.";
    }
    
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $sql = "update PRODUCTS set PRODUCTNAME='".$pn."', PRODUCTDESC='".$desc."', PRICE=".$price.", CATEGORYID=".$category." where PRODUCTID=".$productId;
    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");    	       
    if(!$con) {
       die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);
    $res = mysql_query($sql);
    if(!$res) {
        $errorMsg = "Database Issue.";
    } 
    
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
    } else {
        echo 'success';
    }
    mysql_close($con);
?>