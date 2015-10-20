<?php
    require 'sessionTime.php';
    require 'sessionSales.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $cn = $_POST['categoryName'];
    $desc = $_POST['desc'];

    $errorMsg = "";
    if(strlen($cn) == 0) {
        $errorMsg = "Category name cannot be empty.";
    }
    
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
    if(!$con) {
        die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);

    $sql = "insert into CATEGORIES (CATEGORYNAME, CATEGORYDESC) values ('".$cn."', '".$desc."')";
    $res = mysql_query($sql);
    if(!$res) {
        $errorMsg = "Database Issue.";
    }
    
    if(strlen($errorMsg) > 0) {
        echo $errorMsg;
    } else {
    	echo "success";
    }
    mysql_close($con);
?>