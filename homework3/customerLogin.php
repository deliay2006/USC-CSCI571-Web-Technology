<?php
    session_save_path("/home/scf-33/juncheny");
    session_start();
    $un = $_POST['username'];
    $pw = $_POST['password'];
    $errorMsg = "";

    if(strlen($un) == 0) {
        $errorMsg = "Invalid Login.";
    }

    if(strlen($pw) == 0) {
        $errorMsg = "Invalid Login.";
    }

    if(strlen($un) == 0 && strlen($pw) == 0) {
        $errorMsg = "";
    }

    if(strlen($un) > 0 && strlen($pw) > 0) {
    	$sql = "select USERTYPE, USERNAME, USERS.USERID, CUSTOMERID from USERS, CUSTOMERS where USERNAME='".
    	       $un."' and PASSWORD='".$pw."' and USERTYPE=4 and CUSTOMERS.USERID=USERS.USERID";
    	$con = mysql_connect("cs-server.usc.edu:10212", "root", "");
    	if(!$con) {
           die("Connection failed: ".$con->connect_error);
    	}
    	mysql_select_db('homework', $con);
    	$res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Invalid Login.";
            // echo $errorMsg;
            echo $sql;
            return;
        }

        $row = mysql_fetch_assoc($res);
        if(!$row) {
            $errorMsg = "Invalid Login.";
            echo $errorMsg;
            return;
        }

        $_SESSION['ACCESSTIME'] = time();
        $_SESSION['USERID'] = $row['USERID'];
        $_SESSION['USERTYPE'] = 4;
        $_SESSION['CUSTOMERID'] = $row['CUSTOMERID'];
        echo json_encode($row);
        
        mysql_close($con);
    }
?>