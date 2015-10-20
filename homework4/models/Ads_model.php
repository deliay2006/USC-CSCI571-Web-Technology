<?php

class Ads_model extends CI_Model {
	public function __construct() {
		parent::__construct();

		$con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
        if(!$con) {
            die("Connection failed: ".$con->connect_error);
        }
        mysql_select_db('homework', $con);
	}

	public function index($productId) {
		$sql = "select ORDERID from ORDERITEMS WHERE PRODUCTID=".$productId." GROUP BY ORDERID";
        $res = mysql_query($sql);
        
        if(!$res) {
            $errorMsg = "Database Issue.";
            return $errorMsg;
        } else {
            $orderIds = mysql_fetch_array($res);
            if(count($orderIds)>0) {
                $sql = "select DISTINCT PRODUCTNAME FROM PRODUCTS AS P, ORDERITEMS AS OI WHERE OI.PRODUCTID=P.PRODUCTID AND OI.PRODUCTID!=".$productId." AND (";
                $i=0;
                foreach($orderIds as $orderId) {
                    if($i>0) {
                        $sql.=" or ";
                    }
                    $sql.="ORDERID=".$orderId;
                    $i++;
                }
                $sql.=")";

                $res = mysql_query($sql);
                if(!$res) {
                    $errorMsg = "Database Issue.";
                    return $errorMsg;
                } else {
                    $rows = array();
                    $i = 0;
                    while($row = mysql_fetch_assoc($res)) {
                        $rows[$i] = $row;
                        $i++;
                    }
                    $result = array("success",$rows);
                    return $result;
                }
            } else {
                $result = array("success");
                return $result;
            }
        }//else
        
    }//index
}
?>