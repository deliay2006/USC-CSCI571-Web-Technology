<?php
    require 'sessionTime.php';
    require 'sessionSales.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $sn = $_POST['saleName'];
    $desc = $_POST['desc'];
    $percentage = $_POST['percentage'];
    $startdate = $_POST['startdate'];
    $enddate = $_POST['enddate'];
    $productList = $_POST['productListCheckbox'];
    $productStr = implode(",",$productList);

    $errorMsg = "";
    if(strlen($sn) == 0) {
        $errorMsg = "Sale name cannot be empty.";
    }

    if($percentage == 0) {
        $errorMsg = "percentage cannot be zero.";
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

    $sql = "insert into SALES (SALENAME, SALEDESC, STARTDATE, ENDDATE, PERCENTAGE, PRODUCTID) values ('".$sn."', '".$desc."', '".$startdate."', '".$enddate."', ".$percentage.", '".$productStr."')";
    $res = mysql_query($sql);
    if(!$res) {
        $errorMsg = "Database Issue.";
    } else {
        $N = count($productList);
        if($N > 0) {
            $saleId = mysql_insert_id();
            $sql = "update PRODUCTS set SALEID=".$saleId." where";
            for($i=0; $i<$N; $i++) {
                if($i > 0) {
                    $sql = $sql." or";
                }
                $sql = $sql." PRODUCTID=".$productList[$i];
            }
            $res = mysql_query($sql);
            if(!$res) {
                $errorMsg = "Database Issue.";
            }
        }
    }
    
    if(strlen($errorMsg) > 0) {
        echo $sql;
    } else {
    	echo "success";
    }
    mysql_close($con);
?>