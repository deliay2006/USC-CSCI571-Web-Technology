<?php
    require 'sessionTime.php';
    require 'sessionAdmin.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
        $sql = "select U.USERID, U.USERNAME, U.PASSWORD, U.USERTYPE, E.FIRSTNAME, E.LASTNAME, E.AGE, E.GENDER from USERS as U inner join EMPLOYEES as E on U.USERID=E.USERID";
    	$con = mysql_connect("cs-server.usc.edu:10212", "root", "");    	       
    	if(!$con) {
           die("Connection failed: ".$con->connect_error);
    	}
    	mysql_select_db('homework', $con);
    	$res = mysql_query($sql);
        // $rows = mysql_fetch_array($res);
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