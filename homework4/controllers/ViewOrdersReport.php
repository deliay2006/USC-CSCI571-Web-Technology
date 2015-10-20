<?php

    class ViewOrdersReport extends CI_Controller{
        public function __construct() {
            parent::__construct();
            session_save_path("/home/scf-33/juncheny");
            session_start();
            
            $sessionTime = $_SESSION['ACCESSTIME'];
            $t = time();
            $GLOBALS['errorMsg'] = "";

            if($sessionTime!=null && $t - $sessionTime > 1200) {
                $errorMsg = "TIMEOUT";
                $_SESSION['ACCESSTIME'] = null;
                $_SESSION['ACCESSTIME'] = null;
                $_SESSION['USERID'] = null;
                $_SESSION['USERTYPE'] = null;
                $_SESSION['CUSTOMERID'] = null;
                echo $errorMsg;
            } else {
                $type = $_SESSION['USERTYPE'];
                if($type."" != "2" ) {
                    $GLOBALS['errorMsg'] = "NOPERMISSION";
                }
            }   
        }

        public function index() {
            $this->load->view('ReportsView');
        }

        public function search() {
            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }

            $startDate = htmlentities($_POST['startdate']);
            $endDate = htmlentities($_POST['enddate']);
            $groupByColumn = htmlentities($_POST['reportGroupRadio']);
            $selectByColumn = htmlentities($_POST['noGroupRadio']);
            $orderByColumn = htmlentities($_POST['orderRadio']);
            $category = htmlentities($_POST['categorySelect']);
            $totalSale = htmlentities($_POST['totalSale']);
            
            $params = array("startdate"=>$startDate, "enddate"=>$endDate, "reportGroupRadio"=>$groupByColumn,
                "noGroupRadio"=>$selectByColumn, "orderRadio"=>$orderByColumn, "categorySelect"=>$category,
                "totalSale"=>$totalSale);
            $this->load->model("Reports_model", "model");
            $result = $this->model->index($params);
            $this->load->view('AjaxResponseView', array("data"=>$result));

        }//index
    }
?>