<?php
class Orders_model extends CI_Model {
	public function __construct() {
		parent::__construct();

		$con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
        if(!$con) {
            die("Connection failed: ".$con->connect_error);
        }
        mysql_select_db('homework', $con);
	}

	public function index($customerId) {
		$sql = "select * from ORDERS where CUSTOMERID=".$customerId;
        $res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Database Issue.";
        } else {
            $rows = array();
            $i = 0;
            date_default_timezone_set('America/Los_Angeles');
            while($row = mysql_fetch_assoc($res)) {
                $row["ORDERDATE"] = date("H:i m-d-Y",$row["ORDERDATE"]);
                $rows[$i] = $row;
                $i++;
            }
            return $rows;
        }
        mysql_close($con);
    }//index

    public function addOrder($customerId, $items) {
        $date = time();
        $sql = "insert into ORDERS (ORDERDATE, CUSTOMERID) values ('".$date."', ".$customerId.")";
        $res = mysql_query($sql);
        $N = count($items);

        if(!$res) {
            $errorMsg = "DataBase Issue.";
            echo $errorMsg;
            return;
        } else {
            $orderId = mysql_insert_id();
            for($i=0; $i<$N; $i++) {
                $item = $items[$i];
                $productId = $item["productId"];
                $quantity = $item["quantity"];
                $price = $item["price"];
    
                $sql = "insert into ORDERITEMS (ORDERID, PRODUCTID, QUANTITY, PRICE) values (".$orderId.", ".$productId.", ".$quantity.", ".$price.")";
                $res = mysql_query($sql);
                if(!$res) {
                    $errorMsg = $errorMsg."Failed to add item:".$item["productName"];
                }
            }
        }
    
       if(strlen($errorMsg) > 0) {
            return $errorMsg;
        } else {
            return 'success';
            // return $sql;
        }
        mysql_close($con);
    }//addOrder

    public function viewOrder($orderId){

        $sql = "select PRODUCTNAME, PRODUCTDESC, ORDERITEMS.PRICE, QUANTITY, PRODUCTS.PRODUCTID, ORDERDATE from ORDERS, ORDERITEMS, PRODUCTS where ORDERITEMS.ORDERID=ORDERS.ORDERID and ORDERITEMS.ORDERID=".$orderId." and PRODUCTS.PRODUCTID=ORDERITEMS.PRODUCTID";
        $res = mysql_query($sql);
        if(!$res) {
            $errorMsg = "Database Issue.";
        } else {
            $rows = array();
            $i = 0;
            date_default_timezone_set('America/Los_Angeles');
            while($row = mysql_fetch_assoc($res)) {
                $row["ORDERDATE"] = date("H:i m-d-Y",$row["ORDERDATE"]);
                $rows[$i] = $row;
                $i++;
            }
            return $rows;
        }

        mysql_close($con);
    }//viewOrder

}
?>