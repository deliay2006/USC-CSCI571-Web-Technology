<?php

class Profile_model extends CI_Model {
	public function __construct() {
		parent::__construct();

		$con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
        if(!$con) {
            die("Connection failed: ".$con->connect_error);
        }
        mysql_select_db('homework', $con);
	}

	public function index($userId) {
        
        $sql = "select USERS.USERID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, AGE, GENDER, CARDNO, SECURITYCODE, EXPIREMONTH, EXPIREYEAR, BILLINGADDR, ADDRESS from USERS, CUSTOMERS, PAYMENT where USERS.USERID=CUSTOMERS.USERID and PAYMENT.PAYMENTID=CUSTOMERS.PAYMENTID and USERS.USERID=".$userId;
        $res = mysql_query($sql);
    
        if(!$res) {
            echo "Database Issue.";
        } else {
            $row = mysql_fetch_assoc($res);
            // echo json_encode($row);
            return $row;
        }
        mysql_close($con);
        
    }//index

    public function addProfile($params) {
        $un = $params['username'];
        $pw = $params['password'];
        $fn = $params['firstname'];
        $ln = $params['lastname'];
        $age = $params['age'];
        $gender = $params['gender'];
        $type = $params['type'];
        $card = $params['card'];
        $code = $params['code'];
        $month = $params['month'];
        $year = $params['year'];
        $address = $params['address'];
        $billing = $params['billing'];

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
            // echo $errorMsg;
            return $errorMsg;
        } else {
            // echo "success";
            return "success";
        }
        mysql_close($con);
    }//addProfile

    public function updateProfile($params) {
        session_save_path("/home/scf-33/juncheny");
        session_start();
        $userId = $_SESSION['USERID'];

        $un = $params['username'];
        $pw = $params['password'];
        $fn = $params['firstname'];
        $ln = $params['lastname'];
        $age = $params['age'];
        $gender = $params['gender'];
        $type = $params['type'];
        $card = $params['card'];
        $code = $params['code'];
        $month = $params['month'];
        $year = $params['year'];
        $address = $params['address'];
        $billing = $params['billing'];

        $sql = "update USERS set USERNAME='".$un."', PASSWORD='".$pw."' where USERID=".$userId;
        $res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Database Issue.".$sql;
            return $errorMsg;
        } else {
            $sql = "update CUSTOMERS, PAYMENT set FIRSTNAME='".$fn."', LASTNAME='".$ln."', AGE="
            .$age.", GENDER=".$gender.", ADDRESS='".$address."', CARDNO=".$card.", SECURITYCODE=".$code.", EXPIREMONTH=".$month.", EXPIREYEAR=".$year
            .", BILLINGADDR='".$billing."' where USERID=".$userId." and CUSTOMERS.PAYMENTID=PAYMENT.PAYMENTID";
            $res = mysql_query($sql);
            if(!$res) {
                $errorMsg = "Database Issue.".$sql;
                return $errorMsg;
            }
        }
    
        if(strlen($errorMsg) > 0) {
            // echo $errorMsg;
            return $errorMsg;
        } else {
            // echo "success";
            return "success";
        }
        mysql_close($con);
    }//updateProfile
}
?>