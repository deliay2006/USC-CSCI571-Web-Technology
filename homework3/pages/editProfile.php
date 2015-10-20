<?php
    require 'sessionTime.php';
    require 'sessionCustomer.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
    
    session_save_path("/home/scf-33/juncheny");
    session_start();
    $userId = $_SESSION['USERID'];

    $sql = "select USERS.USERID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, AGE, GENDER, CARDNO, SECURITYCODE, EXPIREMONTH, EXPIREYEAR, BILLINGADDR, ADDRESS from USERS, CUSTOMERS, PAYMENT where USERS.USERID=CUSTOMERS.USERID and PAYMENT.PAYMENTID=CUSTOMERS.PAYMENTID and USERS.USERID=".$userId;

    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
    if(!$con) {
       die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);
    $res = mysql_query($sql);

    if(!$res) {
        echo "Database Issue.";
    } else {
        $row = mysql_fetch_assoc($res);
        echo json_encode($row);
    }
    mysql_close($con);
?>