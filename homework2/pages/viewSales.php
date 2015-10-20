<?php
    require 'sessionTime.php';
    require 'sessionMgmt.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
    
    $name = $_POST['productName'];
    $nameSql = "";
    $categoryId = $_POST['categorySelectForSale'];
    $from = $_POST['startSalary'];
    $to = $_POST['toSalary'];
    $startDate = $_POST['startdate'];
    $endDate = $_POST['enddate'];

    if(strlen($name) > 0) {
        $nameSql = " and PRODUCTNAME like '%".$name."%'";
    }

        $sql = "select * from SALES inner join PRODUCTS on SALEID=SALESID where CATEGORYID=".$categoryId.$nameSql;
        if($from && is_numeric($from) > 0) {
            $sql = $sql." and PRICE>".$from;
        }

        if($to && is_numeric($to) > 0) {
            $sql = $sql." and PRICE<".$to;
        }

        if(strlen(trim($name)) > 0) {
            $sql = $sql." and PRODUCTNAME like '%".$name."%'";
        }

        if(strlen($startDate) > 0) {
            $sql = $sql." and STARTDATE>".$startDate;
        }

        if(strlen($endDate) > 0) {
            $sql = $sql." and ENDDATE<".$endDate;
        }

        $con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
        if(!$con) {
           die("Connection failed: ".$con->connect_error);
        }
        mysql_select_db('homework', $con);
        $res = mysql_query($sql);

        if(!$res) {
            $errorMsg = "No result match the search option.";
            // echo "empty";
            echo $sql;
        } else {
            $rows = array();
            $i = 0;
            while($row = mysql_fetch_assoc($res)) {
                $rows[$i] = $row;
                $i++;
            }
            echo json_encode($rows);
        }
        mysql_close($con);
?>