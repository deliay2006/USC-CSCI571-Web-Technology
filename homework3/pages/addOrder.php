<?php
    require 'sessionTime.php';
    require 'sessionCustomer.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $date = time();
    session_save_path("/home/scf-33/juncheny");
    session_start();
    $customerId = $_SESSION['CUSTOMERID'];
    $items = $_SESSION['CARTS'];
    $N = count($items);

    $errorMsg = "";
    if($N<1) {
        $errorMsg = "There is no item in your shopping cart.";
    }

    if($customerId<=0) {
        $errorMsg = "Invalid Customer";
    }

    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
    if(!$con) {
        die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);
    
    $sql = "insert into ORDERS (ORDERDATE, CUSTOMERID) values ('".$date."', ".$customerId.")";
    $res = mysql_query($sql);

    if(!$res) {
        $errorMsg = "DataBase Issue.";
        echo $errorMsg;
        return;
    } else {
        $orderId = mysql_insert_id();
        for($i=0; $i<$N; $i++) {
            $item = $items[$i];
            $productId = $item["productId"];
            $quantity = $item["quantity"];
            $price = $item["price"];

            $sql = "insert into ORDERITEMS (ORDERID, PRODUCTID, QUANTITY, PRICE) values (".$orderId.", ".$productId.", ".$quantity.", ".$price.")";
            $res = mysql_query($sql);
            if(!$res) {
                $errorMsg = $errorMsg."Failed to add item:".$item["productName"];
            }
        }
    }
    
    if(strlen($errorMsg) > 0) {
        echo $errorMsg;
    } else {
        unset($_SESSION['CARTS']);
        echo "success";
    }
    mysql_close($con);
?>