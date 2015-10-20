<?php
    require 'sessionTime.php';
    require 'sessionAdmin.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $un = $_POST['username'];
    $pw = $_POST['password'];
    $fn = $_POST['firstname'];
    $ln = $_POST['lastname'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $type = $_POST['type'];
    $userId = $_POST['userId'];
    $salary = $_POST['salary'];

    $errorMsg = "";
    
    if(strlen($un) == 0) {
        $errorMsg = "Username cannot be empty.";
    }
    if(strlen($pw) == 0) {
        $errorMsg = "Password cannot be empty";
    }
    if(!$gender) {
        $errorMsg = "Must select a gender.";
    }
    if(empty($type)) {
        $errorMsg = "At least one employee type is reauired to be selected.";
    }

    if(!empty($age)) {
        if(!is_numeric($age)||$age<10||$age>100) {
            $errorMsg = "Invalid age.";
        }
    } else {
        $age = 0;
    }
    if(!empty($salary)) {
        if(!is_numeric($salary)||$salary<100||$salary>100000000) {
            $errorMsg = "Invalid salary.";
        }
    } else {
        $salary=0;
    }

    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $typeNum;
    if($type == "sales") {
        $typeNum = 3;
    } else if($type == "manager") {
        $typeNum = 2;
    } else {
        $typeNum = 1;
    }
    
    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");    	       
    if(!$con) {
       die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);

    $sql = "update USERS set USERNAME='".$un."', PASSWORD='".$pw."', USERTYPE=".$typeNum." where USERID=".$userId;
    $res = mysql_query($sql);
    if(!$res) {
        $errorMsg = "Database Issue.";
    } else {
        if($gender == "male") {
            $gender = 1;
        } else {
            $gender = 2;
        }
        $sql = "update EMPLOYEES set FIRSTNAME='".$fn."', LASTNAME='".$ln."', AGE=".$age.", GENDER=".$gender.", SALARY=".$salary." where USERID=".$userId;
        $res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Database Issue.";
        }
    }
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
    } else {
        echo 'success';
    }
    mysql_close($con);
?>