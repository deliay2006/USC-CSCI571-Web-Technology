<?php
    require 'sessionTime.php';
    require 'sessionCustomer.php';
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

    // $sql = "update CUSTOMERS set PRODUCTNAME='".$pn."', PRODUCTDESC='".$desc."', PRICE=".$price.", CATEGORYID=".$category." where PRODUCTID=".$productId;
    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");    	       
    if(!$con) {
       die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);
    
    session_save_path("/home/scf-33/juncheny");
    session_start();
    $userId = $_SESSION['USERID'];

    $sql = "update USERS set USERNAME='".$un."', PASSWORD='".$pw."' where USERID=".$userId;
    $res = mysql_query($sql);
    if(!$res) {
        $errorMsg = "Database Issue.";
        echo $errorMsg;
        return;
    } else {
        $sql = "update CUSTOMERS, PAYMENT set FIRSTNAME='".$fn."', LASTNAME='".$ln."', AGE="
        .$age.", GENDER=".$gender.", ADDRESS='".$address."', CARDNO=".$card.", SECURITYCODE=".$code.", EXPIREMONTH=".$month.", EXPIREYEAR=".$year
        .", BILLINGADDR='".$billing."' where USERID=".$userId." and CUSTOMERS.PAYMENTID=PAYMENT.PAYMENTID";
        $res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Database Issue.";
            echo $errorMsg;
            return;
        }
    }
    
    if(strlen($errorMsg) > 0) {
        echo $errorMsg;
    } else {
        echo "success";
    }
    mysql_close($con);
?>