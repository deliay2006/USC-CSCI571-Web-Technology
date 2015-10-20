<?php

class Login_model extends CI_Model {
	public function __construct() {
		parent::__construct();

		$con = mysql_connect("cs-server.usc.edu:10212", "root", ""); 
        if(!$con) {
            die("Connection failed: ".$con->connect_error);
        }
        mysql_select_db('homework', $con);
	}

	public function index($un, $pw) {
        $sql = "select USERTYPE, USERNAME, USERS.USERID, CUSTOMERID from USERS, CUSTOMERS where USERNAME='".$un."' and PASSWORD='".$pw."' and USERTYPE=4 and CUSTOMERS.USERID=USERS.USERID";
        $res = mysql_query($sql);
        if(!$res) {
            return "Invalid Login";
        }

        $row = mysql_fetch_assoc($res);
        if(!$row) {
            return "Invalid Login";
        }
        mysql_close($con);
        return $row;
    }//index

    public function managerLogin($un, $pw) {
        $sql = "select USERTYPE, USERNAME, USERID from USERS where USERNAME='".$un."' and PASSWORD='".$pw."'";
        $res = mysql_query($sql);
        $row = mysql_fetch_assoc($res);
        if(!$res || !$row) {
            $errorMsg = "Invalid Login";
        }

        if(strlen($errorMsg) > 0) {
            return $errorMsg;
        } else {
            return $row;
        }
        mysql_close($con);
    }
}
?>