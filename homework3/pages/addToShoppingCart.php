<?php
    require 'sessionTime.php';
    require 'sessionCustomer.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
    
    session_save_path("/home/scf-33/juncheny");
    session_start();
    $productId = $_POST['productId'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];
    $name = $_POST['productName'];
    $desc = $_POST['productDesc'];

    if(empty($productId) || !is_numeric($productId)) {
        $errorMsg = "The product Id is invalid.";
    }

    if(strlen($errorMsg) > 0) {
        echo $errorMsg;
        return;
    }

    // session_start();
    $row = array("productId"=>$productId, "price"=>$price, "quantity"=>$quantity, "productName"=>$name, "productDesc"=>$desc);
    // $searchAds = true;
    if(!$_SESSION['CARTS']) {
        $_SESSION['CARTS'] = array($row);
    } else {
        $alreadyInArray = false;
        for($i=0; $i<count($_SESSION['CARTS']); $i++) {
            if($_SESSION['CARTS'][$i]['productId'] == $productId) {
                $_SESSION['CARTS'][$i]['quantity']+=$quantity;
                $alreadyInArray = true;
                // $searchAds = false;
            }
        }
        if(!$alreadyInArray) {
            array_push($_SESSION['CARTS'], $row);
        }
    }

    // if($searchAds) {
        $sql = "select ORDERID from ORDERITEMS WHERE PRODUCTID=".$productId." GROUP BY ORDERID";
        $con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
        if(!$con) {
            die("Connection failed: ".$con->connect_error);
        }
        mysql_select_db('homework', $con);
        $res = mysql_query($sql);
        
        if(!$res) {
            $errorMsg = "Database Issue.";
            echo $errorMsg;
        } else {
            $orderIds = mysql_fetch_array($res);
            if(count($orderIds)>0) {
                $sql = "select DISTINCT PRODUCTNAME FROM PRODUCTS AS P, ORDERITEMS AS OI WHERE OI.PRODUCTID=P.PRODUCTID AND OI.PRODUCTID!=".$productId." AND (";
                $i=0;
                foreach($orderIds as $orderId) {
                    if($i>0) {
                        $sql.=" or ";
                    }
                    $sql.="ORDERID=".$orderId;
                    $i++;
                }
                $sql.=")";

                $res = mysql_query($sql);
                if(!$res) {
                    $errorMsg = "Database Issue.";
                    echo $errorMsg;
                    // echo $sql;
                } else {
                    $rows = array();
                    $i = 0;
                    while($row = mysql_fetch_assoc($res)) {
                        $rows[$i] = $row;
                        $i++;
                    }
                    // $rows = mysql_fetch_array($res);
                    $result = array("success",$rows);
                    echo json_encode($result);
                }
            } else {
                $result = array("success");
                echo json_encode($result);
            }
        }
    // } else {
    //     $result = array("success");
    //     echo json_encode($result);
    // }
    // echo 'success';
    // echo $_SESSION['CARTS'];
?>