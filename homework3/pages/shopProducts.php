<?php	
    require 'sessionTime.php';
    // require 'sessionCustomer.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $sql = "select PRODUCTNAME, PRODUCTDESC, CATEGORYID, P.PRODUCTID, PRICE*PERCENTAGE*0.01 AS PRICE from PRODUCTS AS P, SALES WHERE P.SALEID=SALES.SALESID";
    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");    	       
    if(!$con) {
        die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);
    $res = mysql_query($sql);

    if(!$res) {
        $errorMsg = "Database Issue.";
    } else {
        $result = array();
        $rows = array();
        $i = 0;
        while($row = mysql_fetch_assoc($res)) {
            $rows[$i] = $row;
            $i++;
        }
        $sql = "select * FROM PRODUCTS WHERE SALEID IS NULL";
        $res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Database Issue.";
        } else {
            while($row = mysql_fetch_assoc($res)) {
                $rows[$i] = $row;
                $i++;
            }
        }

        $result[1] = $rows;

        $sql = "select * from CATEGORIES";
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

            $result[0] = $rows;
        }
        echo json_encode($result);
    }
    mysql_close($con);
?>