<?php
    require 'sessionTime.php';
    require 'sessionMgmt.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
    
    $name = $_POST['productName'];
    $categoryId = $_POST['categorySelect'];
    $from = $_POST['startSalary'];
    $to = $_POST['toSalary'];

    	$sql = "select * from PRODUCTS where CATEGORYID=".$categoryId;
        if($from && is_numeric($from) > 0) {
            $sql = $sql." and PRICE>".$from;
        }

        if($to && is_numeric($to) > 0) {
            $sql = $sql." and PRICE<".$to;
        }

        if(strlen(trim($name)) > 0) {
            $sql = $sql." and PRODUCTNAME like '%".$name."%'";
        }

    	$con = mysql_connect("cs-server.usc.edu:10212", "root", "");    	       
    	if(!$con) {
           die("Connection failed: ".$con->connect_error);
    	}
    	mysql_select_db('homework', $con);
    	$res = mysql_query($sql);

        if(!$res) {
            // $errorMsg = "No result match the search option.";
            echo "empty";
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