<?php
    	
    require 'sessionTime.php';
    require 'sessionSales.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

        $sql = "select * from PRODUCTS";
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
            echo json_encode($rows);
        }
        mysql_close($con);
?>