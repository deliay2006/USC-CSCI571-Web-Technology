<?php
    require 'sessionTime.php';
    require 'sessionMgmt.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
    
    $startDate = $_POST['startdate'];
    $endDate = $_POST['enddate'];
    $groupByColumn = $_POST['reportGroupRadio'];
    $selectByColumn = $_POST['noGroupRadio'];
    $orderByColumn = $_POST['orderRadio'];
    $category = $_POST['categorySelect'];
    $totalSale = $_POST['totalSale'];
    
    $sql = "select";
    if($totalSale == "1") {
        $sql.=" sum(QUANTITY*OI.PRICE) as TOTALSALE";
    } else {
        if($selectByColumn == "quantity") {
            $sql.=" sum(QUANTITY) as SUMQTY";
        } else if($selectByColumn == "price") {
            $sql.=" sum(QUANTITY*OI.PRICE) as SUMQTY";
        }
        
        if($groupByColumn == 'productCategory') {
            $sql.=", PC.CATEGORYID, PC.CATEGORYNAME, O.ORDERDATE, O.ORDERID";
        } else if($groupByColumn == 'sales') {
            $sql.=", S.SALESID, S.SALENAME, S.PERCENTAGE, OI.PRICE, O.ORDERDATE, O.ORDERID";
            if(strlen($category)>0) {
                $sql.=", PC.CATEGORYNAME";
            }
        } else {
            $sql.=", OI.PRODUCTID, P.PRODUCTNAME, OI.PRICE, O.ORDERDATE, O.ORDERID";
            if(strlen($category)>0) {
                $sql.=", PC.CATEGORYNAME";
            }
        }
    }
    $sql.=" from ORDERS AS O, ORDERITEMS AS OI, PRODUCTS AS P";
    if(strlen($category)>0 || $groupByColumn == 'productCategory') {
        $sql.=", CATEGORIES AS PC";
    } 

    if($groupByColumn == 'sales') {
        $sql.=", SALES AS S";
    }
    
    $sql.=" WHERE O.ORDERID=OI.ORDERID AND P.PRODUCTID=OI.PRODUCTID";
    if(strlen($category)>0 || $groupByColumn == 'productCategory') {
        $sql.=" and PC.CATEGORYID=P.CATEGORYID";
        if(strlen($category)>0) {
            $sql.=" and PC.CATEGORYID=".$category;
        }
    }

    if($groupByColumn == 'sales') {
        $sql.=" and S.SALESID=P.SALEID";
    }

    if(strlen($startDate) > 0) {
        $sql.=" and ORDERDATE>='".$startDate."'";
    }

    if(strlen($endDate) > 0) {
        $sql.=" and ORDERDATE<='".$endDate."'";
    }

    $sql.=" GROUP BY";
    if($groupByColumn == 'productCategory') {
        $sql.=" PC.CATEGORYID";
    } else if($groupByColumn == 'sales') {
        $sql.=" S.SALESID";
    } else {
        $sql.=" OI.PRODUCTID";
    }
    if($totalSale == "1") {
        
    } else {
        if($selectByColumn == "quantity") {
            $sql.=" ORDER BY SUMQTY";
        } else {
            $sql.=" ORDER BY OI.PRICE";
        }
        if($orderByColumn=='DESC') {
            $sql.=" DESC";
        }
    }

    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");    	       
    if(!$con) {
        die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);
    $res = mysql_query($sql);

    if(!$res) {
            // $errorMsg = "No result match the search option.";
        // echo "empty";
        echo $sql;
    } else {
        $rows = array();
        $i = 0;
        date_default_timezone_set('America/Los_Angeles');
        while($row = mysql_fetch_assoc($res)) {
            $row["ORDERDATE"] = date("H:i m-d-Y",$row["ORDERDATE"]);
            $rows[$i] = $row;
            $i++;
        }
        echo json_encode($rows);
    }
    mysql_close($con);
?>