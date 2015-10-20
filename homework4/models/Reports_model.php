<?php
class Reports_model extends CI_Model {
	public function __construct() {
		parent::__construct();

		$con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
        if(!$con) {
            die("Connection failed: ".$con->connect_error);
        }
        mysql_select_db('homework', $con);
	}

	public function index($params) {
            $startDate = $params['startdate'];
            $endDate = $params['enddate'];
            $groupByColumn = $params['reportGroupRadio'];
            $selectByColumn = $params['noGroupRadio'];
            $orderByColumn = $params['orderRadio'];
            $category = $params['categorySelect'];
            $totalSale = $params['totalSale'];

            $sql = "select";
            if($totalSale == "1") {
                $sql.=" sum(QUANTITY*OI.PRICE) as TOTALSALE";
            } else {
                if($selectByColumn == "quantity") {
                    $sql.=" sum(QUANTITY) as SUMQTY";
                } else if($selectByColumn == "price") {
                    $sql.=" sum(QUANTITY*OI.PRICE) as SUMQTY";
                }
        
                if($groupByColumn == 'productCategory') {
                    $sql.=", PC.CATEGORYID, PC.CATEGORYNAME, O.ORDERDATE, O.ORDERID";
                } else if($groupByColumn == 'sales') {
                    $sql.=", S.SALESID, S.SALENAME, S.PERCENTAGE, OI.PRICE, O.ORDERDATE, O.ORDERID";
                    if(strlen($category)>0) {
                        $sql.=", PC.CATEGORYNAME";
                    }
                } else {
                    $sql.=", OI.PRODUCTID, P.PRODUCTNAME, OI.PRICE, O.ORDERDATE, O.ORDERID";
                    if(strlen($category)>0) {
                        $sql.=", PC.CATEGORYNAME";
                    }
                }
            }
            $sql.=" from ORDERS AS O, ORDERITEMS AS OI, PRODUCTS AS P";
            if(strlen($category)>0 || $groupByColumn == 'productCategory') {
                $sql.=", CATEGORIES AS PC";
            } 

            if($groupByColumn == 'sales') {
                $sql.=", SALES AS S";
            }
    
            $sql.=" WHERE O.ORDERID=OI.ORDERID AND P.PRODUCTID=OI.PRODUCTID";
            if(strlen($category)>0 || $groupByColumn == 'productCategory') {
                $sql.=" and PC.CATEGORYID=P.CATEGORYID";
                if(strlen($category)>0) {
                    $sql.=" and PC.CATEGORYID=".$category;
                }
            }

            if($groupByColumn == 'sales') {
                $sql.=" and S.SALESID=P.SALEID";
            }

            if(strlen($startDate) > 0) {
                $sql.=" and ORDERDATE>='".$startDate."'";
            }

            if(strlen($endDate) > 0) {
                $sql.=" and ORDERDATE<='".$endDate."'";
            }

            $sql.=" GROUP BY";
            if($groupByColumn == 'productCategory') {
                $sql.=" PC.CATEGORYID";
            } else if($groupByColumn == 'sales') {
                $sql.=" S.SALESID";
            } else {
                $sql.=" OI.PRODUCTID";
            }
            if($totalSale == "1") {
        
            } else {
                if($selectByColumn == "quantity") {
                    $sql.=" ORDER BY SUMQTY";
                } else {
                    $sql.=" ORDER BY OI.PRICE";
                }
                if($orderByColumn=='DESC') {
                    $sql.=" DESC";
                }
            }

            $res = mysql_query($sql);

            if(!$res) {
                    // $errorMsg = "No result match the search option.";
                return "empty";
                // echo $sql;
            } else {
                $rows = array();
                $i = 0;
                date_default_timezone_set('America/Los_Angeles');
                while($row = mysql_fetch_assoc($res)) {
                    $row["ORDERDATE"] = date("H:i m-d-Y",$row["ORDERDATE"]);
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