<?php
    	
    // require 'sessionTime.php';
    // require 'sessionSales.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
    
    $date = time()*1000;
        $sql = "select * from PRODUCTS, SALES where PRODUCTS.SALEID=SALES.SALESID AND PRODUCTS.SALEID>0 and STARTDATE<".$date." AND ENDDATE>".$date;
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
            // echo $sql;
        }
        mysql_close($con);
?>