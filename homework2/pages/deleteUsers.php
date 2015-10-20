<?php
    require 'sessionTime.php';
    require 'sessionAdmin.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
    
    $selectUserList = $_POST['userListCheckbox'];

    $errorMsg = "";
    if(empty($selectUserList)) {
        $errorMsg = "At least one employee is reauired to be selected.";
    }

    $sql = "delete from USERS where";
    $N = count($selectUserList);
    for($i=0; $i<$N; $i++) {
        if($i > 0) {
            $sql = $sql." or";
        }
        $sql = $sql." USERID='".$selectUserList[$i]."'";
    }


    	
    	$con = mysql_connect("cs-server.usc.edu:10212", "root", "");    	       
    	if(!$con) {
           die("Connection failed: ".$con->connect_error);
    	}
    	mysql_select_db('homework', $con);
    	$res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Database Issue.";
        } else {
            $sql = "delete from EMPLOYEES where";
            $N = count($selectUserList);
            for($i=0; $i<$N; $i++) {
                if($i > 0) {
                    $sql = $sql." or";
                }
                $sql = $sql." USERID='".$selectUserList[$i]."'";
            }
            $res = mysql_query($sql);
            if(!$res) {
                $errorMsg = "Database Issue.";
            }
        }
        
        if(strlen($errorMsg)>0) {
            echo $errorMsg;
        } else {
            echo "success";
        }
        mysql_close($con);
?>