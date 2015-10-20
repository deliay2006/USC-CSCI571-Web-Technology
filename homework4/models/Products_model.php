<?php

class Products_model extends CI_Model {
	public function __construct() {
		parent::__construct();

		$con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
        if(!$con) {
            die("Connection failed: ".$con->connect_error);
        }
        mysql_select_db('homework', $con);
	}

	public function index() {
        
		$sql = "select PRODUCTNAME, PRODUCTDESC, CATEGORYID, P.PRODUCTID, PRICE*PERCENTAGE*0.01 AS PRICE from PRODUCTS AS P, SALES WHERE P.SALEID=SALES.SALESID";
        $res = mysql_query($sql);

    if(!$res) {
        $errorMsg = "Database Issue.";
    } else {
        $result = array();
        $rows = array();
        $i = 0;
        while($row = mysql_fetch_assoc($res)) {
            $rows[$i] = $row;
            $i++;
        }
        $sql = "select * FROM PRODUCTS WHERE SALEID IS NULL";
        $res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Database Issue.";
        } else {
            while($row = mysql_fetch_assoc($res)) {
                $rows[$i] = $row;
                $i++;
            }
        }

        $result[1] = $rows;

        $sql = "select * from CATEGORIES";
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

            $result[0] = $rows;
        }
        // echo json_encode($result);
        mysql_close($con);
        return $result;
        }//else
        
    }//index

    public function listProductsByCategory($categoyId){
        $sql = "select PRODUCTNAME, PRODUCTDESC, CATEGORYID, P.PRODUCTID, PRICE*PERCENTAGE*0.01 AS PRICE from PRODUCTS AS P, SALES WHERE P.SALEID=SALES.SALESID AND CATEGORYID=".$categoyId;
 
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

            $sql = "select * FROM PRODUCTS WHERE SALEID IS NULL AND CATEGORYID=".$categoyId;
            $res = mysql_query($sql);
            if(!$res) {
                $errorMsg = "Database Issue.";
            } else {
                while($row = mysql_fetch_assoc($res)) {
                    $rows[$i] = $row;
                    $i++;
                }
            }
            
            $date = time()*1000;
            $sql = "select * from PRODUCTS, SALES where PRODUCTS.SALEID=SALES.SALESID AND PRODUCTS.SALEID>0 and STARTDATE<".$date." AND ENDDATE>".$date." and CATEGORYID=".$categoyId;
            $res = mysql_query($sql);
            if(!$res) {
                $errorMsg = "Database Issue.";
            } else {
                $cats = array();
                $i=0;
                while($row = mysql_fetch_assoc($res)) {
                    $cats[$i] = $row;
                    $i++;
                }

                $result = array($rows, $cats);
                // echo json_encode($result);
                return $result;
            }
        }
        mysql_close($con);
    }
}
?>