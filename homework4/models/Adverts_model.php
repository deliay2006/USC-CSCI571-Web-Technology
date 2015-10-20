<?php
class Adverts_model extends CI_Model {
	public function __construct() {
		parent::__construct();

		$con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
        if(!$con) {
            die("Connection failed: ".$con->connect_error);
        }
        mysql_select_db('homework', $con);
	}

	public function index($date) {
        $sql = "select * from PRODUCTS, SALES where PRODUCTS.SALEID=SALES.SALESID AND PRODUCTS.SALEID>0 and STARTDATE<".$date." AND ENDDATE>".$date;
        $res = mysql_query($sql);

        if(!$res) {
            $errorMsg = "Database Issue.";
        } else {
            $rows = array();
            $i = 0;
            while($row = mysql_fetch_assoc($res)) {
                $rows[$i] = $row;
                $i++;
            }
            // echo json_encode($rows);
            return $rows;
        }
        mysql_close($con);
    }//index
}
?>