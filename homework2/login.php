<?php
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

    $userType = "";

    if(strlen($un) > 0 && strlen($pw) > 0) {
    	$sql = "select USERTYPE, USERNAME from USERS where USERNAME='".
    	       $un."' and PASSWORD='".$pw."'";
    	$con = mysql_connect("cs-server.usc.edu:10212", "root", "");
    	if(!$con) {
           die("Connection failed: ".$con->connect_error);
    	}
    	mysql_select_db('homework', $con);
    	$res = mysql_query($sql);
    	$row = mysql_fetch_assoc($res);
        if(!$res || !$row) {
            $errorMsg = "Invalid Login.";
        }

        $type = $row['USERTYPE'];
        if(strlen($errorMsg) > 0) {
            echo $errorMsg;
        } else {
            $_SESSION['ACCESSTIME'] = time();
            $_SESSION['USERNAME'] = $un;
            $_SESSION['USERTYPE'] = $type;
            echo json_encode($row);
        }
        mysql_close($con);
    }
?>