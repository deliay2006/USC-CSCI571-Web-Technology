<?php
    	
    require 'sessionTime.php';
    require 'sessionCustomer.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $categoyId = $_GET['categoryId'];

    $sql = "select PRODUCTNAME, PRODUCTDESC, CATEGORYID, P.PRODUCTID, PRICE*PERCENTAGE*0.01 AS PRICE from PRODUCTS AS P, SALES WHERE P.SALEID=SALES.SALESID AND CATEGORYID=".$categoyId;
    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");    	       
    if(!$con) {
        die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);
    $res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Database Issue.";
        } else {
            $rows = array();
            $i = 0;
            while($row = mysql_fetch_assoc($res)) {
                $rows[$i] = $row;
                $i++;
            }

            $sql = "select * FROM PRODUCTS WHERE SALEID IS NULL AND CATEGORYID=".$categoyId;
            $res = mysql_query($sql);
            if(!$res) {
                $errorMsg = "Database Issue.";
            } else {
                while($row = mysql_fetch_assoc($res)) {
                    $rows[$i] = $row;
                    $i++;
                }
            }
            
            $date = time()*1000;
            $sql = "select * from PRODUCTS, SALES where PRODUCTS.SALEID=SALES.SALESID AND PRODUCTS.SALEID>0 and STARTDATE<".$date." AND ENDDATE>".$date." and CATEGORYID=".$categoyId;
            $res = mysql_query($sql);
            if(!$res) {
                $errorMsg = "Database Issue.";
            } else {
                $cats = array();
                $i=0;
                while($row = mysql_fetch_assoc($res)) {
                    $cats[$i] = $row;
                    $i++;
                }

                $result = array($rows, $cats);
                echo json_encode($result);
            }
        }
        mysql_close($con);
?>