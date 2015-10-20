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

    if($gender == "male") {
        $gender = 1;
    } else {
        $gender = 2;
    }

    $typeNum=1;
    if($type == "sales") {
        $typeNum = 3;
    } else if($type == "manager") {
        $typeNum = 2;
    }

    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
    if(!$con) {
        die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);
    
    $sql = "select USERNAME from USERS where USERNAME='".$un."'";
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    if($res && $row && strlen($row['USERNAME'])>0) {
        $errorMsg = "username already exist.";
        echo $errorMsg;
        return;
    }

    $sql = "insert into USERS (USERNAME, PASSWORD, USERTYPE) values ('".$un."', '".$pw."', "." $typeNum)";
    $res = mysql_query($sql);
    if(!$res) {
        $errorMsg = "Database Issue.";
    } else {
        $userId = mysql_insert_id();
        $sql = "insert into EMPLOYEES (USERID, FIRSTNAME, LASTNAME, AGE, GENDER, SALARY) values ('".
               $userId."', '".$fn."', '".$ln."', ".$age.", ".$gender.", ".$salary.")";
        $res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Database Issue.";
        }
    }
    
    if(strlen($errorMsg) > 0) {
        echo $errorMsg;
    } else {
    	echo "success";
    }
    mysql_close($con);
?>