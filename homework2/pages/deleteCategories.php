<?php
    require 'sessionTime.php';
    require 'sessionSales.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $selectList = $_POST['categoryListCheckbox'];

    $errorMsg = "";
    if(empty($selectList)) {
        $errorMsg = "At least one category is reauired to be selected.";
    }

    $sql = "delete from CATEGORIES where";
    $N = count($selectList);
    for($i=0; $i<$N; $i++) {
        if($i > 0) {
            $sql = $sql." or";
        }
        $sql = $sql." CATEGORYID='".$selectList[$i]."'";
    }


    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");    	       
    if(!$con) {
       die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);
    $res = mysql_query($sql);
    if(!$res) {
        $errorMsg = "Database Issue.";
    }
        
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
    } else {
        echo "success";
    }
    mysql_close($con);
?>