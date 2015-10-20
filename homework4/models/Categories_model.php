<?php

class Categories_model extends CI_Model {
	public function __construct() {
		parent::__construct();

		$con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
        if(!$con) {
            die("Connection failed: ".$con->connect_error);
        }
        mysql_select_db('homework', $con);
	}

	public function index() {
        $sql = "select * from CATEGORIES";
        $res = mysql_query($sql);

        if(!$res) {
            $errorMsg = "Database Issue".$sql;
            return $errorMsg;
        } else {
            $rows = array();
            $i = 0;
            while($row = mysql_fetch_assoc($res)) {
                $rows[$i] = $row;
                $i++;
            }
            return $rows;
        }
        mysql_close($con);
        
    }//index
}
?>