<?php
    require 'sessionTime.php';
    require 'sessionCustomer.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
    
    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");    	       
    if(!$con) {
        die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);

    session_save_path("/home/scf-33/juncheny");
    session_start();
    $sql = "select * from ORDERS where CUSTOMERID=".$_SESSION['CUSTOMERID'];
    $res = mysql_query($sql);
    if(!$res) {
        $errorMsg = "Database Issue.";
    } else {
        $rows = array();
        $i = 0;
        date_default_timezone_set('America/Los_Angeles');
        while($row = mysql_fetch_assoc($res)) {
            $row["ORDERDATE"] = date("H:i m-d-Y",$row["ORDERDATE"]);
            // echo $row["ORDERDATE"];
            $rows[$i] = $row;
            $i++;
        }
        echo json_encode($rows);
    }

    mysql_close($con);
?>