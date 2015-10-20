<?php
    require 'sessionTime.php';
    require 'sessionMgmt.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
    
    $type = $_POST['employeeType'];
    $from = $_POST['startSalary'];
    $to = $_POST['toSalary'];

    $sql = "select USERS.USERID, USERNAME, FIRSTNAME, LASTNAME, PASSWORD, USERTYPE, AGE, GENDER, SALARY from USERS, EMPLOYEES where USERS.USERID=EMPLOYEES.USERID and USERTYPE=".$type;
    if($from && is_numeric($from) > 0) {
        $sql = $sql." and SALARY>".$from;
    }

    if($to && is_numeric($to) > 0) {
        $sql = $sql." and SALARY<".$to;
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
        // echo $sql;
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