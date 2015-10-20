<?php
    $un = $_POST['username'];
    $pw = $_POST['password'];
    $fn = $_POST['firstname'];
    $ln = $_POST['lastname'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $type = 4;
    $card = $_POST['creditCard'];
    $code = $_POST['securityNo'];
    $month = $_POST['month'];
    $year = $_POST['year'];
    $address = $_POST['address'];
    $billing = $_POST['bAddress'];

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

    if(!empty($card)) {
        if(!is_numeric($card) || strlen($card) != 16) {
            $errorMsg = "Invalid Credit Card Number.";
        }
    } else if(!empty($code)) {
        $errorMsg = "Please inupt the credit card number.";
    }

    if(!empty($card)) {
        if(!empty($code)) {
            if(!is_numeric($code) || strlen($code) != 3) {
                $errorMsg = "Invalid Security Code.";
            }
        } else {
            $errorMsg = "Please inupt the security code for your credit card.";
        }
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

    $sql = "insert into USERS (USERNAME, PASSWORD, USERTYPE) values ('".$un."', '".$pw."', ".$type.")";
    $res = mysql_query($sql);
    if(!$res) {
        $errorMsg = "Fail to create user.";
    } else {
        $userId = mysql_insert_id();
        $paymentId = 0;
        if(strlen($card)>0) {
            $sql = "insert into PAYMENT (CARDNO, SECURITYCODE, EXPIREMONTH, EXPIREYEAR, BILLINGADDR) values ('".
               $card."', ".$code.", ".$month.", ".$year.", '".$billing."')";
            $res = mysql_query($sql);
            if(!$res) {
                $errorMsg = "Fail to create payment.";
            } else {
                $paymentId = mysql_insert_id();
            }
        }
        $sql = "insert into CUSTOMERS (USERID, FIRSTNAME, LASTNAME, AGE, GENDER, ADDRESS, PAYMENTID) values ('".
               $userId."', '".$fn."', '".$ln."', ".$age.", ".$gender.", '".$address."', ".$paymentId.")";
        $res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Fail to create customer.";
        }
    }
    
    if(strlen($errorMsg) > 0) {
        echo $errorMsg;
    } else {
        echo "success";
    }
    mysql_close($con);
?>